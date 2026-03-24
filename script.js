// ===== // ===== LOADING SCREEN =====
let loadPercent = 0;
let loadInterval = setInterval(() => {
  loadPercent += 10;
  document.getElementById("loadingProgress").innerText = loadPercent + "%";
  if(loadPercent >= 100){
    clearInterval(loadInterval);
    document.getElementById("loadingScreen").style.display="none";
    document.getElementById("gameUI").style.display="block";
    initGame();
  }
},200);

// ===== GAME DATA =====
const traits = ["Common", "Rare", "Epic", "Legendary", "Mythic"];
const stands = {
  "Star Platinum": "oraBarrage",
  "The World": "timeStop",
  "Crazy Diamond": "heal",
  "Killer Queen": "bomb",
  "King Crimson": "timeSkip",
  "Gold Experience": "lifePunch",
  "Made in Heaven": "speedUp",
  "Tusk Act 4": "infiniteSpin"
};

const bosses = [
  {name:"DIO (Vampire)", hp:80, abilities:["laser","freeze","regen"], phase:1},
  {name:"Kars", hp:100, abilities:["adapt","blade","regen"], phase:1},
  {name:"DIO (The World)", hp:120, abilities:["timeStop","knives"], phase:1},
  {name:"Kira", hp:110, abilities:["bomb","sheerHeart","rewind"], phase:1},
  {name:"Diavolo", hp:130, abilities:["timeErase","predict"], phase:1},
  {name:"Pucci", hp:140, abilities:["steal","gravity","speedTime"], phase:1},
  {name:"Funny Valentine", hp:150, abilities:["multiverse","redirect","clone"], phase:1}
];

// ===== PLAYER =====
let player = {
  trait: "",
  stand: "None",
  level: 1,
  xp: 0,
  stats:{strength:5,speed:5,durability:5},
  inventory:{arrow:3},
  x: 240, y: 140
};

// INIT GAME
function initGame(){
  if(localStorage.getItem("jojoSave")) player = JSON.parse(localStorage.getItem("jojoSave"));
  else player.trait = randomTrait();
  updateUI();
  setupMovement();
}

// ===== UI =====
function updateUI(){
  document.getElementById("trait").innerText="Trait: "+player.trait;
  document.getElementById("stand").innerText="Stand: "+player.stand;
  document.getElementById("level").innerText="Level: "+player.level;
  document.getElementById("stats").innerText=`STR:${player.stats.strength} SPD:${player.stats.speed} DUR:${player.stats.durability}`;
  document.getElementById("inventory").innerText="Arrows: "+player.inventory.arrow;
}

// ===== NOTIFICATIONS =====
function notify(msg){
  const div=document.createElement("div");
  div.className="notify";
  div.innerText=msg;
  document.getElementById("notifyContainer").appendChild(div);
  setTimeout(()=>div.remove(),3000);
}

function flash(color){
  document.body.style.background=color;
  setTimeout(()=>document.body.style.background="black",150);
}

// ===== RANDOM TRAIT =====
function randomTrait(){return traits[Math.floor(Math.random()*traits.length)];}

// ===== ARROW / STAND =====
function useArrow(){
  if(player.inventory.arrow<=0){notify("No Arrows ❌"); return;}
  player.inventory.arrow--;
  let keys = Object.keys(stands);
  player.stand = keys[Math.floor(Math.random()*keys.length)];
  notify("You got "+player.stand+" ⚡"); flash("purple"); save(); updateUI();
}

// ===== TRAIN =====
function train(){
  player.xp+=10; player.stats.strength+=1;
  if(player.xp>=50){player.level++; player.xp=0; notify("LEVEL UP 🔥"); flash("gold");}
  save(); updateUI();
}

// ===== ATTACK =====
function attack(){notify(player.stand+" attacks 💥"); player.xp+=10; save(); updateUI();}

