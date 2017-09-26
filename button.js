const BEE_BUTTON_ID = 'flowup-bee-button';

const observer = new MutationObserver(onContainerChange);
observer.observe(document.querySelector('[role="main"]'), {
  childList: true,
  subtree: true
});

window.addEventListener('load', onContainerChange);

function onContainerChange() {
  if (!/^\/[^\/]+\/[^\/]+\/pull\//.test(window.location.pathname) ||
      document.querySelector(`#${BEE_BUTTON_ID}`) !== null) {
    return;
  }

  const itemOnSite = document.getElementById("partial-discussion-header").lastElementChild.lastElementChild,
    parent = itemOnSite.lastElementChild.parentElement,
    next = itemOnSite.lastElementChild.nextSibling,
    button = document.createElement("button"),
    img = document.createElement('img'),
    repository = itemOnSite.lastElementChild.title.match(/([A-Za-z0-9_-]*):/)[1],
    branch = itemOnSite.lastElementChild.lastElementChild.innerHTML;

  button.className = 'btn btn-sm';
  button.style.marginLeft = '10px';
  button.style.outline = 'none !important';
  button.type = 'button';
  button.id = BEE_BUTTON_ID;
  button.addEventListener("click", openNewWindow);

  img.src = chrome.extension.getURL("/bee.png");
  img.style.width = '20px';
  img.style.height = '20px';
  img.style.verticalAlign = 'sub';

  button.appendChild(img);

  if (next) parent.insertBefore(button, next);
  else parent.appendChild(button);

  parent.firstElementChild.style.verticalAlign = 'sub';

  function openNewWindow() {
    const newWindow = window.open();
    newWindow.location.href = 'https://bee.flowdock.eu/' + repository + '/' + branch;
  }
}
