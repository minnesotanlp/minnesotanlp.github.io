
function render_pub(elements, filter = null) {

    var items = [];
    var counter = 0;

    $.each(elements, function (index, value) {

        if (filter != null) {
            if (value.year != filter && value.topic != filter) { return; }
        }
        counter += 1;

        // Venue line (italic) with optional highlight note.
        var venue_text = '';
        if (value.venue != null) {
            venue_text = '<span class="venue"><a href="' + value.venue_link + '">' + value.venue + ' ' + value.year + '</a></span>';
            if (value.note != null) {
                venue_text += ' <span class="nt">' + value.note + '</span>';
            }
        }

        // Resource links (Paper / Code / Data / Demo / Project / Tweet / Appendix).
        var links = [];
        if (value.paper != null)    { links.push('<a href="' + value.paper + '">Paper</a>'); }
        if (value.code != null)     { links.push('<a href="' + value.code + '">Code</a>'); }
        if (value.data != null)     { links.push('<a href="' + value.data + '">Data</a>'); }
        if (value.demo != null)     { links.push('<a href="' + value.demo + '">Demo</a>'); }
        if (value.project != null)  { links.push('<a href="' + value.project + '">Project</a>'); }
        if (value.tweet != null)    { links.push('<a href="' + value.tweet + '">Tweet</a>'); }
        if (value.appendix != null) { links.push('<a href="' + value.appendix + '">Appendix</a>'); }
        var links_text = links.length ? '<span class="tag"> &middot; ' + links.join(' · ') + '</span>' : '';

        // Title links to the paper (or the next best available URL).
        var title_url = value.paper || value.venue_link || value.project || null;
        var title_html = title_url != null
            ? '<a href="' + title_url + '">' + value.title + '</a>'
            : value.title;

        items.push(
            '<div class="pit">' +
                '<div class="t">' + title_html + '</div>' +
                '<div class="a">' + value.author + '</div>' +
                '<div class="v">' + venue_text + links_text + '</div>' +
            '</div>'
        );
    });

    if (counter > 0) {
        var div_tag = 'publication';
        var block = items.join('');
        if (filter != null) {
            div_tag += '_' + filter;
            if (typeof filter === 'number') {
                block = '<div class="pblock">' +
                            '<div class="pyr">' + filter + '</div>' +
                            '<div class="pitems">' + block + '</div>' +
                        '</div>';
            }
        }
        $('#' + div_tag).append(block);
    }
}
