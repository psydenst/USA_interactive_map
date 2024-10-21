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

    const categoryColors = {
      "Privacy and Data Protection": "#800000", // Darker red
      "Transparency, Platform Accountability and Anti-Censorship": "#006400", // Darker green
      "Election Misinformation (Excluding AI)": "#808000", // Darker yellow
      "AI-Generated Election Content": "#008080", // Darker cyan
      "AI Regulations (Excluding Elections)": "#000000", // Darker orange
      "Cyberbullying, Defamation, and Harassment": "#000080", // Darker blue
      "Digital Literacy and Public Education": "#800080" // Darker purple
    };



  // Function to log selected categories and update state colors
  function updateSelectedCategories() {
    const selectedCategories = [];

    // Iterate over each checked checkbox within the filter_cat fieldset
    $('#filter_cat input[type=radio]:checked').each(function() {
      // Retrieve the text of the corresponding label
      const categoryName = $(this).next('label').text().trim();
      
      selectedCategories.push(categoryName);
    });

    // Deselect all other checkboxes

    // Log the selected categories to the console

    // Update the state colors based on selected categories
    updateStateColors(selectedCategories);
  }




function createGradient(selectedCategories) {
  console.log("Hello from gradient");
}

// Define your custom function
function selectAllCategories() {
  // Implement your desired logic for handling "All categories" selection here
  console.log("Hello from all");
  // all states go to defautl color
  $('.state').css('fill', '#D3D3D3'); // Applies to all elements with class "state"
  $('#filter_cat input[type="radio"]').prop('checked', false);

  $('#8').prop('checked', true);

  $('#AL').css('fill', 'url(#AL_gradient)'); // Apply the gradient  
  $('#AK').css('fill', 'url(#AK_gradient)'); // Apply the gradient
  $('#AZ').css('fill', 'url(#AZ_gradient)'); // Apply the gradient
  $('#AR').css('fill', 'url(#AR_gradient)'); // Apply the gradient
  $('#CA').css('fill', 'url(#CA_gradient)'); // Apply the gradient
  $('#CO').css('fill', 'url(#CO_gradient)'); // Apply the gradient
  $('#CT').css('fill', 'url(#CT_gradient)'); // Apply the gradient
  $('#DE').css('fill', 'url(#DE_gradient)'); // Apply the gradient
  $('#DC').css('fill', '#000080');
  $('#FL').css('fill', 'url(#FL_gradient)'); // Apply the gradient
  $('#GA').css('fill', 'url(#GA_gradient)'); // Apply the gradient
  $('#HI').css('fill', 'url(#HI_gradient)'); // Apply the gradient
  $('#ID').css('fill', 'url(#ID_gradient)'); // Apply the gradient
  $('#IL').css('fill', 'url(#IL_gradient)'); // Apply the gradient
  $('#IN').css('fill', 'url(#IN_gradient)'); // Apply the gradient
  $('#IA').css('fill', 'url(#IA_gradient)'); // Apply the gradient
  $('#KS').css('fill', 'url(#KS_gradient)'); // Apply the gradient
  $('#KY').css('fill', 'url(#KY_gradient)'); // Apply the gradient
  $('#LA').css('fill', 'url(#LA_gradient)'); // Apply the gradient
  $('#ME').css('fill', '#D3D3D3'); // Apply the gradient
  $('#MD').css('fill', 'url(#MD_gradient)'); // Apply the gradient
  $('#MA').css('fill', 'url(#MA_gradient)'); // Apply the gradient
  $('#MI').css('fill', 'url(#MI_gradient)'); // Apply the gradient
  $('#MN').css('fill', 'url(#MN_gradient)'); // Apply the gradient
  $('#MS').css('fill', 'url(#MS_gradient)'); // Apply the gradient
  $('#MO').css('fill', 'url(#MO_gradient)'); // Apply the gradient
  $('#MT').css('fill', 'url(#MT_gradient)'); // Apply the gradient
  $('#NE').css('fill', 'url(#NE_gradient)'); // Apply the gradient
  $('#NV').css('fill', 'url(#NV_gradient)'); // Apply the gradient
  $('#NH').css('fill', 'url(#NH_gradient)'); // Apply the gradient
  $('#NJ').css('fill', 'url(#NJ_gradient)'); // Apply the gradient
  $('#NM').css('fill', 'url(#NM_gradient)'); // Apply the gradient
  $('#NY').css('fill', 'url(#NY_gradient)'); // Apply the gradient
  $('#NC').css('fill', 'url(#NC_gradient)'); // Apply the gradient
  $('#ND').css('fill', 'url(#ND_gradient)'); // Apply the gradient
  $('#OH').css('fill', 'url(#OH_gradient)'); // Apply the gradient
  $('#OK').css('fill', 'url(#OK_gradient)'); // Apply the gradient
  $('#OR').css('fill', 'url(#OR_gradient)'); // Apply the gradient
  $('#PA').css('fill', 'url(#PA_gradient)'); // Apply the gradient
  $('#RI').css('fill', 'url(#RI_gradient)'); // Apply the gradient
  $('#SC').css('fill', 'url(#SC_gradient)'); // Apply the gradient
  $('#SD').css('fill', 'url(#SD_gradient)'); // Apply the gradient
  $('#TN').css('fill', 'url(#TN_gradient)'); // Apply the gradient
  $('#TX').css('fill', 'url(#TX_gradient)'); // Apply the gradient
  $('#UT').css('fill', 'url(#UT_gradient)'); // Apply the gradient
  $('#VT').css('fill', 'url(#VT_gradient)'); // Apply the gradient
  $('#VA').css('fill', 'url(#VA_gradient)'); // Apply the gradient
  $('#WA').css('fill', 'url(#WA_gradient)'); // Apply the gradient
  $('#WV').css('fill', 'url(#WV_gradient)'); // Apply the gradient
  $('#WI').css('fill', 'url(#WI_gradient)'); // Apply the gradient
  return ;
}


  // Função para esconder o fieldset
  function closeFieldset() {
    document.getElementById('filter_cat').style.display = 'none';
  }

  // Função para mostrar o fieldset novamente
  function openFieldset() {
    document.getElementById('filter_cat').style.display = 'flex';
  }

  // Adicionar o evento de clique ao botão de fechar
  document.getElementById('close-btn-ctg').addEventListener('click', closeFieldset);
  // Function to update state colors based on selected categories
  function updateStateColors(selectedCategories) {


    if (selectedCategories == "All categories") {
      selectAllCategories();
      return ;
    }
    const hasCyber = selectedCategories.includes("Cyberbullying, Defamation, and Harassment");
    
      for (const stateId in stateData) {
        if (stateData.hasOwnProperty(stateId)) {
          const stateCategories = stateData[stateId].categories;
          let stateColor = '#D3D3D3'; // Default color

          // Find matching category with status=true based on the last selected category
          const matchingCategory = stateCategories.find(category =>
            category.id === selectedCategories[selectedCategories.length - 1] && category.status === true
          );

          if (matchingCategory) {
            stateColor = categoryColors[matchingCategory.id] || '#D3D3D3';
          }

          if (hasCyber && stateId == "WDC") {
            $('#DC').css('fill', stateColor);
          } else if (!hasCyber) {
            $('#DC').css('fill', "#D3D3D3");
          }
          console.log("Debug: am I here?")
          $('#' + stateId).css('fill', stateColor);
        }
      }
  }
  // Initial log and color assignment on page load
  updateSelectedCategories();

  // Event listener for checkbox state changes
  $('#filter_cat input[type=radio]').on('click', function() {
    updateSelectedCategories();
  });
});
