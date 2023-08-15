import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { JwtPayload } from "../modules/auth/auth.controller";


export const signAccessToken = (payload: string | object ) => {
  return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
    expiresIn:config.JWT_ACCESS_LIFETIME || "30m",
  });
};

export const signRefreshToken = (payload: string | object ) => {
  return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
    expiresIn: config.JWT_REFRESH__LIFETIME || "1y",
  });
};


export const verifyJwt = (
  token: string,
  secretOrPublicKey: "accessTokenSecret" | "refreshTokenSecret"
) => {
  const secretKey =
    secretOrPublicKey === "accessTokenSecret"
      ? config.JWT_ACCESS_SECRET
      : config.JWT_REFRESH_SECRET;
  try {
    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    return {
      decoded,
      valid: true,
      expired: false,
    };
  } catch (e: any) {
    return {
      decoded: null,
      valid: false,
      expired: e.message === "jwt expired",
    };
  }
};