// ===== STAND ABILITY =====
function ability(){
  let move=stands[player.stand];
  if(!move){notify("No Stand ❌"); return;}
  switch(move){
    case "oraBarrage": notify("ORA ORA ORA!!! 💥"); flash("blue"); player.xp+=15; break;
    case "timeStop": notify("TIME STOP ⏱️"); flash("yellow"); player.xp+=20; break;
    case "heal": notify("Healed yourself 💚"); flash("green"); break;
    case "bomb": notify("Bomb planted 💣"); flash("red"); break;
    case "timeSkip": notify("Time skipped ⏭️"); flash("gray"); break;
    case "speedUp": notify("Speed increased ⚡"); flash("white"); break;
    case "infiniteSpin": notify("Infinite Spin 🌀"); flash("orange"); player.xp+=25; break;
    case "lifePunch": notify("Life Punch 🩸"); flash("pink"); player.xp+=15; break;
  }
  save(); updateUI();
}

// ===== BOSS FIGHT WITH PHASES =====
function fightBoss(){
  let boss=bosses[Math.floor(Math.random()*bosses.length)];
  let bossHP=boss.hp; let playerHP=player.stats.durability*10;
  notify("Boss Appeared: "+boss.name);

  let battle=setInterval(()=>{
    let dmg=player.stats.strength+Math.random()*10;
    bossHP-=dmg; notify("You dealt "+Math.floor(dmg));

    // Phase 2 trigger
    if(bossHP<boss.hp/2 && boss.phase===1){boss.phase=2; notify(boss.name+" ENTERED PHASE 2 🔥"); flash("red");}

    // Boss attack
    let move=boss.abilities[Math.floor(Math.random()*boss.abilities.length)];
    switch(move){
      case "laser": notify("Eye laser 🔥"); playerHP-=15; break;
      case "freeze": notify("Frozen ❄️"); playerHP-=12; break;
      case "regen": notify("Boss regenerated!"); bossHP+=10; break;
      case "adapt": notify("Adapted! ⚔️"); playerHP-=12; break;
      case "blade": notify("Blade attack ⚔️"); playerHP-=17; break;
      case "timeStop": notify("TIME STOP ⏱️"); flash("yellow"); playerHP-=20; break;
      case "knives": notify("Knife barrage 🔪"); playerHP-=18; break;
      case "bomb": notify("Bomb 💣"); playerHP-=18; break;
      case "sheerHeart": notify("Sheer Heart Attack 🤖"); playerHP-=20; break;
      case "rewind": notify("TIME REWIND 🔁"); bossHP+=20; break;
      case "timeErase": notify("TIME ERASED ⏭️"); playerHP-=22; break;
      case "predict": notify("Predicted your move 👁️"); playerHP-=18; break;
      case "steal": notify("Ability stolen 💀"); playerHP-=18; break;
      case "gravity": notify("Gravity crush 🌌"); playerHP-=20; break;
      case "speedTime": notify("TIME ACCELERATION ⚡"); playerHP-=25; break;
      case "multiverse": notify("Multiverse swap 🌍"); bossHP+=15; break;
      case "redirect": notify("Damage redirected!"); bossHP+=10; break;
      case "clone": notify("Clone attack!"); playerHP-=15; break;
    }

    // END
    if(bossHP<=0){clearInterval(battle); notify("YOU WON 🔥"); player.xp+=50; player.inventory.arrow++; save(); updateUI();}
    if(playerHP<=0){clearInterval(battle); notify("YOU LOST 💀");}
  },1500);
}

// ===== SAVE =====
function save(){localStorage.setItem("jojoSave",JSON.stringify(player));}

// ===== MAP MOVEMENT =====
function setupMovement(){
  window.addEventListener("keydown", e=>{
    let step=10;
    if(e.key==="ArrowUp"){player.y-=step;}
    if(e.key==="ArrowDown"){player.y+=step;}
    if(e.key==="ArrowLeft"){player.x-=step;}
    if(e.key==="ArrowRight"){player.x+=step;}
    if(player.x<0) player.x=0;
    if(player.x>485) player.x=485;
    if(player.y<0) player.y=0;
    if(player.y>285) player.y=285;
    document.getElementById("playerDot").style.left=player.x+"px";
    document.getElementById("playerDot").style.top=player.y+"px";
    save();
  });
}
