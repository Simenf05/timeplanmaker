
const classes = {}
const days = ["mandag", "tirsdag", "onsdag", "torsdag", "fredag"]
const startTimes = ["09:00", "10:00", "11:00", "12:00", "13:00"]
const lessons = ["matte", "norsk"]


const classesPtagEl = document.querySelector("#classesPtag")
const classesInputEl = document.querySelector("#classesInput")
const lessonInputEl = document.querySelector("#lessonInput")


function updateClassesDOM() {
    const classesList = Object.keys(classes)
    classesPtagEl.innerHTML = `Klasser:${classesList.map(className => ` ${className}`)}`
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

