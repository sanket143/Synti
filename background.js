const CSS = "stylesheets/style.css";
const HIGHTLIGHT_CSS = "modules/highlight-default-9.18.1.min.css";

/*
Returns true only if the URL's protocol is in APPLICABLE_PROTOCOLS.
*/
function protocolIsApplicable(url) {

  return url == "https://web.whatsapp.com/";
}

function initializePageAction(tab) {
  if (protocolIsApplicable(tab.url)) {
    browser.tabs.insertCSS(tab.id, { file: HIGHTLIGHT_CSS })
    browser.tabs.insertCSS({file: CSS});
  }
}

/*
When first loaded, initialize the page action for all tabs.
*/
var gettingAllTabs = browser.tabs.query({});
gettingAllTabs.then((tabs) => {
  for (let tab of tabs) {
    initializePageAction(tab);
  }
});

/*
Each time a tab is updated, reset the page action for that tab.
*/
browser.tabs.onUpdated.addListener((id, changeInfo, tab) => {
  initializePageAction(tab);
});

