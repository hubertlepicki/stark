$(function() {
  var slide = function(href, slide_from, html) {
    $(".stark-hidden-page-left, .stark-hidden-page-right").remove();
    $("body").append("<div class='stark-page stark-hidden-page-"+slide_from+"'></div>");
    var target_page = $('.stark-hidden-page-'+slide_from);
    var previous_page = $(".stark-current-page");
    var switch_pages = function(data) {
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
    };

    if (href != null) {
      $.get(href, switch_pages);
    } else {
      switch_pages(html);
    }
  };

  $("a.stark-slide-in, a.stark-slide-out").live("click", function(event) {
    event.preventDefault();
    history.pushState({ }, '', this.href)
    var slide_from = $(this).hasClass("stark-slide-in") ? "right" : "left";
    $(this).addClass("stark-active");
    slide(this.href, slide_from);
  });

  var serialize = function(form) {
    var result = {};
    $(Array.prototype.slice.call(form.elements)).each(function () {
      if ($(form).attr('type') !== 'radio' || $(form).is(':checked')) {
        result[$(form).attr('name')] = $(form).val();
      }
    });
    return result;
  };

  $("form.stark-slide-in, form.stark-slide-out").live("submit", function(event) {
    event.preventDefault();
    var method = $(this).attr('method');
    var url = $(this).attr('action');
    var data = serialize(this);
    var slide_from = $(this).hasClass("stark-slide-in") ? "right" : "left";
    $.ajax({
      type: method || "POST",
      url: url,
      data: data,
      dataType: 'html',
      success: function(body) {
        slide(null, slide_from, body);
      },
      error: function(xhr, type) {  }
    })
  });

  $(window).bind('popstate', function(e) {
    if (e.state)
      slide(location.pathname, "left");
  });
});
