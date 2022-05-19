let jobLeads = []
let postingsList = [];
// const saveBtn = document.getElementById("save-btn")
// const inputEl = document.getElementById("input-el")
const deleteBtn = document.getElementById("delete-btn")
const tabBtn = document.getElementById("save-tab")
const ulEl = document.getElementById("ul-el")
// const leadsInLocalStorage = JSON.parse(localStorage.getItem("jobLeads"))
const leadsInLocalStorage = JSON.parse(localStorage.getItem("postingsList"))

if(leadsInLocalStorage) {
  // jobLeads = leadsInLocalStorage
  // render(jobLeads)
  postingsList = leadsInLocalStorage
  render(postingsList)
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
    // jobLeads.push(tabs[0].url)
    // localStorage.setItem("jobLeads", JSON.stringify(jobLeads))
    // render(jobLeads)
    // postingsList.push(tabs[0].url)
    let link = tabs[0].url;
    console.log(tabs[0].url)
    let newJob = new Job();
    newJob.url = link;
    postingsList.push(newJob);
    localStorage.setItem("postingsList", JSON.stringify(postingsList))
    render(postingsList)

    // let newJob = new Job();
    newJob.notes = notes.value;
    newJob.jobstage = jobstage.value;
    localStorage.setItem("postingsList", JSON.stringify(postingsList))
    // newJob.link = link;
    console.log(newJob);
    // postingsList.push(newJob);
    // postingsList.push(newJob.notes);
    // localStorage.setItem("postingsList", JSON.stringify(postingsList))
    // render(postingsList)
    // postingsList.push(newJob.jobstage);
    // localStorage.setItem("postingsList", JSON.stringify(postingsList))
    // render(postingsList)
    // console.log(postingsList);

    // const newListItem = document.createElement('li');
    // newListItem.innerText = newJob.jobstage;
    // displayList.appendChild(newListItem);
    // const newNote = document.createElement('p');
    // newNote.innerText = newJob.notes;
    // displayList.appendChild(newNote);
    // const hr = document.createElement('hr');
    // displayList.appendChild(hr);
  })
})
deleteBtn.addEventListener("dblclick", () => {
  localStorage.clear()
  // jobLeads = [];
  postingsList = [];
  // postingsList = [];
  // var children = displayList.childNodes;
  // for(child in children){
  //     displayList.removeChild(child);
  // }
  while (displayList.firstChild) {
    displayList.removeChild(displayList.firstChild);
  }
  // render(jobLeads)
  render(postingsList);
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
    // const newListItem = document.createElement('li');
    // newListItem.innerText = leads[i].jobstage;
    // const displayList = document.querySelector("#displayList");
    // displayList.appendChild(newListItem);
    // const newNote = document.createElement('p');
    // newNote.innerText = leads[i].notes;
    // displayList.appendChild(newNote);
    // const hr = document.createElement('hr');
    // displayList.appendChild(hr);
    console.log(leads[i].jobstage.value);
    listItems += `
      <li> ${i+1}.</li> <br/>
      <p>"${leads[i].notes.value}"</p></br>
      <a target="_blank" href="${leads[i].url}">${leads[i].url}</a> </br>
      <li>  
        ${leads[i].jobstage.value}
      </li></br>
      </hr>
      `

    console.log(leads[i].url)
  }
  ulEl.innerHTML = listItems
}
