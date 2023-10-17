import express from "express";
import { createUser, getUserByEmail } from "../db/users";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    !email || !username || !password ? res.sendStatus(400) : null;

    const existingUser = await getUserByEmail(email);

    existingUser ? res.sendStatus(400) : null;

    const salt = random();

    const user = await createUser({
      email,
      username,
      password,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.json(user).end();
  } catch (error) {
    return res.json({ Error: error });
  }
};

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (user?.authentication?.salt) {
      const expectedHash = authentication(user.authentication.salt, password);

      if (user.authentication.password != expectedHash) {
        return res.json({ Message: "Password or email is incorrect" });
      }

      const salt = random();
      user.authentication.sessionToken = authentication(
        salt,
        user._id.toString()
      );

      await user.save();

      const cookie = res.cookie(
        "RECIPE-AUTH",
        user.authentication.sessionToken,
        {
          domain: "localhost",
          path: "/",
        }
      );

      return res.send(cookie);
    } else {
      return res
        .status(401)
        .json({ Message: "E-mail or password is incorrect." });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const logout = async (req: express.Request, res: express.Response) => {
  try {
    res.clearCookie("RECIPE-AUTH");

    return res.json({ Message: "Logged out!" }).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
