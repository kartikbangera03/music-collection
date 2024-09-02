const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getDashBoard = asyncHandler(async(req,res)=>{

    const albumCount = await db.getAlbumCount();
    const releaseCount = await db.getReleasesCount();
    const lowStockReleaseCount = await db.getReleasesCountByLowStock();
    const latestReleases = await db.getLatestReleases();
    // console.log(albumCount)
    // console.log(releaseCount)
    // console.log(lowStockReleaseCount)
    // console.log(latestReleases)
    res.render("dashBoard" , {
        allReleases : latestReleases , 
        albumCount , 
        releaseCount , 
        lowStockReleaseCount,
        title:"Music Inventory"
    })
});

exports.displayLowStockReleases = asyncHandler(async(req,res)=>{
    const lowStockReleases = await db.getLowStockReleases();
    res.render("lowStockReleases" , {
        title:"Low Stock Releaases",
        allReleases : lowStockReleases
    })
});