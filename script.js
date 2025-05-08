const speech = new SpeechSynthesisUtterance();
let voices = [];
const voiceSelect = document.querySelector("select");

function populateVoices() {
  voices = window.speechSynthesis.getVoices();
  voiceSelect.innerHTML = ""; 

  voices.forEach((voice) => {
    const option = document.createElement("option");
    option.value = voice.name;
    option.innerText = `${voice.name} (${voice.lang})`;
    voiceSelect.appendChild(option);
  });

  if (voices.length > 0 && !speech.voice) {
    speech.voice = voices[0];
    voiceSelect.value = voices[0].name;
  }
}

window.speechSynthesis.onvoiceschanged = populateVoices;
populateVoices(); 

voiceSelect.addEventListener("change", () => {
  speech.voice = voices.find((voice) => voice.name === voiceSelect.value);
});


document.querySelector("button").addEventListener("click", () => {
  const text = document.querySelector("textarea").value.trim();
  if (text) {
    speech.text = text;
    window.speechSynthesis.cancel(); 
    window.speechSynthesis.speak(speech);
  } else {
    alert("Silakan masukkan teks terlebih dahulu.");
  }
});
