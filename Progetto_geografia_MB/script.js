let mazzo = [
    { domanda: "A quale paese corrisponde questa bandiera?", risposta: "Turkmenistan", immagine: "Progetto_geografia_MB/img/Bandiera1.svg", mostraPrima: true },
    { domanda: "Qual'è il fiume più importante dell'Asia centrale?", risposta: "Amu Darya", immagine: "Progetto_geografia_MB/img/Fiume1.jpg", mostraPrima: false },
    { domanda: "Qual'è la capitale ECONOMICA dell'Israele?", risposta: "Tel Aviv", immagine: "Progetto_geografia_MB/img/telaviv.jpg", mostraPrima: false },
    { domanda: "Su cosa si basa l'economia dell'Arabia Saudita?", risposta: "Petrolio", immagine: "Progetto_geografia_MB/img/petro.jpg", mostraPrima: false },
    { domanda: "Qual'è l'ordinamento politico dell'Uzbekistan?", risposta: "Repubblica Presidenziale", immagine: "Progetto_geografia_MB/img/rep.jpeg", mostraPrima: false }
];

let turniTotali = 0;
let turnoAttuale = 0;
let punteggio = 0;
let cartaCorrente = null;

function startGame() {
    turniTotali = parseInt(document.getElementById("turniInput").value);
    turnoAttuale = 0;
    punteggio = 0;

    shuffle(mazzo);

    document.getElementById("setup").classList.add("hidden");
    document.getElementById("quiz").classList.remove("hidden");

    mostraDomanda();
}

function mostraDomanda() {
    if (turnoAttuale >= turniTotali) {
        document.getElementById("quiz").classList.add("hidden");
        document.getElementById("punteggio").textContent = `🏁 Punteggio finale: ${punteggio} / ${turniTotali}`;
        return;
    }

    cartaCorrente = mazzo[turnoAttuale];
    document.getElementById("turno").textContent = `Turno ${turnoAttuale + 1} / ${turniTotali}`;
    document.getElementById("domanda").textContent = cartaCorrente.domanda;
    document.getElementById("rispostaInput").value = "";
    document.getElementById("feedback").textContent = "";

    let img = document.getElementById("immagineCarta");
    img.classList.add("hidden");

    // Controllo sicurezza sugli ID dei bottoni
    const rispondiBtn = document.getElementById("rispondiBtn");
    const avantiBtn = document.getElementById("avantiBtn");

    if (rispondiBtn && avantiBtn) {
        rispondiBtn.classList.remove("hidden");
        avantiBtn.classList.add("hidden");
    }

    // Mostra immagine subito solo per la bandiera
    if (cartaCorrente.mostraPrima) {
        img.src = cartaCorrente.immmagine || cartaCorrente.immagine; // sicurezza
        img.classList.remove("hidden");
    }
}

function rispondi() {
    let risposta = document.getElementById("rispostaInput").value.trim();
    let img = document.getElementById("immagineCarta");
    let feedback = document.getElementById("feedback");

    // Mostra immagine dopo aver risposto
    if (!cartaCorrente.mostraPrima) {
        img.src = cartaCorrente.immmagine || cartaCorrente.immagine;
        img.classList.remove("hidden");
    }

    if (risposta.toLowerCase() === cartaCorrente.risposta.toLowerCase()) {
        punteggio++;
        feedback.textContent = `✅ Corretto! La risposta è: ${cartaCorrente.risposta}`;
        feedback.style.color = "green";
    } else {
        feedback.textContent = `❌ Sbagliato! La risposta corretta è: ${cartaCorrente.risposta}`;
        feedback.style.color = "red";
    }

    const rispondiBtn = document.getElementById("rispondiBtn");
    const avantiBtn = document.getElementById("avantiBtn");

    if (rispondiBtn && avantiBtn) {
        rispondiBtn.classList.add("hidden");
        avantiBtn.classList.remove("hidden");
    }
}

function prossimaDomanda() {
    turnoAttuale++;
    mostraDomanda();
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
