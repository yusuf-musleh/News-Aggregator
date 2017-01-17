$(document).ready(function(){

	console.log('running script using jquery!');

  $("#news_home_btn").click(function(){
      show_news_home();

  });

  $("#select_sources_btn").click(function() {
      show_sources();
  });

});


function show_sources() {
    get_available_sources();
    $("#news_home").css('display', 'none');
    $("#news_home_btn").removeClass("active");
    $("#select_sources").css('display', 'block');
    $("#select_sources_btn").addClass("active");
    $('#navbar').collapse('hide');
}


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
    	$.each( data.sources, function( i, item ) {
    		  var source_logo = "<img src=" + item.urlsToLogos.small + "></img>";
       	  $("#select_sources").append("<p>" + source_logo + item.name + "</p>");
  		});
  });

};
