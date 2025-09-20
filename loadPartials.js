async function loadPartial(partialUrl, tagName) {
  try {
    const response = await fetch(partialUrl);
    if(!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text();
    document.getElementsByTagName(tagName)[0].innerHTML = htmlContent;
  }
  catch(error) {
    console.error('Error loading partial:', error);
  }
}
