const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");


exports.artistCreateGet = asyncHandler (async(req,res)=>{
    res.render("artistForm" , {title:"Create New Artist"});
});

exports.artistCreatePost = asyncHandler (async(req,res)=>{
    const artistImageLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRULocmP6cP6JYFZmzMlbVHbWwu-oAdX5NaQ&s";
    const {firstName , lastName ,  birthDate , deathDate, country , imageUrl} = req.body;
    await db.insertArtist(firstName , lastName ,  birthDate , deathDate===""? null : deathDate, country , imageUrl==""?artistImageLink:imageUrl);
    res.redirect("/category/artists");
});

exports.displayArtists = asyncHandler(async(req,res)=>{
    const artists = await db.getAllArtists();
    res.render("displayAllArtists",{
        allArtists : artists,
        title:"Artists"
    })
})

exports.getArtistById = asyncHandler(async(req,res)=>{
    const artist = await db.getArtistById(req.params.id);
    const albums  = await db.getAlbumsByArtistId(req.params.id);
    const releases  = await db.getAllAlbumsAndReleasesByArtistId(req.params.id);
    // console.log("ARTIST DETAILS")
    // console.log(artist)
    // console.log("ALBUMS")
    // console.log(albums)
    // console.log("RELEASES")
    // console.log(releases);
    
    res.render("artistDetails",{
            artist : artist,
            allAlbums : albums,
            allReleases : releases,
            title: artist[0].firstname+" "+artist[0].lastname
    });
    
});

exports.updateArtistById = asyncHandler(async(req,res)=>{
    const artist = await db.getArtistById(req.params.id);
    // console.log(artist);
    const birthDate = new Date(artist[0].birthdate).toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")[0].split('/').reverse().join('-')
    const deathDate = artist[0].deathdate 
                    ? new Date(artist[0].deathdate).toLocaleString('en-GB', { timeZone: 'UTC' }).split(",")[0].split('/').reverse().join('-') 
                    : artist[0].deathdate ;

    res.render("artistForm",{
        title:"Update Artist - "+artist[0].firstname+" "+artist[0].lastname,
        artist : artist,
        artistBirthDate : birthDate ,
        artistDeathDate : deathDate
    })
});


exports.updateArtistByIdPost = asyncHandler(async(req,res)=>{
    const artistImageLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRULocmP6cP6JYFZmzMlbVHbWwu-oAdX5NaQ&s";
    const {firstName , lastName ,  birthDate , deathDate, country , imageUrl} = req.body;
    await db.updateArtist(req.params.id , firstName , lastName ,  birthDate , deathDate===""? null : deathDate, country , imageUrl==""?artistImageLink:imageUrl);
    res.redirect("/artist/" +req.params.id )
});

exports.deleteArtistByIdPost =  asyncHandler(async(req,res)=>{
    const albums = await db.getAlbumsByArtistId(req.params.id);
    let albums_id_array = [];
    albums.forEach((album)=>{
        albums_id_array.push(album.id);
    })

    let placeholder = albums_id_array.map((_,i)=>`$${i+1}`).join(", ");
    // console.log("DELETE POST")
    // console.log(albums)
    // console.log(albums_id_array);
    // console.log(placeholder);
    // console.log(typeof placeholder);
    if(albums_id_array.length > 0){
        await db.deleteReleasesByAlbumIdList(placeholder, albums_id_array)
        await db.deleteAlbumsByAlbumIdList(placeholder, albums_id_array)
    }
    
    await db.deleteArtistById(req.params.id)
    res.redirect("/category/artists");
});