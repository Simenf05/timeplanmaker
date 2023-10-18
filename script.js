
const classes = {}
const days = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag"]
const startTimes = ["09:00", "10:00", "11:00", "12:00", "13:00"]
const lessons = ["", "matte", "norsk", "psykologi", "lunsj"]


const classesPtagEl = document.querySelector("#classesPtag")
const classesInputEl = document.querySelector("#classesInput")
const lessonInputEl = document.querySelector("#lessonInput")
const classButtonsEl = document.querySelector("#classButtons")
const timeTableEl = document.querySelector("#timeTable")


function updateClassesDOM() {
    const classesList = Object.keys(classes)
    classesPtagEl.innerHTML = `Klasser:${classesList.map(className => ` ${className}`)}`
}   

function addNewClassButton(className) {
    const newButton = document.createElement("button")
    newButton.onclick = generateTimeTable
    newButton.innerHTML = className
    classButtonsEl.appendChild(newButton)
}

function addClass(e) {

    const classExists = className => {
        console.log("class exists");
    }   

    const className = classesInputEl.value

    if (className === "") return
    if (classes[className]) {classExists(className); return}

    const classTable = {}

    days.forEach(day => {
        const timesTable = {}
        startTimes.forEach(time => {
            timesTable[time] = ""
        });
        classTable[day] = timesTable
    });

    classes[className] = classTable

    updateClassesDOM()
    addNewClassButton(className)

    classesInputEl.value = ""
}

function addLesson(e) {

    const lessonExists = lessonName => {
        console.log("lesson exists");
    }

    const lessonName = lessonInputEl.value

    if(lessonName === "") return
    if(!(lessons.indexOf(lessonName) === -1)) {lessonExists(lessonName); return}

    lessons.push(lessonName)
    

    lessonInputEl.value = ""
}


function getLessonsSelect(tableClass, day, time) {
    
    const newSelect = document.createElement("select")

    newSelect.name = "select"

    lessons.forEach(lesson => {
        const newOpt = document.createElement("option")

        newOpt.innerHTML = lesson
        newOpt.value = lesson
        if (lesson === tableClass[day][time]) newOpt.selected = true

        newSelect.appendChild(newOpt)
    });

    newSelect.onchange = e => tableClass[day][time] = e.target.value

    return newSelect
}


function generateTimeTable(e) {

    timeTableEl.innerHTML = ""

    const tableClass = classes[e.target.innerHTML]

    const newTable = document.createElement("table")

    const daysTr = newTable.insertRow()
    daysTr.insertCell()
    days.forEach(day => {
        const dayTd = daysTr.insertCell()
        dayTd.innerHTML = day
        dayTd.style.border = '1px solid black';
    });

    startTimes.forEach(time => {

        const tr = newTable.insertRow()

        const timeTd = tr.insertCell()
        timeTd.innerHTML = time
        timeTd.style.border = '1px solid black';

        days.forEach(day => {
        
            const td = tr.insertCell()
            td.appendChild(getLessonsSelect(tableClass, day, time))
            td.style.border = '1px solid black';

        });
    });

    timeTableEl.appendChild(newTable)

}