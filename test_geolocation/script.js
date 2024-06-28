document.getElementById('getLocationBtn').addEventListener('click', function() {
    if (navigator.geolocation) {
        if (confirm("This website wants to access your location. Do you allow?")) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
    } else {
        document.getElementById('locationOutput').innerText = "Geolocation is not supported by this browser.";
    }
});

function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    document.getElementById('locationOutput').innerText = `Latitude: ${latitude} \nLongitude: ${longitude}`;
}

function showError(error) {
    let errorMsg = "";
    switch(error.code) {
        case error.PERMISSION_DENIED:
            errorMsg = "User denied the request for Geolocation.";
            break;
        case error.POSITION_UNAVAILABLE:
            errorMsg = "Location information is unavailable.";
            break;
        case error.TIMEOUT:
            errorMsg = "The request to get user location timed out.";
            break;
        case error.UNKNOWN_ERROR:
            errorMsg = "An unknown error occurred.";
            break;
    }
    document.getElementById('locationOutput').innerText = errorMsg;
}
