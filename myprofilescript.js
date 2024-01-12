var editMode = false;
const inputElement = document.getElementById('avatarInput');
const avatarImage = document.getElementById('avatar');
const nameInput = document.getElementById('name');
const birthYearSelect = document.getElementById('birthYear');
const birthMonthSelect = document.getElementById('birthMonth');
const birthDaySelect = document.getElementById('birthDay');
const ageInput = document.getElementById('age');

// Add change event listener to the input element
inputElement.addEventListener('change', handleFileSelect);

// Load saved data from localStorage when the page loads
window.onload = function () {
  loadSavedData();
};

function openFilePond() {
  inputElement.click();
}

function handleFileSelect(event) {
  const file = event.target.files[0];
  if (file) {
    const fileReader = new FileReader();
    fileReader.onload = function (event) {
      avatarImage.src = event.target.result;
      // Save the updated avatar to localStorage
      saveToLocalStorage();
      // Notify other parts of the application about the avatar change
      dispatchAvatarChangeEvent();
    };
    fileReader.readAsDataURL(file);
  }
}

function toggleEditMode(edit) {
  var inputs = document.querySelectorAll("input, textarea");
  inputs.forEach(function (input) {
    input.disabled = !edit;
  });

  document.getElementById("editBtn").style.display = edit ? "none" : "inline-block";
  document.getElementById("saveBtn").style.display = edit ? "inline-block" : "none";

  if (!edit) {
    saveToLocalStorage(); // Save the form data when leaving edit mode
    dispatchAvatarChangeEvent();
  }
}

function saveProfile() {
  // Implement logic to save profile information
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var education = document.getElementById("education").value;
  var hobbies = document.getElementById("hobbies").value;
  var strengths = document.getElementById("strengths").value;
  var skills = document.getElementById("skills").value;

  // You can use this data to save/update the user's profile
  alert("Profile saved:\nName: " + name + "\nAge: " + age + "\nEducation: " + education + "\nHobbies: " + hobbies + "\nStrengths: " + strengths + "\nSkills: " + skills);
  // Get the entered name
  var enteredName = nameInput.value;

  // Save the entered name to localStorage
  localStorage.setItem('enteredName', enteredName);

  toggleEditMode(false);
}

function saveToLocalStorage() {
  // Save the form data and avatar source to localStorage
  localStorage.setItem('avatarSrc', avatarImage.src);
  localStorage.setItem('name', nameInput.value);
  localStorage.setItem('birthYear', birthYearSelect.value);
  localStorage.setItem('birthMonth', birthMonthSelect.value);
  localStorage.setItem('birthDay', birthDaySelect.value);
  localStorage.setItem('age', ageInput.value);
  // Save other form data as needed
}

function loadSavedData() {
  // Load the saved data from localStorage
  const savedAvatarSrc = localStorage.getItem('avatarSrc');
  const savedName = localStorage.getItem('name');
  const savedBirthYear = localStorage.getItem('birthYear');
  const savedBirthMonth = localStorage.getItem('birthMonth');
  const savedBirthDay = localStorage.getItem('birthDay');
  const savedAge = localStorage.getItem('age');

  // Update the form with the saved data
  if (savedAvatarSrc) {
    avatarImage.src = savedAvatarSrc;
  }
  if (savedName) {
    nameInput.value = savedName;
  }
  if (savedBirthYear) {
    birthYearSelect.value = savedBirthYear;
  }
  if (savedBirthMonth) {
    birthMonthSelect.value = savedBirthMonth;
  }
  if (savedBirthDay) {
    birthDaySelect.value = savedBirthDay;
  }
  // Load other form data as needed
  if (savedAge) {
    ageInput.value = savedAge;
  }
}

// Function to dispatch the avatarChange event
function dispatchAvatarChangeEvent() {
  const avatarChangeEvent = new CustomEvent('avatarChange', { detail: { avatarSrc: avatarImage.src } });
  window.dispatchEvent(avatarChangeEvent);
}

// Populate year, month, and day options
function populateDateOptions() {
  const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= currentYear - 100; year--) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    birthYearSelect.appendChild(option);
  }

  for (let month = 1; month <= 12; month++) {
    const option = document.createElement('option');
    option.value = month;
    option.textContent = month;
    birthMonthSelect.appendChild(option);
  }

  for (let day = 1; day <= 31; day++) {
    const option = document.createElement('option');
    option.value = day;
    option.textContent = day;
    birthDaySelect.appendChild(option);
  }
}

// Call the function to populate date options
populateDateOptions();

document.addEventListener('DOMContentLoaded', function () {
  // Call the function to update the navbar avatar when the page loads
  updateNavbarAvatar();

  // Listen for the avatarChange event and update the avatar accordingly
  document.addEventListener('avatarChange', function (event) {
    const newAvatarSrc = event.detail.avatarSrc;
    updateNavbarAvatar(newAvatarSrc);
  });
});

function updateNavbarAvatar(newAvatarSrc) {
  // Retrieve the saved avatar source from localStorage if not provided
  const savedAvatarSrc = newAvatarSrc || localStorage.getItem('avatarSrc');

  // Update the avatar in the navigation bar if there's a saved source
  if (savedAvatarSrc) {
    const profileToggleAvatar = document.querySelector('.profile-toggle');
    if (profileToggleAvatar) {
      profileToggleAvatar.style.backgroundImage = `url(${savedAvatarSrc})`;
    }
  }
}
