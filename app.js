// ------------------------------
// VARIABLES
// ------------------------------

let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`;
const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");

// ------------------------------
// FETCH FUNCTIONS
// ------------------------------

fetch("https://randomuser.me/api/?results=12")
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
      <p class="address">${street}, ${state} ${postcode}</p>
      <p>Birthday: ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
    </div>
  `;

  overlay.classList.remove("hidden");
  modalContainer.innerHTML = modalHTML;
}

// function generateUser(data) {
//   // create user
//   for (let i = 0; i < data.length; i++) {
//     data[i] = `
//     <div href="#" class="card employee">
//       <div class="profile-pic employee">
//         <img class="employee" src=${data[i].picture.large}>
//       </div>
//       <div class="info employee">
//         <h3 class="employee">${data[i].name.first} ${data[i].name.last}</h3>
//         <p class="employee">${data[i].email}</p>
//         <p class="employee">${data[i].location.city}</p>
//       </div>
//     </div>`;
//   }

//   container.innerHTML = data.join(" ");
// }

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

// window.addEventListener("click", event => {
//   if (event.target.classList.contains("employee")) {
//     modal.style.display = "block";
//   }
// });

// closeBtn.addEventListener("click", () => {
//   modal.style.display = "none";
// });

// window.addEventListener("click", event => {
//   if (event.target == modalContainer) {
//     overlay.classList.add("hidden");
//   }
// });
