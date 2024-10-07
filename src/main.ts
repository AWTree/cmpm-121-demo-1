import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My New Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

function boost(elapsedTime: number) {
    return elapsedTime / 1000;  // Increase by a fractional amount per millisecond, equivalent to 1 unit per second
}

let num_clicks = 0;
const button = document.createElement("button");
button.innerHTML = "Click!";
let lastTimestamp = 0;

function updateCounter(timestamp: number) {
    if (lastTimestamp !== 0) {
        const elapsedTime = timestamp - lastTimestamp;  // Calculate time elapsed since last frame
        num_clicks += boost(elapsedTime);  // Increase num_clicks proportionally to the time elapsed
        button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`;  // Update button text
    }
    lastTimestamp = timestamp;  // Update lastTimestamp for the next frame

    requestAnimationFrame(updateCounter);  // Schedule the next frame
}

// Start the animation loop
requestAnimationFrame(updateCounter);

app.append(button);
