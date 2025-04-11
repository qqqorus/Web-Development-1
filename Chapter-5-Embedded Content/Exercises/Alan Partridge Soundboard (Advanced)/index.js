function TexttoAudio () {
    let msg = document.getElementById("text-to-speech").value;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en.US";
    speech.text = msg;
    speech.volume = 2;
    speech.rate = 0.5;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);
}

function leftScroll() {
    const left = document.querySelector(".scroll-table");
    left.scrollBy(-750, 0);
}

function rightScroll() {
    const right = document.querySelector(".scroll-table");
    right.scrollBy(750, 0);
}