import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Mining Madness";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let oresMined = 0;
let miningRate = 0;

// Array of available items (Pickaxe, Drill, Excavator)
const availableItems = [
  { name: "Pickaxe", cost: 10, rate: 0.1 },
  { name: "Drill", cost: 100, rate: 2.0 },
  { name: "Excavator", cost: 1000, rate: 50.0 }
];

// Track number of items purchased
const itemsPurchased = availableItems.map(() => 0);

// Create a button for mining (main action)
const mineButton = document.createElement("button");
mineButton.innerHTML = "⛏️ Mine the Rock!";
app.append(mineButton);

// Create status displays
const statusDisplay = document.createElement("div");
const miningRateDisplay = document.createElement("p");
const purchaseDisplay = document.createElement("p");
statusDisplay.append(miningRateDisplay, purchaseDisplay);
app.append(statusDisplay);

// Create a container for the upgrade buttons
const upgradesContainer = document.createElement("div");
app.append(upgradesContainer);

function updateStatus() {
  miningRateDisplay.innerHTML = `Current Mining Rate: ${miningRate.toFixed(2)} ores/sec`;
  purchaseDisplay.innerHTML = `Purchased: ${availableItems
    .map((item, index) => `${item.name}(${itemsPurchased[index]})`)
    .join(", ")}`;
}

function updateUpgradeButtons() {
  upgradesContainer.innerHTML = ""; // Clear existing buttons
  availableItems.forEach((item, index) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `Buy ${item.name} (+${item.rate} ores/sec, cost: ${item.cost.toFixed(2)})`;
    upgradeButton.disabled = oresMined < item.cost; // Enable/Disable based on available ores

    upgradeButton.onclick = () => {
      if (oresMined >= item.cost) {
        oresMined -= item.cost;
        miningRate += item.rate;
        itemsPurchased[index] += 1;
        item.cost *= 1.15; // Increase cost for next purchase
        updateUpgradeButtons(); // Refresh buttons after purchase
        mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
      }
    };

    upgradesContainer.append(upgradeButton);
  });
}

let lastTimestamp = 0;

function boost(elapsedTime: number) {
  return (miningRate * elapsedTime) / 1000;
}

function updateCounter(timestamp: number) {
  if (lastTimestamp !== 0) {
    const elapsedTime = timestamp - lastTimestamp;
    oresMined += boost(elapsedTime);
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
    updateUpgradeButtons(); // Update the state of the buttons
  }
  updateStatus();
  lastTimestamp = timestamp;
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Handle manual mining
mineButton.onclick = () => {
  oresMined += 1;
  mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
};
