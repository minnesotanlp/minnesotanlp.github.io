window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');

var json_pub_url = 'https://dykang.github.io/assets/publication.json';
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2025); });
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2024); });
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2023); });
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2022); });
$.getJSON(json_pub_url, function foo(result) { render_pub(result, filter=2021); });

var json_news_url = 'https://minnesotanlp.github.io/assets/news.json';
// var json_news_url = '../assets/news.json'; #for testing locally
console.log(json_news_url);
$.getJSON(json_news_url, function foo(result) { render_news(result); });

var json_member_url = 'https://dykang.github.io/assets/members.json';
$.getJSON(json_member_url, function foo(result) { render_member(result, filter='phd'); });
$.getJSON(json_member_url, function foo(result) { render_member(result, filter='mastersundergraduate'); });
$.getJSON(json_member_url, function foo(result) { render_member(result, filter='staff'); });

var json_alumni_url = 'https://dykang.github.io/assets/alumni.json';
$.getJSON(json_alumni_url, function foo(result) { render_alumni(result, filter='alumni'); });
$.getJSON(json_alumni_url, function foo(result) { render_alumni(result, filter='alumni_phd'); });
$.getJSON(json_alumni_url, function foo(result) { render_alumni(result, filter='alumni_masters'); });
$.getJSON(json_alumni_url, function foo(result) { render_alumni(result, filter='alumni_undergraduate'); });


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


