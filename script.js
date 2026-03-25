// ===== KEYS =====
const keys = ["Test1","Test2","Test3"];
let admin = false;

// ===== PLAYER =====
let player = {
  stand: "Star Platinum",
  hp: 100,
  combo: 0,
  inventory: {arrow:3}
};

// ===== STANDS =====
let stands = {
  "Star Platinum":[
    {name:"Ora Barrage", dmg:15, cd:0},
    {name:"Heavy Punch", dmg:25, cd:0},
    {name:"Time Stop", dmg:0, cd:3}
  ],
  "The World":[
    {name:"Punch Rush", dmg:15, cd:0},
    {name:"Knife Throw", dmg:20, cd:1},
    {name:"Time Stop", dmg:0, cd:3}
  ]
};

// ===== ENEMIES =====
let enemies = [
  {
    name:"Vampire",
    hp:100,
    abilities:[
      {name:"Claw", dmg:10},
      {name:"Drain", dmg:15},
      {name:"Freeze", dmg:20}
    ]
  },
  {
    name:"Hamon User",
    hp:100,
    abilities:[
      {name:"Hamon Punch", dmg:12},
      {name:"Sunlight Kick", dmg:18},
      {name:"Overdrive", dmg:25}
    ]
  },
  {
    name:"Stand User",
    hp:120,
    abilities:[
      {name:"Rush", dmg:15},
      {name:"Ability", dmg:20},
      {name:"Finisher", dmg:30}
    ]
  }
];

let enemy = null;
let enemyFrozen = false;

// ===== KEY =====
function checkKey(){
  if(keys.includes(keyInput.value)){
    keyScreen.style.display="none";
    gameUI.style.display="block";
    openTab("fight");
    updateUI();
  }
}

// ===== ADMIN =====
function unlockAdmin(){
  if(adminKey.value==="777"){
    admin=true;
    adminPanel.style.display="block";
  }
}

function giveArrows(){ player.inventory.arrow+=10; updateUI(); }
function giveAll(){ player.inventory.arrow=999; updateUI(); }
function setStand(){
  let s = prompt("Stand?");
  if(stands[s]) player.stand=s;
  updateAura();
}
function boostStats(){ player.hp=999; updateUI(); }

// ===== UI =====
function openTab(tab){
  document.querySelectorAll(".tab").forEach(t=>t.style.display="none");
  document.getElementById(tab).style.display="block";
}

function updateUI(){
  standText.innerText = "Stand: " + player.stand;
  hpText.innerText = "HP: " + player.hp;
  inventoryText.innerText = "Arrows: " + player.inventory.arrow;
}

// ===== ENCOUNTER =====
function findEnemy(){
  enemy = JSON.parse(JSON.stringify(enemies[Math.floor(Math.random()*enemies.length)]));
  notify("Encounter: "+enemy.name);
}

// ===== COMBAT =====
function useMove(i){
  if(!enemy) return;

  let move = stands[player.stand][i];

  if(move.cd>0){
    notify("Cooldown!");
    return;
  }

  if(move.name==="Time Stop"){
    timeStop();
  }

  let crit = Math.random()<0.2;
  let dmg = move.dmg + (crit?10:0);

  enemy.hp -= dmg;

  playHit();
  document.body.classList.add("hit");
  setTimeout(()=>document.body.classList.remove("hit"),200);

  notify(move.name+" "+(crit?"CRIT!":"")+" -"+dmg);

  move.cd=2;

  if(enemy.hp<=0){
    notify("Enemy defeated!");
    enemy=null;
    return;
  }

  enemyTurn();
  reduceCD();
}

// ===== ENEMY =====
function enemyTurn(){
  if(enemyFrozen){
    notify("Enemy frozen in time ⏱️");
    return;
  }

  let move = enemy.abilities[Math.floor(Math.random()*3)];
  let dmg = move.dmg;

  if(blocking) dmg/=2;
  if(dodging && Math.random()<0.5){
    notify("Dodged!");
    return;
  }

  player.hp -= dmg;
  notify(enemy.name+" used "+move.name+" -"+dmg);

  updateUI();
}

// ===== DEFENSE =====
let blocking=false;
let dodging=false;

function block(){ blocking=true; notify("Blocking!"); }
function dodge(){ dodging=true; notify("Dodging!"); }

// ===== COOLDOWN =====
function reduceCD(){
  stands[player.stand].forEach(m=>{
    if(m.cd>0)m.cd--;
  });
  blocking=false;
  dodging=false;
}

// ===== TIME STOP =====
function timeStop(){
  timeStopOverlay.style.display="flex";
  tsSound.play();
  enemyFrozen=true;

  setTimeout(()=>{
    timeStopOverlay.style.display="none";
    enemyFrozen=false;
  },3000);
}

// ===== AURA =====
function updateAura(){
  if(player.stand==="Star Platinum"){
    aura.style.background="radial-gradient(circle, purple, transparent)";
  }
  if(player.stand==="The World"){
    aura.style.background="radial-gradient(circle, gold, transparent)";
  }
}

// ===== TRAIN =====
function train(){
  player.hp+=10;
  updateUI();
}

// ===== INVENTORY =====
function useArrow(){
  if(player.inventory.arrow>0){
    player.inventory.arrow--;
    player.stand = Math.random()>0.5?"Star Platinum":"The World";
    notify("New Stand!");
    updateAura();
    updateUI();
  }
}

// ===== UTIL =====
function notify(text){
  let div=document.createElement("div");
  div.className="notify";
  div.innerText=text;
  notifyContainer.appendChild(div);
}

function playHit(){
  hitSound.play();
}
