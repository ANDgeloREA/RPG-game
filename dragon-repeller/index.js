let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const pgImg = document.querySelector("#pg");
const npcImg = document.querySelector("#npc");
const monsterImg = document.querySelector("#monster");
const backgroundImg = document.querySelector("#background");

const weapons = [
  { name: "stick", power: 5 },
  { name: "dagger", power: 30 },
  { name: "claw hammer", power: 50 },
  { name: "sword", power: 100 },
];
const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
    img: "./assets/npc/slime.png",
  },
  {
    name: "Goblin",
    level: 8,
    health: 60,
    img: "./assets/npc/goblin.png",
  },
  {
    name: "Dragon",
    level: 20,
    health: 300,
    img: "./assets/npc/dragon.png",
  },
];
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'Villager: "Hero, thank you for your deeds. You are now in the city square. Before resuming your quest go to the store to improve your equipment."',
    background: "./assets/scene/town_square.jpg",
    npc: "./assets/npc/villager.png"
  },
  {
    name: "store",
    "button text": [
      "Buy a potion (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyPotion, buyWeapon, goTown],
    text: 'Blacksmith: "Welcome to my store. Do you want to buy a potion to recover 10 health or a new weapon?"',
    background: "./assets/scene/store.jpg",
    npc: "./assets/npc/blacksmith.png"
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight goblin", "Go to town square"],
    "button functions": [fightSlime, fightGoblin, goTown],
    text: 'Spirit: "You enter the cave. You see some monsters. Choose who you want to face and be careful!"',
    background: "./assets/scene/cave.jpg",
    npc: "./assets/npc/spirit.png"
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
    background: "./assets/scene/fight.jpg",
    npc: "./assets/npc/spirit.png"
  },
  {
    name: "kill monster",
    "button text": [
      "Go to town square",
      "Go to town square",
      "Go to town square",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Spirit: "The monster screams "Arg!" as it dies. You gain experience points and find gold."',
    background: "./assets/scene/kill_monster.jpg",
    npc: "./assets/npc/spirit.png"
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: 'Spirit: "You die &#x2620;. The raging dragon destroyed the village but I can bring you back. Do you still want to save the village?"',
    background: "./assets/scene/lose.jpg",
    npc: "./assets/npc/spirit.png"
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: 'Spirit: "You defeat the dragon and saved the village! YOU WIN THE GAME! &#x1F389;"',
    background: "./assets/scene/win.jpg",
    npc: "./assets/npc/spirit.png"
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: 'Spirit: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"',
    background: "./assets/scene/easter_egg.jpg",
    npc: "./assets/npc/spirit.png"
  },
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
  backgroundImg.src = location.background;
  npcImg.src = location.npc;
}

function goTown() {
  update(locations[0]);
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function goStore() {
  update(locations[1]);
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function goCave() {
  update(locations[2]);
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function buyPotion() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy more potions.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory.join(", ");
    } else {
      text.innerText = 'Blacksmith: "You do not have enough gold to buy a weapon."';
    }
  } else {
    text.innerText = 'Blacksmith: "You already have the most powerful weapon!"';
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory.join(", ");
  } else {
    text.innerText = 'Blacksmith: "Don\'t sell your only weapon!"';
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightGoblin() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "flex";
  monsterImg.style.display = "block";
  npcImg.style.display = "none";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
  monsterName.innerText = monsters[fighting].name;
  monsterImg.src = monsters[fighting].img;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function lose() {
  update(locations[5]);
  pgImg.style.display = "none";
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function winGame() {
  update(locations[6]);
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
  monsterImg.style.display = "none";
  pgImg.style.display = "block";
}

function easterEgg() {
  update(locations[7]);
  monsterImg.style.display = "none";
  npcImg.style.display = "block";
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
