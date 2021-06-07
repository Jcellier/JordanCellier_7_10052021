// Imports
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const likeRoutes = require("./routes/like");
const commentRoutes = require("./routes/comment");
const uploadRoutes = require("./routes/upload");
const { checkUser, requireAuth } = require("./middleware/auth");
const cors = require("cors");
require("dotenv").config({ path: "./.env" });

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

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, DELETE, PATCH, OPTIONS"
//   );
//   next();
// });

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

// Middleware qui permet de transformer le corps de la requête en un objet JSON utilisable
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
