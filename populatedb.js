const {Client}=require("pg");
require("dotenv").config();
const SQL = `

CREATE TABLE IF NOT EXISTS artists (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    firstname VARCHAR(80),
    lastname VARCHAR(80),
    birthdate DATE ,
    deathdate DATE ,
    country VARCHAR(80),
    imageurl VARCHAR(255)
    );
  

CREATE TABLE IF NOT EXISTS labels(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    labelname VARCHAR(80),
    yearfounded NUMERIC
);

CREATE TABLE IF NOT EXISTS genres(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    genrename VARCHAR(80)
);

CREATE TABLE IF NOT EXISTS albums(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    albumName VARCHAR(80) , 
    artist_id INTEGER ,
    label_id INTEGER ,
    genre_id INTEGER ,  
    imageURL VARCHAR(255) , 
    releaseDate DATE ,
    CONSTRAINT fk_artist FOREIGN KEY(artist_id) REFERENCES artists(id),
    CONSTRAINT fk_label FOREIGN KEY(label_id) REFERENCES labels(id),
    CONSTRAINT fk_genre FOREIGN KEY(genre_id) REFERENCES genres(id)
);


CREATE TABLE IF NOT EXISTS releases(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
    album_id INTEGER , 
    format VARCHAR(30),
    price DECIMAL  , 
    stock INTEGER , 
    barcode VARCHAR(255) , 
    imageURL VARCHAR(255) ,
    CONSTRAINT fk_album FOREIGN KEY (album_id) REFERENCES albums(id)
);

INSERT INTO artists (firstname , lastname , birthdate , deathdate , country , imageurl) 
VALUES
('Ed','Sheeran','1991-02-16' , null , 'United Kingdom','https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Ed_Sheeran-6886_%28cropped%29.jpg/220px-Ed_Sheeran-6886_%28cropped%29.jpg'),
('Cardi','B','1992-10-11' , null , 'United States', 'https://www.byrdie.com/thmb/_b4sJjC8ICGXPzGI28vnXNjRETw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cardiborangelon-3e349a0a257640699127b8bc6ab1b779.png'),
('Eminem','', '1972-10-17', null , 'United States','https://media.npr.org/assets/music/news/2010/06/eminem_wide-5b8530e7c1ae24e07afa9c9c5b49b50d46a43364.jpg?s=1400&c=100&f=jpeg'),
('Taylor','Swift','1989-10-13',null,'United States', 'https://media.npr.org/assets/img/2024/04/18/the-manuscript_square_sq-c0ac8aa61f4f4fbe41817c789d2a3d9237d757d8.jpg?s=1100&c=50&f=jpeg'),
('Billie','Eilish','2001-10-18',null,'United States', 'https://static.ffx.io/images/$zoom_0.5844%2C$multiply_0.7554%2C$ratio_1.777778%2C$width_1059%2C$x_91%2C$y_0/t_crop_custom/q_86%2Cf_auto/43873a17c286c1cae6b986a0f86c46320d43818d'),
('Dua','Lipa','1995-08-22', null, 'United Kingdom', 'https://www.musicweek.com/cimages/67fc5ce664d18fbe0ccf6508d286bb7b.jpg'),
('Harry','Styles', '1994-02-01', null, 'United Kingdom' , 'https://assets.teenvogue.com/photos/65a6d2849efb8ab437bb31e9/1:1/w_354%2Cc_limit/GettyImages-1246836753%2520(1).jpg'),
('Adele','','1988-05-05',null,'United Kingdom', 'https://media.npr.org/assets/img/2015/11/24/ajeup0ayctw4ztltklrnuvtm-y4xulezgneawbqw4cs_custom-83322c24b778fa2af5999385e84ce936b6f321c8.jpg?s=800&c=85&f=jpeg'),
('Beyonce', '', '1981-09-04',null,'United States' , 'https://media.glamour.com/photos/66268d8a8aefb9b182da343a/1:1/w_354%2Cc_limit/Beyonce%25CC%2581%2520Just%2520Dropped%2520Her%2520Hair%2520Care%2520Routine%2520and%2520Shut%2520Down%2520Wig%2520%2520%25E2%2580%2598Misconceptions%25E2%2580%2599.jpg'),
('Michael','Jackson', '1958-08-29',null,'United States', 'https://imageio.forbes.com/specials-images/imageserve/65a549d50717c631bfe3d125/Photo-of-Michael-JACKSON/0x0.jpg?format=jpg&crop=1160,870,x0,y73,safe&width=960'),
('Akon','', '1973-04-16',null,'United States','https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ42cX4kDgC-hB4CtxnPnog8potgXDT8KG1eSPaOsADlP5cSz0T'),
('50' , 'Cent','1975-07-06',null,'United States', 'https://i.scdn.co/image/dd031b9c5d1b6eba4a691cd89c954255aae787f2'),
('Justin' , 'Bieber', '1994-03-01',null,'Canada' , 'https://media.gq.com/photos/56bb8a91b89407780bd7d454/16:9/w_2560%2Cc_limit/bieber-16-9-longform.jpg'),
('Travis','Scott','1991-04-30', null, 'United States', 'https://media.npr.org/assets/img/2021/11/16/gettyimages-1235223332_sq-e88ad790d447bd7dfcb0c1571047db26d39a8ee0.jpg?s=1100&c=85&f=webp')
;


INSERT INTO labels (labelname , yearfounded )
VALUES
('Atlantic Records',1947),
('Aftermath Entertainment',1996),
('Asylum Records',1971),
('Atlantic Records',1947),
('Epic Records', 1953 ),
('Big Machine Records' , 2005),
('Republic Records', 1995),
('Interscope Records' , 1990),
('Cactus Jack Records', 2017),
('Warner Records' , 1958),
('Erksine Records' , 2016),
('Columbia Records', 1889),
('Def Jam Recordings', 1984),
('Upfront Records', 2005)
;

INSERT INTO genres (genrename)
VALUES
('Hip-Hop'),
('Pop'),
('Synth-pop'),
('Indie folk'),
('Electropop'),
('Psychedelic Rap'),
('Gangsta Rap'),
('Pop Rock'),
('Country'),
('Dance'),
('R&B')
;


INSERT INTO albums (albumname , artist_id , label_id , genre_id , imageurl , releasedate)
VALUES 
('Invasion of Privacy', 2 ,1, 1,'https://upload.wikimedia.org/wikipedia/en/9/97/Cardi_B_-_Invasion_of_Privacy.png','2018-04-06' ),
('X' , 1 , 3 , 2 ,'https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/X_cover.png/220px-X_cover.png','2014-06-20' ),
('The Eminem Show' , 3 , 2 , 2 ,'https://i.scdn.co/image/ab67616d0000b2736ca5c90113b30c3c43ffb8f4','2002-05-26' ),
('Bad' , 10 , 5 , 2 , 'https://live.staticflickr.com/5091/5397787613_35a9ee0aa6_z.jpg' , '1987-08-31' ),
('Thriller' , 10 , 5 , 2 , 'https://upload.wikimedia.org/wikipedia/en/5/55/Michael_Jackson_-_Thriller.png' , '1987-08-31' ),
('1989' , 4 , 6 , 3 , 'https://upload.wikimedia.org/wikipedia/en/f/f6/Taylor_Swift_-_1989.png' , '2014-10-27' ),
('Folklore' , 4 , 7 , 4 , 'https://upload.wikimedia.org/wikipedia/en/f/f8/Taylor_Swift_-_Folklore.png' , '2020-07-24' ),
('When We All Fall Asleep , Where Do We Go ? ' , 5 , 8 , 2 , 'https://upload.wikimedia.org/wikipedia/en/thumb/3/38/When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png/220px-When_We_All_Fall_Asleep%2C_Where_Do_We_Go%3F.png' , '2019-03-29' ),
('Happier Than Ever' , 5 , 8 , 5 , 'https://i.scdn.co/image/ab67616d0000b2732a038d3bf875d23e4aeaa84e' , '2021-07-30' ),
('The Slim Shady Lp' , 3 , 2 , 1 , 'https://upload.wikimedia.org/wikipedia/en/3/35/Eminem_-_The_Slim_Shady_LP_CD_cover.jpg' , '1999-02-23' ),
('UTOPIA' , 14, 9 , 1 , 'https://static.printler.com/cache/6/e/1/0/a/6/6e10a6d39e2b10a9bf24db1c4c5524ff5df3db9d.jpg' , '2023-07-28' ),
('ASTROWORLD' , 14 , 9 , 6 , 'https://upload.wikimedia.org/wikipedia/en/4/4b/Travis_Scott_-_Astroworld.png' , '2018-08-03' ),
('Get Rich or Die Tryin' , 12 , 8 , 7 , 'https://upload.wikimedia.org/wikipedia/en/1/17/Get_Rich_or_Die_Tryin%27_Soundtrack_-_CD_album_cover.jpg' , '2003-02-06' ),
('Future Nostalgia' , 6 , 10 , 5 , 'https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png' , '2020-03-27' ),
('Radical Optimism' ,  6 , 10 , 5 , 'https://upload.wikimedia.org/wikipedia/en/f/fa/Dua_Lipa_-_Radical_Optimism.png' , '2024-05-03' ),
('Fine Line' , 7 , 11 , 8 , 'https://upload.wikimedia.org/wikipedia/en/thumb/b/b1/Harry_Styles_-_Fine_Line.png/220px-Harry_Styles_-_Fine_Line.png' , '2019-12-13' ),
('Harry''s House' , 7 , 11 , 3 , 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQ3Aobai2AffrsV9eJVp9mq3mFqp_gpF5jgg&s' , '2022-05-20' ),
('30' , 8 , 12 , 2 , 'https://upload.wikimedia.org/wikipedia/en/thumb/7/76/Adele_-_30.png/220px-Adele_-_30.png' , '2021-11-19' ),
('21' , 8 , 12 , 2 , 'https://upload.wikimedia.org/wikipedia/en/thumb/1/1b/Adele_-_21.png/220px-Adele_-_21.png' , '2011-01-24' ),
('Purpose' , 13,13,2, 'https://upload.wikimedia.org/wikipedia/en/2/27/Justin_Bieber_-_Purpose_%28Official_Album_Cover%29.png' , '2015-11-13' ),
('Justice' ,13,13,2, 'https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Justin_Bieber_-_Justice.png/220px-Justin_Bieber_-_Justice.png' , '2021-03-19' ),
('Cowboy Carter' , 9 , 12 , 9 , 'https://upload.wikimedia.org/wikipedia/en/a/aa/Beyonc%C3%A9_-_Cowboy_Carter.png' , '2024-03-29' ),
('Renaissance' , 9 , 12 , 10 , 'https://upload.wikimedia.org/wikipedia/en/a/ad/Beyonc%C3%A9_-_Renaissance.png' , '2022-07-29' ),
('Trouble' , 11 , 14 , 11 , 'https://upload.wikimedia.org/wikipedia/en/7/75/AkonTrouble.jpg' , '2004-06-29' ),
('Freedom' , 11 , 14 , 1 , 'https://upload.wikimedia.org/wikipedia/en/thumb/0/0a/AkonFreedom.PNG/220px-AkonFreedom.PNG' , '2008-12-01' )
;

INSERT INTO releases(album_id, format , price , stock , barcode , imageurl )
VALUES
(1, 'Vinyl',41.72,15,852147963,'https://sound-merch.com.au/cdn/shop/products/CARDI-B_1024x1024.png?v=1627447626'),
(6,'Vinyl' , 25 , 10 , 654821357954 , 'https://assai.co.uk/cdn/shop/products/9ac4212a-d451-4454-b3bf-c7db1dbcbf64_1024x1024.jpg?v=1650469929'),
(22, 'Vinyl', 12 , 18, 487953126813, 'https://assai.co.uk/cdn/shop/products/100614-a5871f58e44a95fadccf5b049ef1254b_700x700.png?v=1660834347'),
(14 , 'Cassette' , 12.45 , 10 , 123855854159 , 'https://product.hstatic.net/1000304920/product/04_2020-dualipa-cassettetapes-green_fb9e5d82fb7c4e3680eaa871457f904d.png'  ),
(14 , 'Vinyl' , 22.32 , 8 , 254789634178 , 'https://i.ebayimg.com/images/g/TAUAAOSwTi9ietzr/s-l1200.webp'),
(7, 'Vinyl' , 28.75 , 10 , 925814736357 , 'https://m.media-amazon.com/images/I/617oudVIaRL._UF1000,1000_QL80_.jpg' ),
(16 , 'Cassette' , 25, 18 , 579848159753 , 'https://i.localised.com/img/uo/product/f7a4e5c0-1ad4-42c9-b515-c06151716f72.jpg'),
(15,'CD', 13, 10, 754895152365 , 'https://cdn.hmv.com/r/w-640/hmv/files/99/9984809f-04a9-4d35-bd00-2b8e88ac9845.jpg'),
(13, 'Cassette' , 13.25 , 20 , 214563987842 , 'https://i.etsystatic.com/22941025/r/il/185185/4016771402/il_fullxfull.4016771402_lz27.jpg') , 
(5 , 'Cassette' , 45 , 2 , 158749352164 , 'https://i.etsystatic.com/24540799/r/il/a137e8/3396675240/il_fullxfull.3396675240_2vls.jpg') , 
(4 , 'CD' , 50 , 3 , 246578915357, 'https://i.redd.it/18c0t4jy61u71.jpg'),
(10 , 'Cassette', 34.68 , 18 , 654874932149 , 'https://m.media-amazon.com/images/I/91GCkQiOOcL._UF1000,1000_QL80_.jpg'),
(3 , 'CD', 29.99 , 2 , 958915964931 , 'https://www.pngitem.com/pimgs/m/303-3037467_album-3d-face-eminem-the-eminem-show-album.png'),
(5 , 'Vinyl' , 55 , 8 , 486235719548 , 'https://thesoundofvinyl.com/cdn/shop/products/SharedImage-135521_216455be-4cdd-4eda-9004-66150fc7cfed.png?v=1686620873') , 
(23 , 'CD' , 14.49 , 5 , 754156324589 , 'https://shop.udiscovermusic.com/cdn/shop/files/AKON_Trouble_2LP_PrdSht_STD.png?v=1715788284'),
(2 , 'CD' , 8.99 , 10 , 153514556894275, 'https://store.warnermusic.ca/cdn/shop/files/StandardCD.jpg?v=1714060205'),
(4 , 'Vinyl' , 48.2 , 2 , 357951456987 ,  'https://d2rbybg5ibx87t.cloudfront.net/images/605378/original.jpeg?1646328210') ,
(17 , 'Cassette' , 7.24 , 2 , 963258741159 , 'https://i.ebayimg.com/images/g/mIsAAOSwKRdmVeJw/s-l400.jpg'),
(10 , 'CD' , 38.5 , 4 , 458591629451 , 'https://i.discogs.com/2VFFKSHjxcq4_tq_8ND5xDj8HRoHU2hZ3H3AasHTuw8/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEwNzM3/OTE1LTE1MDY0NjI1/NzgtODYyNi5qcGVn.jpeg')
;
`;



async function main() {
    console.log("seeding...");
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done");
  }
  
main();