import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: process.env.APPLICATION_SECRET,
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
      secure: false
    },
  });
}
