const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const analytics = require("../models/analyticsModel");
const orderModel = require("../models/orderModel");

//get a no. of accepted
exports.getTotalaccepted = catchAsyncErrors(async(req,res) =>{
    const doctorId = req.params.doctorId
    let analytic = await analytics.find({doctor:doctorId,accepted:{isAccepted:true}});
    let totalAccepted = analytic.length

    res.status(200).json({
        status:true,
        results:totalAccepted,
        analytic
    })

    return res.status(500).json({
        status:false,
        msg:err.message
    })
});

//get a no. of declined
exports.getTotaldeclined = catchAsyncErrors(async(req,res) =>{
    const doctorId = req.params.doctorId
    let analytic = await analytics.find({doctor:doctorId,declined:{isDeclined:true}});
    let totalDeclined = analytic.length

    res.status(200).json({
        status:true,
        results:totalDeclined,
        analytic
    })

    return res.status(500).json({
        status:false,
        msg:err.message
    })
});

//get no. appointments per day
exports.getTotalBookingPerDay = catchAsyncErrors(async(req,res) =>{
    const date=req.body
    const doctorId = req.params.doctorId
    let dated = date

    let analytic = await analytics.find({doctor:doctorId,accepted:{isAccepted:true,date:dated}});
    let totalBooking = analytic.length

    res.status(200).json({
        status:true,
        results:totalBooking,
        analytic
    })

    return res.status(500).json({
        status:false,
        msg:err.message
    })
});

//over all transaction
exports.getTotalTransaction = catchAsyncErrors(async(req,res) =>{
    const doctorId = req.params.doctorId
    let total = await orderModel.findById(doctorId);
    
    let totalamount
    for (const amount of total.amount) {  
      totalamount = totalamount+amount
      
    }

    res.status(200).json({
        status:true,
        result:totalamount
    })
    
    return res.status(500).json({
        status:false,
        msg:err.message
    })
  });
