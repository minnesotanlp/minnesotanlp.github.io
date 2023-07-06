window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-166307709-1');

showPubs(1);

$(function () {
    $('span.talks').click(function () {
        $('#datalist_talks li:hidden').slice(0, 5).show();
        if ($('#datalist_talks li').length == $('#datalist_talks li:visible').length) {
            $('span.talks').hide();
        }
    });
});

$(function () {
    $('span.news').click(function () {
        $('#datalist_news li:hidden').slice(0, 5).show();
        if ($('#datalist_news li').length == $('#datalist_news li:visible').length) {
            $('span.news').hide();
        }
    });
});

$(function () {
    $('span.awards').click(function () {
        $('#datalist_awards li:hidden').slice(0, 5).show();
        if ($('#datalist_awards li').length == $('#datalist_awards li:visible').length) {
            $('span.awards').hide();
        }
    });
});
