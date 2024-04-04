import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  const secret_key = process.env.SECRET_KEY;

  try {
    const token = req.headers.authorization;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Authorization token is missing." });
    }

    const verify = jwt.verify(token, secret_key);
    res.locals.id = verify.email;
    res.locals.type = verify.type;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Authorization token has expired." });
    }

    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
