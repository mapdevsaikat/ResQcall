// Check if the user has accepted the Terms and Conditions
const accepted = localStorage.getItem('termsAccepted');

// Function to show the modal
function showModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';

    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    const acceptButton = document.getElementById('acceptButton');
    acceptButton.addEventListener('click', () => {
        if (document.getElementById('acceptTerms').checked) {
            // User accepted the terms, store in a cookie
            localStorage.setItem('termsAccepted', 'true');
            modal.style.display = 'none';
        } else {
            alert('Please accept the Terms and Conditions.');
        }
    });
}

// Show the modal on the first load if not accepted
if (!accepted) {
    showModal();
}

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMIb4vvq6pO79g_v4qRCeyGADDLlqNgbg",
  authDomain: "sahay-f4937.firebaseapp.com",
  databaseURL: "https://sahay-f4937-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sahay-f4937",
  storageBucket: "sahay-f4937.appspot.com",
  messagingSenderId: "780480878569",
  appId: "1:780480878569:web:9a959d8b28818493addd78",
  measurementId: "G-RFNW3VNTEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Function to validate mobile number
function validateMobileNumber(mobileNumber) {
    const mobileNumberPattern = /^\d{10}$/;
    return mobileNumberPattern.test(mobileNumber);
}

// Function to validate required fields
function validateRequiredFields() {
    const disasterType = document.getElementById("disasterType").value;
    const latitude = document.getElementById("loc_latitude").value;
    const longitude = document.getElementById("loc_longitude").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    var mediaUpload = document.getElementById("mediaUpload");
    var maxFileSize = 5 * 1024 * 1024; // 5MB
    var validMedia = true;

    for (var i = 0; i < mediaUpload.files.length; i++) {
        if (mediaUpload.files[i].size > maxFileSize) {
            validMedia = false;
            break;
        }
    }

    if (!validMedia) {
        alert("Please upload media files with a size of up to 5MB each.");
        return false; // Return false to prevent form submission
    }

    if (!disasterType) {
        alert("Please select a type of disaster.");
        return false;
    }

    if (!latitude || !longitude) {
        alert("Please enter latitude and longitude.");
        return false;
    }

    if (!validateMobileNumber(mobileNumber)) {
        alert('Please enter a valid 10-digit mobile number');
        return false;
    }

    if (!mediaUpload.files.length) {
        alert("Please select at least one photo or video for upload.");
        return false;
    }

    return true;
}

// Function to submit the form
function submitForm() {
    if (!validateRequiredFields()) {
        return;
    }

    const newSubmissionRef = push(ref(db, 'submitForm'));
    const ISTOffset = 5.5 * 60 * 60 * 1000;
    const currentISTTime = new Date(Date.now() + ISTOffset);

    const urgentNeeds = getSelectedValues(document.getElementById("urgentNeeds"));

    set(newSubmissionRef, {
        timestamp: currentISTTime.toISOString(),
        disasterType: document.getElementById("disasterType").value,
        latitude: document.getElementById("loc_latitude").value,
        longitude: document.getElementById("loc_longitude").value,
        mobileNumber: document.getElementById("mobileNumber").value,
        urgentNeeds: urgentNeeds, // Use the modified getSelectedValues function
        mediaUpload: document.getElementById("mediaUpload").value
    })
    .then(() => {
        document.getElementById("mediaUploadAlert").style.display = 'block';
        setTimeout(() => {
            document.getElementById("mediaUploadAlert").style.display = 'none';
        }, 3000);

        document.querySelector('.alert').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.alert').style.display = 'none';
        }, 5000);

        document.getElementById('reportForm').reset();
    })
    .catch(error => {
        console.error("Error submitting the form: ", error);
    });
}

// Event listener for form submission
document.getElementById("submit").addEventListener('click', (e) => {
    e.preventDefault();
    submitForm();
});

// Function to get selected values from a multi-select dropdown
function getSelectedValues(selectElement) {
    const selectedValues = [];
    const options = selectElement.options;

    for (let i = 0; i < options.length; i++) {
        if (options[i].selected) {
            selectedValues.push(options[i].value);
        }
    }

    return selectedValues;
}

