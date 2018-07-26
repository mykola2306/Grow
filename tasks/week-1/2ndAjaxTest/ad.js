var express = require("express");
var fs = require('fs');
var path = require('path');
var PDFParser = require('pdf2json');
var ejs = require('ejs');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var rimraf = require('rimraf');
var request = require('request');
var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "./views"));
app.use(express.static(path.join(__dirname, "./public")));
mongoose.connect("mongodb://localhost/Data");

//Description models schema of database
var movieSchema = new mongoose.Schema({
  name: String,
  last_chapter: Number,
  amount_chapter: Number,
  rating: Number,
  saw: Boolean
});

var bookSchema = new mongoose.Schema({
  name: String,
  last_chapter: Number,
  amount_chapter: Number,
  rating: Number,
  saw: Boolean
});

var animeShema = new mongoose.Schema({
  name: String,
  last_chapter: Number,
  amount_chapter: Number,
  rating: Number,
  saw: Boolean
});

var mangaSchema = new mongoose.Schema({
  name: String,
  last_chapter: Number,
  amount_chapter: Number,
  rating: Number,
  saw: Boolean
});

// Create models of database
var Movies = mongoose.model("movie", movieSchema);
var Books = mongoose.model("book", bookSchema);
var Anime = mongoose.model("animation", animeShema);
var Manga = mongoose.model("manga", mangaSchema);

// Path to folders with data
var movies_folder = "D:/Movies/";
var books_folder = "D:/Books/";
var anime_folder = "D:/Anime/";
var manga_folder = "D:/Manga/";

function animeInfo(renderPage) {
  var animeList = [];
  var animeGanre = [];
  var animeSeries = [];

  request('http://tt.animedia.tv/', function (error, response, site) {
    var siteInfo = site;
    var animeClass = 'ads-list__item__title">';
    var seriesTemplate = 'scroller__item__number__font">';
    var ganres = ["Сказка", "Комедия", "История", "Драма", "Фантастика", "Космическая опера", "Меха", "Сэнтай", "Меха-сэнтай", "Махо-сёдзё", "Спокон",
      "Киберпанк", "Паропанк", "Фэнтези", "Путешествие между мирами", "Мистика", "Парапсихология", "Апокалиптика", "Постапокалиптика", "Романтика", "Мыльная опера",
      "Школьная мыльная опера", "Повседневность", "Социальный фильм или сериал", "Психологический триллер", "Боевик", "Самурайский боевик", "Детектив", "Школьный детектив",
      "Полицейский боевик", "Боевые искусства", "Добуцу", "Идолы", "Отаку", "Хентай", "Яой", "Юри", "Кодомо", "Сёнэн", "Сёдзё", "Сэйнэн", "Дзё", "ТВ-сериал", "ТВ-фильм",
      "OVA", "Экшен", "Сверхъестественное", "По игре", "Психология", "Приключения", "Этти", "Вампиры", "Война", "Школа", "Гарем", "Ужасы", "Сёдзе", "Спорт"
    ];
    for (var i = 0; i < 16; i++) {
      var series;
      var ganreList = [];
      var search = "";
      animeList[i] = siteInfo.substr(siteInfo.indexOf(animeClass), 900);
      siteInfo = siteInfo.replace(animeClass, "");
      animeList[i] = animeList[i].replace(animeClass, "");
      animeSeries[i] = siteInfo.substr(siteInfo.indexOf(seriesTemplate), 60);
      siteInfo = siteInfo.replace(seriesTemplate, "");
      animeSeries[i] = animeSeries[i].replace(seriesTemplate, "");
      for (var j = 0; j < ganres.length; j++) {
        if (animeList[i].indexOf(ganres[j]) != -1) {
          ganreList.push(ganres[j]);
        } else {
          continue;
        }
      }
      animeGanre[i] = ganreList.join("; ");
    }
    animeList = distStrings(animeList);
    animeSeries = distStrings(animeSeries);
    setTimeout(function () {
      renderPage(animeList, animeGanre, animeSeries);
    }, 1000);
  });
}

function distStrings(name) {
  for (var i = 0; i < name.length; i++) {
    var current = name[i].split("");
    var list = [];
    for (var j = 0; j < current.length; j++) {
      if (current[j] != "<") {
        list.push(current[j]);
      } else {
        break;
      }
    }
    name[i] = list.join("");
  }
  return name;
}

