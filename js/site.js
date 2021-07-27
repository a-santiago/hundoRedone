let eventArray = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018",
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018",
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019",
    },
];

let events = JSON.parse(localStorage.getItem("eventArray")) || eventArray;
filteredEvents = events;

displayAllData(events);

function getEvents(element) {
    let city = element.getAttribute("data-string");
    filteredEvents = events;
    document.getElementById("statsHeader").innerHTML = `Stats for ${city} Events`;
    if (city != 'All') {
        filteredEvents = events.filter(function (item) {
            if (item.city == city) {
                return item;
            }
        })
    }
    displayStat();
}

function displayStat() {

    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;
    //get the current attendance for internal porpuses
    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;
        //set most attended
        if (most < currentAttendance) {
            most = currentAttendance;
        }
        //set least attended
        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }
    //set average attended by dividing total and the number of events
    average = total / filteredEvents.length;

    //converts to integer
    average = Math.floor(average);

    //print each value
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString();
}

function displayData(events) {
    const template = document.getElementById("eventData-template");
    const eventBody = document.getElementById("results");
    //Clear table first
    eventBody.innerHTML = "";
    //grab the events from local storage
    let curEvents = JSON.parse(localStorage.getItem("eventArray"));

    if (curEvents == null) {
        curEvents = events;
    }
    for (let i = 0; i < curEvents.length; i++) {
        const eventRow = document.importNode(template.content, true);
        //grab only the columns in the template
        let eventCols = eventRow.querySelectorAll("td")

        eventCols[0].textContent = curEvents[i].event;
        eventCols[1].textContent = curEvents[i].city;
        eventCols[2].textContent = curEvents[i].state;
        eventCols[3].textContent = curEvents[i].attendance;
        eventCols[4].textContent = new Date(curEvents[i].date).toLocaleDateString();
        eventBody.appendChild(eventRow);
    }
}
function addData() {
    //get events from local storage
    let curEvents = JSON.parse(localStorage.getItem("eventArray"));

    let dismissBtn = document.getElementById("dismmisBtn");

    if (curEvents == null) {
        curEvents = events;
    }

    let objEvent = {};
    objEvent["event"] = document.getElementById("addEventName").value;
    objEvent["city"] = document.getElementById("addEventCity").value;
    objEvent["state"] = document.getElementById("addEventState").value;
    /*let stateSel = document.getElementById("addEventState")
      objEvent["state"] = stateSel.options[stateSel.selectedIndex].text;*/
    objEvent["attendance"] = parseInt(document.getElementById("addEventAttendance").value, 10);
    let eventDate = document.getElementById("addEventDate").value;
    let eventDate2 = `${eventDate} 00:00`
    objEvent["date"] = new Date(eventDate2).toLocaleDateString();

    if (objEvent["event"] == "" || objEvent["city"] == "" || objEvent["state"] == "" || objEvent["attendance"] == 0 || objEvent["date"] == "Invalid Date") {
        Swal.fire({
            icon: 'error',
            title: 'Invalid',
            text: 'All fields must be entered!',
        })
        return;
    } else {
        curEvents.push(objEvent);

        localStorage.setItem("eventArray", JSON.stringify(curEvents));

        events = JSON.parse(localStorage.getItem("eventArray"));
        displayStat(events);
        displayData(events);
        window.location.reload();
    }
    formClear();
    dismissBtn.click();
}

function dropDown() {

    let curEvents = JSON.parse(localStorage.getItem("eventArray"));
    if (curEvents == null) {
        curEvents = events;
    }
    let eventDD = document.getElementById("eventDropDown");
    //distinct events for the events array
    let distinctEvents = [...new Set(curEvents.map(event => event.city))]
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All">All</a>';
    let resultHTML = "";
    for (let i = 0; i < distinctEvents.length; i++) {
        resultHTML += `<a class="dropdown-item" onclick="getEvents(this)" data-string="${distinctEvents[i]}">${distinctEvents[i]}</a>`;
    }
    resultHTML += linkHTMLEnd;
    eventDD.innerHTML = resultHTML;
}

function displayAllData() {
    /*events = JSON.parse(localStorage.getItem("eventsArray"));*/
    displayStat(events);
    displayData(events);
}

function resetData() {
    localStorage.clear();
    window.location.reload();
}

function formClear() {
    let theForm = document.getElementById("modalForm");
    theForm.reset();
}