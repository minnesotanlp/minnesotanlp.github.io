window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');


function toggle_read_more() {
    var moreText = document.getElementById("more_datalist_news");
    var btnText = document.getElementById("read_more_button");
    if (moreText.style.display === "none") {
      moreText.style.display = "block";
      btnText.textContent = "Read Less";
    } else {
      moreText.style.display = "none";
      btnText.textContent = "Read More";
    }
  }

var json_news_url = 'https://dykang.github.io/assets/publication.json'; // for testing
// var json_news_url = 'file:///Users/risako/Desktop/assets/news.json '; // for the actual website
$.getJSON(json_news_url, function foo(result) { render_news(result); });

function render_news(elements=null, filter=null){
    var decoded_text = '';
    var more_decoded_text = '';
    var counter = 0;
    for (let i = 0; i < elements.length; i++) {
        const value = elements[i];
        counter += 1;

        // for testing
        if (value.year != null && value.title != null) {
            var decoded_var = '<li>(' + value.year + ') ' + value.title + '</li>';

        // for the actual website
        // if (value.date != null && value.description != null){
            // var decodedVar = '<li>(' + value.date + ') ' + value.description + '</li>';
        }
        if (i < 3) {
            decoded_text += decoded_var;
        } else {
            more_decoded_text += decoded_var;
        }
    }
   
    if (counter > 0){
        decoded_text = decoded_text ;
    }

    $('#datalist_news').append(decoded_text);
    $('#more_datalist_news').append(more_decoded_text);
}







