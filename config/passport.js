const GoogleStrategy = require("passport-google-oauth20").Strategy;

const mongoose = require("mongoose");

const keys = require("./keys");

const Users = mongoose.model("users");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback", // Corrected
        proxy: true,
      },
      (accessToken, refreshToken, profile, done) => {
        // Your verify callback implementation here
        console.log(accessToken, profile);

        const image = profile.photos[0].value.substring(
          0,
          profile.photos[0].value.indexOf("=")
        );
        const newUser = {
          googleID: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName ?? "",
          lastName: profile.name.familyName ?? "",
          img: image,
        };

        Users.findOne({ googleID: profile.id }).then((user) => {
          if (user) {
            done(null, user);
          } else {
            new Users(newUser).save().then((user) => done(null, user));
          }
        });
      }
    )
  );
};
