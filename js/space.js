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

"Who approved mosquitoes?",

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