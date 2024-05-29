document.getElementById("hash-btn").addEventListener("click", function () {
    const text = document.getElementById("text-input").value;
    const selectedAlgorithm = document.getElementById("hash-algorithm").value;
    const selectedEncoding = document.getElementById("hash-encoding").value;

    if (text) {
        const results = document.getElementById("results");
        results.innerHTML = "";

        hashAndDisplay(selectedAlgorithm, selectedEncoding, text, results);
    } else {
        alert("Please enter text to hash.");
    }
});

function hashAndDisplay(algorithm, encoding, input, resultsElement) {
    if (algorithm === "MD5") {
        const hash = CryptoJS.MD5(input).toString();
        displayHash(algorithm, encoding, hash, resultsElement);
    } else {
        crypto.subtle.digest(algorithm, new TextEncoder().encode(input)).then(hashBuffer => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, "0")).join("");
            displayHash(algorithm, encoding, hashHex, resultsElement);
        });
    }
}
function displayHash(algorithm, encoding, hash, resultsElement) {
    let formattedHash = hash;

    if (encoding === "base64") {
        formattedHash = btoa(hash);
    } else if (encoding === "url-encode") {
        formattedHash = encodeURIComponent(hash);
    }

    const result = document.createElement("p");
    result.textContent = `${algorithm} Hash (${encoding} encoded): ${formattedHash}`;
    resultsElement.appendChild(result);
}
function copyToClipboard() {
    const hashText = document.getElementById("results").innerText;

    navigator.clipboard.writeText(hashText)
        .then(() => alert("Hash copied to clipboard: " + hashText))
        .catch(err => {
            console.error("Unable to copy to clipboard", err);
            // Fallback to the temporary input method for browsers that don't support clipboard API
            fallbackCopyTextToClipboard(hashText);
        });
}

// Fallback method for browsers that don't support clipboard API
function fallbackCopyTextToClipboard(text) {
    const tempInput = document.createElement("textarea");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert("Hash copied to clipboard: " + text);
}




const typingOutput = document.getElementById("typing-output");
const textToType = "Welcome to the Multi-Hashing Web App! Safeguard your data with advanced cryptographic techniques. Select from various secure hash algorithms, encode text securely, and explore the world of data protection. Enjoy the power of secure hashing for enhanced privacy and integrity in your applications. Created by Team Red";

let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typingOutput.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 50); // Adjust the time interval (in milliseconds) for typing speed
    }
}

typeText(); // Start typing when the page loads


