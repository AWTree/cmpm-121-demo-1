import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "⛏️ Endless Mining";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let oresMined = 0;
let miningRate = 0;

// Define item interface with a description field
interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
  color: string;
}

const availableItems: Item[] = [
  {
    name: "Pickaxe",
    cost: 10,
    rate: 0.1,
    description: "A basic pickaxe for mining small amounts of ore.",
    color: "#8a5a44",
  },
  {
    name: "Drill",
    cost: 100,
    rate: 2.0,
    description: "An automatic drill that mines ore continuously.",
    color: "#4a90e2",
  },
  {
    name: "Excavator",
    cost: 1000,
    rate: 50.0,
    description: "A powerful machine that extracts massive amounts of ore.",
    color: "#d8a76c",
  },
  {
    name: "Mining Bot",
    cost: 5000,
    rate: 200.0,
    description: "A fully autonomous mining bot that works around the clock.",
    color: "#8fbc8f",
  },
  {
    name: "Ore Refinery",
    cost: 20000,
    rate: 1000.0,
    description: "Refines raw ore into valuable resources at a rapid rate.",
    color: "#d4af37",
  },
];

// Track number of items purchased
const itemsPurchased = availableItems.map(() => 0);

// Create main action button for mining
const mineButton = document.createElement("button");
mineButton.innerHTML = "⛏️ Mine the Rock!";
app.append(mineButton);

// Create status displays
const statusDisplay = document.createElement("div");
const miningRateDisplay = document.createElement("p");
const purchaseDisplay = document.createElement("p");
statusDisplay.append(miningRateDisplay, purchaseDisplay);
app.append(statusDisplay);

// Create container for upgrade buttons
const upgradesContainer = document.createElement("div");
app.append(upgradesContainer);

// Initialize upgrade buttons only once
function initializeUpgradeButtons() {
  availableItems.forEach((item, index) => {
    const upgradeButton = document.createElement("button");
    upgradeButton.innerHTML = `Buy ${item.name} (+${item.rate} ores/sec, cost: ${item.cost.toFixed(2)})`;
    upgradeButton.classList.add("upgrade-button"); // Add a specific class for styling
    upgradeButton.setAttribute("data-index", index.toString());
    upgradeButton.style.backgroundColor = item.color;
    upgradesContainer.append(upgradeButton);

    const description = document.createElement("p");
    description.innerText = item.description;
    upgradesContainer.append(upgradeButton, description);

    // Attach click listener using addEventListener
    upgradeButton.addEventListener("click", () => handleUpgradePurchase(index));
  });
}

// Update button state to enable or disable based on ores available
function updateUpgradeButtonsState() {
  const buttons = upgradesContainer.querySelectorAll(
    ".upgrade-button",
  ) as NodeListOf<HTMLButtonElement>;
  buttons.forEach((button, index) => {
    const item = availableItems[index];
    if (oresMined >= item.cost) {
      button.classList.add("available");
      button.disabled = false;
      if (!button.querySelector(".available-icon")) {
        const icon = document.createElement("span");
        icon.className = "available-icon";
        icon.innerHTML = "⭐";
        button.appendChild(icon);
      }
    } else {
      button.classList.remove("available");
      button.disabled = true;
      const icon = button.querySelector(".available-icon");
      if (icon) icon.remove();
    }
  });
}

// Handle the purchase of an upgrade
function handleUpgradePurchase(index: number) {
  const item = availableItems[index];
  if (oresMined >= item.cost) {
    oresMined -= item.cost;
    miningRate += item.rate;
    itemsPurchased[index] += 1;
    item.cost *= 1.15; // Increase cost for next purchase

    // Update the specific button's text to reflect the new cost
    const upgradeButton = upgradesContainer.querySelectorAll("button")[index];
    upgradeButton.innerHTML = `Buy ${item.name} (+${item.rate} ores/sec, cost: ${item.cost.toFixed(2)})`;

    updateUpgradeButtonsState(); // Refresh button states
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
  }
}

// Update the display of current status
function updateStatus() {
  miningRateDisplay.innerHTML = `Current Mining Rate: ${miningRate.toFixed(2)} ores/sec`;
  purchaseDisplay.innerHTML = `Purchased: ${availableItems
    .map((item, index) => `${item.name}(${itemsPurchased[index]})`)
    .join(", ")}`;
}

// Function to calculate and add ores based on elapsed time
let lastTimestamp = 0;
function boost(elapsedTime: number) {
  return (miningRate * elapsedTime) / 1000;
}

function updateCounter(timestamp: number) {
  if (lastTimestamp !== 0) {
    const elapsedTime = timestamp - lastTimestamp;
    oresMined += boost(elapsedTime);
    mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
    updateUpgradeButtonsState();
  }
  updateStatus();
  lastTimestamp = timestamp;
  requestAnimationFrame(updateCounter);
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Handle manual mining action
mineButton.onclick = () => {
  oresMined += 1;
  mineButton.innerHTML = `${oresMined.toFixed(2)} ores mined so far`;
};

// Initialize upgrade buttons once
initializeUpgradeButtons();
