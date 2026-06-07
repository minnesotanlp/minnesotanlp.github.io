
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

// Two-letter initials used as a graceful fallback when a photo is missing or fails to load.
function member_initials(name) {
    if (!name) return '';
    return name.trim().split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
}

// Photo block with an initials placeholder behind the image.
// The placeholder shows until the image loads, and re-appears if the image errors.
function member_photo(value, phClass) {
    var ini = '<span class="ini">' + member_initials(value.name) + '</span>';
    if (value.photo != null) {
        return '<span class="' + phClass + '">' + ini +
            '<img src="' + value.photo + '" alt="' + value.name + '" loading="lazy" ' +
            'onload="this.previousElementSibling.style.display=\'none\'" ' +
            'onerror="this.style.display=\'none\';this.previousElementSibling.style.display=\'flex\'"></span>';
    }
    return '<span class="' + phClass + '">' + ini + '</span>';
}


function render_member(elements, filter = null) {

    var cards = [];
    var counter = 0;

    $.each(elements, function (index, value) {

        // filters (preserve the live members.json position vocabulary)
        if (filter != null) {
            if (filter === 'current') {
                if (value.current === false) { return; }
            }
            if (filter === 'faculty') {
                if (value.position != 'Assistant Professor' && value.position != 'Associate Professor' && value.position != 'Professor') { return; }
            }
            if (filter === 'phd') {
                if (value.position != 'PhD' && value.position != 'Visiting PhD') { return; }
            }
            if (filter === 'mastersundergraduate') {
                if (value.position != 'Masters' && value.position != 'Undergraduate') { return; }
            }
            if (filter === 'visitors') {
                if (value.position != 'Research Engineer' && value.position != 'Postdoc' && value.position != 'Visiting Scholar') { return; }
            }
            if (filter === 'masters') {
                if (value.position != 'Masters') { return; }
            }
            if (filter === 'undergraduate') {
                if (value.position != 'Undergraduate') { return; }
            }
            if (filter === 'staff') {
                if (value.position != 'Staff') { return; }
            }
        }
        counter += 1;

        // Name (linked to homepage when available)
        var name_html = value.homepage != null
            ? '<a href="' + value.homepage + '" title="Visit homepage">' + value.name + '</a>'
            : value.name;

        // Role line: position, optional co-advisor
        var role_html = value.position || '';
        if (value.coadvisor != null) {
            role_html += ', w/ <a href="' + value.coadvisor_homepage + '">' + value.coadvisor + '</a>';
        }

        // Research interest (shown for students/visitors who have one)
        var interest_html = '';
        if (value.interest != null) {
            interest_html = '<div class="it">' + value.interest + '</div>';
        }

        // Fellowship / status tag
        var tag_html = '';
        if (value.fellow != null && value.name !== 'Young-Jun Lee' && value.name !== 'Seungyeon Jwa') {
            tag_html = '<span class="tg">' + value.fellow + '</span>';
        }

        var photo_block = member_photo(value, 'ph');
        var shot = value.homepage != null
            ? '<a class="shot" href="' + value.homepage + '">' + photo_block + '</a>'
            : photo_block;

        var card = '<div class="pc">' +
            shot +
            '<div class="nm">' + name_html + '</div>' +
            '<div class="rl">' + role_html + '</div>' +
            interest_html +
            tag_html +
            '</div>';

        cards.push(card);
    });

    shuffleArray(cards);

    var div_tag = 'members';
    if (filter != null) { div_tag += '_' + filter; }
    if (counter > 0) {
        $('#' + div_tag).append(cards.join(''));
    }
}



function render_alumni(elements, filter = null) {

    var counter = 0;
    var filter_second = null;

    var myArry = (filter || '').split('_');
    if (myArry.length > 1) { filter_second = myArry[1]; }

    var feat_cards = [];   // doctoral alumni
    var list_cells = [];   // masters / undergraduate alumni

    $.each(elements, function (index, value) {

        if (filter != null) {
            if (filter === 'alumni' || filter === 'alumni_phd' || filter === 'alumni_masters' || filter === 'alumni_undergraduate' || filter === 'alumni_mastersundergraduate') {
                if (value.current === true) { return; }
                if (filter === 'alumni_mastersundergraduate') {
                    if (value.position !== 'Masters' && value.position !== 'Undergraduate') { return; }
                } else if (filter_second != null && value.position != null) {
                    if (!value.position.toString().toLowerCase().includes(filter_second)) { return; }
                }
            }
        }
        counter += 1;

        var name_html = value.homepage != null
            ? '<a href="' + value.homepage + '">' + value.name + '</a>'
            : value.name;

        // Doctoral alumni: featured card with portrait, next role, and a note.
        if (filter === 'alumni_phd') {
            var next_html = '';
            if (value.next_position != null) {
                next_html = '<div class="nx">→ ' + value.next_position + '</div>';
            }
            var note_html = '';
            if (value.note != null) {
                note_html = '<div class="nt">' + value.note + '</div>';
            } else if (value.description != null) {
                note_html = '<div class="nt">' + value.description + '</div>';
            }

            feat_cards.push(
                '<div class="af">' +
                    member_photo(value, 'ph') +
                    '<div>' +
                        '<div class="nm">' + name_html + '</div>' +
                        next_html +
                        note_html +
                    '</div>' +
                '</div>'
            );
        }
        // Masters & undergraduate alumni: compact cell.
        else {
            var nx = (value.next_position != null && value.next_position !== '')
                ? '<br><span class="nx">' + value.next_position + '</span>'
                : '';
            list_cells.push('<div class="acell">' + name_html + nx + '</div>');
        }
    });

    if (counter > 0) {
        var div_tag = 'members' + (filter != null ? '_' + filter : '');
        if (filter === 'alumni_phd') {
            $('#' + div_tag).append(feat_cards.join(''));
        } else {
            $('#' + div_tag).append(list_cells.join(''));
        }
    }
}
