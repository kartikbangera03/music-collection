const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.labelCreateGet = asyncHandler (async(req,res)=>{
    res.render("labelCreateForm");
});

exports.labelCreatePost = asyncHandler (async(req,res)=>{
    const {labelName , yearFounded} = req.body;
    await db.insertLabel(labelName , yearFounded);
    res.redirect("/");
});

exports.displayLabels = asyncHandler(async(req,res)=>{
    const labels = await db.getAllLabels();
    res.render("displayLabels" , {
        allLabels : labels
    })
})

exports.getLabelById = asyncHandler(async(req,res)=>{
    const label = await db.getLabelById(req.params.id);
    const albums  = await db.getAlbumsByLabelId(req.params.id);
    const releases  = await db.getAllAlbumsAndReleasesByLabelId(req.params.id);
    console.log("LAbel DETAILS")
    console.log(label)
    console.log("ALBUMS")
    console.log(albums)
    console.log("RELEASES")
    console.log(releases);
    
    res.render("labelDetails",{
            label : label,
            allAlbums : albums,
            allReleases : releases
    });
})

exports.updateLabelById =  asyncHandler(async(req,res)=>{
    const label = await db.getLabelById(req.params.id);
    console.log(label);
    res.render("labelCreateForm", {label})
});


exports.updateLabelByIdPost =  asyncHandler(async(req,res)=>{
    const {labelName , yearFounded} = req.body;
    await db.updateLabel(req.params.id,labelName , yearFounded);
    res.redirect("/");
})