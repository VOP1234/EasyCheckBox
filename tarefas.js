var listElementToDo = document.querySelector('#todo')
var listElementDone = document.querySelector('#done')
var inputElement = document.querySelector('#app input')
var buttonElement = document.querySelector('#app button')

var tasks = JSON.parse(localStorage.getItem('list_tasks')) || []

var dones = JSON.parse(localStorage.getItem('list_dones')) || []

function renderTasks() {
  listElementToDo.innerHTML = ""

  for (task of tasks) {
    var taskElement = document.createElement('li')
    var taskText = document.createTextNode(task)

    var linkElement = document.createElement('a')
    linkElement.setAttribute('href', '#')

    var pos = tasks.indexOf(task)
    linkElement.setAttribute('onclick', 'deleteTask(' + pos + ', "' + task + '")')

    var linkText = document.createTextNode(' - Excluir')

    linkElement.appendChild(linkText)


    taskElement.appendChild(taskText)
    taskElement.appendChild(linkElement)
    listElementToDo.appendChild(taskElement)
    saveToStorage()
  }
}

function renderDone() {
  listElementDone.innerHTML = ""

  for (done of dones) {
    var doneElement = document.createElement('li')
    var doneText = document.createTextNode(done)

    doneElement.appendChild(doneText)
    listElementDone.appendChild(doneElement)
    saveToStorage()
  }
}

function addTask() {
  var taskText = inputElement.value

  tasks.push(taskText)
  inputElement.value = ''
  renderTasks()
}

function deleteTask(pos, element) {
  tasks.splice(pos, 1)

  dones.push(element)

  renderTasks()
  renderDone()
  saveToStorage()
}

function saveToStorage(){
  localStorage.setItem('list_tasks', JSON.stringify(tasks))
  localStorage.setItem('list_dones', JSON.stringify(dones))
}

buttonElement.onclick = addTask


renderTasks()
renderDone()