let jobLeads = []
let postingsList = [];
// const saveBtn = document.getElementById("save-btn")
// const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")
const ulEl = document.getElementById("ul-el")
const leadsInLocalStorage = JSON.parse(localStorage.getItem("jobLeads"))

if(leadsInLocalStorage) {
  jobLeads = leadsInLocalStorage
  render(jobLeads)
}

class Job {
  constructor() {
      this.jobstage = jobstage;
      this.notes = notes;
  }
}


//Chrome Storage

const notes = document.querySelector("#notes");
const jobstage = document.querySelector("#jobstage");
const add = document.getElementById("add");
const clear = document.querySelector("#clear");
const displayList = document.querySelector("#displayList");

tabBtn.addEventListener("click", () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    jobLeads.push(tabs[0].url)
    localStorage.setItem("jobLeads", JSON.stringify(jobLeads))
    render(jobLeads)

    console.log(notes.value);
    console.log(jobstage.value);
    console.log('click')

    let newJob = new Job();
    newJob.notes = notes.value;
    newJob.jobstage = jobstage.value;
    // newJob.link = link;
    console.log(newJob);
    postingsList.push(newJob);
    console.log(postingsList);

    const newListItem = document.createElement('li');
    newListItem.innerText = newJob.notes + " " + newJob.jobstage + " ";
    displayList.appendChild(newListItem);
  })
})
deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear()
  jobLeads = [];
  // postingsList = [];
  // var children = displayList.childNodes;
  // for(child in children){
  //     displayList.removeChild(child);
  // }
  while (displayList.firstChild) {
    displayList.removeChild(displayList.firstChild);
  }
  render(jobLeads)
})


// saveBtn.addEventListener("click", () => {
//   jobLeads.push(inputEl.value)
//   inputEl.value = ""
//   localStorage.setItem("jobLeads", JSON.stringify(jobLeads))
//   render(jobLeads)
// })

function render(leads) {
  let listItems = ""
  for(let i = 0; i < leads.length; i++) {
    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">${leads[i]}</a>
      </li>`
    console.log(leads[i])
  }
  ulEl.innerHTML = listItems
}
