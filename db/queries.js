const pool = require("../db/pool");

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}

async function insertArtist(firstName , lastName ,  birthDate , deathDate, country , imageUrl) {
  await pool.query("INSERT INTO artists (firstName , lastName , birthDate , deathDate , country , imageURL) VALUES ($1,$2,$3,$4,$5,$6)",
   [firstName , lastName ,  birthDate , deathDate, country , imageUrl]);
}



async function getArtistById(id){
  const {rows} = await pool.query("SELECT * FROM artists WHERE id = ($1)",[id]);
  return rows;
}

async function getAlbumsByArtistId(id){
  const { rows } = await pool.query("SELECT * FROM albums where artist_id = ($1)",[id]);
  return rows;
}

async function getAllAlbumsAndReleasesByArtistId(id){
  const { rows } = await pool.query(`
    SELECT * 
    FROM albums
    JOIN releases
    ON releases.album_id = albums.id
    where albums.artist_id = ($1)`,[id]);
  return rows;

}


async function getAllLabels() {
  const { rows } = await pool.query("SELECT * FROM labels");
  return rows;
}

async function insertLabel(labelName , yearFounded) {
  await pool.query("INSERT INTO labels (labelName , yearFounded) VALUES ($1,$2)",
   [labelName , yearFounded]);
}

async function getAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

async function insertGenre(genreName) {
  await pool.query("INSERT INTO genres (genreName ) VALUES ($1)",
   [genreName]);
}

async function getAllAlbums(){
  const { rows } = await pool.query("SELECT * FROM albums");
  return rows;async function updateArtist( id,firstName , lastName ,  birthDate , deathDate, country , imageUrl) {
    await pool.query("INSERT INTO artists (firstName , lastName , birthDate , deathDate , country , imageURL) VALUES ($1,$2,$3,$4,$5,$6)",
     [firstName , lastName ,  birthDate , deathDate, country , imageUrl]);
  }
}

async function insertAlbum(albumName , artist , label , genre , releaseDate , imageUrl){
  await pool.query("INSERT INTO albums(albumName , artist_id , label_id , genre_id , releaseDate , imageUrl) VALUES ($1,$2,$3,$4,$5,$6)",
  [albumName , artist , label , genre , releaseDate , imageUrl]);
}

async function getAllReleases(){
  const { rows } = await pool.query("SELECT releases.id, albums.albumname , releases.format,releases.album_id FROM releases JOIN albums on releases.album_id = albums.id");
  return rows;
}

async function getReleaseById(id){
  const { rows } = await pool.query("SELECT releases.id, albums.albumname , releases.format,releases.album_id , releases.format, releases.price , releases.stock , releases.barcode , releases.imageurl FROM releases JOIN albums on releases.album_id = albums.id WHERE releases.id = ($1)",[id]);
  return rows;
}

async function insertRelease(album , format , price , stock ,barcode , imageUrl){
  await pool.query("INSERT INTO releases(album_id , format , price , stock ,barcode  , imageURL) VALUES ($1,$2,$3,$4,$5,$6)",
  [album , format , price , stock ,barcode  , imageUrl]);
}

async function getAlbumById(id){
  const { rows } = await pool.query("SELECT * FROM albums WHERE albums.id = ($1)",[id]);
  return rows;
}

async function getReleasesByAlbumId(id){
  const { rows } = await pool.query("SELECT * FROM releases WHERE releases.album_id = ($1)",[id]);
  return rows;
}

async function getAlbumsByLabelId(id){
  const { rows } = await pool.query("SELECT * FROM albums WHERE albums.label_id = ($1)",[id]);
  return rows;
}


async function getReleasesByLabelId(id){
  const { rows } = await pool.query("SELECT releases.id, albums.albumname , releases.format,releases.album_id , releases.format, releases.price , releases.stock , releases.barcode , releases.imageurl FROM releases JOIN albums on releases.album_id = albums.id WHERE albums.label_id =($1)",[id]);
  return rows;
}

async function getReleasesByGenreId(id){
  const { rows } = await pool.query("SELECT releases.id, albums.albumname , releases.format,releases.album_id , releases.format, releases.price , releases.stock , releases.barcode , releases.imageurl FROM releases JOIN albums on releases.album_id = albums.id WHERE albums.genre_id =($1)",[id]);
  return rows;
}


async function getLabelById(id){
  const {rows} = await pool.query("SELECT * FROM labels WHERE id = ($1)",[id]);
  return rows;
}

async function getGenreById(id){
  const {rows} = await pool.query("SELECT * FROM genres WHERE id = ($1)",[id]);
  return rows;
}

