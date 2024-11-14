
const airQualityApi = {
    key: "your_rapidapi_key", 
    host: "air-quality.p.rapidapi.com"
  };
  
  async function getAirQuality(latitude, longitude) {
    const url = `https://air-quality.p.rapidapi.com/current/airquality?lat=${latitude}&lon=${longitude}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '195bef9205msh1ebbfe75489c6eap177bddjsnc5f99ed36cc4',
        'X-RapidAPI-Host': 'air-quality.p.rapidapi.com' 
      }
    };
  
    try {
      const response = await fetch(url, options);
      const result = await response.json();
  
      
      if (result.data && result.data.length > 0) {
        let readings = result.data[0];
        displayAirQualityResults(readings);
      } else {
        alert('No data available for the specified location.');
      }
  
    } catch (error) {
      console.error('Error fetching air quality data:', error);
      alert('Error fetching air quality data. Please try again.');
    }
  }
  
  function displayAirQualityResults(data) {
    document.getElementById("aqi").innerText = data.aqi;
    document.getElementById("co").innerText = data.co;
    document.getElementById("no2").innerText = data.no2;
    document.getElementById("o3").innerText = data.o3;
    document.getElementById("pm2").innerText = data.pm2_5;
    document.getElementById("pm10").innerText = data.pm10;
    document.getElementById("so2").innerText = data.so2;
    document.getElementById("result").style.display = 'block';
  }
  