function addToDatabse(db_name, folder_name, renderPage) {
  fs.readdirSync(folder_name).forEach(function (name) {
    var amount_chapter = fs.readdirSync(folder_name + "" + name).length;
    db_name.findOne({
      name: name
    }, function (err, object) {
      if (err) {
        console.log(err);
      } else if (object == null) {
        db_name.create({
          name: name,
          last_chapter: 0,
          amount_chapter: amount_chapter,
          rating: 0,
          saw: false
        }, function (err, create) {
          if (err) {
            console.log(err);
          } else {
            console.log(`${create.name} add to database`);
          }
        });
      } else {
        db_name.updateOne({
          name: name
        }, {
          $set: {
            amount_chapter: amount_chapter
          }
        }, function (err, update) {
          if (err) {
            console.log(err);
          } else {
            console.log(`Update amount chapter of ${object.name}`);
          }
        });
      }
    });
  });
  setTimeout(function () {
    renderPage();
  }, 1500);
}

function addBookToDatabse(db_name, folder_name, renderPage) {
  fs.readdirSync(folder_name).forEach(function (name) {
    var pdfParser = new PDFParser();
    var amount_chapter;
    pdfParser.on('pdfParser_dataReady', function (data) {
      amount_chapter = data.formImage.Pages.length;
      db_name.findOne({
        name: name
      }, function (err, object) {
        if (err) {
          console.log(err);
        } else if (object == null) {
          db_name.create({
            name: name,
            last_chapter: 0,
            amount_chapter: amount_chapter,
            rating: 0,
            saw: false
          }, function (err, create) {
            if (err) {
              console.log(err);
            } else {
              console.log(`${create.name} add to database`);
            }
          });
        } else {
          console.log(`${object.name} alredy in databse`);
        }
      });
    });
    pdfParser.loadPDF(`${folder_name}${name}/${name}.pdf`);
  });
  setTimeout(function () {
    renderPage();
  }, 8500);
}

function updateElement(db_name, name, last_chapter, rating, op, redirectToPage) {
  if (op == "update") {
    db_name.updateOne({
      name: name
    }, {
      $set: {
        last_chapter: last_chapter,
        rating: rating
      }
    }, function (err, obj) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${name} is update`);
        redirectToPage();
      }
    });
  } else if (op == "saw") {
    db_name.updateOne({
      name: name
    }, {
      $set: {
        last_chapter: last_chapter,
        rating: rating,
        saw: true
      }
    }, function (err, obj) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${name} marked as saw`);
        redirectToPage();
      }
    });
  }
}

function resume(folder_path, db_name, name, op, redirect) {
  if (op == "resume") {
    db_name.updateOne({
      name: name
    }, {
      $set: {
        saw: false
      }
    }, function (err, update) {
      if (err) {
        console.log(err);
      } else {
        console.log(`${name} is resume`);
        redirect();
      }
    });
  } else if (op == "delite") {
    db_name.remove({
      name: name
    }, function (err, obj) {
      if (err) {
        console.log(err);
      } else {
        rimraf(`${folder_path}/${name}`, function () {
          console.log(`${name} is delite`);
          redirect();
        });
      }
    });
  } else {
    console.log(`Wrong value`);
  }
}

/////////////////////////////////////////////////////////////////////// HOME PAGE

app.get("/", function (req, res) {
  animeInfo(renderPage);

  function renderPage(animeList, animeGanre, animeSeries) {
    var animediaAnime = [];
    for (var i = 0; i < animeList.length; i++) {
      animediaAnime[i] = {
        name: animeList[i],
        ganre: animeGanre[i],
        series: animeSeries[i]
      }
    }
    console.log("Home page")
    res.render("home", {
      animediaAnime: animediaAnime
    });
  }
});

/////////////////////////////////////////////////////////////////////// MOVIE PAGE
app.get("/movie", function (req, res) {
  addToDatabse(Movies, movies_folder, renderPage);

  function renderPage() {
    Movies.find({
      saw: false
    }, function (err, movie) {
      if (err) {
        console.log(err)
      } else {
        console.log("movies is send");
        res.render("movie", {
          movie: movie
        });
      }
    });
  }
});
///////////////////////////////////////////////////////////////////// UPDATE AND SAW FILM
app.post("/movie", function (req, res) {
  var name = req.body.name;
  var rating = +req.body.rating;
  var op = req.body.operation;
  updateElement(Movies, name, 0, rating, op, redirectToPage);

  function redirectToPage() {
    res.redirect("/movie");
  }
});

app.get("/sawfilms", function (req, res) {
  Movies.find({
    saw: true
  }, function (err, movie) {
    if (err) {
      console.log(err);
    } else {
      res.render("saw/films", {
        movie: movie
      });
      console.log("List saw films is send");
    }
  });
});
///////////////////////////////////////////////////////////// RESUME AND DELITE FILM
app.post("/sawfilms", function (req, res) {
  var name = req.body.name;
  var op = req.body.operation;

  function redirect() {
    res.redirect("/sawfilms");
  }
  resume(movies_folder, Movies, name, op, redirect);
});

