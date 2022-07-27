let inputCheck = document.querySelector(".input .input-check");
inputCheck.addEventListener("click", function () {
  this.classList.toggle("checked");
});
// Add items to todo list
function addTodo() {
  let todo = document.querySelector(".input input");
  if (todo.value.length != 0) {
    let item = inputCheck.classList.contains("checked")
      ? `<div class="item checked-item">
    <div class="check checked">
      <img src="images/icon-check.svg" alt="check" />
    </div>
    <div class="title checked-title">
      ${todo.value}
      <div class="cross">
        <img src="images/icon-cross.svg" alt="cross icon" />
      </div>
    </div>
  </div>`
      : `<div class="item">
  <div class="check">
    <img src="images/icon-check.svg" alt="check" />
  </div>
  <div class="title">
    ${todo.value}
    <div class="cross">
      <img src="images/icon-cross.svg" alt="cross icon" />
    </div>
  </div>
</div>`;
    document.querySelector(".list-body").innerHTML += item;
    todo.value = "";

    crossEvent();
    checkLength();

    // Check items
    let checks = document.querySelectorAll(".check");
    checks.forEach(function (check) {
      check.addEventListener("click", function () {
        this.classList.toggle("checked");
        this.parentElement.classList.toggle("checked-item");
        let title = this.parentElement.querySelector(".title");
        title.classList.toggle("checked-title");
        checkLength();
      });
    });
  }
}
let input = document.querySelector(".input input");
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

function checkLength() {
  let length = document.querySelector(".list-body").children.length;
  let checkedLength = document.querySelectorAll(".checked-item").length;
  let itemsLength = document.querySelector(".length");
  itemsLength.innerHTML = length - checkedLength;
}

function crossEvent() {
  // delete item with button
  let deleteCross = document.querySelectorAll(".cross");
  deleteCross.forEach(function (cross) {
    cross.addEventListener("click", function () {
      this.parentElement.parentElement.remove();
      checkLength();
    });
  });
}

// Clear Btn
let clear = document.querySelector(".clear");
clear.addEventListener("click", function () {
  let checkedItems = document.querySelectorAll(".checked-item");
  checkedItems.forEach(function (item) {
    item.remove();
  });
});

// filter items
let filters = document.querySelectorAll(".filter");
filters.forEach(function (filter) {
  filter.addEventListener("click", function (e) {
    //  Remove active form all
    filters.forEach(function (filter) {
      filter.classList.remove("active");
    });

    e.target.classList.add("active");
  });
});
