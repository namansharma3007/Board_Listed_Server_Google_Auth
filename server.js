require("dotenv").config();
const express = require("express");
const cors = require("cors");
const passport = require("passport");
const authRoute = require("./routes/auth");
const cookieSession = require("cookie-session");
const passportStrategy = require("./passport");
const app = express();

app.use(
	cors({
		// origin: "http://localhost:3000",
		origin: "https://board-dashboard-listed.netlify.app",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);


app.use(
	cookieSession({
		name: "session",
		keys: ["cyberwolve"],
		maxAge: 24 * 60 * 60 * 100,
	})
);

app.use(passport.initialize());
app.use(passport.session());



app.use("/auth", authRoute);


app.use((req, res, next) => {
	const allowedOrigins = ["http://localhost:3000", "https://board-dashboard-listed.netlify.app"];
	const origin = req.headers.origin;
	if (allowedOrigins.includes(origin)) {
		res.setHeader("Access-Control-Allow-Origin", origin);
	}
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
	res.header("Access-Control-Allow-Credentials", true);
	next();
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));