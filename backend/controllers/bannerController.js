const Banner = require("../models/bannerModel");


//add banner by admin
exports.createBanner = async(req,res) =>{
   
      let banner = await Banner.create({
            title:req.body.title,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            image:req.body.image,
            bannerType:req.body.bannerType
        })

        res.status(200).json({
            status:true,
            banner
        })


        return res.status(500).json({
            status:false,
            msg:err.message
        })
    
}


//get a banner by id
exports.getOneBanner = async(req,res) =>{
  
        let bannerId = req.params.bannerId;

        let banner = await Banner.findById(bannerId);

        res.status(200).json({
            status:true,
            banner
        })

 
        return res.status(500).json({
            status:false,
            msg:err.message
        })

}


//get a banner by id
exports.updateOneBanner = async(req,res) =>{
   
        let bannerId = req.params.bannerId;

        let banner = await Banner.findByIdAndUpdate(bannerId,req.body,{new:true});

        res.status(200).json({
            status:true,
            banner
        })


        return res.status(500).json({
            status:false,
            msg:err.message
        })
  
}

//get all banner
exports.getAllBanner = async(req,res) =>{

        let banners = await Banner.find({});
        
        res.status(200).json({
            status:true,
            results:banners.length,
            banners
        })

        return res.status(500).json({
            status:false,
            msg:err.message
        })
    
}
