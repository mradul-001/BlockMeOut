let dashboard_ = document.getElementById("dashboard_");
let keywords_ = document.getElementById("keywords_");

dashboard_.style.display = "block";

let sites_list = [];
let keywords_list = [];

function show_dashboard() {
  dashboard_.style.display = "block";
  keywords_.style.display = "none";
}

function show_keywords() {
  dashboard_.style.display = "none";
  keywords_.style.display = "block";
}

function isValidURL(str) {
  if (
    /^[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g.test(
      str
    )
  ) {
    return 1;
  } else {
    return 0;
  }
}

function add_site() {
  let site_name = document.getElementById("web_add").value;

  if (isValidURL(site_name)) {
    if (!sites_list.includes(site_name)) {
      let new_website = document.createElement("div");
      new_website.className = "website";

      new_website.innerHTML = `<span style="padding: 10px;">${site_name}</span>
              <span class="remove">
                  <span class="material-symbols-outlined">
                      remove
                  </span>
              </span>`;

      new_website
        .querySelector(".remove")
        .addEventListener("click", function () {
          const index = sites_list.indexOf(site_name);
          sites_list.splice(index, 1);
          this.parentNode.remove();
        });

      sites_list.push(site_name);
      document
        .getElementsByClassName("blockedSites")[0]
        .appendChild(new_website);
      document.getElementById("web_add").value = "";
    } else {
      alert("Site already added");
    }
  } else {
    alert("Please enter a valid website name");
  }
}

function add_keys() {
  let key_name = document.getElementById("keyword_add").value;
  if (!keywords_list.includes(key_name)) {
    let new_key = document.createElement("div");
    new_key.className = "keyword";

    new_key.innerHTML = `<span style="padding: 10px;">${key_name}</span>
            <span class="remove">
                <span class="material-symbols-outlined">
                    remove
                </span>
            </span>`;

    new_key.querySelector(".remove").addEventListener("click", function () {
      const index = keywords_list.indexOf(key_name);
      keywords_list.splice(index, 1);
      this.parentNode.remove();
    });

    keywords_list.push(key_name);
    document.getElementsByClassName("blockedKeys")[0].appendChild(new_key);
    document.getElementById("keyword_add").value = "";
  } else {
    alert("Keyword already added");
  }
}

function saveSitesList() {
  chrome.storage.sync.set({ sitesList: sites_list }, () => {
    alert("Sites list saved.");
  });
}

function saveKeywordsList() {
  chrome.storage.sync.set({ keywordsList: keywords_list }, () => {
    alert("Keywords list saved.");
  });
}

function loadLists() {
  chrome.storage.sync.get(["sitesList", "keywordsList"], (result) => {
    sites_list = result.sitesList || [];
    keywords_list = result.keywordsList || [];

    sites_list.forEach((site) => {
      let new_website = document.createElement("div");
      new_website.className = "website";

      new_website.innerHTML = `<span style="padding: 10px;">${site}</span>
              <span class="remove">
                  <span class="material-symbols-outlined">
                      remove
                  </span>
              </span>`;

      new_website
        .querySelector(".remove")
        .addEventListener("click", function () {
          const index = sites_list.indexOf(site);
          sites_list.splice(index, 1);
          this.parentNode.remove();
        });

      document
        .getElementsByClassName("blockedSites")[0]
        .appendChild(new_website);
    });

    keywords_list.forEach((keyword) => {
      let new_key = document.createElement("div");
      new_key.className = "keyword";

      new_key.innerHTML = `<span style="padding: 10px;">${keyword}</span>
            <span class="remove">
                <span class="material-symbols-outlined">
                    remove
                </span>
            </span>`;

      new_key.querySelector(".remove").addEventListener("click", function () {
        const index = keywords_list.indexOf(keyword);
        keywords_list.splice(index, 1);
        this.parentNode.remove();
      });
      document.getElementsByClassName("blockedKeys")[0].appendChild(new_key);
    });
  });
}

loadLists();

document
  .getElementById("dashboard_button")
  .addEventListener("click", show_dashboard);

document
  .getElementById("keywords_button")
  .addEventListener("click", show_keywords);

document.getElementById("add_site_button").addEventListener("click", add_site);

document.getElementById("add_key_button").addEventListener("click", add_keys);

document.getElementById("save1").addEventListener("click", saveSitesList);

document.getElementById("save2").addEventListener("click", saveKeywordsList);