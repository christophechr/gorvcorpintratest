import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import passport from "../../../lib/auth/passport";

type AuthUser = {
  id: string;
  email: string;
  name: string;
  role: string;
};

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return res
      .status(500)
      .json({ error: "JWT_SECRET is not set on the server." });
  }

  return passport.authenticate(
    "local",
    { session: false },
    (err: Error | null, user: AuthUser | false, info?: { message?: string }) => {
      if (err) {
        return res.status(500).json({ error: "Authentication failed." });
      }

      if (!user) {
        return res.status(401).json({ error: info?.message ?? "Unauthorized." });
      }

      const token = jwt.sign(
        { sub: user.id, email: user.email, role: user.role },
        secret,
        { expiresIn: "1h" }
      );

      const isProd = process.env.NODE_ENV === "production";
      res.setHeader(
        "Set-Cookie",
        `auth_token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${
          isProd ? "; Secure" : ""
        }`
      );

      return res.status(200).json({ token, user });
    }
  )(req, res);
};

export default handler;
