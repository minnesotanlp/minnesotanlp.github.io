var jsonRequestUrl = 'https://dykang.github.io/assets/publication.json';
// var decoder = $('<div />');

function render_pub(elements, filter=null){
    // var elements = result;
    // console.log(elements);



    var decodedText = '';
    var counter = 0;

    $.each(elements, function (index, value) {
        // decoder.html(value.title);
        // console.log(value);
        // decodedText += decoder.text();
        // console.log(value.year + ' / ' + value.topic + ' : ' + filter + ' / ' + index + ' : ' + counter);

        if (filter != null){
            if (value.year != filter && value.topic != filter){
                // console.log('Pass');
                return;
            }
        }
        

        counter += 1;

        venue_text = '';
        if (value.venue != null){
            venue_text = '<span class="venue"><a href="' + value.venue_link + '">' + value.venue + ' ' + value.year + '</a>';
            if (value.note != null){
                venue_text += ' (' + '<span class="highlight">' + value.note + '</span>)'
            }
            venue_text += ' / ' + '</span>';
        }
        paper_text = 'Paper';
        if (value.paper != null){
            paper_text = '<span class="tag"> <a href="' + value.paper + '">Paper</a></span>';
        }        
        code_text = '';
        if (value.code != null){
            code_text = '<span class="tag"> / <a href="' + value.code + '">Code</a></span>';
        }
        data_text = '';
        if (value.data != null){
            data_text = '<span class="tag"> / <a href="' + value.data + '">Data</a></span>';
        }
        demo_text = '';
        if (value.demo != null){
            demo_text = '<span class="tag"> / <a href="' + value.demo + '">Demo</a></span>';
        }        
        project_text = '';
        if (value.project != null){
            project_text = '<span class="tag"> / <a href="' + value.project + '">Project</a></span>';
        }
        tweet_text = '';
        if (value.tweet != null){
            tweet_text = '<span class="tag"> / <a href="' + value.tweet + '">Tweet</a></span>';
        }
        appendix_text = '';
        if (value.appendix != null){
            appendix_text = '<span class="tag"> / <a href="' + value.appendix + '">Appendix</a></span>';
        }

        var decodedVar = '<li><div class="publication"><div class="text"> \
            <div class="title">' + value.title + '</div> \
            <div class="authors">' + value.author + '</div> \
            <div>' + venue_text + paper_text + code_text + data_text + demo_text + project_text + tweet_text + appendix_text + 
            '</div></div></div></li>';


        decodedText += decodedVar;

    });
   
    if (counter > 0){
        decodedText = '<ul>' + decodedText + '</ul>';
    }

    div_tag = 'publication';
    if (filter != null){
        div_tag += '_' + filter;
        if (typeof filter === "number"){
            decodedText = '<div class="text anchor"><h4>' + filter + '</h4>' + decodedText + '</div>'
        }else{
            decodedText = '<div class="text anchor">' + decodedText + '</div>'
        }
        
    }
    
    // console.log(div_tag);
    console.log( filter + ' / ' + div_tag + ' : ' + counter );

    $('#'+div_tag).append(decodedText);
}



