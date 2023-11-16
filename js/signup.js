jQuery(function ($) {
  $("#phone").mask("+38(099) 999-9999");
});

const regButton = document.getElementById("reg-submit");
const deleteButton = document.getElementById("delete-selected");
const duplicateButton = document.getElementById("duplicate-selected");

regButton.addEventListener("click", function (event) {
  event.preventDefault();
  registerUser();
});

deleteButton.addEventListener("click", function (event) {
  event.preventDefault();
  deleteSelected();
});

duplicateButton.addEventListener("click", function (event) {
  event.preventDefault();
  duplicateSelected();
});

function registerUser() {
  clearErrorMessages();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const lastName = document.getElementById("last_name").value;
  const firstName = document.getElementById("first_name").value;
  const middleName = document.getElementById("middle_name").value;
  const birthdate = document.getElementById("birthdate").value;
  const group = document.getElementById("group").value;
  const file = document.getElementById("file").value;
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const phone = document.getElementById("phone").value;

  if (
    !validateForm(
      email,
      password,
      lastName,
      firstName,
      middleName,
      birthdate,
      group,
      file,
      gender,
      phone
    )
  ) {
    return;
  }
  const userData = {
    email: email,
    password: password,
    lastName: lastName,
    firstName: firstName,
    middleName: middleName,
    birthdate: birthdate,
    group: group,
    file: file,
    gender: gender,
    phone: phone,
  };

  addToUserTable(userData);
  clearForm();
}

function validateForm(
  email,
  password,
  lastName,
  firstName,
  middleName,
  birthdate,
  group,
  file,
  gender,
  phone
) {
  const checkingFields = [
    { value: email, name: "email" },
    { value: password, name: "password" },
    { value: lastName, name: "last-name" },
    { value: firstName, name: "first-name" },
    { value: middleName, name: "middle-name" },
    { value: birthdate, name: "birthdate" },
    { value: group, name: "group" },
    { value: file, name: "file" },
    { value: gender, name: "gender" },
    { value: phone, name: "phone" },
  ];
  for (let field of checkingFields) {
    if (!field.value.trim()) {
      displayErrorMessage(`${field.name}`, `${field.name} is required`);
      return false;
    }
  }
  return true;
}
function displayErrorMessage(field, message) {
  const errorElement = document.getElementById(`${field}-error`);
  errorElement.style.color = "red";
  errorElement.textContent = message;
}
function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
  });
}

function clearForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("last_name").value = "";
  document.getElementById("first_name").value = "";
  document.getElementById("middle_name").value = "";
  document.getElementById("birthdate").value = "";
  document.getElementById("group").value = "";
  document.getElementById("file").value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
  document.getElementById("phone").value = "";
}

function addToUserTable(userData) {
  const table = document
    .getElementById("userTable")
    .getElementsByTagName("tbody")[0];
  const row = table.insertRow(-1);

  const checkboxCell = row.insertCell(0);
  const emailCell = row.insertCell(1);
  const lastNameCell = row.insertCell(2);
  const firstNameCell = row.insertCell(3);
  const middleNameCell = row.insertCell(4);
  const birthdateCell = row.insertCell(5);
  const groupCell = row.insertCell(6);
  const fileCell = row.insertCell(7);
  const genderCell = row.insertCell(8);
  const phoneCell = row.insertCell(9);

  checkboxCell.innerHTML = '<input type="checkbox">';
  emailCell.innerHTML = userData.email;
  lastNameCell.innerHTML = userData.lastName;
  firstNameCell.innerHTML = userData.firstName;
  middleNameCell.innerHTML = userData.middleName;
  birthdateCell.innerHTML = userData.birthdate;
  groupCell.innerHTML = userData.group;
  fileCell.innerHTML = userData.file;
  genderCell.innerHTML = userData.gender;
  phoneCell.innerHTML = userData.phone;
}
// ============================================

function deleteSelected() {
  const table = document.getElementById("userTable");
  const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function (checkbox) {
    const row = checkbox.closest("tr");
    row.remove();
  });
}

function duplicateSelected() {
  const table = document.getElementById("userTable");
  const checkboxes = table.querySelectorAll('input[type="checkbox"]:checked');

  checkboxes.forEach(function (checkbox) {
    const row = checkbox.closest("tr");
    const newRow = row.cloneNode(true);
    table.querySelector("tbody").appendChild(newRow);
  });
}
