const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Load User Model
const user = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({
            usernameField: 'username'
        }, (username, password, done) => {
            // Match User
            user.findOne({
                    username
                })
                .then(user => {
                    if (!user) {
                        return done(null, false, {
                            message: 'The username does not exist'
                        });
                    }

                    // Match Password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, {
                                message: 'Password Incorrect'
                            });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        user.findById(id, function (err, user) {
            done(err, user);
        });
    });
}