///////////////////////////////////////////////////////////// BOOKS PAGE
app.get("/book", function (req, res) {
  addBookToDatabse(Books, books_folder, renderPage);

  function renderPage() {
    Books.find({
      saw: false
    }, function (err, book) {
      if (err) {
        console.log(err)
      } else {
        console.log("List of books is send");
        res.render("book", {
          book: book
        });
      }
    });
  }
});
//////////////////////////////////////////////////////////////////////// UPDATE AND SAW BOOK
app.post("/book", function (req, res) {
  var name = req.body.name;
  var last_chapter = +req.body.last_chapter;
  var rating = +req.body.rating;
  var op = req.body.operation;
  updateElement(Books, name, last_chapter, rating, op, redirectToPage);

  function redirectToPage() {
    res.redirect("/book");
  }
});
/////////////////////////////////////////
app.get("/readbooks", function (req, res) {
  Books.find({
    saw: true
  }, function (err, book) {
    if (err) {
      console.log(err);
    } else {
      res.render("read/books", {
        book: book
      });
      console.log("Read list books is send");
    }
  });
});

/////////////////////////////////////////////////////////////////////////// RESUME AND DELITE BOOKS
app.post("/readbooks", function (req, res) {
  var name = req.body.name;
  var op = req.body.operation;

  function redirect() {
    res.redirect("/readbooks");
  }
  resume(books_folder, Books, name, op, redirect);
});

/////////////////////////////////////////////////////////////////////////// ANIME PAGE
app.get("/anime", function (req, res) {
  addToDatabse(Anime, anime_folder, renderPage);

  function renderPage() {
    Anime.find({
      saw: false
    }, function (err, anime) {
      if (err) {
        console.log(err)
      } else {
        console.log("Anime list is send");
        res.render("anime", {
          anime: anime
        });
      }
    });
  }
});

//////////////////////////////////////////////////////////////////////// UPDATE AND SAW ANIME
app.post("/anime", function (req, res) {
  var name = req.body.name;
  var last_chapter = +req.body.last_chapter;
  var rating = +req.body.rating;
  var op = req.body.operation;
  updateElement(Anime, name, last_chapter, rating, op, redirectToPage);

  function redirectToPage() {
    res.redirect("/anime");
  }
});
//////////////////
app.get("/sawanime", function (req, res) {
  Anime.find({
    saw: true
  }, function (err, anime) {
    if (err) {
      console.log(err);
    } else {
      res.render("saw/anime", {
        anime: anime
      });
      console.log("Saw list anime is send");
    }
  });
});
//////////////////////////////////////////////////////////////////////////// RESUME ANIME
app.post("/sawanime", function (req, res) {
  var name = req.body.name;
  var op = req.body.operation;

  function redirect() {
    res.redirect("/sawanime");
  }
  resume(anime_folder, Anime, name, op, redirect);
});

//////////////////////////////////////////////////////////////////////////// MANGA PAGE  
app.get("/manga", function (req, res) {
  addToDatabse(Manga, manga_folder, renderPage);

  function renderPage() {
    Manga.find({
      saw: false
    }, function (err, manga) {
      if (err) {
        console.log(err)
      } else {
        console.log("Manga list is send");
        res.render("manga", {
          manga: manga
        });
      }
    });
  }
});
//////////////////////////////////////////////////////////////////////// UPDATE AND SAW MANGA
app.post("/manga", function (req, res) {
  var name = req.body.name;
  var last_chapter = +req.body.last_chapter;
  var rating = +req.body.rating;
  var op = req.body.operation;
  updateElement(Manga, name, last_chapter, rating, op, redirectToPage);

  function redirectToPage() {
    res.redirect("/manga");
  }
});
//////////////////////
app.get("/readmanga", function (req, res) {
  Manga.find({
    saw: true
  }, function (err, manga) {
    if (err) {
      console.log(err);
    } else {
      res.render("read/manga", {
        manga: manga
      });
      console.log("Read list manga is send");
    }
  });
});
///////////////////////////////////////////////////////////////////////////// RESUME MANGA
app.post("/readmanga", function (req, res) {
  var name = req.body.name;
  var op = req.body.operation;

  function redirect() {
    res.redirect("/readmanga");
  }
  resume(manga_folder, Manga, name, op, redirect);
});


app.listen(3000, function (req, res) {
  console.log("Server start on port 3000");
});