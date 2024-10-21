function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log(Ending date: " + enddate); 
  fetch("https://compute.samford.edu/zohauth/clients/data"); 
}

// URL to fetch data from
const dataUrl = 'https://compute.samford.edu/zohauth/clients/datajson';

// Function to fetch and populate the table
async function fetchAndPopulateTable() {
  try {
    const response = await fetch(dataUrl);
    const data = await response.json();

    const tableBody = document.getElementById('pitchTableBody');
    tableBody.innerHTML = '';  // Clear existing rows

    data.forEach(item => {
      const row = document.createElement('tr');

      // Create ID cell with hyperlink
      const idCell = document.createElement('td');
      const link = document.createElement('a');
      link.href = 'details.html';  // Link to a details page
      link.textContent = `Pitch ${item.id}`;
      idCell.appendChild(link);
      row.appendChild(idCell);

      // Create Speed cell
      const speedCell = document.createElement('td');
      speedCell.textContent = item.speed;
      row.appendChild(speedCell);

      // Create Result cell
      const resultCell = document.createElement('td');
      resultCell.textContent = item.result || '--';  // Display '--' if result is empty
      row.appendChild(resultCell);

      // Create Datetime cell
      const datetimeCell = document.createElement('td');
      datetimeCell.textContent = item.datetime || '--';  // Display '--' if datetime is empty
      row.appendChild(datetimeCell);

      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Call the function to populate the table on page load
fetchAndPopulateTable();
