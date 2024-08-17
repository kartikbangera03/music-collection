const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genreCreateGet = asyncHandler (async(req,res)=>{
    res.render("genreCreateForm");
});

exports.genreCreatePost = asyncHandler (async(req,res)=>{
    const {genreName} = req.body;
    await db.insertGenre(genreName);
    res.redirect("/");
});


exports.displayGenres = asyncHandler(async(req,res)=>{
    const genres = await db.getAllGenres();
    res.render("displayGenres" , {
        allGenres : genres
    })
})

exports.getGenreById = asyncHandler(async(req,res)=>{
    const genre = await db.getGenreById(req.params.id);
    const albums  = await db.getAlbumsByGenreId(req.params.id);
    const releases  = await db.getAllAlbumsAndReleasesByGenreId(req.params.id);
    console.log("GENRE DETAILS..............")
    console.log(genre)
    console.log("ALBUMS")
    console.log(albums)
    console.log("RELEASES")
    console.log(releases);
    
    res.render("genreDetails",{
            genre : genre,
            allAlbums : albums,
            allReleases : releases
    });
});

exports.updateGenreById =  asyncHandler(async(req,res)=>{
    const genre = await db.getGenreById(req.params.id);
    console.log(genre);
    res.render("genreCreateForm", {genre});
});


exports.updateGenreByIdPost =  asyncHandler(async(req,res)=>{
    const {genreName} = req.body;
    await db.updateGenre(req.params.id , genreName);
    res.redirect("/");
})