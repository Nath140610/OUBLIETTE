var zoneSalles = document.getElementById("salles");
var modele = document.getElementById("modeleSalle");
var params = new URLSearchParams(location.search);
var codeEdite = params.get("code");

function ajouterSalle(salle) {
  var bloc = modele.content.firstElementChild.cloneNode(true);

  if (salle) {
    bloc.querySelector(".s-nom").value = salle.nom;
    bloc.querySelector(".s-texte").value = salle.texte;
    bloc.querySelector(".s-indice").value = salle.indice;
    bloc.querySelector(".s-reponse").value = salle.reponse;
  }

  bloc.querySelector(".supprimer").addEventListener("click", function() {
    bloc.remove();
    numeroter();
  });

  zoneSalles.appendChild(bloc);
  numeroter();
}

function numeroter() {
  zoneSalles.querySelectorAll(".salle").forEach(function(bloc, i) {
    bloc.querySelector(".salle-num").textContent = "Salle " + (i + 1);
  });
}

function lireSalles() {
  var liste = [];
  zoneSalles.querySelectorAll(".salle").forEach(function(bloc) {
    liste.push({
      nom: bloc.querySelector(".s-nom").value.trim(),
      texte: bloc.querySelector(".s-texte").value.trim(),
      indice: bloc.querySelector(".s-indice").value.trim(),
      reponse: bloc.querySelector(".s-reponse").value.trim()
    });
  });
  return liste;
}

function enregistrer() {
  var erreur = document.getElementById("erreur");
  var titre = document.getElementById("titre").value.trim();
  var salles = lireSalles();

  erreur.textContent = "";

  if (titre === "") {
    erreur.textContent = "Donne un nom à ton escape game.";
    return;
  }

  if (salles.length === 0) {
    erreur.textContent = "Il faut au moins une salle.";
    return;
  }

  for (var i = 0; i < salles.length; i++) {
    if (salles[i].texte === "" || salles[i].reponse === "") {
      erreur.textContent = "La salle " + (i + 1) + " n'a pas de texte ou pas de réponse.";
      return;
    }
  }

  var parties = chargerParties();
  var code = codeEdite && parties[codeEdite] ? codeEdite : nouveauCode(parties);

  parties[code] = {
    titre: titre,
    intro: document.getElementById("intro").value.trim(),
    duree: parseInt(document.getElementById("duree").value) || 0,
    salles: salles,
    date: Date.now()
  };

  sauverParties(parties);
  codeEdite = code;

  document.getElementById("codeFinal").textContent = code;
  document.getElementById("lienTester").href = "partie.html?code=" + code;
  document.getElementById("resultat").hidden = false;
  document.getElementById("resultat").scrollIntoView({ behavior: "smooth" });
}

var existante = codeEdite ? chargerParties()[codeEdite] : null;

if (existante) {
  document.getElementById("titrePage").textContent = "Modifier " + existante.titre;
  document.getElementById("titre").value = existante.titre;
  document.getElementById("intro").value = existante.intro;
  document.getElementById("duree").value = existante.duree;
  existante.salles.forEach(function(s) {
    ajouterSalle(s);
  });
} else {
  ajouterSalle();
}