const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
(session)
const flash = require('express-flash')
const PORT = 4000;

mongoose.connect(
  "mongodb+srv://altin:altin123@cluster0.qeupc9d.mongodb.net/?retryWrites=true&w=majority"
);

require("./config/passport")(passport);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//Use forms for put and delete
app.use(methodOverride("_method"));

// Sessions
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

//Routes below
app.use("/", authRoutes);
app.use("/tasks", taskRoutes);


app.listen(PORT, () => {
  console.log("Server is running, you better catch it!");
});
