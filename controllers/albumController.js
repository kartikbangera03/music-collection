const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.albumCreateGet = asyncHandler (async(req,res)=>{
    const artists = await db.getAllArtists();
    const labels = await db.getAllLabels();
    const genres = await db.getAllGenres();
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


exports.displayAlbums = asyncHandler(async(req,res)=>{
    const albums = await db.getAllAlbums();
    res.render("displayAllAlbums",{
        allAlbums : albums
    })
});


exports.getAlbumById = asyncHandler(async(req,res)=>{
    const album = await db.getAlbumById(req.params.id);
    const releases = await db.getReleasesByAlbumId(req.params.id)
    res.render("albumDetails" , {
        album :album ,
        allReleases : releases
    })
});


exports.updateAlbumById = asyncHandler(async(req,res)=>{
    const album = await db.getAlbumById(req.params.id);
    const artists = await db.getAllArtists();
    const labels = await db.getAllLabels();
    const genres = await db.getAllGenres();
    const releaseDate = new Date(album[0].releasedate).toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")[0].split('/').reverse().join('-');
        res.render("albumUpdateForm",{
        album : album,
       releaseDate:releaseDate,
       allArtists : artists,
       allLabels : labels ,
       allGenres : genres
    })
});


// -------------------------------------
exports.updateAlbumByIdPost = asyncHandler(async(req,res)=>{
    const {albumName , artist , label , genre , releaseDate , imageUrl } = req.body;
    await db.updateAlbum(req.params.id , albumName , artist , label , genre , releaseDate , imageUrl);
    res.redirect("/");
});


exports.deleteArtistById = asyncHandler(async(req,res)=>{
    res.send("DELETE ALBUM")
}); 