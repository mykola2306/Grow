$.ajax({
  type: 'GET',
  url: 'https://jaiminisbox.com/reader/series/one-piece-2',
  success: function(htmlPageCode) {
    console.log(htmlPageCode)
  },
  error: function() {
  }
});

$.ajax({
  type: 'GET',
  url: 'https://jaiminisbox.com/reader/series/boruto-naruto-next-generations/',
  success: function(htmlPageCode) {
    console.log(htmlPageCode)
  },
  error: function() {
  }
});