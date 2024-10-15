$(document).ready(function() {
    // Existing hover functionality
    $("path, circle").hover(function(e) {
        $('#info-box').css('display', 'block');
        $('#info-box').html($(this).data('info'));
    });

    $("path, circle").mouseleave(function(e) {
        $('#info-box').css('display', 'none');
    });

    $(document).mousemove(function(e) {
        $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
        $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
    }).mouseover();

    // New click event to display the banner
    $("path, circle").click(function() {
        // Get the state name and info
        var stateName = $(this).attr('id');
        var stateInfo = $(this).data('info');

        // Update the banner content
        $('#state-name').text(stateName);

        // Assuming stateInfo contains HTML content
        $('#state-categories').html(stateInfo);

        // Show the banner
        $('#banner').css('display', 'block');
    });

    // Close button functionality
    $('#close-btn').click(function() {
        $('#banner').css('display', 'none');
    });

    // iOS fix
    var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    if (ios) {
        $('a').on('click touchend', function() {
            var link = $(this).attr('href');
            window.open(link, '_blank');
            return false;
        });
    }
});
