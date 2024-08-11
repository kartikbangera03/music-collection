const {body, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

exports.labelCreateGet = asyncHandler (async(req,res)=>{
    res.render("labelCreateForm");
});

exports.labelCreatePost = asyncHandler (async(req,res)=>{
    const {labelName , yearFounded} = req.body;
    await db.insertLabel(labelName , yearFounded);
    res.redirect("/");
});
