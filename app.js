// ------------------------------
// ELEMENT SELECTORS
// ------------------------------

const container = document.querySelector(".container");
const employees = document.querySelectorAll(".card");

// ------------------------------
// FETCH FUNCTIONS
// ------------------------------

function fetchData(url) {
  return fetch(url).then(res => res.json());
}

fetchData("https://randomuser.me/api/?results=12").then(data =>
  generateUser(data.results)
);

// ------------------------------
// HELPER FUNCTIONS
// ------------------------------

function generateUser(data) {
  for (let i = 0; i < data.length; i++) {
    data[i] = `
    <div class="card">
      <div>
        <img src=${data[i].picture.large}>
      </div>
      <div>
        <h3>${data[i].name.first} ${data[i].name.last}</h3>
        <p>${data[i].email}</p>
        <p>${data[i].location.city}</p>
      </div>
    </div>`;
  }

  container.innerHTML = data;
}

// ------------------------------
// EVENT LISTENERS
// ------------------------------
