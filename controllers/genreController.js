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
