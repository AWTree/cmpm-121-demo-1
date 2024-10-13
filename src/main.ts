import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "👾 Endless Mining";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let oresMined = 0;
let miningRate = 0;
const itemsPurchased = { Pickaxe: 0, Drill: 0, Excavator: 0 };

const prices = {
  Pickaxe: 10,
  Drill: 100,
  Excavator: 1000,
};

// Create a button for clicking
const mineButton = document.createElement("button");
mineButton.innerHTML = "⛏️ Mine the Rock!";
app.append(mineButton);

// Create status displays
const statusDisplay = document.createElement("div");
const miningRateDisplay = document.createElement("p");
const purchaseDisplay = document.createElement("p");
statusDisplay.append(miningRateDisplay, purchaseDisplay);
app.append(statusDisplay);

function updateStatus() {
  miningRateDisplay.innerHTML = `Current Mining Rate: ${miningRate.toFixed(2)} ores/sec`;
  purchaseDisplay.innerHTML = `Purchased: Pickaxe(${itemsPurchased.Pickaxe}), Drill(${itemsPurchased.Drill}), Excavator(${itemsPurchased.Excavator})`;
}

// Create an upgrade button
const upgradePickaxe = document.createElement("button");
upgradePickaxe.innerHTML = `Buy Pickaxe (+0.1 clicks/sec, cost: ${prices.Pickaxe.toFixed(2)})`;
upgradePickaxe.disabled = true;

const upgradeDrill = document.createElement("button");
upgradeDrill.innerHTML = `Buy Drill (+2.0 clicks/sec, cost: ${prices.Drill.toFixed(2)})`;
upgradeDrill.disabled = true;

const upgradeExcavator = document.createElement("button");
upgradeExcavator.innerHTML = `Buy Excavator (+50 clicks/sec, cost: ${prices.Excavator.toFixed(2)})`;
upgradeExcavator.disabled = true;

app.append(upgradePickaxe, upgradeDrill, upgradeExcavator);

let lastTimestamp = 0;

function boost(elapsedTime: number) {
  return (miningRate * elapsedTime) / 1000; // Increase proportional to growthRate and time passed
}

function updateCounter(timestamp: number) {
  if (lastTimestamp !== 0) {
    const elapsedTime = timestamp - lastTimestamp; // Calculate elapsed time since last frame
    oresMined += boost(elapsedTime); // Increase num_clicks proportionally to the time passed and growth rate
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;

    upgradePickaxe.disabled = oresMined < prices.Pickaxe;
    upgradeDrill.disabled = oresMined < prices.Drill;
    upgradeExcavator.disabled = oresMined < prices.Excavator;
  }
  updateStatus();
  lastTimestamp = timestamp; // Update lastTimestamp for the next frame
  requestAnimationFrame(updateCounter); // Schedule the next frame
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Handle manual clicking
mineButton.onclick = () => {
  oresMined += 1; // Add a full click on manual click
  mineButton.innerHTML = `${oresMined.toFixed(2)} clicks so far`;
};

// Handle upgrade purchase// Handle upgrade purchases
upgradePickaxe.onclick = () => {
  if (oresMined >= prices.Pickaxe) {
    oresMined -= prices.Pickaxe;
    miningRate += 0.1;
    itemsPurchased.Pickaxe += 1;
    prices.Pickaxe *= 1.15; // Increase the price by 1.15 for the next purchase
    upgradePickaxe.innerHTML = `Buy Pickaxe (+0.1 ores/sec, cost: ${prices.Pickaxe.toFixed(2)})`;
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
  }
};

upgradeDrill.onclick = () => {
  if (oresMined >= prices.Drill) {
    oresMined -= prices.Drill;
    miningRate += 2.0;
    itemsPurchased.Drill += 1;
    prices.Drill *= 1.15; // Increase the price by 1.15 for the next purchase
    upgradeDrill.innerHTML = `Buy Drill (+2.0 ores/sec, cost: ${prices.Drill.toFixed(2)})`;
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
  }
};

upgradeExcavator.onclick = () => {
  if (oresMined >= prices.Excavator) {
    oresMined -= prices.Excavator;
    miningRate += 50.0;
    itemsPurchased.Excavator += 1;
    prices.Excavator *= 1.15; // Increase the price by 1.15 for the next purchase
    upgradeExcavator.innerHTML = `Buy Excavator (+50 ores/sec, cost: ${prices.Excavator.toFixed(2)})`;
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
  }
};
