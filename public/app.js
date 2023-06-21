// POP up

// Get the link and popup elements
const link = document.getElementById('popup-link');
const popup = document.getElementById('popup');

// Add click event listener to the link
link.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the link from navigating

    // Show the popup
    popup.style.display = 'block';
});

// Get the close button
const closeButton = document.getElementById('close-popup');

// Add click event listener to the close button
closeButton.addEventListener('click', function () {
    // Hide the popup
    popup.style.display = 'none';
});

// LEAFLET

var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);