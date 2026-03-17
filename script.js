const apiEP = "https://randomuser.me/api?results=7";

let userList = [];

//slide to go to app scree
//

const slider = document.getElementById("mySlider");

slider.addEventListener("change", (e) => {
  const { value } = e.target;
  const label = document.querySelector("label");

  if (value > 80) {
    label.innerText = "";
    unlocked();
  } else {
    label.innerHTML = "slide to unlock";
  }
});

const unlocked = () => {
  document.querySelector(".homescreen").remove();

  document.querySelector(".appscreen").style.display = "block";
};

const displayContactScreen = () => {
  document.querySelector(".appscreen").remove();

  document.querySelector(".contactscreen").style.display = "block";

  fetchUsers(apiEP);
};

const fetchUsers = async (url) => {
  //fetch the user

  const response = await fetch(url);
  const data = await response.json();

  userList = data.results;

  //hide the spinner
  document.querySelector(".showSpinner").style.display = "none";
  //show the list
  displayContactList(userList);
};

//display contact list
const displayContactList = (userList) => {
  document.getElementById("list").style.display = "block";

  let str = "";

  userList.map((item, i) => {
    str += `
  <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse${i}"
                      aria-expanded="false"
                      aria-controls="collapse${i}"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="50px"
                        class="rounded-pill"
                      />
                      <div class="ms-2">
                        <div class="fw-bolder">${item.name.title} ${item.name.first} ${item.name.last} </div>
                        <small>${item.location.city} ${item.location.state} ${item.location.country}</small>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="collapse${i}"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div
                      class="accordion-body d-flex flex-column align-items-center"
                    >
                      <img
                        src="${item.picture.large}"
                        alt=""
                        width="150px"
                        class="rounded-pill"
                      />
                      <div>
                        <div class="fw-bolder">
                          <i class="bi bi-person-circle"></i>
                          ${item.name.title} ${item.name.first} ${item.name.last}
                        </div>
                        <div>
                          <a href="tel:${item.cell}">
                            <i class="bi bi-telephone-fill"></i> ${item.phone}</a
                          >
                        </div>
                        <div>
                          <a href="mailto:${item.email}">
                            <i class="bi bi-envelope-fill"></i>
                           ${item.email}</a
                          >
                        </div>
                        <div>
                          <a
                            href="https://www.google.com/maps/place/${item.location.street.number}+${item.location.street.name}+${item.location.city}+${item.location.state}+${item.location.country}+${item.location.postcode}"
                            target="_blank"
                            ><i class="bi bi-geo-alt-fill"></i>${item.location.street.number} ${item.location.street.name} ${item.location.city} ${item.location.state} ${item.location.country} ${item.location.postcode}
                            </a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  `;
  });

  document.getElementById("userAccordion").innerHTML = str;
  document.getElementById("userCount").innerText = userList.length;
};
///  search contact

document.getElementById("search").addEventListener("keyup", (e) => {
  const { value } = e.target;
  const filteredUser = userList.filter((item) => {
    const name = (item.name.first + "" + item.name.last).toLowerCase();
    return name.includes(value.toLowerCase());
  });

  displayContactList(filteredUser);
});
