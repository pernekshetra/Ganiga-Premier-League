function convertTo12Hour(time24) {
  const [hourStr, minute] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";

  hour = hour % 12;
  if(hour === 0) {
    hour = 12; // midnight or noon case
  }
  return `${hour}:${minute} ${ampm}`;
}

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
      const dateTime = document.createElement("div");
      dateTime.innerHTML = `${fixture.date}<span class="date-pill">${convertTo12Hour(fixture.time)}</span>`;
      dateTime.style.textAlign = "center";
      head.appendChild(dateTime);

      card.appendChild(head);

      const matchDeets = document.createElement("div");
      matchDeets.classList.add("details");

      const teamADiv = document.createElement("div");
      teamADiv.classList.add("teamDiv");
      const teamALogo = document.createElement("img");
      if(fixture.teamA.id) {
        teamALogo.src = `../assets/team_logos/${fixture.teamA.id}.png`;
      }
      else {
        teamALogo.src = "../assets/logo.png";
      }
      teamADiv.appendChild(teamALogo);

      const teamAName = document.createElement("small");
      teamAName.textContent = fixture.teamA.name;
      teamADiv.appendChild(teamAName);
      matchDeets.appendChild(teamADiv);

      const vs = document.createElement("div");
      vs.textContent = "V/S"
      vs.classList.add("versus");
      matchDeets.appendChild(vs);

      const teamBDiv = document.createElement("div");
      teamBDiv.classList.add("teamDiv");
      const teamBLogo = document.createElement("img");
      if(fixture.teamB.id) {
        teamBLogo.src = `../assets/team_logos/${fixture.teamB.id}.png`;
      }
      else {
        teamBLogo.src = "../assets/logo.png";
      }
      teamBDiv.appendChild(teamBLogo);

      const teamBName = document.createElement("small");
      teamBName.textContent = fixture.teamB.name;
      teamBDiv.appendChild(teamBName);
      matchDeets.appendChild(teamBDiv);

      card.appendChild(matchDeets);
      section.appendChild(card);
    }
  }
}
