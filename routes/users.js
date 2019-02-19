const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require('passport');

// User Model
const User = require("../models/User");

// Login Page
router.get("/login", (req, res) => {
    res.render("user/login");
});

// Register Page
router.get("/register", (req, res) => {
    res.render("user/register");
});

// router.post('/register', (req, res) => {
//   res.json(req.body);
// });

//Register Handle
router.post("/register", (req, res) => {
    let {
        username,
        password,
        is_admin
    } = req.body;
    if(is_admin) is_admin = true;
    // let errors = [];

    // Check required fields
    // if (!name || !email || !password || !password2) {
    //     errors.push({
    //         msg: "Please fill in all fields"
    //     });
    // }

    // Check if Passwords match
    // if (password !== password2) {
    //     errors.push({
    //         msg: "Passwords do not match"
    //     });
    // }

    // Check pass length
    // if (password.length < 6) {
    //     errors.push({
    //         msg: "The Password should be atleast 6 characters"
    //     });
    // }

    // if (errors.length > 0) {
        // res.render("register", {
        //     errors,
        //     name,
        //     email,
        //     password,
        //     password2
        // });
    // } else {
        //  Validation Passed
        User.findOne({
            username
        }).then(user => {
            if (user) {
                // User Exists
                // errors.push({
                //     msg: "Email is already registered"
                // });
                // res.render("register", {
                //     errors,
                //     name,
                //     email,
                //     password,
                //     password2
                // });
                res.send("User Allready Exists");
            } else {
                const newUser = new User({
                    username,
                    password,
                    is_admin
                });

                // Hash Password
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        // Set Password to hashed
                        newUser.password = hash;
                        // Save User
                        newUser.save()
                            .then(user => {
                                // req.flash('success_msg', "You are now registered and can login");
                                res.redirect('/users/login');
                                // res.json(user);
                            })
                            .catch(err => console.log(err));
                    });
                });
            }
        });
    // }
});

// Login Handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login'
        // failureFlash: true
    })(req, res, next);
});


// Logout Handle

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "You have succesfully logged out");
    res.redirect('login');
});



module.exports = router;