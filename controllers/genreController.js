const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.genreCreateGet = asyncHandler (async(req,res)=>{
    res.render("genreForm",{title:"Create New Genre"});
});

exports.genreCreatePost = asyncHandler (async(req,res)=>{
    const {genreName} = req.body;
    await db.insertGenre(genreName);
    res.redirect("/category/genres");
});


exports.displayGenres = asyncHandler(async(req,res)=>{
    const genres = await db.getAllGenres();
    res.render("displayGenres" , {
        allGenres : genres,
        title:"Genres"
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
            allReleases : releases,
            title:genre[0].genrename
    });
});

exports.updateGenreById =  asyncHandler(async(req,res)=>{
    const genre = await db.getGenreById(req.params.id);
    console.log(genre);
    res.render("genreForm", {genre , title:"Update Genre"});
});


exports.updateGenreByIdPost =  asyncHandler(async(req,res)=>{
    const {genreName} = req.body;
    await db.updateGenre(req.params.id , genreName);
    res.redirect("/");
})

exports.deleteGenreById = asyncHandler(async(req,res)=>{
    const genre = await db.getGenreById(req.params.id);
    const albums = await db.getAlbumsByGenreId(req.params.id);
    const releases  = await db.getReleasesByGenreId(req.params.id);

    res.render("deleteGenre",{
        genre : genre,
        allAlbums : albums,
        allReleases : releases
    });
});


exports.deleteGenreByIdPost =  asyncHandler(async(req,res)=>{
    const albums = await db.getAlbumsByGenreId(req.params.id);
    let albums_id_array = [];
    albums.forEach((album)=>{
        albums_id_array.push(album.id);
    })

    let placeholder = albums_id_array.map((_,i)=>`$${i+1}`).join(", ");
    if(albums_id_array.length > 0){
        await db.deleteReleasesByAlbumIdList(placeholder, albums_id_array)
        await db.deleteAlbumsByAlbumIdList(placeholder, albums_id_array)
    }
    
    await db.deleteGenreById(req.params.id)
    res.redirect("/")
});