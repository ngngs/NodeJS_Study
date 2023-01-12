const socket = io();

const canvas = document.getElementById("cursor-layer");
const ctx = canvas.getContext("2d");
document.addEventListener("mousemove", (event) => {
    var x = event.clientX;
    var y = event.clientY;
    socket.emit("cursor-position", { x: x, y: y });
});
socket.on("cursor-position", (data) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(data.x, data.y, 10, 0, 2 * Math.PI);
    ctx.fill();
});


const welcome = document.getElementById("welcome")
const form = welcome.querySelector("form");
const room = document.getElementById("room");

room.hidden = true

let roomName; 

function addMessage(message){
    const ul = room.querySelector("ul");
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function showRoom(){
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}`;
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    input.value = ""
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () =>{
    addMessage("someone joined!");
});