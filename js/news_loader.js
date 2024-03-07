window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');


var json_news_url = 'https://minnesotanlp.github.io/assets/news.json';
$.getJSON(json_news_url, function foo(result) { render_news(result); });

function render_news(elements=null, filter=null){
    var decoded_text = '';
    var counter = 0;
    $.each(elements, function (index, value) {
        counter += 1;
        if (value.date != null && value.description != null){
            var decodedVar = '<li>(' + value.date + ') ' + value.description + '</li>';
        }
        decoded_text += decoded_var;
    });
    if (counter > 0){
        decoded_text = decoded_text ;
    }
    $('#datalist_news').append(decoded_text);
}







