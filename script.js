
document.getElementById("question").textContent =
    "Write a program to print the sum of two numbers.";

const codeArea = document.getElementById("code");
let blindTime = 10; // seconds to keep hidden for test
codeArea.style.color = "black";
codeArea.style.backgroundColor = "black";

let timer = setInterval(() => {
    blindTime--;
    if (blindTime <= 0) {
        clearInterval(timer);
        // Make text visible
        codeArea.style.color = "white";
        codeArea.style.backgroundColor = "black"; // keep background dark
        alert("Coding visibility enabled!");
    }
}, 1000);

// Submit button handler
document.getElementById("submit").addEventListener("click", sendCode);

async function sendCode() {
    const language = document.getElementById("language").value.toLowerCase();
    const code = document.getElementById("code").value;
    const stdin = document.getElementById("input").value;

    try {
        const response = await fetch("http://localhost:3000/run", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ language, code, stdin })
        });

        const result = await response.json();

        // Show output in textarea
        document.getElementById("output").value = JSON.stringify(result, null, 2);

    } catch (error) {
        console.error("Error:", error);
        document.getElementById("output").value = "Error running code";
    }
}

// Add Ctrl+Enter shortcut to submit
codeArea.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") {
        sendCode();
    }
});
