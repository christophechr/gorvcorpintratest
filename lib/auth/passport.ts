import bcrypt from "bcrypt";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

type DemoUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  passwordHash: string;
};

const demoUser: DemoUser = {
  id: "u_001",
  email: "you@gorvcorp.com",
  name: "Alex Rivera",
  role: "employee",
  passwordHash: bcrypt.hashSync("Password123!", 10),
};

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      if (email !== demoUser.email) {
        return done(null, false, { message: "Invalid credentials." });
      }

      const matches = await bcrypt.compare(password, demoUser.passwordHash);
      if (!matches) {
        return done(null, false, { message: "Invalid credentials." });
      }

      return done(null, {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
        role: demoUser.role,
      });
    }
  )
);

export default passport;
