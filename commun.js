function chargerParties() {
  var texte = localStorage.getItem("oubliette_parties");
  if (!texte) return {};
  try {
    return JSON.parse(texte);
  } catch (e) {
    return {};
  }
}

function sauverParties(parties) {
  localStorage.setItem("oubliette_parties", JSON.stringify(parties));
}

function nouveauCode(parties) {
  var code;
  do {
    code = String(Math.floor(Math.random() * 10000)).padStart(4, "0");
  } while (parties[code]);
  return code;
}

function nettoyer(texte) {
  return texte.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}