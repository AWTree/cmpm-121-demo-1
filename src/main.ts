import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My New Game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

/*
function boost(score: number) {
    return score + 1 + + Math.sqrt(score);  // Increment the score by 1
  }
*/

let num_clicks = 0;
const button = document.createElement("button");
button.innerHTML = "Click!";
setInterval(() => {
    num_clicks += 1;
    button.innerHTML = `${num_clicks.toFixed(2)} clicks so far`; // Automatic Clicking
}, 1000); 
app.append(button);


