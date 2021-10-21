import { withIronSession } from "next-iron-session";

function handler(req, res, session) {
    req.session.destroy();
    res.send("Logged out");
}

export default withIronSession(handler, {
    cookieName: process.env.COOKIE_NAME,
    cookieOptions: {
        secure: false
    },
    password: process.env.APPLICATION_SECRET
});
