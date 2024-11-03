const plantImageUrl = "http://<ESP32-CAM-IP>/capture";
const dataUrl = "http://<ESP32-CAM-IP>/sensor_data";
const waterUrl = "http://<ESP32-CAM-IP>/activate_water";

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

        
        const healthStatus = data.soil_moisture < 40 ? "Unhealthy" : "Healthy";
        document.getElementById('plant-status').innerText = healthStatus;
        document.getElementById('recommend-text').innerText = healthStatus === "Unhealthy" ? "Required" : "Not required";

    } catch (error) {
        console.error("Error fetching sensor data:", error);
    }
}
 

async function activateWaterPump() {
    try {
        await fetch(waterUrl);
        alert("Water pump activated!");
    } catch (error) {
        console.error("Error activating water pump:", error);
    }
}

setInterval(() => {
    fetchPlantImage();
    fetchSensorData();
}, 10000);


fetchPlantImage();
fetchSensorData();
