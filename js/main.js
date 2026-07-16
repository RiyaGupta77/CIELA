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
const airQualityLabel = document.getElementById("airQualityLabel");
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
const unknownOverlay = document.getElementById("unknownOverlay");
const unknownText = document.getElementById("unknownText");

const modal = document.getElementById("secretModal");
const modalTitle = document.getElementById("modalTitle");
const modalMessage = document.getElementById("modalMessage");

const randomCities = ["Tokyo","Longyearbyen","Paris","New York","Saint-Louis-du-Ha! Ha!","Cairo","Sydney","Reykjavik","Cape Town","Singapore","London","Dubai","Seoul","Kathmandu","Toronto","Mumbai",
"Rio de Janeiro","Rome","Oslo","Bangkok","Barcelona","France","Ashgabat","Oymyakon","Busan","1770"];


const surprises = ["Tokyo","area 51","Seoul","hogwarts","London","Paris","space","Mumbai","Saint-Louis-du-Ha! Ha!","hell","heaven"];

const loadingMessages = [
    "Reading the sky...",
    "Consulting the clouds...",
    "Looking outside...",
    "Finding your weather...",
    "Almost there..."
];

let messageIndex = 0;
const loadingInterval = setInterval(() => {
    condition.textContent = loadingMessages[messageIndex];
    messageIndex++;

    if (messageIndex >= loadingMessages.length) {
        messageIndex = 0;
    }
}, 900);

const hiddenReplies = {
    bro: ["sup bro!"],
    hello: ["Hello, Earthling."],
    404: ["Error not found."],
    bitcoin: ["We're legally not qualified to answer that."],
    nothing: ["You found it."],
    everything: ["That's a very broad search."],
    avengers: ["They're busy."],
    batman: ["Probably standing on a rooftop somewhere"],
    creator: ["Crafted by Riya. Please clap."],
    meaning: ["Still searching"],
    gotham: ["Connection unavailable. Batman is handling it."],
    password: ["Absolutely not."],
    admin: ["Access Denied. Nice try."],
    me: ["Looking for yourself?"],
    you: ["I'm just code. You're the interesting one."],
    secret: ["If I told you, it wouldn't be one anymore."],
    happy: ["Nice. Tell the clouds."],
    narnia: ["The wardrobe is currently accepting visitors. Dress warmly."],
    bruh: ["Understandable reaction."],
    sad: ["Forecast: Temporary"],
    atlantis: ["Connection lost underwater."],
    ciela: ["Hi. I've been waiting for someone to search my name."],
    love: ["Forecast: Complicated"],
    money: ["Have you tried employment?"],
    home: ["I hope you find it, wherever it is."],
    what: ["Good question."],
    riya: ["Creator detected. Thanks for building me."],
    html: ["The skeleton is doing its best."],
    alone: ["The sky is still here."],
    weather: ["Finally. Someone asked what i was built for."],
    "meaning of life": ["42"],
    mordor: ["One does not simply measure it."],
    javascript: ["Have you tried console.log()?"],
    sun: ["Currently carrying the entire solar system."],
    rickroll: ["Never gonna give you up, never gonna let you down."],
    bts: ["Best boyband in the world."],
    delete: ["Nice try"],
    past: ["Read only."],
    42: ["🌌Correct. Unfortunately, no one remembers the question."],
    water: ["Go drink some"],
    chatgpt: ["Nice assistant. Talks a lot though."],
};

function showSearchMessage(messages){
    const random =
    messages[Math.floor(Math.random()*messages.length)];
    document.getElementById("skyMessageText").textContent = random;

    document
    .getElementById("skyMessage")
    .classList.remove("hidden");
}

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim().toLowerCase();
    const query = city.trim().toLowerCase();

    //hidden replies
    if(hiddenReplies[query]){
     showSearchMessage(hiddenReplies[query]);
     cityInput.value = "";
     return;
    }

    //random city
    if(city.toLowerCase() === "random"){
    const randomCity =
    randomCities[Math.floor(Math.random() * randomCities.length)];
    
    getCurrentWeather(randomCity);
    getForecast(randomCity);
    cityInput.value = randomCity;
    return;
}

