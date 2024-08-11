const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.albumCreateGet = asyncHandler (async(req,res)=>{
    const artists = await db.getAllArtists();
    const labels = await db.getAllLabels();
    const genres = await db.getAllGenres();
    console.log(labels)
    res.render("albumCreateForm", {
        allArtists : artists,
        allLabels : labels ,
        allGenres : genres
    });
});

exports.albumCreatePost = asyncHandler (async(req,res)=>{
    const {albumName , artist , label , genre , releaseDate , imageUrl } = req.body;
    await db.insertAlbum(albumName , artist , label , genre , releaseDate , imageUrl);
    res.redirect("/");
});
