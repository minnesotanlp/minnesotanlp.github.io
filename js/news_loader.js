function render_news(elements = null, filter = null) {
    var decoded_text = '';
    var counter = 0;

    // Category accent colors (kept from the previous design for continuity).
    const categoryColors = {
        'defense': '#9C4423',
        'award': '#1976d2',
        'milestone': '#388e3c',
        'announcement': '#BC5630',
        'recruitment': '#7b1fa2',
        'internship': '#0097a7',
        'graduation': '#5e35b1',
        'career': '#00796b',
        'event': '#c2185b'
    };

    $.each(elements, function (index, value) {
        if (counter >= 8) return false;

        if (value.date != null && value.description != null) {
            counter += 1;

            var category = value.category || 'announcement';
            var importance = value.importance || 'normal';
            var categoryColor = categoryColors[category] || '#8A7765';

            var categoryBadge = '<span class="news-badge" style="background-color: ' + categoryColor + ';">' +
                category.charAt(0).toUpperCase() + category.slice(1) + '</span>';

            var importanceClass = importance === 'high' ? 'news-card-important' : '';

            decoded_text +=
                '<div class="news-card ' + importanceClass + '">' +
                    '<div class="news-header">' +
                        '<span class="news-date">' + value.date + '</span>' +
                        categoryBadge +
                    '</div>' +
                    '<div class="news-content">' + value.description + '</div>' +
                '</div>';
        }
    });

    if (counter > 0) {
        decoded_text = '<div class="news-container">' + decoded_text + '</div>';
    }

    $('#items_news').append(decoded_text);
}
