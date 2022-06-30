const admin = require("firebase-admin");
const serviceAccount = require("../vezita.json");
const AppError = require('../utils/appError');
const User = require("../models/userModel");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const requiresAuth = async (req,res,next) =>{
    const idToken = req.header('FIREBASE_AUTH_TOKEN');
    if(!idToken){
        return next(new AppError('Please pass firebase auth token',400));
    }
    let decodedIdToken;
    try{
        decodedIdToken = await admin.auth().verifyIdToken(idToken,true)
    }catch(error){
        next(error);
        return
    }
    let user = await User.findOne({firebaseUid:decodedIdToken.uid});
    if(!user){
        if(req.baseUrl + req.path==="/api/user/onboarding"){
            if(decodedIdToken.firebase.sign_in_provider === "phone"){
                user = await User.create({
                    phone:decodedIdToken.phone_number,
                    firebaseUid:decodedIdToken.uid,
                    firebaseSignInProvider:decodedIdToken.firebase.sign_in_provider
                })
            }else{
                user = await User.create({
                    name:decodedIdToken.name,
                    email:decodedIdToken.email,
                    image:decodedIdToken.picture,
                    firebaseUid:decodedIdToken.uid,
                    firebaseSignInProvider:decodedIdToken.firebase.sign_in_provider
    
                })
            }
        }else{
            return next(new AppError("User not found",404));
        }
        
    }
    req.user = user;
    next();
}

const restrictTo = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.userType)){
            return next(new AppError('You do not have permission ot perform this action',403));
        }
        next();
    }
};

module.exports = {
    requiresAuth,
    restrictTo
}