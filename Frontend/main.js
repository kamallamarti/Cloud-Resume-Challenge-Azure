const productionApiUrl = 'https://cloudresumeazurefunctionn5vqnelb.azurewebsites.net/api/count_function';

// Fallback to a localStorage counter if the API is not available
let visitCount = 1234; // Default starting value

// Initialize or increment the localStorage counter
function initLocalCounter() {
  // Check if we have a stored count
  let storedCount = localStorage.getItem('visitCount');

  if (storedCount) {
    // Increment the existing count
    storedCount = parseInt(storedCount) + 1;
  } else {
    // Start with the default value
    storedCount = visitCount;
  }

  // Save the new count
  localStorage.setItem('visitCount', storedCount.toString());
  return storedCount;
}

function getOrdinalSuffix(number) {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return 'th';
  }

  switch (lastDigit) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

async function getVisitCountAndUpdate() {
  try {
    // main.js
    // Pipeline test comment - please ignore
// Triggering workflow after job dependency fix
// Workflow trigger at 2025-04-18T11:17:14+02:00
    // First try to get the count from the API
    const response = await fetch(productionApiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const responseData = await response.json(); // Parse response as JSON
    visitCount = responseData.count;
  } catch (error) {
    console.error('Error fetching and updating visit count ', error);
    // Use the localStorage counter as fallback
    visitCount = initLocalCounter();
  } finally {
    // Always update the counter with either the API value or the fallback
    const suffix = getOrdinalSuffix(visitCount);
    document.getElementById('counter').textContent = `${visitCount}${suffix}`;
  }
}

// Wait for the DOM to be fully loaded before updating the counter
document.addEventListener('DOMContentLoaded', function() {
  getVisitCountAndUpdate();
});