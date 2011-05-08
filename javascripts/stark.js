$(function() {
  var slide = function(href, slide_from) {
    $(".stark-hidden-page-left, .stark-hidden-page-right").remove();
    $("body").append("<div class='stark-page stark-hidden-page-"+slide_from+"'></div>");
    var target_page = $('.stark-hidden-page-'+slide_from);
    var previous_page = $(".stark-current-page");
    $.get(href, function(data) {
      target_page.html(data);
      previous_page.css({"margin-left": slide_from == "right" ? "-100%" : "100%"});
      target_page.css({"margin-left": "0px"});
      if (target_page.height() > previous_page.height()) {
        previous_page.css({"height": target_page.height() + "px"});
      }
      setTimeout(function() {
        $(target_page).removeClass("stark-hidden-page-"+slide_from);
        $(target_page).addClass("stark-current-page");
        $(previous_page).remove();
      }, 520);
    });
  };

  $("a.stark-slide-in, a.stark-slide-out").live("click", function() {
    event.preventDefault();
    history.pushState({ }, '', this.href)
    var slide_from = $(this).hasClass("stark-slide-in") ? "right" : "left";
    $(this).addClass("stark-active");
    slide(this.href, slide_from);
  });

  $(window).bind('popstate', function(e) {
    if (e.state)
      slide(location.pathname, "left");
  });
});
