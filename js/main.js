const API_KEY = "0cccd9e93a59f5c3d99819c401f65242";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.getElementById("weatherIcon");

const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");
const skySummary = document.getElementById("skySummary");

const humidityLabel = document.getElementById("humidityLabel");
const feelsLikeLabel = document.getElementById("feelsLikeLabel");
const visibilityLabel = document.getElementById("visibilityLabel");
const windLabel = document.getElementById("windLabel");
const hourlyCards = document.getElementById("hourlyCards");
const heroCard = document.getElementById("heroCard");

const sunriseTime = document.getElementById("sunriseTime");
const sunsetTime = document.getElementById("sunsetTime");
const sunDot = document.getElementById("sunDot");

const journalInput = document.getElementById("journalInput");
const saveEntryBtn = document.getElementById("saveEntryBtn");
const entriesContainer = document.getElementById("entriesContainer");
const historyToggle = document.getElementById("historyToggle");

const skyMessage = document.getElementById("skyMessage");
const skyMessageText = document.getElementById("skyMessageText");
const nextSkyMessage = document.getElementById("nextSkyMessage");
const closeSkyMessage = document.getElementById("closeSkyMessage");

const portalOverlay=document.getElementById("portalOverlay");
const portalTitle=document.getElementById("portalTitle");
const portalSubtitle=document.getElementById("portalSubtitle");


searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim().toLowerCase();
    const hiddenUniverses = {
    hogwarts: openHogwartsPortal,
    heaven: openHeavenPortal,
    hell: openHellPortal,
    "area 51": openArea51Portal,
    area51: openArea51Portal,
    space: openSpacePortal
};


if(hiddenUniverses[city]){
    hiddenUniverses[city]();
    return;
}
    console.log(city);
    getCurrentWeather(city);
    getForecast(city);
});

cityInput.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        searchBtn.click();
    }
});

function getWeatherIcon(main, iconCode){

    const isNight = iconCode.endsWith("n");

    switch(main){

        case "Clear":
            return isNight
                ? "assets/icons/clear-night.svg"
                : "assets/icons/clear-day.svg";

        case "Clouds":
            return isNight
                ? "assets/icons/partly-cloudy-night.svg"
                : "assets/icons/partly-cloudy-day.svg";

        case "Rain":
            return "assets/icons/rain.svg";

        case "Drizzle":
            return "assets/icons/drizzle.svg";

        case "Thunderstorm":
            return "assets/icons/thunderstorm.svg";

        case "Snow":
            return "assets/icons/snow.svg";

        case "Mist":
        case "Fog":
        case "Haze":
        case "Smoke":
            return "assets/icons/mist.svg";

        default:
            return "assets/icons/cloudy.svg";
    }
}

