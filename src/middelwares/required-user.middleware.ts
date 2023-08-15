import type { NextFunction, Request, Response } from "express";
import { UnAuthenticationApiError } from "../errors";
import { verifyJwt } from "../utils/jwt.utils";
import { getUser } from "../modules/user/user.service";

export const requiredUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.headers.authorization?.replace("Bearer ", "");
  if (!authToken) {
    throw new UnAuthenticationApiError();
  }
  const { decoded, expired } = verifyJwt(authToken, 'accessTokenSecret');
  if (!decoded || expired) throw new UnAuthenticationApiError();
  const userId = decoded.sub ;
  const user = await getUser({ _id:userId }, {_id:true ,username:true , email:true  }, { lean: true });
  if (!user) throw new UnAuthenticationApiError();
  res.locals.user = user;
  return next();
};
