// Imports
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/post.routes");
const likeRoutes = require("./routes/like.routes");
const commentRoutes = require("./routes/comment.routes");
const uploadRoutes = require("./routes/upload.routes");
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};
app.use(cors(corsOptions));

// Options pour sécuriser les cookies
const hour = 3 * 24 * 60 * 60 * 1000;
const expiryDate = new Date(Date.now() + hour);
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SEC_SES,
    name: "sessionId",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: true,
      expires: expiryDate,
    },
  })
);

// Middleware qui permet de transformer le corp de la requête en un objet JSON utilisable
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(helmet());

// jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).json(res.locals.user.id);
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/post", likeRoutes);
app.use("/api/post", commentRoutes);
app.use("/api/user", uploadRoutes);

// Export de l'application express pour déclaration dans server.js
module.exports = app;
