function getHTML(url){
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      console.log(request.responseText);
    } else {// We reached our target server, but it returned an error
    }
  };
  
  request.onerror = function() { // There was a connection error of some sort
  };
  
  request.send();
}

getHTML('https://jaiminisbox.com/reader/series/one-piece-2');
getHTML('https://jaiminisbox.com/reader/series/boruto-naruto-next-generations/');


app.get("/movie", function(req,res){
	addToDatabse(Movies, movies_folder, renderPage);
	function renderPage(){
		Movies.find({saw:false}, function(err, movie){
			if(err){
				console.log(err)
			}else{
				console.log("movies is send");
				res.render("movie",{movie:movie});
			}
		});
	}
});