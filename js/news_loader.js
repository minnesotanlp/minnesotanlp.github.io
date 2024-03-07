function render_news(elements=null, filter=null){
    var decoded_text = '';
    var counter = 0;
    $.each(elements, function (index, value) {
        counter += 1;
        console.log( value );
        if (value.date != null && value.description != null){
            var decodedVar = '<li>(' + value.date + ') ' + value.description + '</li>';
        }



        decoded_text += decodedVar;
    });



    if (counter > 0){
        decoded_text = '<ul>' + decoded_text + '</ul>';
    }



    console.log( decoded_text );

    $('#datalist_news').append(decoded_text);
}







