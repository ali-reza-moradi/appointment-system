import { getCookie } from "../utils/cookie.js";
import { getPersianDate } from "../utils/todaydate.js";

const logoutButton = document.getElementById("log-out");
const todayBox = document.getElementById("today_date");

// For Repalce English Number to Pesrian Number
const e2p = (s) => s.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);

// Log Out
const logoutHandler = () => {
  document.cookie = "token=; max-age=0";
  location.assign("index.html");
};

// Check for Login
const init = () => {
  const cookie = getCookie();
  if (!cookie) {
    location.assign("/");
  }
};

// Show Today Date
todayBox.innerHTML = `
      <p>امروز: ${e2p(getPersianDate())} </p>
`;

logoutButton.addEventListener("click", logoutHandler);
document.addEventListener("DOMContentLoaded", init);
