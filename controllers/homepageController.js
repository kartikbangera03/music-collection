
const asyncHandler = require("express-async-handler");

exports.homepageDashboard = asyncHandler (async(req,res)=>{
    res.render("homepage");
});