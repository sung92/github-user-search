const toggleButton = document.querySelector('.js-toggle-button');

toggleButton.addEventListener('click', (e) => {

  // Sometimes, the <button> gets selected, we don't want that
  let aux = (e.target.tagName === "BUTTON");

  if(aux === false ){
    let isState = (toggleButton.getAttribute('aria-checked') === 'true');
    
    toggleButton.setAttribute('aria-checked', isState ? false : true);
  
    if(e.target.classList.contains("moon")) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }
});