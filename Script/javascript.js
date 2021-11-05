var instance = $(".hs__wrapper");
$.each(instance, function (key, value) {
  var arrows = $(instance[key]).find(".arrow"),
    prevArrow = arrows.filter(".arrow-prev"),
    nextArrow = arrows.filter(".arrow-next"),
    box = $(instance[key]).find(".hs"),
    x = 0,
    mx = 0,
    maxScrollWidth = box[0].scrollWidth - box[0].clientWidth / 2 - box.width() / 2;

  $(arrows).on("click", function () {
    if ($(this).hasClass("arrow-next")) {
      x = box.width() / 2 + box.scrollLeft() - 10;
      box.animate({
        scrollLeft: x,
      });
    } else {
      x = box.width() / 2 - box.scrollLeft() - 10;
      box.animate({
        scrollLeft: -x,
      });
    }
  });

  $(box).on({
    mousemove: function (e) {
      var mx2 = e.pageX - this.offsetLeft;
      if (mx) this.scrollLeft = this.sx + mx - mx2;
    },
    mousedown: function (e) {
      this.sx = this.scrollLeft;
      mx = e.pageX - this.offsetLeft;
    },
    scroll: function () {
      toggleArrows();
    },
  });

  $(document).on("mouseup", function () {
    mx = 0;
  });

  function toggleArrows() {
    if (box.scrollLeft() > maxScrollWidth - 10) {
      // disable next button when right end has reached
      nextArrow.addClass("disabled");
    } else if (box.scrollLeft() < 10) {
      // disable prev button when left end has reached
      prevArrow.addClass("disabled");
    } else {
      // both are enabled
      nextArrow.removeClass("disabled");
      prevArrow.removeClass("disabled");
    }
  }
});

$(function () {
  // ------------------------------------------------------- //
  // Multi Level dropdowns
  // ------------------------------------------------------ //
  $("ul.dropdown-menu [data-toggle='dropdown']").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    $(this).siblings().toggleClass("show");

    if (!$(this).next().hasClass("show")) {
      $(this).parents(".dropdown-menu").first().find(".show").removeClass("show");
    }
    $(this)
      .parents("li.nav-item.dropdown.show")
      .on("hidden.bs.dropdown", function (e) {
        $(".dropdown-submenu .show").removeClass("show");
      });
  });
});
$(document).ready(function () {
  $("#myCarousel").on("slide.bs.carousel", function (e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 4;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item").eq(i).appendTo(".carousel-inner");
        } else {
          $(".carousel-item").eq(0).appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });
});
// work in progress - needs some refactoring and will drop JQuery i promise :)
