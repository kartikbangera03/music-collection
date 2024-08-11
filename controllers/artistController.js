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
