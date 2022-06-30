const User = require("../models/user");
const doctor = require("../models/doctorUser");
const {AddressProof,PoliceCertificate,QualificationCertificate} = require("../models/doctorDocument");

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
            doctors = await doctor.aggregate([
                {
                    "$match": {
                        "$or":[
                            {"firstName":{"$regex":regex}},
                            {"lastName":{"$regex":regex}}
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

        doctors = new APIFeatures(doctor.find(),req.query).filter();
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

        let doctor = await doctor.findById(req.params.doctorId).populate("addressProof")
            .populate("policeCertificate")
            .populate("qualificationCertificate");
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

        let doctor = await doctor.findById(req.params.doctorId);
        if(!doctor){
            return res.status(404).json({
                status:false,
                msg:"User not found."
            })
        }
        let updateUser =  await doctor.findByIdAndUpdate(req.params.doctorId,req.body,{new:true});
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

//verify address certificate
exports.verifyAddress = async(req,res) =>{
        let verifyAddress = await AddressProof.findByIdAndUpdate(req.params.addressProofId,{isVerified:true},{new:true});
        res.status(200).json({
            status:false,
            addressProof:verifyAddress
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
}


//verify address certificate
exports.verifyPoliceCertificate = async(req,res) =>{
        let verifyPoliceCertificate = await PoliceCertificate.findByIdAndUpdate(req.params.policeCertificateId,{isVerified:true},{new:true});
        res.status(200).json({
            status:false,
            policeCertificate:verifyPoliceCertificate
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })

}


//verify address certificate
exports.verifyQualiCertificate = async(req,res) =>{

        let verifyQualiCertificate = await QualificationCertificate.findByIdAndUpdate(req.params.qualificationId,{isVerified:true},{new:true});
        res.status(200).json({
            status:false,
            qualificationCertificate:verifyQualiCertificate
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })

}