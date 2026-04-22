function render_news(elements=null, filter=null){
    var decoded_text = '';
    var counter = 0;
    
    // Category colors mapping
    const categoryColors = {
        'defense': '#d32f2f',
        'award': '#1976d2',
        'milestone': '#388e3c',
        'announcement': '#f57c00',
        'recruitment': '#7b1fa2',
        'internship': '#0097a7',
        'graduation': '#5e35b1',
        'career': '#00796b',
        'event': '#c2185b'
    };

    $.each(elements, function (index, value) {
        if (counter >= 5) return false;
        counter += 1;

        if (value.date != null && value.description != null){
            // Get category and importance
            var category = value.category || 'announcement';
            var importance = value.importance || 'normal';
            var categoryColor = categoryColors[category] || '#666';
            
            // Create category badge
            var categoryBadge = '<span class="news-badge" style="background-color: ' + categoryColor + ';">' + 
                               category.charAt(0).toUpperCase() + category.slice(1) + '</span>';
            
            // Highlight important news with border
            var importanceClass = importance === 'high' ? 'news-card-important' : '';
            
            // Build card
            var decodedVar = '<div class="news-card ' + importanceClass + '">' +
                            '<div class="news-header">' +
                            categoryBadge +
                            '<span class="news-date">' + value.date + '</span>' +
                            '</div>' +
                            '<div class="news-content">' + value.description + '</div>' +
                            '</div>';
        }

        decoded_text += decodedVar;
    });

    if (counter > 0){
        decoded_text = '<div class="news-container">' + decoded_text + '</div>';
    }

    $('#items_news').append(decoded_text);
}







