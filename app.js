var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    mongoose = require('mongoose'),
    request = require('request'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    path = require('path'),
    multer = require('multer');
var morgan = require('morgan');

var organisationData = require("./models/org");
var NewUser = require("./models/user");


mongoose.connect('mongodb://localhost/DAVA');
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(methodOverride("_method"));



app.use(require("express-session")({
    secret: "Once up on a time",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(NewUser.authenticate()));
passport.serializeUser(NewUser.serializeUser());
passport.deserializeUser(NewUser.deserializeUser());




// this code is for using the user data to show something after login
app.use(function (req, res, next) {
    res.locals.userU = req.user;
    next();
});


app.get("/", function (req, res) {
    res.render("index");
})




//////////////////////////////////////////
/////////////////////////////////////////
/////////FOR USER SIGN UP///////////////
///////////////////////////////////////

app.get("/login", function (req, res) {
    res.render("login");
})
app.post("/login", passport.authenticate("local", {
    successRedirect: "/org",
    failureRedirect: "/login"
}), function (req, res) {});



app.get("/signup", function (req, res) {
    res.render("signup")
})

app.post("/signup", function (req, res) {
    var username = req.body.username;
    var name = req.body.name;
    var organisation = req.body.organisation;
    var email = req.body.email;
    var address = req.body.address;
    var longitude = req.body.longitude;
    var latitude = req.body.latitude;
    var phonenumber = req.body.phonenumber;
    var affected = req.body.affected;

    var new_user = {
        username: username,
        latitude: latitude,
        longitude: longitude,
        name: name,
        phonenumber: phonenumber,
        affected: affected,
        organisation: organisation,
        email: email,
        address: address
    };
    NewUser.register(new_user, req.body.password, function (err, newUser) {
        if (err) {
            console.log(err);
            res.redirect("Something went wrong");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/");
        });
    });
});


//////////////////////////////////////////
/////////////////////////////////////////
/////////FOR ORGANISATION DETAIL///////////////
///////////////////////////////////////


app.get("/org", isLoggedIn, function (req, res) {
    organisationData.find({}, function (err, organisationD1) {
        if (err) {
            res.redirect('/login');
        } else {
            console.log(organisationD1);
            res.render('org', {
                organisationD2: organisationD1
            });
        };
    });
});
app.post("/org", isLoggedIn, function (req, res) {
    var namep = req.body.namep;
    var condition = req.body.condition;
    var guardianname = req.body.guardianname;
    var phonenumberg = req.body.phonenumberg;
    var critical = req.body.critical;
    var newuser = {
        namep: namep,
        condition: condition,
        guardianname: guardianname,
        phonenumberg: phonenumberg,
        critical: critical
    };
    organisationData.create(newuser, function (err, organisationD) {
        if (err) {
            console.log(err);
            res.redirect("Something went wrong");
        }
        res.redirect('/org');
    });
});

app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
});
////////////////////////////////
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
};

app.listen(process.env.PORT || 7000, function () {
    console.log("your server is on from port 7000");
});