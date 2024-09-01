const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.getSearchResults = asyncHandler(async(req,res)=>{
    let {searchQuery} = req.body
    console.log("Search Query")
    searchQuery = searchQuery.toLowerCase()
    console.log(searchQuery)
    // res.send(searchQuery);

    const allArtists = await db.getAllArtistsBySearchQuery(searchQuery);
    console.log("ALL ARTISTS")
    console.log(allArtists)
    const allAlbums = await db.getAllAlbumsBySearchQuery(searchQuery);
    console.log("ALL ALBUMS")
    console.log(allAlbums)
    const allReleases = await db.getAllReleasesBySearchQuery(searchQuery)
    console.log("ALL RELEASES")
    console.log(allReleases)
    res.render("searchResults", {
        allArtists : allArtists,
        allAlbums  : allAlbums,
        allReleases :allReleases
    })
});