function render_news(elements=null, filter=null){
    var decoded_text = '';
    var counter = 0;
    $.each(elements, function (index, value) {
        counter += 1;
        console.log( value );
        if (value.date != null && value.description != null){
            var decodedVar = '<li>(' + value.date + ') ' + value.description + '</li>';
        }
        decoded_text += decoded_var;
    });
    if (counter > 0){
        decoded_text = decoded_text ;
    }
    console.log( decoded_text );

    $('#datalist_news').append(decoded_text);
}







