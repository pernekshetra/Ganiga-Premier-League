function renderSupportedBy(inData) {
  const section = document.getElementById("supportedby");
  if(section) {
    for(const index in inData) {
      const supporter = inData[index].company ? inData[index] : null;
      if(supporter) {
        const card = document.createElement("div");
        card.classList.add("card", "supporter");

        const imgWrapper = document.createElement("div");
        const img = document.createElement("img");  
        card.id = `${supporter.name}`;
        img.src = `/assets/science/supporters/${supporter.image}`;
        img.setAttribute("loading", "lazy");
        img.width = 285;
        img.height = 360;
        imgWrapper.appendChild(img);
        card.appendChild(imgWrapper);

        const name = document.createElement("h5");
        name.textContent = supporter.name;
        card.appendChild(name);

        const designation = document.createElement("p");
        designation.textContent = supporter.designation;
        card.appendChild(designation);

        const company = document.createElement("small");
        company.textContent = supporter.company; 
        card.appendChild(company);

        section.appendChild(card);
      }
    }
  }
}
