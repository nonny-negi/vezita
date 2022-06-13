const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

const DocterQualification = require("../models/docterQualificationModel");
const Establishment = require("../models/establishmentModel");
const DocterMedicalRegistration = require("../models/docterMedicalRegistrationModel");
const Docter = require("../models/docterModel");
const Specialization = require("../models/specializationModel");

exports.addSpecialization = catchAsyncErrors(async (req,res,next)=>{
    const {specialization} = req.body;
    specialization.forEach((item)=>{
        await Specialization.create({...item})
    }) 
    res.status(201).json({msg:"success"})
})

exports.updateSpecialization =catchAsyncErrors(async (req,res,next)=>{
    const {id} = req.params

    const specialization = await Specialization.findById(id)

    if(!specialization) return next(new ErrorHander("Not Found",404))

    specialization.name = req.body.name

    specialization.save()

    res.status(200).json({msg: 'success'})

})

exports.deleteSpecialization = catchAsyncErrors(async (req, res,next) => {
    
})