
const alerts = [

"⚠ Peeves has been spotted near the Library.",
"🦉 Owl deliveries may arrive later than expected.",
"🌲 The Forbidden Forest is unusually quiet today.",
"🪄 Wand sparks are stronger than normal.",
"✨ Floating candles are especially bright tonight.",
"📚 The Restricted Section feels unusually restless."

];

const alertList = document.querySelector(".alerts ul");

function randomAlert(){
    const random =
    alerts[Math.floor(Math.random()*alerts.length)];
    alertList.firstElementChild.textContent=random;
}

randomAlert();
const houses=document.querySelectorAll(".house");
houses.forEach((house)=>{
house.addEventListener("mouseenter",()=>{
house.style.boxShadow=
"0 0 30px rgba(233,209,141,.45)";
});

house.addEventListener("mouseleave",()=>{
house.style.boxShadow="none"
});

});

const owlLetters=[
"The Great Hall candles are glowing brighter than usual tonight.",
"Owl traffic is unusually heavy. Expect delayed deliveries.",
"A first-year accidentally challenged the Whomping Willow. Again.",
"The library reminds students that screaming is discouraged.",
"Someone left a cauldron unattended.",
"A broomstick has been circling the Quidditch pitch for twenty minutes without a rider.",
"A Peeves-related incident is currently under investigation.",
"The castle wishes everyone luck with tomorrow's classes.",
"The castle seems pleased with today's weather.",
"Extra credit is apparently a myth.",
"Please stop attempting to pet every magical creature.",
"The ghosts are unusually chatty this evening.",
"The Forbidden Forest remains... forbidden.",
"Common room fireplaces have been inspected.",
"The prefects would like everyone to stop racing broomsticks indoors.",
"The greenhouse is missing one Venomous Tentacula. Nobody panic.",
"The Astronomy Tower offers excellent stargazing tonight.",
"Filch reports that absolutely nobody has broken the rules today. Suspicious.",
"The kitchens have produced an alarming quantity of treacle tart.",
"The castle appreciates visitors who don't duel in the hallways.",
"The suits of armor are gossiping again.",
"The Fat Lady has requested quieter singing after midnight.",
"The Great Hall ceiling predicts clear skies.",
"A portrait has started another argument in the corridor.",
"The Astronomy Tower offers a spectacular sky after sunset.",
"Professor Sprout recommends visiting the greenhouses today.",
"Keep an eye on the moving staircases. They're feeling adventurous.",
"The castle feels especially magical this evening.",
"Butterbeer tastes better when shared with friends.",
"Today's weather is perfect for a peaceful walk around the Black Lake.",
"An owl dropped this letter by mistake. Since you're here, you may as well read it.",
"The enchanted ceiling predicts a calm and beautiful night."
];

const owlPost=document.getElementById("owlPost");
const owlText=document.getElementById("owlText");

const nextLetter=document.getElementById("nextLetter");
const closeOwlPost=document.getElementById("closeOwlPost");

function randomLetter(){
const random=Math.floor(Math.random()*owlLetters.length);
owlText.textContent=owlLetters[random];
}

setTimeout(()=>{
randomLetter();
owlPost.classList.remove("hidden");
owlPost.classList.add("visible");
},2500);

nextLetter.addEventListener("click",()=>{
owlText.style.opacity=0;

setTimeout(()=>{
randomLetter();
owlText.style.opacity=1;
},200);
});

closeOwlPost.addEventListener("click",()=>{
owlPost.classList.remove("visible");
owlPost.classList.add("hidden");

});

const castleTime = document.getElementById("castleTime");
const castleEmoji = document.getElementById("castleEmoji");

const castleSchedule = [

{
    start:6,
    end:8,
    emoji:"🥞",
    messages:[
        "The Great Hall is serving breakfast.",
        "Fresh pumpkin juice has arrived.",
        "The house-elves are already hard at work.",
        "Students are gathering for breakfast."
    ]
},

{
    start:8,
    end:12,
    emoji:"📚",
    messages:[
        "Morning classes have begun.",
        "Professor McGonagall expects punctuality.",
        "Charms class is unusually lively today.",
        "Don't forget your wand before class."
    ]
},

{
    start:12,
    end:14,
    emoji:"🍗",
    messages:[
        "Lunch is now being served.",
        "The Great Hall smells delicious today.",
        "Perfect time to take a break.",
        "Even owls seem to be stopping for lunch."
    ]
},

{
    start:14,
    end:17,
    emoji:"🪄",
    messages:[
        "Spell practice is in session.",
        "Today's magical energy feels unusually strong.",
        "Excellent conditions for potion brewing.",
        "A calm afternoon surrounds the castle."
    ]
},

{
    start:17,
    end:19,
    emoji:"🧹",
    messages:[
        "Perfect flying weather today.",
        "Quidditch practice has begun.",
        "The Quidditch pitch is buzzing with excitement.",
        "Keep an eye out for rogue Bludgers."
    ]
},

{
    start:19,
    end:21,
    emoji:"🍽",
    messages:[
        "Dinner is being served in the Great Hall.",
        "The enchanted ceiling looks beautiful tonight.",
        "A peaceful evening settles over Hogwarts.",
        "Students are sharing stories over dinner."
    ]
},

{
    start:21,
    end:23,
    emoji:"🌌",
    messages:[
        "The Astronomy Tower welcomes observers.",
        "Perfect conditions for stargazing.",
        "Constellations shine brightly tonight.",
        "A quiet magical night has begun."
    ]
},

{
    start:23,
    end:6,
    emoji:"🌙",
    messages:[
        "After Curfew.",
        "The castle corridors have fallen silent.",
        "Only portraits remain awake.",
        "The ghosts have claimed the hallways.",
        "The moon watches over Hogwarts tonight."
    ]
}

];

function updateCastleSchedule(){

    const hour = new Date().getHours();
    let current;
    for(const period of castleSchedule){
        if(period.start < period.end){
            if(hour >= period.start && hour < period.end){
                current = period;
            }
        }

        else{
            if(hour >= period.start || hour < period.end){
                current = period;
            }
        }
    }

    castleEmoji.textContent = current.emoji;

    const randomMessage =
    current.messages[
        Math.floor(Math.random()*current.messages.length)
    ];

    castleTime.textContent = randomMessage;
}

updateCastleSchedule();

setInterval(updateCastleSchedule,60000);