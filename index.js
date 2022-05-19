let jobLeads = []
let postingsList = [];


const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")
const ulEl = document.getElementById("ul-el")
const leadsInLocalStorage = JSON.parse(localStorage.getItem("postingsList"))

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
const add = document.getElementById("add");
const clear = document.querySelector("#clear");
const displayList = document.querySelector("#displayList");

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  
    let link = tabs[0].url;
    console.log(tabs[0].url)
    let newJob = new Job();
    newJob.url = link;
    postingsList.push(newJob);
    localStorage.setItem("postingsList", JSON.stringify(postingsList))
    render()

    // let newJob = new Job();
    newJob.notes = notes.value;
    newJob.jobstage = jobstage.value;
    localStorage.setItem("postingsList", JSON.stringify(postingsList))
    // newJob.link = link;
    console.log(newJob);

  })
})
deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear()
  postingsList = [];

  while (displayList.firstChild) {
    displayList.removeChild(displayList.firstChild);
  }
  // render(jobLeads)
  render();
})



function render() {
  let listItems = ""
  for(let i = 0; i < postingsList.length; i++) {
  
    console.log(postingsList[i].jobstage.value);
    listItems += `
      <li> ${i+1}.</li> <br/>
      <p>${postingsList[i].notes}</p></br>
      <a target="_blank" href=${postingsList[i].url}>${postingsList[i].url}</a> </br>
      <li>  
        ${postingsList[i].jobstage}
      </li></br>
      </hr>
      `

    console.log(postingsList[i].url);
  }
  ulEl.innerHTML = listItems
}
