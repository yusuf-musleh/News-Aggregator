$(document).ready(function(){

  // fetch available news sources from api
  get_available_sources();

  // display news home when clicked
  $("#news_home_btn").click(function(){
      chrome.storage.sync.get('sources', function(data){
          console.log(data);
      });
      show_news_home();

  });

  // display news sources when clicked
  $("#select_sources_btn").click(function() {
      show_sources();

      // getting news sources saved
      chrome.storage.sync.get('sources', function(data){
          $('#source_options').selectpicker('val', data.sources);
      });

  });

  // save selected news sources to fetch articles from
  $("#save_sources_btn").click(function() {
    chrome.storage.sync.set({'sources': $('.selectpicker').val()}, function() {
        console.log("saved sources!");
    });
  });

});


// Hide news home and show sources to select
function show_sources() {

    $("#news_home").css('display', 'none');
    $("#news_home_btn").removeClass("active");
    $("#select_sources").css('display', 'block');
    $("#select_sources_btn").addClass("active");
    $('#navbar').collapse('hide');

}


// Hide sources select and show news home
function show_news_home() {
    $("#news_home").css('display', 'block');
    $("#news_home_btn").addClass("active");
    $("#select_sources").css('display', 'none');
    $("#select_sources_btn").removeClass("active");
    $('#navbar').collapse('hide');
}


// Get list of available news sources from News API
function get_available_sources() {
	var newsapi_sources_url = "https://newsapi.org/v1/sources?language=en";
	$.getJSON( newsapi_sources_url, {
	    format: "json"
	})
  .done(function( data ) {
      $('#source_options').html(""); // CHANGE THIS ADD CACHEING TO FIX [PROBABLY]
      // adding all source options to the select
    	$.each( data.sources, function( i, item ) {

    		  // var source_logo = "<img src=" + item.urlsToLogos.small + "></img>";
          $('#source_options').append($("<option></option>").attr("value",item.name).text(item.name));

    	});

      // refreshing and rerending select options with all sources
      $('#source_options').selectpicker('refresh');
      $('#source_options').selectpicker('render');

  });

};















