window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');

// ---- Publications (chronological, newest first) ----
var json_pub_url = 'https://dykang.github.io/assets/publication_with_abstract.json';
$.getJSON(json_pub_url, function (result) { render_pub(result, filter=2026); });
$.getJSON(json_pub_url, function (result) { render_pub(result, filter=2025); });
$.getJSON(json_pub_url, function (result) { render_pub(result, filter=2024); });
$.getJSON(json_pub_url, function (result) { render_pub(result, filter=2023); });
$.getJSON(json_pub_url, function (result) { render_pub(result, filter=2022); });
$.getJSON(json_pub_url, function (result) { render_pub(result, filter=2021); });

// ---- News ----
var json_news_url = 'https://minnesotanlp.github.io/assets/news.json';
// var json_news_url = '../assets/news.json'; // for testing locally
$.getJSON(json_news_url, function (result) { render_news(result); });

// ---- Current members ----
var json_member_url = 'https://dykang.github.io/assets/members.json';
$.getJSON(json_member_url, function (result) { render_member(result, filter='faculty'); });
$.getJSON(json_member_url, function (result) { render_member(result, filter='visitors'); });
$.getJSON(json_member_url, function (result) { render_member(result, filter='phd'); });
$.getJSON(json_member_url, function (result) { render_member(result, filter='mastersundergraduate'); });

// ---- Alumni ----
var json_alumni_url = 'https://dykang.github.io/assets/alumni.json';
$.getJSON(json_alumni_url, function (result) { render_alumni(result, filter='alumni_phd'); });
$.getJSON(json_alumni_url, function (result) { render_alumni(result, filter='alumni_mastersundergraduate'); });
