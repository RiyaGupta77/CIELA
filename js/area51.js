const output=document.getElementById("output");
const button=document.getElementById("scanBtn");

button.addEventListener("click",startScan);
function delay(ms){
return new Promise(resolve=>setTimeout(resolve,ms));
}

async function startScan(){
button.disabled=true;
button.style.display="none";
output.innerHTML="";

const messages=[
"📡 Establishing satellite link...",
"🛰 Signal acquired.",
"🌎 Locating Area 51...",
"👽 Detecting atmospheric anomalies...",
"📂 Accessing classified weather records...",
"🔓 Decrypting files...",
"████████████████████████████"
];

for(const message of messages){
output.innerHTML+=message+"\n";
await delay(1500);
}

await delay(1000);
output.innerHTML+=`
⚠ SECURITY BREACH DETECTED
`;

await delay(1800);
output.innerHTML+=`
Your session has been reported.
`;

await delay(1800);
output.innerHTML+=`
🛸 Data confiscated by security.
`;

await delay(1800);
output.innerHTML+=`
Returning you to a safer location...
`;

setTimeout(()=>{
window.location.href="../index.html";
},4000);
}