async function getAlbumsByGenreId(id){
  const { rows } = await pool.query("SELECT * FROM albums WHERE albums.genre_id = ($1)",[id]);
  return rows;
}

async function getAllAlbumsAndReleasesByLabelId(id){
  const { rows } = await pool.query(`
    SELECT * 
    FROM albums
    JOIN releases
    ON releases.album_id = albums.id
    where albums.label_id = ($1)`,[id]);
  return rows;

}


async function getAllAlbumsAndReleasesByGenreId(id){
  const { rows } = await pool.query(`
    SELECT * 
    FROM albums
    JOIN releases
    ON releases.album_id = albums.id
    where albums.genre_id = ($1)`,[id]);
  return rows;

}

async function updateArtist( id,firstName , lastName ,  birthDate , deathDate, country , imageUrl) {
  await pool.query(`
  UPDATE artists
  SET firstName = ($2) , 
  lastName = ($3), 
  birthDate = ($4), 
  deathDate = ($5), 
  country = ($6), 
  imageURL = ($7) 
  WHERE artists.id = ($1)`,
   [id,firstName , lastName ,  birthDate , deathDate, country , imageUrl]);
}

async function updateAlbum( id,albumName , artist , label , genre , releaseDate , imageUrl) {
  await pool.query(`
  UPDATE albums
  SET 
  albumname = ($2) , 
  artist_id = ($3), 
  label_id = ($4), 
  genre_id = ($5),  
  imageURL = ($7) ,
  releasedate = ($6)
  WHERE albums.id = ($1)`,
   [id,albumName , artist , label , genre , releaseDate , imageUrl]);
}

async function updateLabel(id, labelName , yearFounded) {
  await pool.query(`
  UPDATE labels
  SET
  labelname = ($2),
  yearfounded = ($3)
  WHERE labels.id = ($1)
  `,
   [id, labelName , yearFounded]);
}

async function updateGenre(id, genrename) {
  await pool.query(`
  UPDATE genres
  SET
  genrename = ($2)
  WHERE genres.id = ($1)
  `,
   [id, genrename]);
}


async function updateRelease(id , album , format , price , stock ,barcode , imageUrl) {
  await pool.query(`
  UPDATE releases
  SET
  album_id = ($2),
  format = ($3),
  price = ($4),
  stock = ($5),
  barcode = ($6),
  imageurl = ($7)
  WHERE releases.id = ($1)
  `,
   [id , album , format , price , stock ,barcode , imageUrl]);
}


async function deleteReleaseById(id){
  await pool.query("DELETE FROM releases WHERE releases.id = ($1)",[id]);
}

async function deleteReleasesByAlbumId(album_id){
  await pool.query("DELETE FROM releases WHERE album_id = ($1)",[album_id]);
}

async function deleteAlbumById(album_id){
  await pool.query("DELETE FROM albums WHERE albums.id = ($1)",[album_id]);
}

async function deleteReleasesByAlbumIdList(placeholder, album_id_array){
  await pool.query(`
  DELETE from releases 
  WHERE releases.album_id IN (${placeholder})`,
   album_id_array);
}

async function deleteAlbumsByAlbumIdList(placeholder, album_id_array){
  await pool.query(`
  DELETE from albums 
  WHERE albums.id IN (${placeholder})`,
   album_id_array);
}


async function deleteArtistById(id){
  await pool.query('DELETE FROM artists WHERE artists.id = ($1)',[id]);
}

async function deleteLabelById(id){
  await pool.query('DELETE FROM labels WHERE labels.id = ($1)',[id]);
}

async function deleteGenreById(id){
  await pool.query('DELETE FROM genres WHERE genres.id = ($1)',[id]);
}




module.exports = {
  
  getAllArtists,
  insertArtist,
  getAllLabels,
  insertLabel,
  insertGenre,
  getAllGenres,
  getAllAlbums,
  insertAlbum,
  getAllReleases, 
  insertRelease,
  getArtistById,
  getAlbumsByArtistId,
  getAllAlbumsAndReleasesByArtistId,
  getAlbumById,
  getReleasesByAlbumId,
  getAlbumsByLabelId,
  getReleasesByLabelId,
  getLabelById,
  getAllAlbumsAndReleasesByLabelId,
  getGenreById,
  getAlbumsByGenreId,
  getAllAlbumsAndReleasesByGenreId,
  getReleaseById,
  updateArtist,
  updateAlbum,
  updateLabel,
  updateGenre,
  updateRelease,
  deleteReleaseById,
  deleteReleasesByAlbumId,
  deleteAlbumById,
  deleteReleasesByAlbumIdList,
  deleteAlbumsByAlbumIdList,
  deleteArtistById,
  deleteLabelById,
  getReleasesByGenreId,
  deleteGenreById
};
