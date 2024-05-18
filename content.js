let scriptInjected = false;

chrome.storage.sync.get(["sitesList", "keywordsList"], (result) => {
  const sites_list = result.sitesList || [];
  const keywords_list = result.keywordsList || [];

function showModal(message) {

    if (document.getElementById('block-modal')) {
      return;
    }

    const modal = document.createElement("div");
    modal.id = "block-modal";
    modal.style.position = "fixed";
    modal.style.top = "0";
    modal.style.left = "0";
    modal.style.width = "100%";
    modal.style.height = "100%";
    modal.style.backgroundColor = "rgba(0,0,0,0.8)";
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
    modal.style.zIndex = "10000";
    modal.style.boxSizing = "border-box";

    const modalContent = document.createElement("div");
    modalContent.id = 'block-modal-content';
    modalContent.style.backgroundColor = "white";
    modalContent.style.height = "50%";
    modalContent.style.width = "50%";
    modalContent.style.borderRadius = "20px";
    modalContent.style.display = "flex";
    modalContent.style.justifyContent = "center";
    modalContent.style.alignItems = "center";
    modalContent.style.flexDirection = "column";
    modalContent.style.boxSizing = "border-box";
    

    const emoji = document.createElement('img');
    emoji.src = chrome.runtime.getURL('watching_u.gif');
    emoji.style.width = "50%";
    modalContent.appendChild(emoji);


    const modalText = document.createElement("p");
    modalText.style.fontFamily = 'Helvetica';
    modalText.style.fontSize = '30px';
    modalText.style.margin = "0";
    modalText.style.color = "red";
    modalText.style.fontSize = "25px"
    modalText.style.fontWeight = "600"
    modalText.innerText = message;
    modalContent.appendChild(modalText);

    modal.appendChild(modalContent);
    document.body.appendChild(modal);
  }

function initBlocker() {
    if (!scriptInjected) {
      for (let i = 0; i < sites_list.length; i++) {
        if (window.location.href.includes(sites_list[i])) {
          scriptInjected = true;
          showModal("!! GO BACK !!");
          break;
        }
      }
    }

    if (!scriptInjected) {
      for (let i = 0; i < keywords_list.length; i++) {
        if (window.location.href.includes(keywords_list[i])) {
          scriptInjected = true;
          showModal("!! GO BACK !!");
          break;
        }
      }
    }
  }

  initBlocker();

  const observer = new MutationObserver((mutations) => {
    mutations.forEach(() => {
      if (!document.getElementById("block-modal") && scriptInjected) {
        showModal("!! GO BACK !!");
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
});
