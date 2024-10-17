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




function createGradient(selectedCategories) {
  // Initialize an empty array to store color components
  const colorComponents = [];

  // Map selected categories to their corresponding color values
  const categoryColors = {
    "Privacy and Data Protection": "red",
    "Transparency, Platform Accountability and Anti-Censorship": "green",
    "Election Misinformation (Excluding AI)": "yellow",
    "AI-Generated Election Content": "blue",
    "AI Regulations (Excluding Elections)": "orange",
    "Cyberbullying, Defamation, and Harassment": "cyan",
    "Digital Literacy and Public Education": "purple"
  };

  // Loop through selected categories
  for (const category of selectedCategories) {
    const color = categoryColors[category];
    if (color) { // Check if category exists in the mapping
      colorComponents.push(color); // Add the color component to the array
    } else {
      console.warn(`Ignoring unknown category: ${category}`); // Handle unknown categories
    }
  }

  // If no color components are found, return a default color
  if (colorComponents.length === 0) {
    return '#D3D3D3';
  }

  // Create a gradient string using a template literal (supports multiple colors)
  const gradientString = `linear-gradient(to right, ${colorComponents.join(', ')})`;

  console.log(gradientString);
  // Create a new gradient element
  const gradientElement = document.getElementById("myGradient");

  // Clear existing stops (optional, if you want to dynamically change colors)
  while (gradientElement.firstChild) {
    gradientElement.removeChild(gradientElement.firstChild);
  }

  // Create new stop elements based on the color components
  for (let i = 0; i < colorComponents.length; i++) {
    const stopElement = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stopElement.setAttribute("offset", `${(i / (colorComponents.length - 1)) * 100}%`);
    stopElement.setAttribute("stop-color", colorComponents[i]);
    gradientElement.appendChild(stopElement);
  }

  // Append the gradient element to the SVG
//  document.getElementById("us-map").appendChild(gradientElement);

  return colorComponents;
}

  
  // return gradientString;


  // Function to update state colors based on selected categories
function updateStateColors(selectedCategories) {
  // ... (rest of your code)

  for (const stateId in stateData) {
    if (stateData.hasOwnProperty(stateId)) {
      const stateCategories = stateData[stateId].categories;
      let stateColor = '#D3D3D3'; // Default color
      let colorApplied = false; // Flag to track color application

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
            if (selectedCategories.length > 1) {
              const gradientString = createGradient(selectedCategories);
              $('#' + stateId).css('fill', "url(#myGradient)");
              colorApplied = true; // Set flag if color is applied
              break; // Exit the inner loop after applying gradient
            } else {
              stateColor = categoryColors[categoryName] || '#D3D3D3';
              break; // Assign the first matching category's color and exit
            }
          }
        }
      }

      // Apply the color to the state (only if not applied already)
      if (!colorApplied) {
        $('#' + stateId).css('fill', stateColor);
      }
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
