const internetAddictionFacts = [
  "Internet addiction affects approximately 6% of the global population.",
  "On average, people spend over 6 hours per day online, contributing to internet addiction.",
  "One study found that excessive internet use is associated with a decrease in grey matter in the brain, similar to changes seen in drug addiction.",
  "Mindless surfing can lead to decision fatigue and reduced cognitive function.",
  "Internet addiction is more common among adolescents and young adults, with prevalence rates as high as 10-20% in some studies.",
  "Mindless scrolling on social media platforms can increase feelings of social isolation and loneliness.",
  "Internet addiction has been linked to higher levels of stress and anxiety.",
  "Individuals with internet addiction may experience withdrawal symptoms when attempting to reduce their internet use, similar to those seen in substance addiction.",
  "Mindless surfing often leads to procrastination, affecting academic and work performance.",
  "Overuse of the internet can disrupt the brain's reward system, leading to compulsive behaviors and cravings for online activities.",
];

internetAddictionFacts.forEach((element) => {
  const fact = document.createElement("div");
  fact.className = "fact";
  fact.innerHTML = "<p>" + element + "</p>";
  document.getElementById("fact_list").appendChild(fact);
});

const leftButton = document.getElementsByClassName("left")[0];
const rightButton = document.getElementsByClassName("right")[0];
let v = 0;

leftButton.addEventListener("click", () => {
  if (v > 0) {
    v -= 1;
  } else {
    v = document.querySelectorAll(".fact").length - 1;
  }
  document.querySelectorAll(".fact")[v].scrollIntoView();
});

rightButton.addEventListener("click", () => {
  if (v < document.querySelectorAll(".fact").length - 1) {
    v += 1;
  } else {
    v = 0;
  }
  document.querySelectorAll(".fact")[v].scrollIntoView();
});

document.getElementById("optionsButton").addEventListener("click", function () {
  chrome.runtime.openOptionsPage();
});

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

function addWebsiteToBlocklist() {
  
  const websiteName = document.getElementById("WebsiteName").value;

  if (websiteName !== "") {

    if (isValidURL(websiteName)) {

      chrome.storage.sync.get("sitesList", function (result) {
        let sitesList = result.sitesList || [];

        if (!sitesList.includes(websiteName)) {
          sitesList.push(websiteName);

          chrome.storage.sync.set({ sitesList: sitesList });

          document.getElementById("WebsiteName").value = "";
        } else {
          alert("Website already added to blocklist");
        }
      });
    } else {
      alert("Please enter a valid website name");
    }
  } else {
    alert("Please enter a website name");
  }
}

document
  .getElementById("addButton")
  .addEventListener("click", addWebsiteToBlocklist);
