function renderTeamsPool(inTeams) {
  const poolA = inTeams.filter(team => team.pool == "A");
  const poolB = inTeams.filter(team => team.pool == "B");
  renderTeamsMetaData(poolA, "poolA");
  renderTeamsMetaData(poolB, "poolB");
}

function renderFixtures(inData) {
  const section = document.getElementById("fixtures");
  if(section) {
    for(const index in inData) {
      const fixture = inData[index];
      const card = document.createElement("div");
      card.classList.add("card", "fixture");

      const head = document.createElement("div");
      head.classList.add("head");
      const title = document.createElement("h5");
      title.textContent = `Match ${Number(index) + 1}`;
      head.appendChild(title);

      const typeElem = document.createElement("h6");
      if(fixture.type) {
        typeElem.textContent = fixture.type;
        head.appendChild(typeElem);
      }
      card.appendChild(head);

      const matchDeets = document.createElement("div");
      matchDeets.classList.add("details");
      const dateTime = document.createElement("div");
      dateTime.innerHTML = `${fixture.date}<br />${fixture.time}`;
      dateTime.style.textAlign = "center";
      matchDeets.appendChild(dateTime);

      const teamALogo = document.createElement("img");
      if(fixture.teamA.id) {
        teamALogo.src = `../assets/team_logos/${fixture.teamA.id}.png`;
      }
      else {
        teamALogo.src = "../assets/logo.png";
      }
      matchDeets.appendChild(teamALogo);

      const vs = document.createElement("div");
      vs.textContent = "V/S"
      vs.classList.add("versus");
      matchDeets.appendChild(vs);

      const teamBLogo = document.createElement("img");
      if(fixture.teamB.id) {
        teamBLogo.src = `../assets/team_logos/${fixture.teamB.id}.png`;
      }
      else {
        teamBLogo.src = "../assets/logo.png";
      }
      matchDeets.appendChild(teamBLogo);
      card.appendChild(matchDeets);

      section.appendChild(card);
    }
  }
}
