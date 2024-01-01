require('dotenv').config(); //At the top only to write
const express = require('express')
const connectDb = require('./db')
const app = express()
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 8000
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;


//For Submitting data to backend 
//required middleware to write always
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})
//express.json() -> inbuilt in express to recognize the incoming req obj.
//as JSON obj. This method is basically called as Middleware.
app.use(express.json())

app.use(session({ //session Setup level-5
    secret: "Our little secret",
    resave: false, //Forces the session to be saved back to the session store, even if the session was never modified during the request.
    saveUninitialized: false //Choosing false is useful for implementing login sessions, reducing server storage usage,
    //or complying with laws that require permission before setting a cookie.
    //Choosing false will also help with race conditions where a client makes multiple parallel requests without a session.
}));
app.use(passport.initialize()); //Initialize passport
app.use(passport.session()); //To use passport for setting up our session
// Use cookie-parser middleware
app.use(cookieParser());

//call for DB connectivity
connectDb()

const userCollection = require('./models/User')
passport.use(userCollection.User.createStrategy());
passport.serializeUser(function(user, cb) { //serializeUser create a cookie and stuff userIdentification like sessionID etc. into it
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
      picture: user.picture
    });
  });
});
passport.deserializeUser(function(user, cb) { //deserializeUser crumble the cookie & discover the
  process.nextTick(function() {               //message that who the user is so that user is authenticated to server
    return cb(null, user);
  });
});

//level-6 OAuth sign-in with google
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8000/auth/google/secrets", //for local device
    // callbackURL: "http://daily-blog-we0e.onrender.com/auth/google/secrets", //for deploy device
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    // console.log(profile);
    userCollection.User.findOrCreate({
      username: profile.displayName, googleId: profile.id, email: profile.displayName
    }, function(err, user) {
      const googleUser = {
        id : profile.id,
        email : profile.displayName
      }
      const token = jwt.sign({googleUser}, "googleLogin")
      // console.log(token);
      return cb(err, user, {token});
    });
  }
));

app.use('/api', require('./Routes/CreateUser'))
app.use('/api', require('./Routes/LoginUser'))
app.use('/api', require('./Routes/ComposeBlog'))
app.use('/api', require('./Routes/UpdateBlog'))
app.use('/api', require('./Routes/DeleteBlog'))
app.use('/api', require('./Routes/DisplayBlog'))
app.use('/api', require('./Routes/SpecificDisplayBlog'))
app.use('/api', require('./Routes/LikeDislikeBlog'))
app.use('/api', require('./Routes/UserBlog'))

app.get('/', (req, res) => {
    res.send('Hello World!')
})
//Level-6 OAuth sign-in with Google
app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);
app.get("/auth/google/secrets",
  passport.authenticate('google', {failureRedirect: "/login" }),
  function(req, res) {
    // Successful authentication, redirect to secrets.
    // res.json(req.user);
    res.redirect('http://localhost:3000/');
});
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

