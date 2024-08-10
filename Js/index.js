import { getCookie } from "../utils/cookie.js";
import { getData } from "../utils/httpsreq.js";
import { removeModal, showModal } from "./modal.js";

const inputBox = document.querySelectorAll("input");
const loginButton = document.querySelector("button");
const modalButton = document.getElementById("modal-button");

const loginHandler = async (event) => {
  event.preventDefault();

  const username = inputBox[0].value;
  const password = inputBox[1].value;

  const data = await getData();

  const filterData = data.find(
    (user) => username === user.username && password === user.password
  );

  if (filterData) {
    location.assign("index.html");
    document.cookie =
      "token=agkdjgdduyudhjadajdaklibn-sdsdkjskdjjdsjdk-dsjdhsufmmmfs,-chjuiequylkdaoio";
  } else {
    showModal("رمز عبور یا نام کاربری اشتباه وارد شده است!");
    return;
  }

  const newFilterData = { name: filterData.name, lastname: filterData.family };

  const strUserData = JSON.stringify(newFilterData);
  localStorage.setItem("userData", strUserData);
};

const init = () => {
  const cookie = getCookie();
  if (cookie) {
    location.assign("content.html");
  }
};

loginButton.addEventListener("click", loginHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", init);
