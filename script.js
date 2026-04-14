import { app } from "./firebaseConfig.js";

import {
  getDatabase,
  ref,
  push,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const db = getDatabase(app);

document.addEventListener("DOMContentLoaded", () => {

  const player = document.getElementById("player");

  // BOTÃO
  window.tocarMusica = function () {
    const link = document.getElementById("inputHeader").value;

    if (!link) {
      alert("Cole um link!");
      return;
    }

    // TOCA NA HORA
    player.src = link;
    player.play();

    // SALVA NO REALTIME DATABASE
    push(ref(db, "musicas"), {
      url: link
    });
  };

  // ESCUTA DADOS
  const musicasRef = ref(db, "musicas");

  onValue(musicasRef, (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const lista = Object.values(data);
      const ultima = lista[lista.length - 1];

      player.src = ultima.url;
    }
  });

});