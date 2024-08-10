import { getCookie } from "../utils/cookie.js";

let userData = JSON.parse(localStorage.getItem("customerData")) || [];
const tableBody = document.querySelector("tbody");
const backEditbox = document.getElementById("back-editbox");
const closeEditBtn = document.querySelector(".close-edit-btn");
const saveEditBtn = document.querySelector(".save-edit-btn");
const inputEditBox = document.querySelectorAll(".infoinput-editbox");
const searchInput = document.getElementById("search").querySelector("input");
const searchButton = document.getElementById("search").querySelector("button");
const filterDrName = document.getElementById("drname-search");
let newUserDataInfo;

// For Repalce English Number to Pesrian Number
const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// For Repalce Pesrian Number to English Number
const p2e = (s) =>
  s.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

// For when there is no information
if (userData.length === 0) {
  tableBody.innerHTML = `
  <tr>
    <td colspan="13">موردی وجود ندارد</td>
  </tr>
  `;
}

// Show All UserInfo in Table
const displayUserInfo = () => {
  userData.forEach((user, index) => {
    tableBody.innerHTML += `
    <tr>
      <td>${index + 1}</td>
      <td>${user.name} ${user.lastName}</td>
      <td>${user.fatherName}</td>
      <td>${e2p(user.nationalID)}</td>
      <td>${e2p(user.date)}</td>
      <td>${user.drName}</td>
      <td>${user.service}</td>
      <td>${user.bime}</td>
      <td>${e2p(user.price)}</td>
      <td>${e2p(user.id)}</td>
      <td>${e2p(user.visitDate)}</td>
      <td>${e2p(user.phoneNumber)}</td>
      <td>
        <button class="edit-btn" data-id="${user.id}" >ویرایش</button>
        <button class="delete-btn" data-id="${user.id}">حذف</button>
      </td>
    </tr>  
    `;
    const allDeleteBtn = document.querySelectorAll(".delete-btn");
    allDeleteBtn.forEach((button) => {
      button.addEventListener("click", function () {
        deleteHandler(this.getAttribute("data-id"));
      });
    });

    const allEditBtn = document.querySelectorAll(".edit-btn");
    allEditBtn.forEach((button) => {
      button.addEventListener("click", function () {
        editHandler(this.getAttribute("data-id"));
      });
    });
  });
};

displayUserInfo();

// for delete special item --> Delete Button
function deleteHandler(id) {
  const newUserData = userData.filter((user) => user.id != id);
  console.log(newUserData);
  newUserDataInfo = newUserData;
  localStorage.removeItem("customerData");
  localStorage.setItem("customerData", JSON.stringify(newUserDataInfo));
  location.reload();
}

// Show  Edit Box Modal
function editHandler(id) {
  backEditbox.style.display = "flex";
  const editUserData = userData.find((todo, index) => todo.id === id);
  inputEditBox[0].value = editUserData.name;
  inputEditBox[1].value = editUserData.lastName;
  inputEditBox[2].value = editUserData.fatherName;
  inputEditBox[3].value = editUserData.nationalID;
  inputEditBox[4].value = editUserData.date;
  inputEditBox[5].value = editUserData.phoneNumber;
  inputEditBox[6].value = editUserData.visitDate;

  saveEditBtn.dataset.id = id;
}

// Save Change From Edit Box
const applayEditHandler = (event) => {
  const id = event.target.dataset.id;
  const newEditUserData = userData.find((todo) => todo.id === id);
  newEditUserData.name = inputEditBox[0].value;
  newEditUserData.lastName = inputEditBox[1].value;
  newEditUserData.fatherName = inputEditBox[2].value;
  newEditUserData.nationalID = inputEditBox[3].value;
  newEditUserData.date = inputEditBox[4].value;
  newEditUserData.phoneNumber = inputEditBox[5].value;
  newEditUserData.visitDate = inputEditBox[6].value;

  localStorage.setItem("customerData", JSON.stringify(userData));
  location.reload();
};

