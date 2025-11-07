
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) { 
   
        // Generate random number 
        var j = Math.floor(Math.random() * (i + 1));
                   
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
       
    return array;
 }

function render_member(elements, filter=null){

    var decodedText = '';
    var decodedTextList = [];

    var counter = 0;
    // console.log(elements);


    $.each(elements, function (index, value) {
        // decoder.html(value.title);
        // console.log(value);
        // decodedText += decoder.text();
    //    console.log(value.name + ' / ' + value.position + ' : ' + filter + ' / ' + index + ' : ' + counter);

        // filters
        if (filter != null){
            if (filter === 'current'){
                if (value.current === false){
                    // console.log('Pass');
                        return;
                }
            }

            if (filter === 'faculty'){
                if (value.position != `Assistant Professor` && value.position != `Associate Professor` && value.position != `Professor`){
                    // console.log('Pass');
                        return;
                }
                console.log('Pass (faculty): ' + value);
            }
            if (filter === 'phd'){
                if (value.position != `PhD`){
                    // console.log('Pass');
                        return;
                }
            }
            if (filter === 'mastersundergraduate'){
                if (value.position != `Masters` && value.position != `Undergraduate`){
                    // console.log('Pass');
                        return;
                }          
            }          
            if (filter === 'staff'){
                if (value.position != `Research Engineer` && value.position != `Postdoc`){
                    // console.log('Pass');
                        return;
                }          
            }                     
            if (filter === 'masters'){
                if (value.position != `Masters`){
                    // console.log('Pass');
                        return;
                }
            }
            if (filter === 'undergraduate'){
                if (value.position != `Undergraduate`){
                    // console.log('Pass');
                        return;
                }
            }                        

        }
        counter += 1;

        member_figure = '';
        if (value.photo != null){
            member_figure = '<img class="member_image" src="' + value.photo + '" alt="' + value.name + '">';
        }

        member_name = '';
        if (value.homepage != null){
            member_name = '<a href="' + value.homepage + '">' + value.name + '</a><br>';
        } else{
            member_name = value.name  + '<br>';
        }
        member_name +=  value.position
        member_coadvisor = '';
        if (value.coadvisor != null){
            member_coadvisor = ', w/ <a href="' + value.coadvisor_homepage + '">' + value.coadvisor + '</a>';
        }
        member_fellow = '';
        if (value.fellow != null){
            member_fellow = ', ' + value.fellow + '';
        }

        member_interest = '';
        if (value.interest != null){
            member_interest = '<br><i>' + value.interest + '</i>';
        }

        var decodedVar = '<figure class="member_figure">' + member_figure + '<figcaption class="member_image_caption">' + member_name + member_coadvisor + member_fellow + member_interest + '</figcaption></figure>';


        decodedText += decodedVar;
        decodedTextList.push(decodedVar);
    });

    shuffleArray(decodedTextList);
   
    if (counter > 0){
        // decodedText = '<div class="members_wrapper" style="width:100%">' + decodedText + '</div>';
        decodedText = '<div class="members_wrapper" style="width:100%">' + decodedTextList.join('') + '</div>';
        // decodedText = decodedText ;

    }

    div_tag = 'members';
    if (filter != null){
        div_tag += '_' + filter;
    }
    // console.log('Filter: ' + div_tag + decodedText);

    $('#'+div_tag).append(decodedText);
}



function render_alumni(elements, filter=null){

    var decodedText = '';
    var counter = 0;
    // console.log(elements);
    var filter_second = null;

    
    const myArry = filter.split("_");
    if (myArry.length > 1){
        filter_second = myArry[1];
    }

    $.each(elements, function (index, value) {
    //    console.log(value.name + ' / ' + value.position + ' : ' + filter + ' / ' + index + ' : ' + counter);

        // filters
        if (filter != null){
            if (filter === 'alumni' | filter === 'alumni_phd' | filter === 'alumni_masters' | filter === 'alumni_undergraduate'){
                if (value.current === true){
                        // console.log('Pass');
                        return;
                }
                if (filter_second != null && value.position != null){
                    if (! value.position.toString().toLowerCase().includes(filter_second)){
                        // console.log('%%%%% Filtering:',value.position.toString().toLowerCase(), filter_second);
                        return;
                    }else{
                        // console.log(value.position, filter_second, value);
                    }
                }
            }
        }
        counter += 1;

        member_name = value.name;
        // if (value.homepage != null){
        member_name = '<a href="' + value.homepage + '">' + value.name + '</a>';
        // } 
        
        member_description = '';
        if (value.description != null){
            member_description = ' (' + value.description + ')';
        }

        member_next_position = '';
        if (value.next_position != null){
            member_next_position = value.next_position ;
        }else{
            member_next_position = '';
        }

        var decodedVar = null;


        if (filter_second == null || member_next_position == ''){
            decodedVar = '<div class="col-2 justify-content-left" style="text-align: center">' + member_name +  '</div>';
        } else{
            decodedVar = '<div class="col-2 justify-content-left" style="text-align: center">' + member_name+ '<br> (' + member_next_position + ')</div>';
        }

        // console.log(decodedVar, value.position, filter_second);

        decodedText += decodedVar;

    });
    // console.log(decodedText,counter);
   
    if (counter > 0){
        // decodedText =  decodedText ;
        decodedText = '<div class="members_wrapper" style="width:100%">' + decodedText + '</div>';

    }

    div_tag = 'members';
    if (filter != null){
        div_tag += '_' + filter;
        
    }


    // console.log(div_tag,'==========================', decodedText);
    $('#'+div_tag).append(decodedText);
}







