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
		// origin: "https://board-dashboard-listed.netlify.app",
		origin: "https://board-dashboard-listed.vercel.app",
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


app.use((err, req, res, next) => {
	// console.error(err.stack);
	res.status(500).json({
		error: true,
		message: err.stack,
	});
});



const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));