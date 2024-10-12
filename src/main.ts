import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My Click Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks = 0;
let growthRate = 0;
const itemsPurchased = { A: 0, B: 0, C: 0 };

let prices = {
  A: 10,
  B: 100,
  C: 1000
};

// Create a button for clicking
const button = document.createElement("button");
button.innerHTML = "Click!";
app.append(button);

// Create status displays
const statusDisplay = document.createElement("div");
const growthRateDisplay = document.createElement("p");
const purchaseDisplay = document.createElement("p");
statusDisplay.append(growthRateDisplay, purchaseDisplay);
app.append(statusDisplay);

function updateStatus() {
  growthRateDisplay.innerHTML = `Current Growth Rate: ${growthRate.toFixed(2)} clicks/sec`;
  purchaseDisplay.innerHTML = `Purchased: A(${itemsPurchased.A}), B(${itemsPurchased.B}), C(${itemsPurchased.C})`;
}

// Create an upgrade button
const upgradeA = document.createElement("button");
upgradeA.innerHTML = `Buy A (+0.1 clicks/sec, cost: ${prices.A.toFixed(2)})`;
upgradeA.disabled = true;

const upgradeB = document.createElement("button");
upgradeB.innerHTML = `Buy B (+2.0 clicks/sec, cost: ${prices.B.toFixed(2)})`;
upgradeB.disabled = true;

const upgradeC = document.createElement("button");
upgradeC.innerHTML = `Buy C (+50 clicks/sec, cost: ${prices.C.toFixed(2)})`;
upgradeC.disabled = true;

app.append(upgradeA, upgradeB, upgradeC);

let lastTimestamp = 0;

function boost(elapsedTime: number) {
  return (growthRate * elapsedTime) / 1000; // Increase proportional to growthRate and time passed
}

function updateCounter(timestamp: number) {
  if (lastTimestamp !== 0) {
    const elapsedTime = timestamp - lastTimestamp; // Calculate elapsed time since last frame
    num_clicks += boost(elapsedTime); // Increase num_clicks proportionally to the time passed and growth rate
    button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;

    upgradeA.disabled = num_clicks < prices.A;
    upgradeB.disabled = num_clicks < prices.B;
    upgradeC.disabled = num_clicks < prices.C;
  }
  updateStatus();
  lastTimestamp = timestamp; // Update lastTimestamp for the next frame
  requestAnimationFrame(updateCounter); // Schedule the next frame
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Handle manual clicking
button.onclick = () => {
  num_clicks += 1; // Add a full click on manual click
  button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;
};

// Handle upgrade purchase// Handle upgrade purchases
upgradeA.onclick = () => {
  if (num_clicks >= prices.A) {
    num_clicks -= prices.A;
    growthRate += 0.1;
    itemsPurchased.A += 1;
    prices.A *= 1.15;
    upgradeA.innerHTML = `Buy B (+0.1 clicks/sec. cost: ${prices.A.toFixed(2)}`;
    button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;
  }
};

upgradeB.onclick = () => {
  if (num_clicks >= prices.B) {
    num_clicks -= prices.B;
    growthRate += 2.0;
    itemsPurchased.B += 1;
    prices.B *= 1.15;
    upgradeB.innerHTML = `Buy B (+2.0 clicks/sec. cost: ${prices.B.toFixed(2)}`;
    button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;
  }
};

upgradeC.onclick = () => {
  if (num_clicks >= prices.C) {
    num_clicks -= prices.C;
    growthRate += 50.0;
    itemsPurchased.C += 1;
    prices.C *= 1.15;
    upgradeC.innerHTML = `Buy C (+50 clicks/sec. cost: ${prices.C.toFixed(2)}`;
    button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;
  }
};
