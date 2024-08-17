const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.releaseCreateGet = asyncHandler (async(req,res)=>{
    const albums = await db.getAllAlbums()
    res.render("releaseCreateForm",{
        allAlbums : albums
    });
});

exports.releaseCreatePost = asyncHandler (async(req,res)=>{
    const {album , format , price , stock ,barcode , imageUrl} = req.body;
    await db.insertRelease(album , format , price , stock ,barcode , imageUrl);
    res.redirect("/");
    // res.send(req.body)
});

exports.displayReleases = asyncHandler(async(req,res)=>{
    const releases = await db.getAllReleases();
    console.log("ALL RELEASES");
    console.log(releases);
    res.render("displayReleases" , {
        allReleases : releases
    })
})

exports.getReleaseById = asyncHandler(async (req,res)=>{
    const release  = await db.getReleaseById(req.params.id);
    console.log("RELEASE BY ID : "+req.params.id);
    console.log(release);
    res.render("releaseDetails",{
        release : release
    })
})


exports.updateReleaseById =  asyncHandler(async(req,res)=>{
    const release = await db.getReleaseById(req.params.id);
    const albums = await db.getAllAlbums()
    console.log("UPDATE RELEASE FOR ID : "+req.params.id);
    console.log(release);
    res.render("releaseCreateForm", {
        release : release,
        allAlbums : albums
    });
});


exports.updateReleaseByIdPost =  asyncHandler(async(req,res)=>{
    const {album , format , price , stock ,barcode , imageUrl} = req.body;
    await db.updateRelease(req.params.id , album , format , price , stock ,barcode , imageUrl);
    res.redirect("/");
})