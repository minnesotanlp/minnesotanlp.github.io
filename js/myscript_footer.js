window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');

var json_pub_url = 'https://dykang.github.io/assets/publication.json';
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2023); });
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2022); });
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2021); });
// $.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2020); });
// $.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2019); });
// $.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2018); });
// $.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2017); });
// $.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2014); });
// $.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2011); });

var json_member_url = 'https://dykang.github.io/assets/members.json';
$.getJSON(json_member_url, function foo(result) { render_member(result, filter='current'); });

var json_alumni_url = 'https://dykang.github.io/assets/alumni.json';
$.getJSON(json_alumni_url, function foo(result) { render_alumni(result, filter='alumni'); });


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


