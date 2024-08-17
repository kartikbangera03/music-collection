const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");



exports.artistCreateGet = asyncHandler (async(req,res)=>{
    res.render("artistCreateForm");
});

exports.artistCreatePost = asyncHandler (async(req,res)=>{
    const {firstName , lastName ,  birthDate , deathDate, country , imageUrl} = req.body;
    await db.insertArtist(firstName , lastName ,  birthDate , deathDate===""? null : deathDate, country , imageUrl);
    res.redirect("/");
});

exports.displayArtists = asyncHandler(async(req,res)=>{
    const artists = await db.getAllArtists();
    res.render("displayAllArtists",{
        allArtists : artists
    })
})

exports.getArtistById = asyncHandler(async(req,res)=>{
    const artist = await db.getArtistById(req.params.id);
    const albums  = await db.getAlbumsByArtistId(req.params.id);
    const releases  = await db.getAllAlbumsAndReleasesByArtistId(req.params.id);
    console.log("ARTIST DETAILS")
    console.log(artist)
    console.log("ALBUMS")
    console.log(albums)
    console.log("RELEASES")
    console.log(releases);
    
    res.render("artistDetails",{
            artist : artist,
            allAlbums : albums,
            allReleases : releases
    });
});

exports.updateArtistById = asyncHandler(async(req,res)=>{
    const artist = await db.getArtistById(req.params.id);
    console.log(artist);
    const birthDate = new Date(artist[0].birthdate).toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")[0].split('/').reverse().join('-')
    const deathDate = artist[0].deathdate 
                    ? new Date(artist[0].deathdate).toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")[0].split('/').reverse().join('-') 
                    : artist[0].deathdate ;
        res.render("artistUpdateForm",{
        artist : artist,
        artistBirthDate : birthDate ,
        artistDeathDate : deathDate
    })
});


exports.updateArtistByIdPost = asyncHandler(async(req,res)=>{
    const {firstName , lastName ,  birthDate , deathDate, country , imageUrl} = req.body;
    await db.updateArtist(req.params.id , firstName , lastName ,  birthDate , deathDate===""? null : deathDate, country , imageUrl);
    res.redirect("/")
});


exports.deleteArtistById = asyncHandler(async(req,res)=>{
    res.send("DELETE ARTIST ")
});