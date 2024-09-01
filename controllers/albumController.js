const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.albumCreateGet = asyncHandler (async(req,res)=>{
    const artists = await db.getAllArtists();
    const labels = await db.getAllLabels();
    const genres = await db.getAllGenres();

    res.render("albumForm", {
        allArtists : artists,
        allLabels : labels ,
        allGenres : genres,
        title:"Create New Album"
    });
});

exports.albumCreatePost = asyncHandler (async(req,res)=>{
    const albumImageLink = "https://iili.io/HlHy9Yx.png";
    const {albumName , artist , label , genre , releaseDate , imageUrl } = req.body;
    await db.insertAlbum(albumName , artist , label , genre , releaseDate , imageUrl==""?albumImageLink:imageUrl);
    res.redirect("/category/albums");
});


exports.displayAlbums = asyncHandler(async(req,res)=>{
    const albums = await db.getAllAlbums();
    console.log(albums);
    res.render("displayAllAlbums",{
        allAlbums : albums,
        title:"Music Inventory-Albums"
    })
});


exports.getAlbumById = asyncHandler(async(req,res)=>{
    const album = await db.getAlbumById(req.params.id);
    const releases = await db.getReleasesByAlbumId(req.params.id)
    res.render("albumDetails" , {
        album :album ,
        allReleases : releases,
        title:album[0].albumname +"-"+album[0].firstname+" "+album[0].lastname
    })
});


exports.updateAlbumById = asyncHandler(async(req,res)=>{
    const album = await db.getAlbumById(req.params.id);
    const artists = await db.getAllArtists();
    const labels = await db.getAllLabels();
    const genres = await db.getAllGenres();
    const releaseDate = new Date(album[0].releasedate).toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")[0].split('/').reverse().join('-');

    res.render("albumForm", {
        album : album,
        releaseDate:releaseDate,
        allArtists : artists,
        allLabels : labels ,
        allGenres : genres,
        title:"Update Album"
    })
});


// -------------------------------------
exports.updateAlbumByIdPost = asyncHandler(async(req,res)=>{
    const {albumName , artist , label , genre , releaseDate , imageUrl } = req.body;
    await db.updateAlbum(req.params.id , albumName , artist , label , genre , releaseDate , imageUrl);
    res.redirect("/category/albums");
});


exports.deleteAlbumById = asyncHandler(async(req,res)=>{
    const album = await db.getAlbumById(req.params.id);
    const releases = await db.getReleasesByAlbumId(req.params.id);
    console.log(typeof releases);
    console.log(releases)
    res.render("deleteAlbums",{
        allReleases : releases,
        album : album
    })
}); 

exports.deleteAlbumByIdPost = asyncHandler(async(req,res)=>{
    

    await db.deleteReleasesByAlbumId(req.params.id);
    await db.deleteAlbumById(req.params.id);
    res.redirect("/category/albums")
})