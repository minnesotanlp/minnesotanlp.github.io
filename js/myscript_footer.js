window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');

var jsonRequestUrl = 'https://dykang.github.io/assets/publication.json';

$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2023); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2022); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2021); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2020); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2019); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2018); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2017); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2014); });
$.getJSON(jsonRequestUrl, function foo(result) { render_pub(result, filter=2011); });


$(function () {
    $('span.alumni').click(function () {
        $('#datalist_alumni li:hidden').slice(0, 5).show();
        if ($('#datalist_alumni li').length == $('#datalist_alumni li:visible').length) {
            $('span.alumni').hide();
        }
    });
});


function show_alumni() {
    var x = document.getElementById("datalist_alumni");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }


