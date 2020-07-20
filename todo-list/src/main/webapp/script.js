// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/** Fetches tasks from the server and adds them to the DOM. */
function loadLocationTasks() {
  var place = document.getElementsByName('location-choice').value;
  fetch('/list-tasks').then(response => response.json()).then((tasks) => {
  const taskListElement = document.getElementById('post');
  locationElement.innerText = task.location;
  console.log(taskListElement);
    tasks.forEach((task) => {
        if (place == locationElement){
            taskListElement.appendChild(createTaskElement(task));
            console.log(taskListElement);

            }
            //document.getElementById('results').innerText = tasks;
        });
    });

}


function loadTasks(){
    fetch("/list-tasks").then(response => response.json()).then((tasks) => {
    const postTaskElement = document.getElementById('post');
    tasks.forEach((task) => {postTaskElement.appendChild(createTaskElement(task));
    console.log(tasks);    

    });

    });
}

/** Creates an element that represents a task, including its delete button. */
function createTaskElement(task) {
  const taskElement = document.createElement('li');
  taskElement.className = 'task';

  const titleElement = document.createElement('span');
  titleElement.innerText = task.title;

  const tagElement = document.createElement('span');
  tagElement.innerText = task.tag;

  const locationElement = document.createElement('span');
  locationElement.innerText = task.location;

  const descriptionElement = document.createElement('span');
  descriptionElement.innerText = task.description;

  const deleteButtonElement = document.createElement('button');
  deleteButtonElement.innerText = 'Delete';
  deleteButtonElement.addEventListener('click', () => {
    deleteTask(task);

    // Remove the task from the DOM.
    taskElement.remove();
  });

  taskElement.appendChild(titleElement);
  taskElement.appendChild(tagElement);
  taskElement.appendChild(locationElement);
  taskElement.appendChild(descriptionElement);
  taskElement.appendChild(deleteButtonElement);
  return taskElement;
}

/** Tells the server to delete the task. */
function deleteTask(task) {
  const params = new URLSearchParams();
  params.append('id', task.id);
  fetch('/delete-task', {method: 'POST', body: params});
}

function createListElement(text) {
  const liElement = document.createElement('li');
  liElement.innerText = text;
  return liElement;
}
