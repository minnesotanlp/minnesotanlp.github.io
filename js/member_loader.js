
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
                if (value.position != `PhD` && value.position != `Visiting PhD`){
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
            if (filter === 'visitors'){
                if (value.position != `Research Engineer` && value.position != `Postdoc` && value.position != `Visiting Scholar`){
                    console.log('Pass');
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
        } else {
            member_figure = '<img class="member_image" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22%3E%3Crect width=%22120%22 height=%22120%22 fill=%22%23e0e0e0%22/%3E%3C/svg%3E" alt="No photo available for ' + value.name + '">';
        }

        member_name = '';
        if (value.homepage != null){
            member_name = '<a href="' + value.homepage + '" title="Visit homepage">' + value.name + '</a><br>';
        } else{
            member_name = value.name  + '<br>';
        }
        member_name +=  value.position
        member_coadvisor = '';
        if (value.coadvisor != null){
            member_coadvisor = ', w/ <a href="' + value.coadvisor_homepage + '">' + value.coadvisor + '</a>';
        }
        member_fellow = '';
        if (value.fellow != null && value.name !== 'Young-Jun Lee' && value.name !== 'Seungyeon Jwa'){
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
        decodedText = '<div class="members_wrapper" style="width:110%">' + decodedTextList.join('') + '</div>';
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

        // PhD alumni format - one per row with left column (image + name) and right column (next position + description)
        if (filter === 'alumni_phd'){
            member_figure = '';
            if (value.photo != null){
                member_figure = '<img class="member_image" src="' + value.photo + '" alt="' + value.name + '" style="width: 100px; height: 100px;">';
            }

            var phd_name_link = '<a href="' + value.homepage + '">' + value.name + '</a>';
            
            // Left column: photo and name
            var left_column = '<div style="flex: 0 0 150px; display: flex; flex-direction: column; align-items: center; gap: 10px;">' + 
                              member_figure + 
                              '<div style="text-align: center;">' + phd_name_link + '</div>' +
                              '</div>';

            // Right column: next position and description/interest
            var right_column_content = '';
            if (value.note != null){
                right_column_content += value.note;
            }

            var right_column = '<div style="flex: 1; padding-left: 20px; display: flex; align-items: center;">' + right_column_content + '</div>';

            decodedVar = '<div style="display: flex; margin-bottom: 20px; border-bottom: 1px solid #ddd; padding-bottom: 20px;">' + 
                         left_column + 
                         right_column + 
                         '</div>';
        }
        // Condensed layout for masters and undergraduate alumni
        else if (filter === 'alumni_masters' || filter === 'alumni_undergraduate'){
            if (member_next_position == ''){
                decodedVar = '<span style="margin-right: 15px; display: inline-block;">' + member_name + '</span>';
            } else{
                decodedVar = '<span style="margin-right: 15px; display: inline-block;">' + member_name+ ' (' + member_next_position + ')</span>';
            }
        } else{
            if (filter_second == null || member_next_position == ''){
                decodedVar = '<div class="col-3" style="text-align: center;">' + member_name +  '</div>';
            } else{
                decodedVar = '<div class="col-3" style="text-align: center;">' + member_name+ '<br> (' + member_next_position + ')</div>';
            }
        }

        // console.log(decodedVar, value.position, filter_second);

        decodedText += decodedVar;

    });
    // console.log(decodedText,counter);
   
    if (counter > 0){
        // decodedText =  decodedText ;
        // Use condensed wrapper for masters and undergraduate alumni
        if (filter === 'alumni_masters' || filter === 'alumni_undergraduate'){
            decodedText = '<div class="members_wrapper_condensed" style="width:100%; display: flex; flex-wrap: wrap; gap: 5px;">' + decodedText + '</div>';
        } else if (filter === 'alumni_phd'){
            // PhD alumni: full-width rows with left/right layout
            decodedText = '<div style="width:100%;">' + decodedText + '</div>';
        } else{
            decodedText = '<div class="members_wrapper row" style="width:100%">' + decodedText + '</div>';
        }

    }

    div_tag = 'members';
    if (filter != null){
        div_tag += '_' + filter;
        
    }


    // console.log(div_tag,'==========================', decodedText);
    $('#'+div_tag).append(decodedText);
}