async function getCurrentWeather(query) {

    gsap.to("#heroCard",{
    scale:0.96,
    duration:0.15
   });

    try{
    searchBtn.disabled = true;
    searchBtn.textContent = "Reading..."; 
    showRandomSkyMessage();

setTimeout(() => {
    skyMessage.classList.remove("hidden");
    skyMessage.classList.add("visible");
},3000);

    let url;
       if (typeof query === "string") {
           url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`;
            } else {

           url = `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${API_KEY}`;
        }

         const response = await fetch(url);

 if(!response.ok){
 throw new Error("City not found");}

    const data = await response.json();

    weatherIcon.src = getWeatherIcon(
     data.weather[0].main,
     data.weather[0].icon
    );

    console.log("Humidity:", data.main.humidity);

    console.log("Wind:", data.wind.speed);

    console.log("Visibility:", data.visibility);

    console.log("Feels Like:", data.main.feels_like);

    console.log(document.getElementById("humidityLabel"));
    console.log(document.getElementById("windLabel"));
    console.log(document.getElementById("visibilityLabel"));
    console.log(document.getElementById("feelsLikeLabel"));


    cityName.textContent = data.name;

    temperature.textContent = Math.round(data.main.temp) + "°C";
    
    gsap.from("#temperature",{
    y:20,
    opacity:0,
    duration:.5
    });

    condition.textContent = data.weather[0].main;
    updateSkySummary(data.weather[0].main);
    changeHeroTheme(data.weather[0].main);


    humidityLabel.textContent = data.main.humidity + "%";

    windLabel.textContent = data.wind.speed + " m/s";

    visibilityLabel.textContent 
   if (data.visibility >= 10000) {
    visibilityLabel.textContent = "10+ km";
} else {
    visibilityLabel.textContent =
        (data.visibility / 1000).toFixed(1) + " km";
}

    feelsLikeLabel.textContent =
    Math.round(data.main.feels_like) + "°C";


    const sunrise = new Date(data.sys.sunrise * 1000);

    const sunset = new Date(data.sys.sunset * 1000);

    sunriseTime.textContent =
    sunrise.toLocaleTimeString([],{
    hour:'2-digit',
    minute:'2-digit'
   });

   sunsetTime.textContent =
   sunset.toLocaleTimeString([],{
   hour:'2-digit',
   minute:'2-digit'
   });

   const now = Date.now() / 1000;

   const sunriseUnix = data.sys.sunrise;

   const sunsetUnix = data.sys.sunset;

   let progress =
   (now - sunriseUnix) /
   (sunsetUnix - sunriseUnix);

   progress =
   Math.max(0, Math.min(progress,1));

   sunDot.style.left =
   (progress * 100) + "%";

}
    catch(error){

        alert(error.message);

    }

   finally{
   searchBtn.disabled = false;
   searchBtn.textContent = "Search";}

   gsap.to("#heroCard",{
    scale:1,
    duration:0.35,
    ease:"back.out(1.8)"

});
}

const weatherMessages = {

    Clear: [
        "The sky's staying clear today. A good day to spend outside if you can.",
        "Sunlight's doing all the work today.",
        "Not a cloud in sight.",
        "The afternoon looks bright and calm."
    ],

    Clouds: [
        "The clouds are taking their time today.",
        "Grey skies, but nothing too dramatic.",
        "A quiet sky. Calm, soft, unhurried.",
        "The sun's still up there somewhere."
    ],

    Rain: [
        "Rain's settling in for a while.",
        "Roads might get slippery later.",
        "Don't forget an umbrella.",
        "The streets might sound different today.",
        "Some people wait for sunny days. Others wait for days like this."
    ],

    Drizzle: [
        "A gentle drizzle is hanging around.",
        "Nothing too heavy, just enough to slow the day."
    ],

    Thunderstorm: [
        "The sky isn't in a good mood today.",
        "Nature's putting on quite a show.",
        "It might be better to stay indoors for a while.",
        "Expect loud skies and sudden rain."
    ],

    Snow: [
        "Everything feels a little quieter when it snows.",
        "Stay warm today.",
        "Fresh snow changes everything it touches."
    ],

    Mist: [
        "The world feels softer behind today's mist.",
        "Visibility is low, so take your time."
    ],

    Haze: [
        "The horizon looks a little distant today."
    ],

    Default: [
        "Every sky has a different story to tell."
    ]
};

function updateSkySummary(weather){
    const messages =
        weatherMessages[weather] || weatherMessages.Default;
    const randomMessage =
        messages[Math.floor(Math.random() * messages.length)];
    skySummary.textContent = randomMessage;
}

async function getForecast(query) {

    let url;

        if (typeof query === "string") {

          url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&units=metric&appid=${API_KEY}`;

        } else {
          url = `https://api.openweathermap.org/data/2.5/forecast?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${API_KEY}`;
        }

         const response = await fetch(url);

const data = await response.json();
    hourlyCards.innerHTML = "";

for (let i = 0; i < 5; i++) {

    const forecast = data.list[i];
    const weather = forecast.weather[0].main;
    const time = forecast.dt_txt.slice(11,16);

    const temp = Math.round(forecast.main.temp);

    const iconPath = getWeatherIcon(
    forecast.weather[0].main,
    forecast.weather[0].icon
);

    hourlyCards.innerHTML += `
        <div class="hour-card">

            <h4>${time}</h4>
            <img src="${iconPath}" class="hour-icon">
            <p>${temp}°C</p>
            <p>${weather}</p>
        </div>
    `;
}
    console.log(data);
}

function changeHeroTheme(weather){

    heroCard.classList.remove(
        "hero-clear",
        "hero-clouds",
        "hero-rain",
        "hero-snow",
        "hero-thunderstorm",
        "hero-mist"
    );

    switch(weather.toLowerCase()){

        case "clear":
            heroCard.classList.add("hero-clear");
            break;

        case "clouds":
            heroCard.classList.add("hero-clouds");
            break;

        case "rain":
        case "drizzle":
            heroCard.classList.add("hero-rain");
            break;

        case "snow":
            heroCard.classList.add("hero-snow");
            break;

        case "thunderstorm":
            heroCard.classList.add("hero-thunderstorm");
            break;

        default:
            heroCard.classList.add("hero-mist");
    }
}

function getUserLocation() {

    if (!navigator.geolocation) {
        alert("Geolocation isn't supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {

            const location = {
                lat: position.coords.latitude,
                lon: position.coords.longitude
            };

            getCurrentWeather(location);
            getForecast(location);
        },

        () => {
            // If the user blocks location, page will show New Delhi.
            getCurrentWeather("New Delhi");
            getForecast("New Delhi");
        }
    );
}



let journalEntries = JSON.parse(localStorage.getItem("journalEntries")) || [];

renderEntries();

saveEntryBtn.addEventListener("click", saveEntry);

function saveEntry(){

    if(journalInput.value.trim()===""){

        return;

    }

    const entry={
        date:new Date().toLocaleDateString(),
        city:cityName.textContent,
        weather:condition.textContent,
        temperature:temperature.textContent,
        note:journalInput.value
    };

    journalEntries.unshift(entry);
    localStorage.setItem(
        "journalEntries",
        JSON.stringify(journalEntries)
    );

    journalInput.value="";
    renderEntries();
}

function renderEntries(){

    entriesContainer.innerHTML="";
    journalEntries.forEach((entry,index)=>{
        entriesContainer.innerHTML+=`
        <div class="entry-card">

            <h4>${entry.date}</h4>
            <p><strong>📍</strong> ${entry.city}</p>
            <p><strong>🌤</strong> ${entry.weather}</p>
            <p><strong>🌡</strong> ${entry.temperature}</p>
            <p>${entry.note}</p>
            <button
            class="delete-btn"
            onclick="deleteEntry(${index})">
            Delete

            </button>
        </div>
        `;
    });
}

function deleteEntry(index){

    journalEntries.splice(index,1);
    localStorage.setItem(
        "journalEntries",
        JSON.stringify(journalEntries)
    );
    renderEntries();
}

historyToggle.addEventListener("click", () => {

    entriesContainer.classList.toggle("expanded");
    entriesContainer.classList.toggle("collapsed");

    const title = historyToggle.querySelector("h3");

    if(entriesContainer.classList.contains("expanded")){
        title.textContent = "▲ Previous Entries";
    }

    else{
        title.textContent = "▼ Previous Entries";
    }
});

getUserLocation();

//will add more later.

const skyMessages = [
"Searching imaginary places is strangely popular around here.",
"Search Heaven. The customer support is surprisingly polite.",
"The moon has phases. You're allowed to as well.",
"The Moon affects Earth's tides every single day.",
"☁ Sky Dare: Take one picture of today's sky. No filters.",
"Drink some water.",
"Watch a sunrise someday. They're worth losing sleep for.",
"Send someone a random 'hope you're doing okay' message.",
"🌸 Quest: Notice something you've walked past a hundred times.",
"Somewhere on Earth, it's raining right now.",
"Stretch your neck. You've earned it.",
"The sky thinks you're cool.",
"You've been looking at a screen for a while. Look at something far away for ten seconds.",
"The sky has seen millions of difficult days. They always passed.",
"Lightning heats the air hotter than the surface of the Sun.",
"☁ Sky Dare: Wave at the sky. Nobody will know.",
"The smell after rain is called petrichor.",
"Remember to blink.",
"The sky asked me to say hi.",
"Your tabs are judging you.",
"🌙 Quest: Find the oldest tree you can today.",
"🕊 Quest: Smile at a stranger if it feels safe.",
"Yes, this message changes every time.",
"Congratulations. You've unlocked another unnecessary sentence.",
"Who keeps clicking 'Next'?",
"Whatever you're procrastinating... good luck.",
"☁ Sky Dare: Watch today's sunset if you can.",
"You deserve a snack.",
"Share today's sky with someone.",
"If you've read ten of these... respect.",
"This popup exists because the developer had too many ideas.",
"🌳 Quest: Thank a tree for making oxygen.",
"Developer note: Thanks for visiting CIELA. ☁",
"Snow isn't actually white. It's transparent.",
"The sky doesn't compare itself to yesterday.",
"🌤 Look up at the sky. Let today's weather introduce itself.",
"The weather can wait five seconds. Your posture can't.",
"Curious? Try searching Hogwarts ⚡",
"🌙 Quest: Tell the Moon 'good evening.'",
"It's okay if today wasn't productive.",
"Thanks for stopping by. The clouds appreciate visitors.",
"Area 51 has something to hide.",
];

//will add more later.

function showRandomSkyMessage(){
    const randomIndex =
        Math.floor(Math.random() * skyMessages.length);

    skyMessageText.textContent =
        skyMessages[randomIndex];

}

nextSkyMessage.addEventListener("click", () => {
    skyMessageText.style.opacity = 0;

    setTimeout(() => {

        showRandomSkyMessage();
        skyMessageText.style.opacity = 1;

    },200);
});

closeSkyMessage.addEventListener("click", () => {
    skyMessage.classList.remove("visible");
    skyMessage.classList.add("hidden");
});


function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

//for hogwarts
async function openHogwartsPortal(){
    portalOverlay.classList.add("show");
    portalTitle.textContent="Searching...";
    portalSubtitle.textContent="";
    await sleep(1000);
    portalSubtitle.textContent="📍 Hogwarts";
    await sleep(1200);
    portalSubtitle.textContent="✨ Hidden Universe Detected";
    await sleep(1500);
    portalSubtitle.textContent="🦉 A magical gateway has been found...";
    await sleep(1800);
    portalOverlay.style.opacity="0";

    setTimeout(()=>{
        window.location.href="./pages/hogwarts.html";
    },600);
}

//for heaven
async function openHeavenPortal(){
    portalOverlay.classList.add("show");
    portalOverlay.style.opacity="1";
    portalTitle.textContent="Requesting divine permission...";
    portalSubtitle.textContent="";
    await sleep(1400);
    portalSubtitle.textContent="☁ Paradise Detected";
    await sleep(1400);
    portalSubtitle.textContent="🕊 Opening Celestial Forecast...";
    await sleep(1700);
    portalOverlay.style.opacity="0";

    setTimeout(()=>{
        window.location.href="./pages/heaven.html";
    },600);
}

//for hell
async function openHellPortal(){
    portalOverlay.classList.add("show");
    portalOverlay.style.opacity="1";
    portalTitle.textContent="Connecting...";
    portalSubtitle.textContent="";
    await sleep(1200);
    portalSubtitle.textContent="🔥 You were accepted immediately.";
    await sleep(1600);
    portalSubtitle.textContent="🌋 Good Luck.";
    await sleep(1700);
    portalOverlay.style.opacity="0";

    setTimeout(()=>{
        window.location.href="./pages/hell.html";
    },600);
}

//for area51
async function openArea51Portal(){
    portalOverlay.classList.add("show");
    portalOverlay.style.opacity = "1";
    portalTitle.textContent = "Searching...";
    portalSubtitle.textContent = "";
    await sleep(1200);
    portalSubtitle.textContent = "📡 Unknown signal detected...";
    await sleep(1600);
    portalSubtitle.textContent = "🛸 Accessing Classified Files...";
    await sleep(1700);
    portalOverlay.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "./pages/area51.html";
    }, 600);
}

//for space
async function openSpacePortal() {
    portalOverlay.classList.add("show");
    portalOverlay.style.opacity = "1";
    portalTitle.textContent = "Searching...";
    portalSubtitle.textContent = "Leaving Earth's atmosphere...";
    await sleep(1200);
    portalSubtitle.textContent = "Connecting to space...";
    await sleep(1600);
    portalSubtitle.textContent = "Signal Acquired.";
    await sleep(1700);
    portalOverlay.style.opacity = "0";

    setTimeout(() => {
        window.location.href = "./pages/space.html";
    }, 600);
}