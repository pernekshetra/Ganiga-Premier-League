function renderTeam(inData) {
  let lastPart = null;
  const team = inData.forEach((item) => {
    const url = new URL(window.location.href);
    const pathParts = url.pathname.split("/").filter(Boolean);
    lastPart = pathParts.pop();
  });

  const teamPlayers = inData.filter((player) => {
    return lastPart == player.team
  });

  const teamPlayerSection = document.getElementById("team-players-table");
  for(const player of teamPlayers) {
    const card = document.createElement("div");
    card.classList.add("card", "player");

    const playerImg = document.createElement("img");
    playerImg.src = player.picture;
    playerImg.setAttribute("loading", "lazy");
    card.appendChild(playerImg);

    const info = document.createElement("div");
    info.classList.add("card-content");

    const nameWithId = document.createElement("div");
    nameWithId.classList.add('nameWithId');

    const playerName = document.createElement("h4");
    playerName.textContent = player.name;
    nameWithId.appendChild(playerName);

    const playerId = document.createElement("i");
    playerId.classList.add('id');
    playerId.textContent = player.id;
    nameWithId.appendChild(playerId);

    info.appendChild(nameWithId);

    const playerPlace = document.createElement("h6");
    playerPlace.textContent = player.place;
    info.appendChild(playerPlace);

    const playerParents = document.createElement("small");
    playerParents.textContent = player.parents;
    info.appendChild(playerParents);

    const playerCategory = document.createElement("h6");
    playerCategory.textContent = player.category;
    info.appendChild(playerCategory);

    card.appendChild(info);
    teamPlayerSection.appendChild(card);
  }
}
