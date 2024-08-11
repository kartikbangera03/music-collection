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
