const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.labelCreateGet = asyncHandler (async(req,res)=>{
    res.render("labelForm" , {title:"Create New Label"});
});

exports.labelCreatePost = asyncHandler (async(req,res)=>{
    const {labelName , yearFounded} = req.body;
    await db.insertLabel(labelName , yearFounded);
    res.redirect("/category/labels");
});

exports.displayLabels = asyncHandler(async(req,res)=>{
    const labels = await db.getAllLabels();
    res.render("displayLabels" , {
        allLabels : labels,
        title:"Labels"
    })
})

exports.getLabelById = asyncHandler(async(req,res)=>{
    const label = await db.getLabelById(req.params.id);
    const albums  = await db.getAlbumsByLabelId(req.params.id);
    const releases  = await db.getAllAlbumsAndReleasesByLabelId(req.params.id);
    // console.log("********LABEL DETAILS******")
    console.log(label)
    // console.log("ALBUMS")
    // console.log(albums)
    // console.log("RELEASES")
    // console.log(releases);
    
    res.render("labelDetails",{
            label : label,
            allAlbums : albums,
            allReleases : releases,
            title:label[0].labelname
    });
})

exports.updateLabelById =  asyncHandler(async(req,res)=>{
    const label = await db.getLabelById(req.params.id);
    title = "Update Label";
    console.log(label);
    res.render("labelForm", {label,title})
});


exports.updateLabelByIdPost =  asyncHandler(async(req,res)=>{
    const {labelName , yearFounded} = req.body;
    await db.updateLabel(req.params.id,labelName , yearFounded);
    res.redirect("/");
})



exports.deleteLabelById = asyncHandler(async(req,res)=>{
    const label = await db.getLabelById(req.params.id);
    const albums = await db.getAlbumsByLabelId(req.params.id);
    const releases = await db.getReleasesByLabelId(req.params.id);

    res.render("deleteLabel",{
        label : label,
        allAlbums : albums,
        allReleases : releases
    });
});

exports.deleteLabelByIdPost =  asyncHandler(async(req,res)=>{
    const albums = await db.getAlbumsByLabelId(req.params.id);
    let albums_id_array = [];
    albums.forEach((album)=>{
        albums_id_array.push(album.id);
    })

    let placeholder = albums_id_array.map((_,i)=>`$${i+1}`).join(", ");
    console.log("DELETE POST")
    console.log(albums)
    console.log(albums_id_array);
    console.log(placeholder);
    console.log(typeof placeholder);
    if(albums_id_array.length > 0){
        await db.deleteReleasesByAlbumIdList(placeholder, albums_id_array)
        await db.deleteAlbumsByAlbumIdList(placeholder, albums_id_array)
    }
    
    await db.deleteLabelById(req.params.id)
    res.redirect("/category/artists");
});