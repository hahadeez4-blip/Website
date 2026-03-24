// ===== BOSSES =====
const bosses = [
  {
    name: "DIO (Vampire)",
    hp: 80,
    abilities: ["laser", "freeze", "regen"]
  },
  {
    name: "Kars",
    hp: 100,
    abilities: ["adapt", "blade", "regen"]
  },
  {
    name: "DIO (The World)",
    hp: 120,
    abilities: ["timeStop", "knives"]
  },
  {
    name: "Kira",
    hp: 110,
    abilities: ["bomb", "sheerHeart", "rewind"]
  },
  {
    name: "Diavolo",
    hp: 130,
    abilities: ["timeErase", "predict"]
  },
  {
    name: "Pucci",
    hp: 140,
    abilities: ["steal", "gravity", "speedTime"]
  },
  {
    name: "Funny Valentine",
    hp: 150,
    abilities: ["multiverse", "redirect", "clone"]
  }
];

// ===== BOSS FIGHT =====
function fightBoss() {

  let boss = bosses[Math.floor(Math.random() * bosses.length)];
  let bossHP = boss.hp;
  let playerHP = player.stats.durability * 10;

  notify("Boss: " + boss.name);

  let battle = setInterval(() => {

    // PLAYER DAMAGE
    let dmg = player.stats.strength + Math.random() * 10;
    bossHP -= dmg;

    notify("You hit for " + Math.floor(dmg));

    // BOSS MOVE
    let move = boss.abilities[Math.floor(Math.random() * boss.abilities.length)];

    if (move === "timeStop") {
      notify("TIME STOP ⏱️");
      playerHP -= 20;
    }

    if (move === "bomb") {
      notify("BOMB 💣");
      playerHP -= 18;
    }

    if (move === "timeErase") {
      notify("TIME ERASED ⏭️");
      playerHP -= 22;
    }

    if (move === "speedTime") {
      notify("TIME ACCELERATION ⚡");
      playerHP -= 25;
    }

    if (move === "redirect") {
      notify("Damage redirected!");
      bossHP += 10;
    }

    if (move === "clone") {
      notify("Clone attack!");
      playerHP -= 15;
    }

    if (move === "regen") {
      notify("Boss regenerated!");
      bossHP += 10;
    }

    if (move === "laser") {
      notify("Eye laser 🔥");
      playerHP -= 15;
    }

    if (move === "freeze") {
      notify("Frozen ❄️");
      playerHP -= 12;
    }

    if (move === "blade") {
      notify("Blade attack ⚔️");
      playerHP -= 17;
    }

    if (move === "sheerHeart") {
      notify("Sheer Heart Attack 🤖");
      playerHP -= 20;
    }

    if (move === "rewind") {
      notify("TIME REWIND 🔁");
      bossHP += 20;
    }

    if (move === "predict") {
      notify("Predicted your move 👁️");
      playerHP -= 18;
    }

    if (move === "gravity") {
      notify("Gravity crush 🌌");
      playerHP -= 20;
    }

    if (move === "multiverse") {
      notify("Multiverse swap 🌍");
      bossHP += 15;
    }

    if (move === "steal") {
      notify("Ability stolen 💀");
      playerHP -= 18;
    }

    // END
    if (bossHP <= 0) {
      clearInterval(battle);
      notify("YOU WON 🔥");
      player.xp += 50;
      player.inventory.arrow++;
      save();
      updateUI();
    }

    if (playerHP <= 0) {
      clearInterval(battle);
      notify("YOU LOST 💀");
    }

  }, 1500);
}
