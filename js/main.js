"use strict";

const MAX_PARTICIPANTS = 5;
const LS_PARTICIPANTS_DATA = "participantsData";

function checkAndRegisterPartcipant() {
    let participants = localStorage.getItem(LS_PARTICIPANTS_DATA);
    if (!participants) {
        participants = [];
    } else {
        participants = JSON.parse(participants);
    }

    if (participants.length === MAX_PARTICIPANTS) {
        alert("Registration closed!");
        return;
    }

    let participant = {};
    participant.name = document.getElementById("name").value;
    participant.email = document.getElementById("email").value;
    participant.employeeId = document.getElementById("employeeId").value;
    participant.teamName = document.getElementById("teamName").value;
    participant.teamSize = document.getElementById("teamSize").value;
    participant.location = document.getElementById("location").value;
    participants.push(participant);

    localStorage.setItem(LS_PARTICIPANTS_DATA, JSON.stringify(participants));
    alert("Registration Successful!");
}

function listParticipants(here) {
    if (!(here instanceof Element)) {
        console.warn("listParticipants() method called for non DOM object " + here);
        return;
    }

    let participants = localStorage.getItem(LS_PARTICIPANTS_DATA);
    if (!participants) {
        participants = [];
    } else {
        participants = JSON.parse(participants);
    }
    
    if (participants.length === 0) {
        return;
    }

    let list = document.createElement("ul");
    for (let i=0; i<participants.length; i++) {
        let p = participants[i];
        let item = document.createElement("li");
        let text = document.createTextNode(`${p.name} - (${p.teamName} - ${p.teamSize} members)`);  
        item.appendChild(text);
        list.appendChild(item);
    }

    here.appendChild(list);
}


window.onload = function() {
    let register = document.getElementById("register");
    if (register) {
        register.onsubmit = (e) => {
            e.preventDefault();
            checkAndRegisterPartcipant();
        }    
    }

    let participants = document.getElementById("participants");
    if (participants) {
        listParticipants(participants);
    }
}








