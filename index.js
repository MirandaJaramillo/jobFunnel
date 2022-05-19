let postingsList = [];

const clearBtn = document.getElementById("clear-btn");
const addBtn = document.getElementById("save-tab");
const displayList = document.getElementById("displayList");
const leadsInLocalStorage = JSON.parse(localStorage.getItem("postingsList"));

if(leadsInLocalStorage) {
  postingsList = leadsInLocalStorage
  render()
}

class Job {
  constructor() {
      this.jobstage = jobstage;
      this.notes = notes;
  }
}

//Chrome Storage vs Local Storage
const notes = document.querySelector("#notes");
const jobstage = document.querySelector("#jobstage");

addBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    let link = tabs[0].url;
    let newJob = new Job();
    newJob.url = link;
    postingsList.push(newJob);
    localStorage.setItem("postingsList", JSON.stringify(postingsList))
    newJob.notes = notes.value;
    newJob.jobstage = jobstage.value;
    localStorage.setItem("postingsList", JSON.stringify(postingsList))
    render()
  })
})

clearBtn.addEventListener("click", () => {
  localStorage.clear()
  postingsList = [];

  while (displayList.firstChild) {
    displayList.removeChild(displayList.firstChild);
  }

  render();
})

function render() {
  let listItems = ""
  for(let i = 0; i < postingsList.length; i++) {
    listItems += `
      <h3>${i+1}. ${postingsList[i].notes}</h3></br>
      <a target="_blank" href=${postingsList[i].url}>${postingsList[i].url}</a> </br>
      <li>  
        ${postingsList[i].jobstage}
      </li></br>
      </hr>
      `
  }
  displayList.innerHTML = listItems
}
