const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const ServiceAvailability = require("../models/serviceAvailability");

const DoctorService = require("../models/docterServiceModel");
const APIFeatures = require("../utils/apiFeatures");

//add availability
exports.addServiceAvailability = catchAsyncErrors( async(req,res) =>{
     
        let service = await DoctorService.findById(req.Doctor._id);
        if(!service){
            return res.status(404).json({
                status:false,
                msg:"No service found."
            })
        }

        // if(JSON.stringify(service.Doctor) !== JSON.stringify(req.Doctor._id)){
        //     return res.status(400).json({
        //         status:false,
        //         msg:"Only Service Owner can add availability"
        //     })
        // }

        if(service){
            if(!req.body.Availability){
                return res.status(400).json({
                    status:false,
                    msg:"Please pass Availability in req body."
                })
            }
            let checkServiceAvailability = await ServiceAvailability.findOne({serviceDate:req.body.serviceDate});
            if(checkServiceAvailability){
                let deleteServiceAvailability = await ServiceAvailability.findOneAndDelete({serviceDate:req.body.serviceDate});
            }
            let availability = await ServiceAvailability.create({
                service:service._Id,
                docter:req.Doctor._Id,
                serviceDate:req.body.serviceDate,
                openingTime:req.body.openingTime,
                closingTime:req.body.closingTime,
                isDayOf:req.body.isDayOf,
                bufferTime:req.body.bufferTime,
                Availability:req.body.Availability
            })

            return res.status(201).json({
                status:true,
                availability
            })
        }

        return res.status(500).json({
            status:false,
            msg:err.message
        })
});

//get all availability of a single service
exports.getAllAvailability = catchAsyncErrors( async(req,res) =>{
        let doctorId = req.Doctor._id
        console.log(req.query)
        let availability = new APIFeatures(ServiceAvailability.find({docter:doctorId}),req.query).advanceFilter();
        let doc = await availability.query;

        res.status(200).json({
            status:true,
            results:doc.length,
            availability:doc
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
  
});


//update availability
exports.updateAvailabilityStatus = catchAsyncErrors( async(req,res) =>{

        let availabilityId = req.params.availabilityId;

        // let serviceId = req.params.serviceId;
        let service = await DoctorService.findById(req.Doctor._Id);
        if(!service){
            return res.status(404).json({
                status:false,
                msg:"No service found."
            })
        }

        let availabilityUpdate = await ServiceAvailability.findByIdAndUpdate(availabilityId,req.body,{new:true});

        res.status(200).json({
            status:true,
            availability:availabilityUpdate
        })
        
        return res.status(500).json({
            status:false,
            msg:err.message
        })
    
});


// add extra or remove availability
exports.udpateAvailability = catchAsyncErrors( async(req,res) =>{

        const {type} = req.body;
        let availabilityId = req.params.availabilityId;
        // let serviceId = req.params.serviceId;
        let service = await DoctorService.findById(req.Doctor._id);
        if(!service){
            return res.status(404).json({
                status:false,
                msg:"No service found."
            })
        }

        let serviceAvailability = await ServiceAvailability.findById(availabilityId);

        //for add availability
        if(service && type==='add' && req.body.availability){
            for(let i=0;i<req.body.availability.length;i++){
                serviceAvailability.availability.push(req.body.availability[i])
            }
            await serviceAvailability.save()
        }

        //for remove availability
        if(service && type==='remove' && req.body.availabilityRemoveList){
            for(let i=0;i<req.body.availabilityRemoveList.length;i++){
                serviceAvailability.availability.pull({_id:req.body.availabilityRemoveList[i]})
            }
            await serviceAvailability.save()
        }

        if(service && type==='changeAvailability' && req.body.changeAvailability){
            for(let i=0;i<req.body.changeAvailability.length;i++){
                let update = await ServiceAvailability.findOneAndUpdate(
                    {"availability._id":req.body.changeAvailability[i]._id},
                    {$set:{"availability.$.isAvailable":req.body.changeAvailability[i].isAvailable}},
                    {new:true}
                )                

            }
            let updatedAvailability = await ServiceAvailability.findById(availabilityId)
            return res.status(200).json({
                status:true,
                availability:updatedAvailability
            })
            // await availability.save()
        }

        res.status(200).json({
            status:true,
            availability
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
    
});