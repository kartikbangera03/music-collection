const { Router } = require("express");
const router = Router();
const homepageController = require("../controllers/homepageController")
const artistController = require("../controllers/artistController");
const albumController = require("../controllers/albumController");
const labelController = require("../controllers/labelController");
const genreController = require("../controllers/genreController");
const releaseController = require("../controllers/releaseController");

router.get("/", homepageController.homepageDashboard )
router.get("/artist/create" , artistController.artistCreateGet);
router.post("/artist/create" , artistController.artistCreatePost);

router.get("/album/create" , albumController.albumCreateGet);
router.post("/album/create" , albumController.albumCreatePost);

router.get("/label/create" , labelController.labelCreateGet);
router.post("/label/create" , labelController.labelCreatePost);

router.get("/genre/create" , genreController.genreCreateGet);
router.post("/genre/create" , genreController.genreCreatePost);

router.get("/release/create" , releaseController.releaseCreateGet);
router.post("/release/create" , releaseController.releaseCreatePost);


module.exports = router;