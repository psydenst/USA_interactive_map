// main.js

$("path, circle").hover(function(e) {
  $('#info-box').css('display','block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function(e) {
  $('#info-box').css('display','none');
});

$(document).mousemove(function(e) {
  $('#info-box').css('top',e.pageY-$('#info-box').height()-30);
  $('#info-box').css('left',e.pageX-($('#info-box').width())/2);
}).mouseover();

var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
if(ios) {
  $('a').on('click touchend', function() {
    var link = $(this).attr('href');
    window.open(link,'_blank');
    return false;
  });
}

$(document).ready(function() {
  $('.state').on('click', function() {
    const stateId = $(this).attr('id'); // Get the ID of the clicked state
    console.log(stateId)
    displayStateInfo(stateId);          // Call the function to display info
  });

  // Event listener to close banner
    $('#close-btn').on('click', function() {
    $('#banner').hide();
  });
});


// main.js
function displayStateInfo(stateId) {
  const data = stateData[stateId];
  if (data) {
    // Update the banner with the state's data
    $('#state-name').text(`State: ${data.name}`);
    $('#state-code').text(`Code: ${data.code}`);

    // Clear previous categories
    $('#state-categories').empty();

    // Check if categories exist
    if (data.categories && data.categories.length > 0) {
      // Filter categories where status is true
      const activeCategories = data.categories.filter(category => category.status === true);

      if (activeCategories.length > 0) {
        activeCategories.forEach(category => {
          // Render only categories with status true
          const categoryItem = `<li>Category ${category.id}: Active</li>`;
          $('#state-categories').append(categoryItem);
        });
      } else {
        $('#state-categories').append('<li>No active categories available.</li>');
      }
    } else {
      $('#state-categories').append('<li>No categories available.</li>');
    }

    $('#banner').show(); // Ensure the banner is visible
  } else {
    // Handle the case where data is not found
    $('#state-name').text('State data not found');
    $('#state-code').text('');
    $('#state-categories').empty();
    $('#banner').show();
  }
}
