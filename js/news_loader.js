function render_news(elements = null, filter = null) {
    var decoded_text = '';
    var counter = 0;

    $.each(elements, function (index, value) {
        if (counter >= 8) return false;

        if (value.date != null && value.description != null) {
            counter += 1;

            decoded_text +=
                '<div class="news-card">' +
                    '<div class="news-date">' + value.date + '</div>' +
                    '<div class="news-content">' + value.description + '</div>' +
                '</div>';
        }
    });

    $('#items_news').append(decoded_text);
}
