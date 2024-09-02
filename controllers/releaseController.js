const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.releaseCreateGet = asyncHandler (async(req,res)=>{
    const albums = await db.getAllAlbums()

    res.render("releaseForm",{
        allAlbums : albums,
        title:"Create New Release"
    });
});

exports.releaseCreatePost = asyncHandler (async(req,res)=>{
    const releaseImageLink = "https://static.vecteezy.com/system/resources/thumbnails/034/737/636/small_2x/vinyl-record-in-pack-vector.jpg";
    const {album , format , price , stock ,barcode , imageUrl} = req.body;
    await db.insertRelease(album , format , price , stock ,barcode , imageUrl==""?releaseImageLink:imageUrl);
    res.redirect("/category/releases");
    // res.send(req.body)
});

exports.displayReleases = asyncHandler(async(req,res)=>{
    const releases = await db.getAllReleases();
    // console.log("ALL RELEASES");
    // console.log(releases);
    res.render("displayReleases" , {
        allReleases : releases,
        title: "Releases"
    })
})

exports.getReleaseById = asyncHandler(async (req,res)=>{
    const release  = await db.getReleaseById(req.params.id);
    // console.log("RELEASE BY ID : "+req.params.id);
    // console.log(release);
    res.render("releaseDetails",{
        release : release,
        title:release[0].albumname +"-Release"
    })
})


exports.updateReleaseById =  asyncHandler(async(req,res)=>{
    const release = await db.getReleaseById(req.params.id);
    const albums = await db.getAllAlbums()
    // console.log("UPDATE RELEASE FOR ID : "+req.params.id);
    // console.log(release);

    res.render("releaseForm", {
        release : release,
        allAlbums : albums,
        title:"Update Release"
    });
});


exports.updateReleaseByIdPost =  asyncHandler(async(req,res)=>{
    const {album , format , price , stock ,barcode , imageUrl} = req.body;
    await db.updateRelease(req.params.id , album , format , price , stock ,barcode , imageUrl);
    res.redirect("/category/releases");
})

exports.deleteReleaseById = asyncHandler(async(req,res)=>{
    await db.deleteReleaseById(req.params.id);
    res.redirect("/category/releases");
})