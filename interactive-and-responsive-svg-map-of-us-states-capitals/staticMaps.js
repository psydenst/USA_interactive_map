// staticMaps.js


function getStatesWithAILaws(stateData) {
  // Initialize an array to store the state IDs
  const statesWithAILaws = [];

  // Iterate over each state in stateData
  for (const [stateId, stateInfo] of Object.entries(stateData)) {
    // Check if the state has the "AI Laws" category enabled
    const hasAILaws = stateInfo.categories.some(category => {
      return (
        (category.id === "AI Laws (Elections)" || category.id === "AI Laws (Excluding Elections)") &&
        category.status === true
      );
    });

    // If the state has AI Laws enabled, add it to the array
    if (hasAILaws) {
      statesWithAILaws.push(stateId);
    }
  }
  console.log("here")l
  console.log(statesWithAILaws);

  // Return the array of state IDs
  return statesWithAILaws;
}

 getStatesWithAILaws(stateData);
