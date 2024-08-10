import { getCookie } from "../utils/cookie.js";
import { removeModal, showModal } from "./modal.js";
import { showSaveUserData } from "../Js/showsavedata.js";

const userInfo = document.getElementById("user").querySelector("button");
const userData = JSON.parse(localStorage.getItem("userData"));
const allInputs = document.querySelectorAll("input");
const allSelect = document.querySelectorAll("select");
const removeBotton = document.getElementById("btn-remove");
const saveBotton = document.getElementById("btn-sign");
const modalButton = document.getElementById("modal-button");
const rejectButton = document.querySelector(".reject-btn");
const finalSaveButton = document.querySelector(".save-btn");
const backUserData = document.getElementById("back-userdata");
const priceInfoData = document.querySelector(".price-btn");

const bimeValue = document.getElementById("bime");
const serviceValue = document.getElementById("service");

const customerData = JSON.parse(localStorage.getItem("customerData")) || [];
let last = null;

// Show Logined User
userInfo.innerText = `${userData.name} ${userData.lastname}`;

// Check Login
const init = () => {
  const cookie = getCookie();
  if (!cookie) {
    location.assign("/");
  }
};

//  Save To LocalStorage
const saveToLocalStorage = () => {
  localStorage.setItem("customerData", JSON.stringify(customerData));
};

// Generate Random ID
const generateId = () => {
  return Math.round(Math.random() * Math.random() * Math.pow(5, 8)).toString();
};

// Save User Info
const saveInfoCoustomer = () => {
  const allInputArray = [allInputs];
  const drName = allSelect[0].value;
  const bime = allSelect[1].value;
  const service = allSelect[2].value;

  allInputArray.filter((input) => {
    const customerInfo = {
      id: generateId(),
      name: input[0].value,
      lastName: input[1].value,
      fatherName: input[2].value,
      nationalID: input[3].value,
      date: input[4].value,
      phoneNumber: input[5].value,
      visitDate: input[6].value,
      price: priceInfoData.innerText,
      drName,
      bime,
      service,
    };

    if (customerInfo.name && customerInfo.lastName && customerInfo.nationalID) {
      customerData.push(customerInfo);
      saveToLocalStorage();
    } else {
      showModal("تمامی موارد ستاره دار تکمیل گردد");
      return;
    }

    if (customerData) {
      last = customerData[customerData.length - 1];
      console.log(last);
    }
    console.log(last);

    showSaveUserData(last);
  });
};

// To delete the entered information from all input
const removeHandler = () => {
  allInputs.forEach((input) => {
    input.value = "";
  });
};

// Reject the entered information in showSaveData Box
const removeShowSaveData = () => {
  backUserData.style.display = "none";

  localStorage.customerData = JSON.stringify(
    JSON.parse(localStorage.customerData ?? "[]").slice(0, -1)
  );
  customerData.splice(customerData.length - 1, 1);
};

//  Final Confirmation entered information
const finalSaveHandler = () => {
  backUserData.style.display = "none";
  removeHandler();
};
const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
const sp = (number) => {
  const seperatedNumber = number
    .toString()
    .match(/(\d+?)(?=(\d{3})+(?!\d)|$)/g);
  const joinedNumber = seperatedNumber.join(",");
  return e2p(joinedNumber);
};

//  For Final Price Calculation
let defaultPrice = 0;
const updateBimePrice = (event) => {
  const bimeValue = event.target.value;

  switch (bimeValue) {
    case "تامین اجتماعی":
      priceInfoData.innerHTML = `${sp(100000)} تومان`;
      defaultPrice = 100000;
      break;

    case "نیروهای مسلح":
      priceInfoData.innerHTML = `${sp(150000)} تومان`;
      defaultPrice = 150000;
      break;

    default:
      priceInfoData.innerHTML = `${sp(500000)} تومان`;
      defaultPrice = 500000;
      break;
  }
};
const updateServicePrice = (event) => {
  const bimeValue = event.target.value;

  switch (bimeValue) {
    case "ویزیت":
      priceInfoData.innerHTML = `${sp(50000 + defaultPrice)} تومان`;
      break;

    case "جراحی":
      priceInfoData.innerHTML = `${sp(700000 + defaultPrice)} تومان`;
      break;

    default:
      priceInfoData.innerHTML = `${0 + defaultPrice} تومان`;
      break;
  }
};

document.addEventListener("DOMContentLoaded", init);
removeBotton.addEventListener("click", removeHandler);
saveBotton.addEventListener("click", saveInfoCoustomer);
modalButton.addEventListener("click", removeModal);
rejectButton.addEventListener("click", removeShowSaveData);
finalSaveButton.addEventListener("click", finalSaveHandler);

bimeValue.addEventListener("change", updateBimePrice);
serviceValue.addEventListener("change", updateServicePrice);
