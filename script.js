const plantImageUrl = "http://<ESP32-CAM-IP>/plant_image"; 
const dataUrl = "http://<ESP32-CAM-IP>/sensor_data"; 

function fetchPlantImage() {
    document.getElementById('plant-image').src = plantImageUrl;
}


async function fetchSensorData() {
    try {
        const response = await fetch(dataUrl);
        const data = await response.json();
        document.getElementById('soil-moisture').innerText = ${data.soil_moisture}%; 
        document.getElementById('temperature').innerText = ${data.temperature}°C; 
        document.getElementById('humidity').innerText = ${data.humidity}%; 
        
        document.getElementById('plant-status').innerText = data.plant_status || "Healthy";
    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
}


setInterval(() => {
    fetchPlantImage();
    fetchSensorData();
}, 10000);

// Initial load
fetchPlantImage();
fetchSensorData();
