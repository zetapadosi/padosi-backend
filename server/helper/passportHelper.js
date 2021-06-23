import config from '../../config/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const { googleClientID, googleClientSecret, googleCallBackUrl } = config;

passport.serializeUser((user, done) => {
 done(null, user);
});

passport.deserializeUser((user, done) => {
 console.log('passportDe -> 12', user);
 done(null, user);
});

passport.use(
 new GoogleStrategy(
  {
   clientID: googleClientID,
   clientSecret: googleClientSecret,
   callbackURL: googleCallBackUrl,
   passReqToCallback: true,
  },
  (request, accessToken, refreshToken, profile, done) => {
   console.log('passportHelper->18', profile._json);

   return done(null, profile);
  }
 )
);
