// Part 1: Humble Beginnings

console.log( "Humble Beginnings")

const adventurer = {
  name: "Robin",
  health: 10,
  inventory: ["sword", "potion", "artifact"],
  companion: {
    name: "Leo",
    type: "Cat",
    companion: {
      name: "Frank",
      type: "Flea",
      inventory: ["small hat", "sunglasses"]
    }
  },
  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
};
console.log("Robin's Inventory:");
for (const item of adventurer.inventory) {
  console.log(`- ${item}`);
}
adventurer.roll();

// Part 2: Class Fantasy
console.log(" PART 2 & PART 4: CHARACTER BASE CLASS ");

class Character {
  
  static MAX_HEALTH = 100;

  constructor(name) {
    this.name = name;
    this.health = Character.MAX_HEALTH;
    this.inventory = [];
  }

  roll(mod = 0) {
    const result = Math.floor(Math.random() * 20) + 1 + mod;
    console.log(`${this.name} rolled a ${result}.`);
    return result;
  }
}
console.log("\n=== PART 3, 4, & 6: ADVENTURER & COMPANION CLASSES ===");

class Adventurer extends Character {
  // Part 4: Static ROLES array
  static ROLES = ["Fighter", "Healer", "Wizard", "Rogue"];

  constructor(name, role) {
    super(name);

   
    if (!Adventurer.ROLES.includes(role)) {
      throw new Error(`Invalid role: ${role}. Valid roles are: ${Adventurer.ROLES.join(", ")}`);
    }

    this.role = role;
   
    this.inventory.push("bedroll", "50 gold coins");
  }

  scout() {
    console.log(`${this.name} is scouting ahead...`);
    return super.roll();
  }

  // Part 6: Duel functionality
  duel(opponent) {
    console.log(`\n--- DUEL START: ${this.name} (${this.health} HP) vs ${opponent.name} (${opponent.health} HP) ---`);

    while (this.health > 50 && opponent.health > 50) {
      const myRoll = this.roll();
      const opponentRoll = opponent.roll();

      if (myRoll > opponentRoll) {
        opponent.health -= 1;
        console.log(`${this.name} wins round! ${opponent.name} drops to ${opponent.health} HP.`);
      } else if (opponentRoll > myRoll) {
        this.health -= 1;
        console.log(`${opponent.name} wins round! ${this.name} drops to ${this.health} HP.`);
      } else {
        console.log("Tie round! No damage dealt.");
      }
    }

    const winner = this.health > 50 ? this : opponent;
    console.log(` WINNER: ${winner.name} wins the duel with ${winner.health} HP remaining!\n`);
  }
}

class Companion extends Character {
  constructor(name, type) {
    super(name);
    this.type = type;
  }

  assist() {
    console.log(`${this.name} the ${this.type} offers assistance!`);
    return super.roll(2); 
  }
}

// Re-creating Robin using Adventurer and Companion classes
const robin = new Adventurer("Robin", "Fighter");
robin.inventory.push("sword", "potion", "artifact");

const leo = new Companion("Leo", "Cat");
const frank = new Companion("Frank", "Flea");
frank.inventory.push("small hat", "sunglasses");

// Chain companions
robin.companion = leo;
leo.companion = frank;

console.log("PART 5: ADVENTURER FACTORY ");

class AdventurerFactory {
  constructor(role) {
    this.role = role;
    this.adventurers = [];
  }

  generate(name) {
    const newAdventurer = new Adventurer(name, this.role);
    this.adventurers.push(newAdventurer);
    return newAdventurer;
  }

  findByIndex(index) {
    return this.adventurers[index];
  }

  findByName(name) {
    return this.adventurers.find((a) => a.name === name);
  }
}

const healerFactory = new AdventurerFactory("Healer");
const wizardFactory = new AdventurerFactory("Wizard");

const elena = healerFactory.generate("Elena");
const gandalf = wizardFactory.generate("Gandalf");

console.log("Generated Healers:", healerFactory.adventurers);
console.log("\n=== PART 7: ADVENTURE FORTH ===");

robin.scout();
robin.companion.assist();
robin.companion.companion.roll();


robin.duel(elena);