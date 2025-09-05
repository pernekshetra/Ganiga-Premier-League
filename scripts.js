function renderPlayers(inData) {
  const section = document.getElementById("players");
  if(section) {
    for(const player of inData) {
      const card = document.createElement("div");
      card.classList.add("card", "player");

      const playerImg = document.createElement("img");
      playerImg.src = player.picture;
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

      const playerParents = document.createElement("h6");
      playerParents.textContent = player.parents;
      info.appendChild(playerParents);

      const playerCategory = document.createElement("small");
      playerCategory.textContent = player.category;
      info.appendChild(playerCategory);

      card.appendChild(info);
      section.appendChild(card);
    }
  }
}
