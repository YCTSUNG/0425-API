const select = document.querySelector('#選擇縣市');
const content = document.querySelector('.內容');
const content2 = document.querySelector('.內容2');
const content3 = document.querySelector('.內容3');

const img = document.querySelector('.圖片');

select.addEventListener('change', () => {
  const city = select.value;
  fetch(`https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-7CC38E47-0B43-42B4-A365-849AAC01EE61`)
    .then(response => response.json())
    .then(data => {
      const locationData = data.records.location.find(location => location.locationName === city);
      const weatherData = locationData.weatherElement[0].time[0].parameter.parameterName;
      const minTemp = locationData.weatherElement[2].time[0].parameter.parameterName;
      const maxTemp = locationData.weatherElement[4].time[0].parameter.parameterName;
      const rainProb = locationData.weatherElement[1].time[0].parameter.parameterName;

      if (weatherData.includes('晴')) {
        img.src = 'https://cdn-icons-png.flaticon.com/512/979/979585.png';
      } else if (weatherData.includes('短暫雨')) {
        img.src = 'https://cdn2.iconfinder.com/data/icons/weather-filled-outline-3/64/weather07-512.png';
      } else if (weatherData.includes('多雲')) {
        img.src = 'https://cdn-icons-png.flaticon.com/512/1163/1163736.png';
      } else {
        img.src = 'https://w7.pngwing.com/pngs/78/589/png-transparent-cloud-drizzle-rain-weather-weather-icon.png';
      }




      content.textContent = `${city}的天氣為 ${weatherData}, `;
      content2.textContent = `最低溫度為 ${minTemp} 度，最高溫度為 ${maxTemp} 度`;
      content3.textContent = `降雨機率為 ${rainProb} %`;
    
    
    })
    .catch(error => console.error(error));
});

