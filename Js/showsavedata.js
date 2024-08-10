// For Display the Entered Information and Final Confirmation

const sectionBox = document.getElementById("userdata");
const backUserData = document.getElementById("back-userdata");

const showSaveUserData = (last) => {
  sectionBox.innerHTML = " ";

  const showUserData = `

      <div id="title">
        <h2>در صورت صحت اطلاعات وارده گزینه <span>تائید</span> را بزنید.</h2>
      </div>

      <div id="check-user">
        <div class="user_item">
          <p>نام و نام خانوادگی :</p>
          <p>${last.name} ${last.lastName}</p>
        </div>

        <div class="user_item">
          <p>نام پدر :</p>
          <p>${last.fatherName}</p>
        </div>


        <div class="user_item">
          <p>کدملی :</p>
          <p>${last.nationalID}</p>
        </div>

        <div class="user_item">
          <p>تاریخ تولد :</p>
          <p>${last.date}</p>
        </div>

        <div class="user_item">
          <p>نام پزشک :</p>
          <p>${last.drName}</p>
        </div>

        <div class="user_item">
          <p>نوع بیمه :</p>
          <p>${last.bime}</p>
        </div>

        <div class="user_item">
          <p>نوع خدمت :</p>
          <p>${last.service}</p>
        </div>

        <div class="user_item">
          <p>شماره تماس :</p>
          <p>${last.phoneNumber}</p>
        </div>

        <div class="user_item">
          <p>تاریخ نوبت :</p>
          <p>${last.visitDate}</p>
        </div>

        <div class="user_item">
          <p>هزینه :</p>
          <p>${last.price}</p>
        </div>

        <div class="user_item">
          <p>کدرهگیری نوبت :</p>
          <p>${last.id}</p>
        </div>
      </div>

    `;
  backUserData.style.display = "block";
  sectionBox.innerHTML += showUserData;

  return showUserData;
};

export { showSaveUserData };