// for Access this page
const init = () => {
  const cookie = getCookie();
  if (!cookie) {
    location.assign("/");
  }
};

// Search User with nationalID
const searchHandler = () => {
  const query = p2e(searchInput.value.trim().toString());
  if (!query) {
    location.reload();
  } else {
    const filterUser = userData.filter((user, index) => {
      const filt = user.nationalID.includes(query);
      return filt;
    });
    console.log(filterUser[0]);
    tableBody.innerHTML = "";
    tableBody.innerHTML += `
    <tr>
      <td>1</td>
      <td>${filterUser[0].name} ${filterUser[0].lastName}</td>
      <td>${filterUser[0].fatherName}</td>
      <td>${e2p(filterUser[0].nationalID)}</td>
      <td>${e2p(filterUser[0].date)}</td>
      <td>${filterUser[0].drName}</td>
      <td>${filterUser[0].service}</td>
      <td>${filterUser[0].bime}</td>
      <td>${e2p(filterUser[0].price)}</td>
      <td>${e2p(filterUser[0].id)}</td>
      <td>${e2p(filterUser[0].visitDate)}</td>
      <td>${e2p(filterUser[0].phoneNumber)}</td>
      <td>
        <button class="edit-btn" data-id="${filterUser[0].id}" >ویرایش</button>
        <button class="delete-btn" data-id="${filterUser[0].id}">حذف</button>
      </td>
    </tr>  
    `;

    const allDeleteBtn = document.querySelectorAll(".delete-btn");
    allDeleteBtn.forEach((button) => {
      button.addEventListener("click", function () {
        deleteHandler(this.getAttribute("data-id"));
      });
    });

    const allEditBtn = document.querySelectorAll(".edit-btn");
    allEditBtn.forEach((button) => {
      button.addEventListener("click", function () {
        editHandler(this.getAttribute("data-id"));
      });
    });
  }
};

// Close Edit Box
const closeEditBox = () => {
  backEditbox.style.display = "none";
};

// Filter by Doctor Name with Select Option
const filterDrNameHandler = (event) => {
  tableBody.innerHTML = "";

  const category = event.target.value;

  const filterUser = userData.filter((user) => {
    const filt = user.drName.includes(category);
    return filt;
  });

  if (category === "همه") {
    tableBody.innerHTML = "";

    displayUserInfo();
  } else {
    filterUser.forEach((user, index) => {
      tableBody.innerHTML += `
      <tr>
        <td>${index + 1}</td>
        <td>${user.name} ${user.lastName}</td>
        <td>${user.fatherName}</td>
        <td>${e2p(user.nationalID)}</td>
        <td>${e2p(user.date)}</td>
        <td>${user.drName}</td>
        <td>${user.service}</td>
        <td>${user.bime}</td>
        <td>${e2p(user.price)}</td>
        <td>${e2p(user.id)}</td>
        <td>${e2p(user.visitDate)}</td>
        <td>${e2p(user.phoneNumber)}</td>
        <td>
          <button class="edit-btn" data-id="${user.id}" >ویرایش</button>
          <button class="delete-btn" data-id="${user.id}">حذف</button>
        </td>
      </tr>  
      `;
      const allDeleteBtn = document.querySelectorAll(".delete-btn");
      allDeleteBtn.forEach((button) => {
        button.addEventListener("click", function () {
          deleteHandler(this.getAttribute("data-id"));
        });
      });

      const allEditBtn = document.querySelectorAll(".edit-btn");
      allEditBtn.forEach((button) => {
        button.addEventListener("click", function () {
          editHandler(this.getAttribute("data-id"));
        });
      });
    });
  }
};

document.addEventListener("DOMContentLoaded", init);
closeEditBtn.addEventListener("click", closeEditBox);
saveEditBtn.addEventListener("click", applayEditHandler);
searchButton.addEventListener("click", searchHandler);
filterDrName.addEventListener("change", filterDrNameHandler);
