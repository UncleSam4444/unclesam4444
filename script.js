function filterData() {
  event.preventDefault();
  var startdate = document.getElementById("startdate").value;
  var enddate = document.getElementById("enddate").value;
  console.log("Starting date: " + startdate);
  console.log(Ending date: " + enddate); 
  fetch("https://compute.samford.edu/zohauth/clients/data"); 
}

async function fetchData() {
  const loader = document.getElementById('loader');
  const tableBody = document.querySelector('#data-table tbody');
  loader.style.display = 'block'; // Show the loader

  try {
      const response = await fetch('https://compute.samford.edu/zohauth/clients/datajson');
      if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();

      // Clear the table body
      tableBody.innerHTML = '';

      // Check if data is an array and has elements
      if (Array.isArray(data) && data.length > 0) {
          data.forEach(item => {
              const row = document.createElement('tr');
              row.innerHTML = `
                  <td><a href="details.html?id=${item.id}">Pitch ${item.id}</a></td>
                  <td>${item.speed !== undefined ? item.speed : '--'}</td>
                  <td>${item.result !== undefined ? item.result : '--'}</td>
                  <td>${item.datetime !== undefined ? item.datetime : '--'}</td>
              `;
              tableBody.appendChild(row);
          });
      } else {
          const row = document.createElement('tr');
          row.innerHTML = `<td colspan="4">No data available</td>`;
          tableBody.appendChild(row);
      }
  } catch (error) {
      console.error('Error fetching data:', error);
      const row = document.createElement('tr');
      row.innerHTML = `<td colspan="4">Error fetching data: ${error.message}</td>`;
      tableBody.appendChild(row);
  } finally {
      loader.style.display = 'none'; // Hide the loader
  }
}

// Fetch data when the page loads
window.onload = fetchData;