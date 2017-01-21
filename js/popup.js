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

      // get news sources saved
      chrome.storage.sync.get('sources', function(data){
          $('#source_options').selectpicker('val', data.sources);
      });

  });

  // save selected news sources to fetch articles from
  $("#save_sources_btn").click(function() {

    // $.each($('.selectpicker').val(), function(i, item){

    // });
    console.log($(".selectpicker option:selected").text());

    chrome.storage.sync.set({'sources': $('.selectpicker').val()}, function() {
        console.log("saved sources!");
    });
  });

});


window.onload = function() {

    // fetch latest articles from saved sources
    get_all_articles();

};


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
    get_all_articles();
}


// Get list of available news sources from News API
function get_available_sources() {
	var newsapi_sources_url = "https://newsapi.org/v1/sources?language=en";
	$.getJSON( newsapi_sources_url, {
	    format: "json"
	})
  .done(function( data ) {
      $('#source_options').html("");
      var source_data = {};

      // adding all source options to the select
    	$.each( data.sources, function( i, item ) {
          // getting relevant data for every source
          source_data[item.id] = {'name': item.name, 'url': item.url, "logo_url": item.urlsToLogos.small};

    		  // var source_logo = "<img src=" + item.urlsToLogos.small + "></img>";
          $('#source_options').append($("<option></option>").attr("value",item.id).text(item.name));

    	});

      // saving all source data.
      chrome.storage.sync.set({'all_source_data': source_data}, function() {
          console.log("saved sources!");
      });

      // refreshing and rerending select options with all sources
      $('#source_options').selectpicker('refresh');
      $('#source_options').selectpicker('render');

  });

};

function get_articles_from_source(source, source_data) {
    console.log(source_data);
    // https://newsapi.org/v1/articles?source=techcrunch&apiKey=7dea1f516b5d4a86963b1a703eb14eda
    var newsapi_article_url = "https://newsapi.org/v1/articles?source=" + source + "&apiKey=7dea1f516b5d4a86963b1a703eb14eda"
    $.getJSON( newsapi_article_url, {
        format: "json"
    })
    .done(function( data ) {
        // console.log(data);
        if (data.status == 'ok') {
            // $("#news_home").append("<h4>"+ data.source +"</h4>");
            $("#news_home").append("<div style=\"text-align: center\"><a href=\"" + source_data.url + "\" target=\"_blank\" ><img style=\"height: 50px\" src=\"" + source_data.logo_url + "\" /></a><br><h4>Latest <b>" + source_data.name + "</b> Articles</h4></div><hr>");
            $.each(data.articles, function (i, item) {
                $("#news_home").append("<p>" + item.title + "</p><p>" + item.description + "</p><hr>");
            });

        }
        // $.each( data.sources, function( i, item ) {

        // });
    });
}

function get_all_articles() {
    $("#news_home").html("");

    chrome.storage.sync.get('all_source_data', function(data){
        // console.log(data);
        // getting news sources selected & saved
        chrome.storage.sync.get('sources', function(selected_source){
            console.log(data.all_source_data);
            $.each(selected_source.sources, function (i, item) {
                get_articles_from_source(item, data.all_source_data[item]);
            });
        });
    });

}












