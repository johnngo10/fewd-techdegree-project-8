// ------------------------------
// VARIABLES
// ------------------------------

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const myModal = document.getElementById("myModal");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
const search = document.getElementById("search");
const card = document.querySelectorAll(".card");

// ------------------------------
// FETCH FUNCTIONS
// ------------------------------

fetch(`https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

// ------------------------------
// HELPER FUNCTIONS
// ------------------------------

function displayEmployees(employeeData) {
  employees = employeeData;

  // store the employee HTML
  let employeeHTML = "";

  // loop through each employee and create HTML markup
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture;

    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture.large}">
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
  });

  container.innerHTML = employeeHTML;
}

function displayModal(index) {
  // object destructuring
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture
  } = employees[index];

  let date = new Date(dob.date);

  const modalHTML = `
    <img class="avatar" src="${picture.large}">
    <div class="text-container">
      <h2 class="name">${name.first} ${name.last}</h2>
      <p class="email">${email}</p>
      <p class="address">${city}</p>
      <hr>
      <p>${phone}</p>
      <p class="address">${street.number} ${
    street.name
  }, ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// ------------------------------
// EVENT LISTENERS
// ------------------------------

container.addEventListener("click", e => {
  if (e.target !== container) {
    const card = e.target.closest(".card");
    const index = card.getAttribute("data-index");

    displayModal(index);
  }
});

modalClose.addEventListener("click", () => {
  overlay.classList.add("hidden");
});

// filter search
search.addEventListener("keyup", e => {
  const searchInput = e.target.value.toLowerCase();
  const names = document.querySelectorAll(".name");
  console.log(searchInput);
  for (let i = 0; i < names.length; i++) {
    const name = names[i].textContent.toLowerCase();
    const text = names[i].parentElement;
    const cards = text.parentElement;
    if (name.toLowerCase().indexOf(searchInput) > -1) {
      cards.style.display = "flex";
      modalContainer.style.display = "block";
      myModal.style.display = "block";
    } else {
      cards.style.display = "none";
      myModal.style.display = "block";
      modalContainer.style.display = "block";
    }
  }
});

//
