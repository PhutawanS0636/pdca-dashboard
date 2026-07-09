// Load Google's Looker Studio helper library
const dscc = require('@google/looker-studio-component');

// This function runs every single time your data refreshes or updates
function renderDashboard(data) {
  // 1. Clear out old dots
  document.getElementById("chart-dots").innerHTML = "";

  // 2. Extract the live rows sent by Looker Studio
  const rows = data.tables.DEFAULT;

  // 3. Loop through your real database rows instead of random numbers
  rows.forEach((row) => {
    const timestampValue = row.timestamp[0];
    const measurement = row.measurementValue[0];

    // Your exact math from your notepad file goes here:
    const topPercent = calculateTopPercentage(measurement);
    
    // Draw the dot onto your manager's custom HTML chart container!
    createNewChartDot(topPercent, timestampValue);
  });
}

// Subscribe to Looker Studio's live data pipeline stream
dscc.subscribeToData(renderDashboard, {transform: dscc.objectTransform});