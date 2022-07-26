// store in local storage
localStorage.setItem("darkMode", "hsl(235, 21%, 11%)");
localStorage.setItem("lightMode", "hsl(0, 0%, 98%)");
localStorage.setItem("darkBackground", "images/bg-desktop-dark.jpg");
localStorage.setItem("lightBackground", "images/bg-desktop-light.jpg");
localStorage.setItem("darkTodo", "hsl(235, 24%, 19%)");
localStorage.setItem("lightTodo", "hsl(236, 33%, 92%)");
localStorage.setItem("darkFont", "hsl(234, 39%, 85%)");
localStorage.setItem("lightFont", "hsl(233, 14%, 35%)");
localStorage.setItem("darkBorder", "1px solid hsl(237, 14%, 26%)");
localStorage.setItem("lightBorder", "1px solid hsl(233, 11%, 84%)");
localStorage.setItem("darkIcon", "images/icon-moon.svg");
localStorage.setItem("lightIcon", "images/icon-sun.svg");

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
    let todoItems = document.querySelectorAll(".item");
    if (localStorage.getItem("currentMode") == "darkMode") {
      todoItems.forEach(function (item) {
        item.style.borderBottom = localStorage.getItem("darkBorder");
        item.style.color = localStorage.getItem("darkFont");
      });
    } else {
      todoItems.forEach(function (item) {
        item.style.borderBottom = localStorage.getItem("lightBorder");
        item.style.color = localStorage.getItem("lightFont");
      });
    }

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
    let allItems = document.querySelectorAll(".item");

    if (e.target.innerHTML == "All") {
      allItems.forEach(function (item) {
        item.style.display = "flex";
      });
    } else if (e.target.innerHTML == "Active") {
      allItems.forEach(function (item) {
        item.classList.contains("checked-item")
          ? (item.style.display = "none")
          : (item.style.display = "flex");
      });
    } else {
      allItems.forEach(function (item) {
        item.classList.contains("checked-item")
          ? (item.style.display = "flex")
          : (item.style.display = "none");
      });
    }
  });
});

let background = document.getElementById("myBackground");
let todoList = document.querySelector(".list").children;
let iconSwitch = document.querySelector(".icon-switch img");
let inputItem = document.querySelector(".input input");

if (localStorage.getItem("currentMode") == "darkMode") {
  let todoItems = document.querySelectorAll(".item");

  document.body.style.backgroundColor = localStorage.getItem("darkMode");
  background.src = localStorage.getItem("darkBackground");
  iconSwitch.src = localStorage.getItem("darkIcon");
  inputItem.style.color = localStorage.getItem("darkFont");

  for (item of todoList) {
    item.style.backgroundColor = localStorage.getItem("darkTodo");
  }
  todoItems.forEach(function (item) {
    item.style.borderBottom = "1px solid hsl(237, 14%, 26%)";
    item.style.color = localStorage.getItem("darkFont");
  });
} else {
  let todoItems = document.querySelectorAll(".item");

  document.body.style.backgroundColor = localStorage.getItem("lightMode");
  background.src = localStorage.getItem("lightBackground");
  iconSwitch.src = localStorage.getItem("lightIcon");
  inputItem.style.color = localStorage.getItem("lightFont");

  for (item of todoList) {
    item.style.backgroundColor = localStorage.getItem("lightTodo");
  }
  todoItems.forEach(function (item) {
    item.style.borderBottom = "1px solid hsl(233, 11%, 84%)";
    item.style.color = localStorage.getItem("lightFont");
  });
}

// Switch Dark/Light Mode
let switchMode = document.querySelector(".icon-switch");
switchMode.addEventListener("click", function () {
  let todoItems = document.querySelectorAll(".item");

  if (localStorage.getItem("currentMode") == "darkMode") {
    localStorage.setItem("currentMode", "lightMode");
    document.body.style.backgroundColor = localStorage.getItem("lightMode");

    // Change the background image through js
    background.src = localStorage.getItem("lightBackground");
    inputItem.style.color = localStorage.getItem("lightFont");

    for (item of todoList) {
      item.style.backgroundColor = localStorage.getItem("lightTodo");
      item.style.color = localStorage.getItem("lightFont");
    }
    todoItems.forEach(function (item) {
      item.style.borderBottom = "1px solid hsl(233, 11%, 84%)";
      item.style.color = localStorage.getItem("lightFont");
    });

    iconSwitch.src = localStorage.getItem("lightIcon");
  } else {
    localStorage.setItem("currentMode", "darkMode");
    document.body.style.backgroundColor = localStorage.getItem("darkMode");

    // Change the background image through js
    background.src = localStorage.getItem("darkBackground");
    inputItem.style.color = localStorage.getItem("darkFont");

    for (item of todoList) {
      item.style.backgroundColor = localStorage.getItem("darkTodo");
      item.style.color = localStorage.getItem("darkFont");
    }
    todoItems.forEach(function (item) {
      item.style.borderBottom = "1px solid hsl(237, 14%, 26%)";
      item.style.color = localStorage.getItem("darkFont");
    });

    iconSwitch.src = localStorage.getItem("darkIcon");
  }
});
