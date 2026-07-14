const whispers=[
"Someone is quietly rooting for you today.",
"The clouds miss being looked at.",
"Cloud number 777 escaped again.",
"Your happiness request is being processed.",
"We appreciate your continued existence.",
"Earth continues to confuse us.",
"A star insisted we tell you hello.",
"Your guardian requested we keep this message anonymous.",
"An angel accidentally watered the Milky Way.",
"You've survived every difficult day so far.",
"Somewhere, a sunset is waiting for you.",
"Your file has been stamped 'Doing Their Best.'",
"Your memes have reached Heaven.",
"We're still trying to understand taxes.",
"Your request has been forwarded to the appropriate constellation.",
"The cloud department says thank you for noticing sunsets.",
"Today's sky was painted by the intern. We think they did well.",
"Everything doesn't need fixing today.",
"Cloud Engineering is investigating today's oddly-shaped cloud.",
"We checked. The moon still remembers your late-night conversations.",
"Your request has been assigned ticket #777.",
"Please hold. An angel will be with you shortly.",
"Today's clouds have been quality checked.",
"We've forwarded your concern to the Destiny Department.",
"Your guardian angel is currently in a meeting.",
"The Halo Maintenance Team appreciates your patience.",
"Your life file is... surprisingly entertaining.",
"The Universe would like to compliment your resilience.",
"Today's rainbow passed all safety inspections.",
"The Miracles Department is experiencing high traffic.",
"Your guardian angel requested another coffee.",
"The intern accidentally made two people think about their ex at the same time.",
"Someone forgot to refill the stardust dispenser.",
"The Destiny Team has asked everyone to stop pressing random buttons.",
"The Happiness Department just clocked in.",
"We've received 8 billion weather complaints today.",
"Someone accidentally approved three double rainbows.",
];

const whisper=document.getElementById("whisperText");
const button=document.getElementById("newWhisper");

function randomWhisper(){
const random=Math.floor(Math.random()*whispers.length);
whisper.textContent=whispers[random];
}

randomWhisper();

button.onclick=randomWhisper;

const heavenLinks = [
'😈 Curious what the opposite feels like? Visit <a href="hell.html">Hell</a>.',
'🔥 Someone down there keeps recommending us. <a href="hell.html">See why</a>.',
'☁ If perfection gets boring... <a href="hell.html">Hell</a> is surprisingly eventful.',
'🌋 Looking for warmer weather? Try <a href="hell.html">Hell</a>.',
'🧯 We cannot recommend it... but <a href="hell.html">Hell</a> is nearby.',
'✨ Some visitors insist on comparing both destinations. <a href="hell.html">Judge for yourself</a>.',
'😇 You seem nice. We would rather you stayed...but <a href="hell.html">here is the portal.<a>'
];

document.querySelector(".hell-link").innerHTML =
heavenLinks[Math.floor(Math.random()*heavenLinks.length)];