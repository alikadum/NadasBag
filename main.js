const CORS = "https://mycorsproxy00.herokuapp.com/";

const BASE_URL_WEATHER = "https://api.weatherapi.com/v1/current.json?key=";
const API_KEY = "427c12e3a8624fdebe2134951202110";

const BASE_URL_PRAYERS = "https://hq.alkafeel.net/Api/init/init.php?"

//const BASE_URL_PRAYERS_MIDNIGHT = "https://api.pray.zone/v2/times/day.json?highlat=3&";

const yourDate = new Date();
let todayDate = yourDate.toISOString().split('T')[0];

if (navigator.geolocation) {
    function success(position) {
        let lat = position.coords.latitude,
            lon = position.coords.longitude;

        weatherUrl = CORS + BASE_URL_WEATHER + API_KEY + "&q=" + lat + "," + lon + "&lang=ar";
        prayersUrl = CORS + BASE_URL_PRAYERS + "long=" + lon + "&lati=" + lat + "&v=jsonPrayerTimes";


        console.log(weatherUrl);
        console.log(prayersUrl);


        fetch(weatherUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                document.getElementById("city").innerHTML = data.location.region + ", " + data.location.country;
                document.getElementById("weather").innerHTML = "&deg;الطقس حالياً : " + data.current.condition.text + " و درجة الحرارة هي " + data.current.temp_c;

                /*
                midnightUrl = CORS + BASE_URL_PRAYERS_MIDNIGHT + "city=" + data.location.region+ "&date=" + todayDate;
                console.log(midnightUrl);
                
                fetch(midnightUrl)
                    .then(response => response.json())
                    .then(data => {
                console.log(data);

                
                let hours = parseInt(data.results.datetime[0].times.Midnight.slice(0,-3)),
                    minutes= parseInt(data.results.datetime[0].times.Midnight);
                
                    console.log(minutes);
                
                if (hours>12) {
                    hours -= 12;    
                }
                
                console.log(hours);
                document.getElementById("midnight").innerHTML = hours +":"+ minutes;
                });     
                */
            });


        fetch(prayersUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let fajirHours = data.fajir.split(":")[0],
                    fajirMinutes = data.fajir.split(":")[1];

                

                let imsakHours = fajirHours,
                    imsakMinutes = fajirMinutes;

                

                if (fajirMinutes < 60 && fajirMinutes >= 10) {
                    imsakMinutes -= 10;
                    
                }
                else {
                    imsakMinutes = parseInt(imsakMinutes)+50;
                    imsakHours -= 1;
                    console.log(imsakMinutes);
                }

                let sunset = data.sunset.split(":");
                let newSunset = [parseInt(sunset[0]) + 12, sunset[1]]

                let fajir = data.fajir.split(":");


                let midnightMinutes = parseInt(newSunset[1]) + parseInt(fajir[1]);
                let midnightHours = parseInt(newSunset[0]) + parseInt(fajir[0]);



                if (midnightMinutes > 59) {
                    midnightMinutes -= 60;

                    midnightHours += 1;
                }
                else {
                    midnightMinutes = parseInt(newSunset[1]) + parseInt(fajir[1]);
                    midnightHours = parseInt(newSunset[0]) + parseInt(fajir[0]);
                }


                document.getElementById("date").innerHTML = data.date;
                document.getElementById("imsak").innerHTML = imsakHours + ":" + ('0' + imsakMinutes).slice(-2);
                document.getElementById("fajir").innerHTML = data.fajir;
                document.getElementById("sunrise").innerHTML = data.sunrise;
                document.getElementById("doher").innerHTML = data.doher;
                document.getElementById("sunset").innerHTML = data.sunset;
                document.getElementById("maghrib").innerHTML = data.maghrib;
                document.getElementById("midnight").innerHTML = midnightHours / 2 + ":" + ('0' + Math.ceil(midnightMinutes / 2)).slice(-2);

            });





    }

    navigator.geolocation.getCurrentPosition(success);

}
else {
    let lat = "33.25",
        lon = "44.43";

    weatherUrl = BASE_URL_WEATHER + API_KEY + "&q=" + lat + "," + lon + "&lang=ar";

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => console.log(data));

    fetch(prayersUrl)
        .then(response => response.json())
        .then(data => console.log(data));

}


