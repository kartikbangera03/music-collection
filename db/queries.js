const pool = require("../db/pool");

async function getAllArtists() {
  const { rows } = await pool.query("SELECT * FROM artists");
  return rows;
}

async function insertArtist(firstName , lastName ,  birthDate , deathDate, country , imageUrl) {
  await pool.query("INSERT INTO artists (firstName , lastName , birthDate , deathDate , country , imageURL) VALUES ($1,$2,$3,$4,$5,$6)",
   [firstName , lastName ,  birthDate , deathDate, country , imageUrl]);
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
  return rows;
}

async function insertAlbum(albumName , artist , label , genre , releaseDate , imageUrl){
  await pool.query("INSERT INTO albums(albumName , artist_id , label_id , genre_id , releaseDate , imageUrl) VALUES ($1,$2,$3,$4,$5,$6)",
  [albumName , artist , label , genre , releaseDate , imageUrl]);
}

async function getAllReleases(){
  const { rows } = await pool.query("SELECT * FROM releases");
  return rows;
}

async function insertRelease(album , format , price , stock ,barcode , imageUrl){
  await pool.query("INSERT INTO releases(album_id , format , price , stock ,barcode  , imageURL) VALUES ($1,$2,$3,$4,$5,$6)",
  [album , format , price , stock ,barcode  , imageUrl]);
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
  getAllReleases, insertRelease
};

