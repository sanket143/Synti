document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('code').forEach((block) => {
    console.log('done')
    hljs.highlightBlock(block)
  });
});

const targetNode = document.getElementById('app');
const config = { attributes: false, childList: true, subtree: true };

let previousCodeCount = 0;
// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  const mainNode = document.getElementById("main")
  const codesElements = mainNode.querySelectorAll("code")
  console.log(codesElements.length, previousCodeCount)
  if(codesElements.length !== previousCodeCount){
    previousCodeCount = codesElements.length

    codesElements.forEach(block => {
      hljs.highlightBlock(block)
    })
  }
};

const observer = new MutationObserver(callback);

observer.observe(targetNode, config);
