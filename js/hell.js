const replies=[
"We received your complaint. Unfortunately, we don't care.",
"You're visitor #666 today.",
"Today's torture has been postponed due to maintenance.",
"Ticket #4927823 Closed.",
"Estimated response time. Eternity.",
"Please mind the eternal flames.",
"Our customer satisfaction team resigned centuries ago.",
"Hydration is strongly recommended.",
"Cerberus escaped again.",
"Your planet creates enough drama already.",
"Nobody knows who keeps opening the portal.",
"The skeleton union is on strike.",
"The pitchfork sharpening department is behind schedule.",
"Someone summoned the wrong demon.",
"We've seen your internet comment history.",
"You still haven't replied to that one text.",
"Earth sends us enough entertainment already.",
"We don't even have to tempt some people anymore.",
"The Sin Processing Unit is overwhelmed.",
"Human Resources has been renamed Demon Resources.",
"Some visitors arrive from a castle full of moving staircases...",
"The Ash Department requests fewer explosions.",
"This place has one-star reviews for a reason.",
"SATAN TYPING...oh hell- wrong chat.",
"The air conditioning request was denied.",
"Even Hell has standards.",
"The brimstone shipment finally arrived.",
"The Devil is currently in a meeting.",
"Your patience has been added to the fire.",
"Flip-flops remain a poor decision.",
"Please stay angry while we connect your call.",
"Please hold while we locate your regrets.",
"Meeting moved to the Pit Conference Room.",
"Your suffering is important to us.",
"Congratulations. You found the hottest destination in CIELA.",
"We've heard rumors of a place where the weather is always perfect."
];

const support=document.getElementById("supportText");
const button=document.getElementById("anotherReply");

function randomReply(){
const random=Math.floor(Math.random()*replies.length);
support.textContent=replies[random];

}

randomReply();
button.onclick=randomReply;

const exits = [
'🔥 Did you mean to search <a href="heaven.html">Heaven</a> instead?',
'😇 Looking for somewhere cooler? Try <a href="heaven.html">Heaven</a>.',
'☁ Wrong turn? <a href="heaven.html">Heaven</a> is one click away.',
'🚪 Emergency exit available: <a href="heaven.html">Heaven</a>.',
'🧯 Recommended escape route: <a href="heaven.html">Heaven</a>.',
'😅 This destination has mixed reviews. Consider <a href="heaven.html">Heaven</a>.',
'🌤 Your search history suggests you prefer nicer places. Try <a href="heaven.html">Heaven</a>.'
];

document.querySelector(".heaven-link").innerHTML =
exits[Math.floor(Math.random() * exits.length)];