import session from "express-session";

const sessionMiddleware = session({
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60 * 1,
  },
});

export default sessionMiddleware;
