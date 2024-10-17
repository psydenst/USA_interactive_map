// main.js

// Ensure that this script is loaded after colors.js and statesData.js

$(document).ready(function() {
  // Function to display state information in the banner
  function displayStateInfo(stateId) {
    const data = stateData[stateId];
    if (data) {
      // Update the banner with the state's data
      $('#state-name').text(`${data.name}`);
      $('#state-code').text(`${data.code}`); // Assuming state code is the ID

      // Clear previous categories
      $('#state-categories').empty();

      // Check if categories exist
      if (data.categories && data.categories.length > 0) {
        // Filter categories where status is true
        const activeCategories = data.categories.filter(category => category.status === true);

        if (activeCategories.length > 0) {
          activeCategories.forEach(category => {
            // Render only categories with status true
            const categoryItem = `<li><b>${category.id}</b>: ${category.lawName || 'Yes'}</li>`;
            $('#state-categories').append(categoryItem);
          });
        } else {
          $('#state-categories').append('<li>No laws in any of the listed categories.</li>');
        }
      } else {
        $('#state-categories').append('<li>No categories available.</li>');
      }

      $('#banner').fadeIn(); // Show the banner with a fade-in effect
    } else {
      // Handle the case where data is not found
      $('#state-name').text('State data not found');
      $('#state-code').text('');
      $('#state-categories').empty();
      $('#banner').fadeIn();
    }
  }

  // Handle hover events on states and circles to show the info-box
  $("path, circle").hover(function(e) {
    $('#info-box').css('display', 'block');
    $('#info-box').html($(this).data('info'));
  });

  $("path, circle").mouseleave(function(e) {
    $('#info-box').css('display', 'none');
  });

  // Update the position of the info-box based on mouse movement
  $(document).mousemove(function(e) {
    $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
    $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
  }).mouseover(); // Trigger the mouseover to set initial position

  // Detect iOS devices and modify link behaviors
  var ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  if (ios) {
    $('a').on('click touchend', function() {
      var link = $(this).attr('href');
      window.open(link, '_blank');
      return false;
    });
  }

  // Handle click events on states to display information
  $('.state').on('click', function() {
    const stateId = $(this).attr('id'); // Get the ID of the clicked state
    console.log(`State clicked: ${stateId}`);
    displayStateInfo(stateId); // Call the function to display info
  });

  // Event listener to close the banner
  $('#close-btn').on('click', function() {
    $('#banner').fadeOut(); // Hide the banner with a fade-out effect
  });

  // Function to log selected categories and update state colors
  function updateSelectedCategories() {
    const selectedCategories = [];

    // Iterate over each checked checkbox within the filter_cat fieldset
    $('#filter_cat input[type=checkbox]:checked').each(function() {
      // Retrieve the text of the corresponding label
      const categoryName = $(this).next('label').text().trim();
      selectedCategories.push(categoryName);
    });

    // Log the selected categories to the console
    console.log('Selected Categories:', selectedCategories);

    // Update the state colors based on selected categories
    updateStateColors(selectedCategories);
  }

  // Function to update state colors based on selected categories
  function updateStateColors(selectedCategories) {
    // Iterate through each state in stateData
    for (const stateId in stateData) {
      if (stateData.hasOwnProperty(stateId)) {
        const stateCategories = stateData[stateId].categories;
        let stateColor = '#D3D3D3'; // Default color

        // Find matching categories with status=true
        const matchingCategories = stateCategories.filter(category => 
          selectedCategories.includes(category.id) && category.status === true
        );

        if (matchingCategories.length > 0) {
          // If multiple categories match, prioritize based on the order of selectedCategories
          for (let i = 0; i < selectedCategories.length; i++) {
            const categoryName = selectedCategories[i];
            const category = matchingCategories.find(cat => cat.id === categoryName);
            if (category) {
              stateColor = categoryColors[categoryName] || '#D3D3D3';
              break; // Assign the first matching category's color
            }
          }
        }

        // Apply the color to the state
        $('#' + stateId).css('fill', stateColor);
      }
    }
  }

  // Initial log and color assignment on page load
  updateSelectedCategories();

  // Event listener for checkbox state changes
  $('#filter_cat input[type=checkbox]').on('change', function() {
    updateSelectedCategories();
  });
});
