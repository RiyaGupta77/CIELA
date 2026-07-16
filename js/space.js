let seconds = 0;
const timer = document.getElementById("timer");

setInterval(() => {
seconds++;

const mins = Math.floor(seconds/60);
const secs = seconds%60;

timer.textContent =
`${String(mins).padStart(2,"0")}m ${String(secs).padStart(2,"0")}s`;
},1000);

const radio = document.getElementById("radioMessage");

const transmissions=[
"...is this frequency still active?",
"Earthling detected.",
"We've been trying to reach you about your spaceship's extended warranty.",
"Greetings from Sector 9.",
"Your planet is surprisingly loud.",
"Earthling detected. You're much smaller than the documentaries suggested.",
"Attention Earth visitor: Floating without permission is prohibited.",
"Space is mostly quiet. Humans should try it sometime.",
"Your planet has eight billion people and you're still lonely? Curious.",
"Earth update: Still arguing in comment sections.",
"Recommendation: Drink water before attempting interstellar travel.",
"▒▒ Signal corrupted... translating... hello?...",
"We've observed your species. We have... concerns.",
"Who approved wars bro? Humans can be so dumb.",
"Please stop naming dangerous things 'Steve'.",
"...",
"Connection Lost.",
"Reconnected.",
"Transmission intercepted by Area 51.",
"Wrong galaxy. Sorry.",
"Do humans always panic this much?",
"Your moon says hello.",
"We found your Wi-Fi. Password was weak.",
"Earth has good music. Keep sending more.",
"Earth... ah yes, the dramatic one.",
"Message redacted by Galactic Security.",
"Translation failed. Apparently this joke only works on Jupiter.",
"Connection lost. Please rotate your planet and try again.",
"🌌 We have been watching your sunsets. They're beautiful.",
"Hello, Earth visitor. Your existence has been successfully acknowledged.",
"Thank you for choosing Space™.",
"No transmissions detected. It's just you. And 200 billion galaxies.",
"You are visitor #1 today. Yesterday there were also 1.",
"⭐ Congratulations. You accidentally tuned into the oldest radio station in the universe.",
"Your Wi-Fi signal is surprisingly strong out here.",
"Please stop pointing telescopes at us while we're eating.",
"Pluto still talks about you.",
"Scanning intelligence... please wait.",
"Please remain seated during existential thoughts.",
"Unknown lifeform waving enthusiastically."
];

function newMessage(){
let random;
if(Math.random()<0.02){
 random =
 "⚠ UNKNOWN SIGNAL DETECTED\n\nDon't look behind you.";
}else{
 random =
 transmissions[Math.floor(Math.random()*transmissions.length)];
}

radio.style.opacity=0;

setTimeout(()=>{
 radio.textContent=random;
 radio.style.opacity=1;
},300);
}

newMessage();
setInterval(newMessage,6000);