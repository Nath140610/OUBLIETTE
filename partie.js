var params = new URLSearchParams(location.search);
var code = params.get("code");
var partie = chargerParties()[code];

var numSalle = 0;
var essais = 0;
var indicesVus = 0;
var debut = 0;
var tempsRestant = 0;
var minuteur = null;
var bloque = false;

function montrer(id) {
  ["ecranErreur", "ecranIntro", "ecranSalle", "ecranFin"].forEach(function(e) {
    document.getElementById(e).hidden = e !== id;
  });
}

function formater(secondes) {
  var m = Math.floor(secondes / 60);
  var s = secondes % 60;
  return m + ":" + (s < 10 ? "0" : "") + s;
}

function commencer() {
  debut = Date.now();

  if (partie.duree > 0) {
    tempsRestant = partie.duree * 60;
    document.getElementById("chrono").textContent = formater(tempsRestant);
    minuteur = setInterval(function() {
      tempsRestant--;
      document.getElementById("chrono").textContent = formater(tempsRestant);
      if (tempsRestant <= 0) {
        finir(false);
      }
    }, 1000);
  }

  afficherSalle();
}

function afficherSalle() {
  var salle = partie.salles[numSalle];

  document.getElementById("progression").textContent = "Salle " + (numSalle + 1) + " / " + partie.salles.length;
  document.getElementById("nomSalle").textContent = salle.nom || "Salle " + (numSalle + 1);
  document.getElementById("texteSalle").textContent = salle.texte;
  document.getElementById("indice").textContent = salle.indice;
  document.getElementById("indice").hidden = true;
  document.getElementById("boutonIndice").hidden = salle.indice === "";
  document.getElementById("retour").textContent = "";
  document.getElementById("reponse").value = "";

  bloque = false;
  montrer("ecranSalle");
  document.getElementById("reponse").focus();
}

function essayer() {
  if (bloque) return;

  var tape = nettoyer(document.getElementById("reponse").value);
  var retour = document.getElementById("retour");

  if (tape === "") return;
  essais++;

  if (tape === nettoyer(partie.salles[numSalle].reponse)) {
    numSalle++;
    if (numSalle >= partie.salles.length) {
      finir(true);
    } else {
      bloque = true;
      retour.textContent = "Clic. Quelque chose s'ouvre...";
      retour.className = "message bon";
      setTimeout(afficherSalle, 1200);
    }
  } else {
    retour.textContent = "Rien ne bouge.";
    retour.className = "message faux";
  }
}

function montrerIndice() {
  document.getElementById("indice").hidden = false;
  document.getElementById("boutonIndice").hidden = true;
  indicesVus++;
}

function finir(gagne) {
  clearInterval(minuteur);
  var temps = Math.round((Date.now() - debut) / 1000);

  if (gagne) {
    document.getElementById("titreFin").textContent = "Vous êtes sortis.";
    document.getElementById("texteFin").textContent = "En " + formater(temps) + ", avec " + essais + " essai(s) et " + indicesVus + " indice(s).";
  } else {
    document.getElementById("titreFin").textContent = "Trop tard.";
    document.getElementById("texteFin").textContent = "La torche s'est éteinte. Vous étiez à la salle " + (numSalle + 1) + " sur " + partie.salles.length + ".";
  }

  montrer("ecranFin");
}

document.getElementById("reponse").addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    essayer();
  }
});

if (!partie) {
  montrer("ecranErreur");
} else {
  document.title = partie.titre + " - OUBLIETTE";
  document.getElementById("codeAffiche").textContent = code;
  document.getElementById("titrePartie").textContent = partie.titre;
  document.getElementById("introPartie").textContent = partie.intro;
  document.getElementById("infosPartie").textContent = partie.salles.length + " salle(s)" + (partie.duree > 0 ? " · " + partie.duree + " minutes" : " · pas de limite");
  montrer("ecranIntro");
}