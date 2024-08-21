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


router.get("/category/artists" , artistController.displayArtists);
router.get("/category/albums" , albumController.displayAlbums);
router.get("/category/labels" , labelController.displayLabels);
router.get("/category/genres" , genreController.displayGenres);
router.get("/category/releases" , releaseController.displayReleases);

router.get("/artist/:id", artistController.getArtistById);
router.get("/artist/:id/update", artistController.updateArtistById);
router.post("/artist/:id/update", artistController.updateArtistByIdPost);
router.get("/artist/:id/delete", artistController.deleteArtistById);
router.post("/artist/:id/delete", artistController.deleteArtistByIdPost);

router.get("/album/:id", albumController.getAlbumById);
router.get("/album/:id/update", albumController.updateAlbumById);
router.post("/album/:id/update", albumController.updateAlbumByIdPost);
router.get("/album/:id/delete", albumController.deleteAlbumById);
router.post("/album/:id/delete", albumController.deleteAlbumByIdPost);

router.get("/label/:id", labelController.getLabelById);
router.get("/label/:id/update", labelController.updateLabelById);
router.post("/label/:id/update", labelController.updateLabelByIdPost);
router.get("/label/:id/delete", labelController.deleteLabelById);
router.post("/label/:id/delete", labelController.deleteLabelByIdPost);

router.get("/genre/:id", genreController.getGenreById);
router.get("/genre/:id/update", genreController.updateGenreById);
router.post("/genre/:id/update", genreController.updateGenreByIdPost);
router.get("/genre/:id/delete", genreController.deleteGenreById);
router.post("/genre/:id/delete", genreController.deleteGenreByIdPost);

router.get("/release/:id", releaseController.getReleaseById);
router.get("/release/:id/update", releaseController.updateReleaseById);
router.post("/release/:id/update", releaseController.updateReleaseByIdPost);
router.get("/release/:id/delete", releaseController.deleteReleaseById);



module.exports = router;