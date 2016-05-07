var LocalStrategy = require("passport-local");
var FacebookStrategy = require("passport-facebook");
var TwitterStrategy = require("passport-twitter");
var InstagramStrategy = require("passport-instagram");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports = require("passport");


module.exports.use(new FacebookStrategy({
        clientID: "141304936259731",
        clientSecret: "322f66550b62b9492e7271615de6ae40",
        callbackURL: "/user/loginFacebook/",
        profileFields: ['id', 'displayName', 'photos', 'email'],
        enableProof: false
    },
    function(accessToken, refreshToken, profile, done) {
        if (!_.isEmpty(profile)) {
            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };
                    if (profile.photos && profile.photos.length > 0) {
                        usertemp.profilePic = profile.photos[0].value;
                    }
                    if (_.isEmpty(data)) {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    } else {
                        done(err, data);
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));


module.exports.use(new TwitterStrategy({
        consumerKey: "ScyOXj37xkvmkY9hi6edFsLaz",
        consumerSecret: "4J1vaHxX1rr84ygGHBrADkFQS32Nb9lNkHKwRuM4ykfwgVj9qh",
        callbackURL: "/user/loginTwitter/",
    },
    function(token, tokenSecret, profile, done) {
        if (!_.isEmpty(profile)) {
            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };
                    if (profile.photos && profile.photos.length > 0) {
                        usertemp.profilePic = profile.photos[0].value;
                    }
                    if (_.isEmpty(data)) {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    } else {
                        done(err, data);
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));


module.exports.use(new GoogleStrategy({
        clientID: "265970827010-j10v7hj6j1gs8pvsu9vcs421c0atd3ic.apps.googleusercontent.com",
        clientSecret: "HCcktl431UlXsdiOa78Cu5VK",
        callbackURL: "/user/loginGoogleCallback"
    },
    function(token, tokenSecret, profile, done) {
        if (!_.isEmpty(profile)) {
            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };
                    if (profile.photos && profile.photos.length > 0) {
                        usertemp.profilePic = profile.photos[0].value;
                    }
                    if (_.isEmpty(data)) {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    } else {
                        done(err, data);
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));

module.exports.use(new InstagramStrategy({
        clientID: "7473c37996d342f8b6544609559843ac",
        clientSecret: "81b2b694a7c1441886000ac94eb910a6",
        callbackURL: "/user/loginInsta/",
        profileFields: ['id', 'displayName', 'photos', 'email']
    },
    function(token, tokenSecret, profile, done) {
        if (!_.isEmpty(profile)) {
            User.findOne({
                "oauthLogin.socialId": profile.id + ""
            }).exec(function(err, data) {
                if (err) {
                    done(err, false);
                } else {
                    usertemp = {
                        "name": profile.displayName,
                        "oauthLogin": [{
                            "socialId": profile.id + "",
                            "socialProvider": profile.provider
                        }],
                        "status": 1
                    };
                    if (profile._json.data.profile_picture != "") {
                        usertemp.profilePic = profile._json.data.profile_picture;
                    }
                    if (_.isEmpty(data)) {
                        var user = User(usertemp);
                        user.save(function(err, data2) {
                            done(err, data2);
                        });
                    } else {
                        done(err, data);
                    }

                }
            });

        } else {
            done("There is an Error", false);
        }
    }
));