if(
    city.toLowerCase() === "surprise me" ||
    city.toLowerCase() === "surprise"
    ){ const pick = surprises[Math.floor(Math.random() * surprises.length)];
    cityInput.value = pick;

    // universes
    if(pick.toLowerCase() === "hogwarts"){
        openHogwartsPortal("Hogwarts", "🦉 Opening Magical Forecast...", ".pages/hogwarts.html");
        return;
    }

    if(pick.toLowerCase() === "heaven"){
        openHeavenPortal("Heaven", "☁ Ascending...", ".pages/heaven.html");
        return;
    }
    if(pick.toLowerCase() === "hell"){
        openHellPortal("Hell", "🔥 Descending...", ".pages/hell.html");
        return;
    }
    if(pick.toLowerCase() === "space"){
        openSpacePortal("Space", "Leaving Earth...", ".pages/space.html");
        return;
    }
    if(pick.toLowerCase() === "area 51"){
        openArea51Portal("Area 51", "👽 Accessing Classified Files...", ".pages/area51.html");
        return;
    }
    // otherwise it's a real city
    getCurrentWeather(pick);
    getForecast(pick);
    return;
}

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

async function showUnknownPlanet(){
    unknownOverlay.classList.add("show");
    unknownText.textContent = "Searching Earth...";
    await wait(700);

    unknownText.textContent =
    "Searching nearby galaxies...\n\n❌";
    await wait(700);

    unknownText.textContent =
    "Searching alternate timelines...\n\n❌";
    await wait(700);

    unknownText.textContent =
    "No known civilization has registered this location.";
    await wait(1800);

    unknownOverlay.classList.remove("show");
}

function wait(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
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
      await showUnknownPlanet();
      throw new Error("Try another location...");
    }

    const data = await response.json();

    clearInterval(loadingInterval);
    condition.textContent = data.weather[0].main;


    weatherIcon.src = getWeatherIcon(
     data.weather[0].main,
     data.weather[0].icon
    );

    console.log("Humidity:", data.main.humidity);

    console.log("Wind:", data.wind.speed);

    console.log("Air Quality:", data.getAirQuality);

    console.log("Feels Like:", data.main.feels_like);

    console.log(document.getElementById("humidityLabel"));
    console.log(document.getElementById("windLabel"));
    console.log(document.getElementById("airQualityLabel"));
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

    windLabel.textContent = (data.wind.speed * 3.6).toFixed(1) + " km/h";
    getAirQuality(data.coord.lat, data.coord.lon);

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
        console.log(error)
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
        "Rain expected to interrupt someone's laundry.",
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

async function getAirQuality(lat, lon){
    try{

        const response = await fetch(
         `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );

        const data = await response.json();
        const aqi = data.list[0].main.aqi;
        let text = "";

        switch(aqi){
            case 1:
                text = "🟢 Good";
                break;

            case 2:
                text = "🟡 Fair";
                break;

            case 3:
                text = "🟠 Moderate";
                break;

            case 4:
                text = "🔴 Poor";
                break;

            case 5:
                text = "🟣 Very Poor";
                break;

            default:
                text = "Unavailable";
        }
        airQualityLabel.textContent = text;
    }
    catch(error){
        airQualityLabel.textContent = "Unavailable";
    }
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
"Try searching 'home'",
"The Moon affects Earth's tides every single day.",
"☁ Sky Dare: Take one picture of today's sky. No filters.",
"Try searching 'surprise me'.",
"Drink some water.",
"Watch a sunrise someday. They're worth losing sleep for.",
"Send someone a random 'hope you're doing okay' message.",
"🌸 Quest: Notice something you've walked past a hundred times.",
"Somewhere on Earth, it's raining right now.",
"Stretch your neck. You've earned it.",
"The sky thinks you're cool.",
"You've been looking at a screen for a while. Look at something far away for ten seconds.",
"The sky has seen millions of difficult days. They always passed.",
"Try searching 'home'",
"Lightning heats the air hotter than the surface of the Sun.",
"☁ Sky Dare: Wave at the sky. Nobody will know.",
"The smell after rain is called petrichor.",
"Remember to blink.",
"Try searching 'surprise me'.",
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
"Try searching 'home'",
"Share today's sky with someone.",
"If you've read ten of these... respect.",
"Try searching 'random'.",
"This popup exists because the developer had too many ideas.",
"🌳 Quest: Thank a tree for making oxygen.",
"Developer note: Thanks for visiting CIELA. ☁",
"Snow isn't actually white. It's transparent.",
"The sky doesn't compare itself to yesterday.",
"🌤 Look up at the sky. Let today's weather introduce itself.",
"The weather can wait five seconds. Your posture can't.",
"Curious? Try searching Hogwarts ⚡",
"🌙 Quest: Tell the Moon 'good evening.'",
"Try searching 'random'.",
"It's okay if today wasn't productive.",
"Thanks for stopping by. The clouds appreciate visitors.",
"Area 51 has something to hide.",
];


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
