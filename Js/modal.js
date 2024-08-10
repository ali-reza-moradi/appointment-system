const modal = document.getElementById("modal");
const modalText = document.getElementById("modaltext");

const showModal = (text) => {
  modalText.innerText = text;
  modal.style.display = "flex";
};

const removeModal = () => {
  modal.style.display = "none";
};

export { showModal, removeModal };
