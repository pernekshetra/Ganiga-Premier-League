function renderTeamsMetaData(inTeams, inId) {
  const section = document.getElementById(inId);
  if(section) {
    for(const team of inTeams) {
      const card = document.createElement("div");
      card.classList.add("card");

      const a = document.createElement("a");
      a.href = `./teams/${team.id}`;

      const teamLogo = document.createElement("img");
      teamLogo.src = `/assets/team_logos/${team.id}.png`;
      a.appendChild(teamLogo);

      const textDiv = document.createElement("div");
      const h6 = document.createElement("h6");
      h6.textContent = team.name;
      textDiv.appendChild(h6);
      const p = document.createElement("p");
      p.textContent = `Owner: ${team.owner}`;
      textDiv.appendChild(p);
      a.appendChild(textDiv);

      card.appendChild(a);
      section.appendChild(card);
    }
  }
}
