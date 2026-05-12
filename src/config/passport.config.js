import passport from "passport";
import GitHubStrategy from "passport-github2";
import User from "../dao/models/user.model.js";

const initializePassport = () => {

    passport.use("github", new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "http://localhost:8080/api/v1/auth/githubcallback"
    },

    async (accessToken, refreshToken, profile, done) => {

        try {

            let user = await User.findOne({
                email: profile._json.email
            });

            if (!user) {

                user = await User.create({
                    first_name: profile._json.name || profile.username,
                    last_name: "GitHub",
                    email: profile._json.email,
                    password: ""
                });

            }

            done(null, user);

        } catch (error) {

            done(error);

        }

    }));

};

export default initializePassport;