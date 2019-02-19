module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        // req.flash('error_msg', "Please Log in to see this resource");
        res.redirect('/users/login');
    },

    isAdmin: function(req, res, next) {
        if (req.user.is_admin == true) {
            return next();
        } else {
            res.send("You are not an admin");
        }
    }
}