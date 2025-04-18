// Function to convert text input to speech using the Web Speech API and gets text from the textarea and speaks it with customized voice settings //
function TexttoAudio () {
    let msg = document.getElementById("text-to-speech").value; // Get the text input from the textarea element
    let speech = new SpeechSynthesisUtterance(); // Create a new speech utterance object
    
    // Configuration for speech settings
    speech.lang = "en.US"; // Set language to US English
    speech.text = msg; // Set the text to be spoken
    speech.volume = 2; // Max volume (range: 0-1, but some browsers allow higher)
    speech.rate = 0.5; // Slower speech rate (0.1-10, 1 = normal)
    speech.pitch = 1; // Normal pitch (0-2, 1 = normal)
    window.speechSynthesis.speak(speech); // Speak the text using the browser's speech synthesis
}

// Function to scroll the soundboard table to the left and moves the scroll position by 750px to the left //
function leftScroll() {
    // Get the scrollable table container
    const left = document.querySelector(".scroll-table");
    left.scrollBy(-750, 0); // Scroll left by 750 pixels (horizontal scroll only)
}

// Function to scroll the soundboard table to the right and moves the scroll position by 750px to the right //
function rightScroll() {
    const right = document.querySelector(".scroll-table");
    right.scrollBy(750, 0); // Scroll right by 750 pixels (horizontal scroll only)
}