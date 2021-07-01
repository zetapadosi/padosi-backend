import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

import User from "../model/userModel";
import config from '../../config/config';
const {jwtSecret} = config

export const testAuth = async (req, res, next) => {
 try {
  const testData = {
   testDetails: 'The test is working fine ',
  };
  return res.ok({message:'SUCCESS',value:testData})
 } catch (e) {
  console.error(e.message);
  next(e);
 }
};

export const registerUser = async (req,res,next) => {
 try {
  const {userName,email,picture,location,userFrom} = req.body
  let newUser = await User.findOne({email:`${email}`,userFrom:`${userFrom}`})
  if(newUser){
   return res.error('USER_ALREADY_REGISTERED')
  }
 const user= await User.create({userName,email,picture,location,userFrom})
  const token =jwt.sign({
   _id: user._id
  },jwtSecret)
  const userWithToken={user:user,token:token}
  res.cookie('t', token,{expire: new Date() + 9999})
  return res.ok({message:'REGISTRATION_SUCCESS', value:userWithToken})
  // return res.ok({message:'SUCCESS', value: req.body})
 } catch (e) {
  console.error(e.message);
  next(e)
 }
}

export const sigin = async (req,res,next) => {
 try {
  const {email,userFrom} = req.body
  const user = await User.findOne({email:`${email}`,userFrom:`${userFrom}`})
  if(!user){
   return res.error('USER_NOT_FOUND')
  }
  const token =jwt.sign({
   _id: user._id
  },jwtSecret)
  const userWithToken={user:user,token:token}
  res.cookie('t', token,{expire: new Date() + 9999})
  return res.ok({message:'SIGNED_SUCCESS', value:userWithToken})
 } catch (e) {
  console.error(e.message);
  next(e)
 }
}

export const signout = async (req,res,next) => {
 try {
  res.clearCookie('t')
  return res.ok('SIGNED_OUT_SUCCESS')
 } catch (e) {
  console.error(e.message);
  next(e)
 }
}

export const requireSignin =  expressJwt({
 secret: jwtSecret,
 userProperty: 'auth',
 algorithms: ['RS256']
})

export const hasAuthorization = (req,res,next) => {
 const authorized = req.profile && req.auth && req.profile._id == req.auth._id
 if (!authorized) {
  return res.status(403).error('USER_IS_NOT_AUTHORIZED')
 }
}
