const plantImageUrl = "http://<ESP32-CAM-IP>/plant_image"; // Replace with your ESP32-CAM IP
const dataUrl = "http://<ESP32-CAM-IP>/sensor_data"; // Replace with your ESP32-CAM IP

// Fetch plant image and update the webpage
function fetchPlantImage() {
    document.getElementById('plant-image').src = plantImageUrl;
}

// Fetch sensor data and update the webpage
async function fetchSensorData() {
    try {
        const response = await fetch(dataUrl);
        const data = await response.json();
        document.getElementById('soil-moisture').innerText = `${data.soil_moisture}%`; // Use backticks here
        document.getElementById('temperature').innerText = `${data.temperature}°C`; // Use backticks here
        document.getElementById('humidity').innerText = `${data.humidity}%`; // Use backticks here
        // Update plant status if available
        document.getElementById('plant-status').innerText = data.plant_status || "Healthy";
    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
}

// Refresh the data every 10 seconds
setInterval(() => {
    fetchPlantImage();
    fetchSensorData();
}, 10000);

// Initial load
fetchPlantImage();
fetchSensorData();
