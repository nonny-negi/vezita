const User = require("../models/user");
const Doctor = require("../models/docterModel");
const DocterQualification = require("../models/docterQualificationModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");

const APIFeatures = require("../utils/apiFeatures");

// Get all users
exports.getAllUser = async(req,res) =>{

        // let users = await User.find({});
        let users;
        let search = req.query.search;
        if(search){
            let regex = new RegExp([search].join(""), "i");
            users = await User.aggregate([
                {
                    "$match": {
                        "$or":[
                            {"name":{"$regex":regex}}
                        ]
                    }
                }
            ]);

            return res.status(200).json({
                status:true,
                results:users.length,
                users
            })
        }
    
        // users = await User.find({});
        users = new APIFeatures(User.find(),req.query).filter();
        const doc = await users.query;

        res.status(200).json({
            status:true,
            results:doc.length,
            users:doc
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
  
}

//get all detail for user
exports.getUser = async(req,res) =>{

        let user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                status:false,
                msg:"User not found."
            })
        }
        res.status(200).json({
            status:true,
            user
        })

        return req.status(500).json({
            status:false,
            msg:err.message
        })

}

//block user
exports.blockUser = async(req,res) =>{

        let user = await User.findById(req.params.userId);
        if(!user){
            return res.status(404).json({
                status:false,
                msg:"User not found."
            })
        }
        let updateUser =  await User.findByIdAndUpdate(req.params.userId,req.body,{new:true});
        res.status(200).json({
            status:true,
            msg:"You blocked user",
            user:updateUser
        })

        return req.status(500).json({
            status:false,
            msg:err.message
        })

}


// Get all doctors
exports.getAlldoctor = async(req,res) =>{
        // let doctors = await doctor.find({});

        let doctors;
        let search = req.query.search;
        if(search){
            let regex = new RegExp([search].join(""), "i");
            doctors = await Doctor.aggregate([
                {
                    "$match": {
                        "$or":[
                            {"fullName":{"$regex":regex}}
                        ]
                    }
                }
            ]);

            return res.status(200).json({
                status:true,
                results:doctors.length,
                doctors
            })
        }

        doctors = new APIFeatures(Doctor.find(),req.query).filter();
        const doc = await doctors.query;

        res.status(200).json({
            status:true,
            results:doc.length,
            doctors:doc
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
}


//get all detail for user
exports.getdoctor = async(req,res) =>{

        let doctor = await Doctor.findById(req.params.doctorId)
            .populate("DocterQualification")
            .populate("DocterMedicalRegistration");
        if(!doctor){
            return res.status(404).json({
                status:false,
                msg:"doctor not found."
            })
        }
        res.status(200).json({
            status:true,
            doctor
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })

}


//block user
exports.blockdoctor = async(req,res) =>{

        let doctor = await Doctor.findById(req.params.doctorId);
        if(!doctor){
            return res.status(404).json({
                status:false,
                msg:"User not found."
            })
        }
        let updateUser =  await Doctor.findByIdAndUpdate(req.params.doctorId,req.body,{new:true});
        res.status(200).json({
            status:true,
            msg:"You blocked doctor",
            doctor:updateUser
        })

        return req.status(500).json({
            status:false,
            msg:err.message
        })

}

//verify qualification certificate
exports.verifyQualiCertificate = async(req,res) =>{

        let verifyQualiCertificate = await DocterQualification.findByIdAndUpdate(req.params.qualificationId,{status:true},{new:true});
        res.status(200).json({
            status:false,
            DocterQualification:verifyQualiCertificate
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })

}

//verify medicalRegistration certificate
exports.verifyQualiCertificate = async(req,res) =>{

    let verifyMedicalRegCertificate = await DocterMedicalRegistration.findByIdAndUpdate(req.params.medicalRegistrationId,{new:true});
    res.status(200).json({
        status:false,
        DocterMedicalRegistration:verifyMedicalRegCertificate
    })

    return res.status(500).json({
        status:false,
        msg:err.message
    })

}