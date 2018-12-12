const axios = require("axios");
const secrets = require("./config");

let baseUrl = "https://api.themoviedb.org/3/discover/movie";
let key = secrets.apiKey();

let counter = 1;
let movieBank = [];

function getData() {
  if (counter !== 6) {
    axios
      .get(
        baseUrl +
          "?api_key=" +
          key +
          "&language=en-US&with_genres=878&primary_release_year=2015&certification=R&include_adult=false&include_video=false&sort_by=popularity.desc&page=" +
          counter
      )
      .then(response => {
        movieBank.push(response.data);
        counter++;
        getData();
      })
      .catch(error => {
        console.log(error);
      });
  } else {
    cleanData(movieBank)
  }
}

function cleanData(data) {
  var output = [];

  for (var i = 0; i < data.length; i++) {
    let pages = data[i];
    for (var j = 0; j < pages.results.length; j++) {
      let values = Object.values(pages.results[j]);

      output.push(values);
    }
  }
  return output;
}


console.log(getData());

// var mysql = require("mysql");

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: secrets.password(),
//   database: "movies"
// });

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   var sql = "INSERT INTO movies (id, adult, backdrop_path, genre_ids, original_language, original_title, overview, popularity, poster_path, release_date, title, video,  vote_average, vote_count) VALUES ?";
//   var values = cleanData(movieBank);
//   con.query(sql, [values], function(err, result) {
//     if (err) throw err;
//     console.log("1 record inserted");
//   });
// });
