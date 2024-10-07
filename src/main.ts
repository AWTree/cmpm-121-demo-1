import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My New Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let num_clicks = 0;
let growthRate = 0;  // Default growth rate starts at 0

// Create a button for clicking
const button = document.createElement("button");
button.innerHTML = "Click!";
app.append(button);

// Create an upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML = "Buy Upgrade (+1 growth per second)";
upgradeButton.disabled = true;  // Initially disabled
app.append(upgradeButton);

let lastTimestamp = 0;

function boost(elapsedTime: number) {
    return (growthRate * elapsedTime) / 1000;  // Increase proportional to growthRate and time passed
}

function updateCounter(timestamp: number) {
    if (lastTimestamp !== 0) {
        const elapsedTime = timestamp - lastTimestamp;  // Calculate elapsed time since last frame
        num_clicks += boost(elapsedTime);  // Increase num_clicks proportionally to the time passed and growth rate
        button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;

        // Enable the upgrade button if the player has at least 10 units
        if (num_clicks >= 10) {
            upgradeButton.disabled = false;
        } else {
            upgradeButton.disabled = true;
        }
    }
    lastTimestamp = timestamp;  // Update lastTimestamp for the next frame
    requestAnimationFrame(updateCounter);  // Schedule the next frame
}

// Start the animation loop
requestAnimationFrame(updateCounter);

// Handle manual clicking
button.onclick = () => {
    num_clicks += 1;  // Add a full click on manual click
    button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;
};

// Handle upgrade purchase
upgradeButton.onclick = () => {
    if (num_clicks >= 10) {
        num_clicks -= 10;  // Deduct 10 units
        growthRate += 1;  // Increment the growth rate by 1 per second
        upgradeButton.disabled = true;  // Disable button until next check
        button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;
    }
};
