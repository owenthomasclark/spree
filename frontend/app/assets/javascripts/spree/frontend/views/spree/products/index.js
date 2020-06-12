Spree.ready(function ($) {
  $("#sort-by-overlay-show-button").click(function () {
    $("#sort-by-overlay").show();
  });
  $("#sort-by-overlay-hide-button").click(function () {
    $("#sort-by-overlay").hide();
  });

  $("#filter-by-overlay-show-button").click(function () {
    $("#filter-by-overlay").show();
  });
  $("#filter-by-overlay-hide-button").click(function () {
    $("#filter-by-overlay").hide();
  });

  function closeNoProductModal() {
    $("#no-product-available").removeClass("shown");
    $("#overlay").removeClass("shown");
  }

  $("#no-product-available-close-button").click(closeNoProductModal);
  $("#no-product-available-hide-button").click(closeNoProductModal);

  function customEncodeURI(value) {
    return encodeURI(
      value
        .replace(/\s/g, "+")
        .replace(/,/g, "%2C")
        .replace(/'/g, "%27")
        .replace(/\$/g, "%24")
    ).replace(/%25/g, "%");
  }

  function customDecodeURI(value) {
    return decodeURIComponent(value.replace(/\+/g, " "));
  }

  $(".plp-overlay-card-item").click(function (event) {
    event.preventDefault();
    var data = $(this).closest("a[data-params]").data();
    var searchParams = new URLSearchParams(location.search);
    var removeValue = $(this).hasClass("plp-overlay-card-item--selected");
    console.log(Array.from(searchParams));
    console.log(data.params);
    console.log(removeValue);

    for (var key in data.params) {
      if (searchParams.get(key) === null || key === "price") {
        searchParams.set(key, data.params[key].toString());
      } else if (searchParams.get(key) !== data.params[key].toString()) {
        console.log(data.params[key]);
        console.log(searchParams.get(key));

        var arr = searchParams.get(key).toString().split(",");
        var index = arr.indexOf(data.id.toString());

        if (index > -1 && removeValue) {
          arr.splice(index, 1);
        } else {
          arr.push(data.id.toString());
        }

        searchParams.set(key, arr.join(","));
      }
    }

    history.replaceState(
      {},
      "",
      location.pathname + "?" + customDecodeURI(searchParams.toString())
    );
    Turbolinks.visit(location);
    $(this).toggleClass("plp-overlay-card-item--selected");
  });

  $(
    "#filters-accordion .color-select, #plp-filters-accordion .color-select"
  ).click(function () {
    $(this)
      .find(".plp-overlay-color-item")
      .toggleClass("color-select-border--selected");
  });

  $(".plp-overlay-ul-li").click(function () {
    $(".plp-overlay-ul-li--active")
      .removeClass("plp-overlay-ul-li--active")
      .addClass("plp-overlay-ul-li");

    $(this)
      .removeClass("plp-overlay-ul-li")
      .addClass("plp-overlay-ul-li--active");
  });
});
