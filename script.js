// 1 select used components
const form = document.querySelector("form");
const ol = document.querySelector("ol");
const input = document.querySelector("input");

// 2 check for undefined members
console.log(form);
console.log(ol);
console.log(input);

// add event on submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Check if input value is empty with a ternary operator
  input.value.trim()
    ? // if input is not null, then create new task
      createTask()
        // if is null, then no function call
      : null;
});

function createTask() {
  // Create new task elements
  const newTask = document.createElement("li");
  const newButton = document.createElement("button");

  // Set up button to delete the task
  newButton.addEventListener("click", () => newTask.remove());

  // Set content and append elements
  newTask.textContent = input.value;
  newButton.textContent = "X";
  newTask.appendChild(newButton);
  ol.appendChild(newTask);

  // Clear the input field
  input.value = "";
}
