var SPONSORS = [
    { "name": "University of Minnesota", "url": "https://twin-cities.umn.edu/", "img": "img/sponsors/umn.png" },
    { "name": "Grammarly", "url": "https://www.grammarly.com/blog/engineering/category/nlp-ml/", "img": "img/sponsors/grammarly_icon.png" },
    { "name": "Google Research", "url": "https://research.google/", "img": "img/sponsors/google.png" },
    { "name": "NSF", "url": "https://new.nsf.gov/focus-areas/artificial-intelligence", "img": "img/sponsors/NSF_Official_logo_Med_Res.png" },
    { "name": "Cisco", "url": "https://www.cisco.com/site/us/en/solutions/artificial-intelligence/index.html", "img": "img/sponsors/cisco.png" },
    { "name": "Naver", "url": "https://www.navercorp.com/", "img": "img/sponsors/Naver_Logotype.svg.png" },
    { "name": "Sony", "url": "https://www.sony.com/en/SonyInfo/research-award-program/", "img": "img/sponsors/sony_icon.png" },
    { "name": "Open Philanthropy", "url": "https://www.openphilanthropy.org/", "img": "img/sponsors/openphilanthropy.jpg" },
    { "name": "NSF (TR)", "url": "https://new.nsf.gov/focus-areas/artificial-intelligence", "img": "img/sponsors/tr.png" },
    { "name": "Accenture", "url": "https://www.accenture.com/us-en/about/accenture-labs-index", "img": "img/sponsors/accenture.png" },
    { "name": "3M", "url": "https://news.3m.com/", "img": "img/sponsors/3m_icon.png" },
    { "name": "MNRI", "url": "https://cse.umn.edu/mnri", "img": "img/sponsors/mnri_icon.jpg" }
];

function render_sponsors() {
    var container = $('#funding-logos');
    container.empty();
    container.addClass('sponsor-list');

    var wideLogoSponsors = {
        'Cisco': true,
        'NSF': true,
        'NSF (TR)': true,
        'MNRI': true
    };

    $.each(SPONSORS, function (index, sponsor) {
        var img = $('<img>')
            .attr('src', sponsor.img)
            .attr('alt', sponsor.name)
            .addClass('sponsor-logo');

        if (wideLogoSponsors[sponsor.name]) {
            img.addClass('sponsor-logo-wide');
        }

        var link = $('<a>')
            .attr('href', sponsor.url)
            .attr('target', '_blank')
            .attr('rel', 'noopener')
            .attr('title', sponsor.name)
            .addClass('sponsor-link')
            .append(img);

        container.append($('<div>').addClass('sponsor-item').append(link));
    });
}

$(document).ready(function () {
    render_sponsors();
});
