const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const prescription = require("../models/prescriptionModel");
const Patient = require("../models/patientModel");
const {sendPrescriptionEmail} = require("../utils/sendEmail");

       
exports.addPrescription = catchAsyncErrors(async (req, res) => {
    const {docter,user,patient} = req.body
    let  doctorPrescription = await prescription.create({
        docter:docter,
        user:user,
        patient:patient,
        drug:req.body.drug,
        instructions:req.body.instructions,
        instruction:req.body.instruction,
        timeAndDosage:[{
            time:req.body.time,
            dosage:req.body.time,
        }],
        duration:{
            time:req.body.time,
            dosage:req.body.dosage,
        },
    });

    let patientObj = await Patient.findById(doctorPrescription.patient)
    
    //for customer app
    await sendNotification(
        this.addPrescription.user.toString(),
        this.addPrescription.user,
        `${patientObj.name}, New Prescription added.`,
        `${patientObj.name}, New Prescription added.`,
        "prescription",
        prescription._id
    )
    let prescriptionUrl = `https://api.vezita.com/api/v1/prescription/user/${user._id}/get/${patient._id}/${prescription._id}`;
    // send email for patient on prescription
    await sendPrescriptionEmail(
        "prescription",
        user.email,
        patientObj.name,
        patientObj.image,
        Doctor.fullName,
        prescriptionUrl,
        "New Prescription Added",
    )

      
    res.status(200).json({
        status: true,
        doctorPrescription,
    });

    return res.status(500).json({
        status:false,
        msg:err.message
    })
});


//get all Prescription for doctor
exports.getAllPrescription = catchAsyncErrors(async(req,res) =>{

        const docterId = req.params.docterId
        const patientId = req.params.patientId
        let Allprescription = await prescription.find({docter:docterId,patient:patientId});

        res.status(200).json({
            status:true,
            Allprescription
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
});

//get all Prescription for user
exports.getAllPrescriptions = catchAsyncErrors(async(req,res) =>{

    const userId = req.params.userId
    let Allprescription = await prescription.find({user:userId});

    res.status(200).json({
        status:true,
        Allprescription
    })

    return res.status(500).json({
        status:false,
        msg:err.message
    })
});

//get a single prescription
exports.getOnePrescription = catchAsyncErrors(async(req,res) =>{
    
        const prescriptionId = req.params.prescriptionId
        let getPrescription = await prescription.findById({prescriptionId});

        if(!getPrescription){
            return res.status(404).json({
                status:false,
                msg:"No prescription exits with this Id"
            })
        }

        res.status(200).json({
            status:true,
            getPrescription
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
});




