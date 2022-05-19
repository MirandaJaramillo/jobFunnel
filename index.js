let postingsList = [];
let chromeSyncList = [];

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

    //Chrome Storage Sunc
    chrome.storage.sync.set({key: postingsList}, function() {
      console.log('Value is set to ' + postingsList[0].url);
    });

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
  chrome.storage.sync.get(['key'], function(result) {
    console.log(postingsList.forEach((post) => {
      console.log(post.url);
      console.log(post.notes);
      console.log(post.jobstage);
    } ) );
    chromeSyncList = postingsList;
  });

  let listItems = ""
  for(let i = 0; i < chromeSyncList.length; i++) {
    listItems += `
      <h3>${i+1}. ${chromeSyncList[i].notes}</h3></br>
      <a target="_blank" href=${chromeSyncList[i].url}>${chromeSyncList[i].url}</a> </br>
      <li>  
        ${chromeSyncList[i].jobstage}
      </li></br>
      </hr>
      `
  }
  displayList.innerHTML = listItems
}
