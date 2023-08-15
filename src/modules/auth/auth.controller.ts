import type { Request, Response } from "express";
import { InternalServerApiError, UnAuthorizedApiError } from "../../errors";
import {
  createUser,
  getUser,
  updateUser,
  validateUser,
} from "../user/user.service";
import { LoginInpt, RegisterInput } from "./auth.schema";
import {
  signAccessToken,
  signRefreshToken,
  verifyJwt,
} from "../../utils/jwt.utils";
import { hash, verify } from "argon2";

export type JwtPayload = {
  sub: string;
};

/** Login
 * @access public
 * @route /api/auth/login
 * @method POST
 */
export const loginHandler = async (
  req: Request<{}, {}, LoginInpt>,
  res: Response
) => {
  const { email, password } = req.body;
  const user = await validateUser(email, password);
  const accessToken = signAccessToken({ sub: user.id });
  const refreshToken = signRefreshToken({ sub: user.id });

  if (!accessToken || !refreshToken ) throw new InternalServerApiError("some thing went wrong tray again!")
  //update user
  user.refreshToken = await hash(refreshToken);
  await user.save();
  return res.status(200).json({ accessToken, refreshToken });
};

/** Register
 * @access public
 * @route /api/auth/register
 * @method POST
 */
export const registerHandler = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response
) => {
  const user = await createUser(req.body);
  const { password, ...rest } = user;
  return res.status(200).json({ user: rest });
};

/** LogOut
 * @access private
 * @route /api/auth/logout
 * @method POST
 */
export const logoutHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  await updateUser({ _id: userId }, { refreshToken: null });
  res.locals.user = null;
  return res.sendStatus(204);
};

/** ME
 * @access private
 * @route /api/auth/me
 * @method GEt
 */
export const getMeHandler = async (req: Request, res: Response) => {
  const user = res.locals.user;
  return res.status(200).json({ user });
};

/** New access token
 * @access Private
 * @route api/auth/refresh
 * @method POST
 */

export const refreshAccessTokenHandler = async (
  req: Request,
  res: Response
) => {
  const token = req.get("x-refresh")?.replace("Bearer ", "");
  if (!token) throw new UnAuthorizedApiError("Access denied");

  const { decoded, expired } = verifyJwt(token, "refreshTokenSecret");
  if (!decoded || expired) {
    throw new UnAuthorizedApiError("Access denied");
  }

  const user = await getUser({ _id: decoded.sub }, { refreshToken: true });
  if (!user?.refreshToken || !(await verify(user.refreshToken, token))) {
    throw new UnAuthorizedApiError("Access denied");
  }

  const accessToken = signAccessToken({ sub: user._id });
  return res.status(200).json({ accessToken });
};
