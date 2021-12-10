let options = document.querySelector(".options");
let toolBar = document.querySelector(".tools");
let pencil = document.querySelector(".pencil");
let pencilCont = document.querySelector(".pencil-tool-cont");
// let pencilColor = document.querySelectorAll(".pencil-color");
// let color = document.querySelectorAll(".color");
let color1 = document.querySelector(".color1");
let color2 = document.querySelector(".color2");
let color3 = document.querySelector(".color3");
let size = document.querySelector(".size-box");
// let pencilWidthElem = document.querySelector(".pencil-width");
let eraser = document.querySelector(".eraser");
// let eraserCont = document.querySelector(".eraser-tool-cont");
let line = document.querySelector(".line");
let shapes = document.querySelector(".shapes");
let download = document.querySelector(".download");
let upload = document.querySelector(".upload");
let sticky = document.querySelector(".notes");
let dustBin = document.querySelector(".dustbin");
let square = document.querySelector(".square");
let triangle = document.querySelector(".triangle");
let arrow = document.querySelector(".arrow");
let circle = document.querySelector(".circle");
let rhombus = document.querySelector(".rhombus");
let shapeContainer = document.querySelector(".shapes-container");
let undo = document.querySelector(".undo");
let redo = document.querySelector(".redo");
let theme = document.querySelector(".theme");
let optionsFlag = true;
let pencilFlag = false;
let eraserFlag = false;
let cTool = "pencilTool";
let shape = false;

options.addEventListener("click", ()=>{
    optionsFlag = !optionsFlag;
    shapeContainer.style.display = "none";
    if(optionsFlag){
        toolBar.style.display = "flex";
    }else{
        toolBar.style.display = "none";
    }
})

pencil.addEventListener("click", () => {
    shapeContainer.style.display = "none";
    let selectedItem = toolBar.querySelector(".selected");
    selectedItem.classList.remove("selected");
    pencil.classList.add("selected");
    cTool = "pencilTool";
    // tool.strokeStyle = "black";
})

eraser.addEventListener("click", () => {
    shapeContainer.style.display = "none";
    let selectedItem = toolBar.querySelector(".selected");
    selectedItem.classList.remove("selected");
    eraser.classList.add("selected");
    cTool = "eraser";
    // tool.strokeStyle = "white";
})

shapes.addEventListener("click", ()=>{
    let selectedItem = toolBar.querySelector(".selected");
    selectedItem.classList.remove("selected");
    shapes.classList.add("selected");
    shape = !shape;
    if(shape){
        shapeContainer.style.display = "flex";
        cTool = "lineTool";
        // tool.strokeStyle = "black"
    }else{
        shapeContainer.style.display = "none";
    }
})

// shapes.addEventListener("blur", ()=>{
    //     console.log("blbb")
    //     shapeContainer.style.display = "none";
    // })
    
    line.addEventListener("click", () =>{
    let selectedItem = shapeContainer.querySelector(".selected");
    selectedItem.classList.remove("selected");
    line.classList.add("selected");
        // tool.strokeStyle = "black";
        cTool = "lineTool";
})

square.addEventListener("click", () =>{
    let selectedItem = shapeContainer.querySelector(".selected");
    selectedItem.classList.remove("selected");
    square.classList.add("selected");
    cTool = "rectTool";
    // tool.strokeStyle = "black";

})

triangle.addEventListener("click", ()=>{
    let selectedItem = shapeContainer.querySelector(".selected");
    selectedItem.classList.remove("selected");
    triangle.classList.add("selected");
    // tool.strokeStyle = "black";
    cTool = "triangle";
})

arrow.addEventListener("click", ()=>{
    let selectedItem = shapeContainer.querySelector(".selected");
    selectedItem.classList.remove("selected");
    arrow.classList.add("selected");
    cTool = "arrow";
    // tool.strokeStyle = "black";
})

circle.addEventListener("click", ()=>{
    let selectedItem = shapeContainer.querySelector(".selected");
    selectedItem.classList.remove("selected");
    circle.classList.add("selected");
    cTool = "circle";
    // tool.strokeStyle = "black";
})

rhombus.addEventListener("click", ()=>{
    let selectedItem = shapeContainer.querySelector(".selected");
    selectedItem.classList.remove("selected");
    rhombus.classList.add("selected");
    cTool = "rhombus";
    // tool.strokeStyle = "black";
})

sticky.addEventListener("click", () => {
    let sticky = document.createElement("div");
    sticky.setAttribute("class", "sticky");
    sticky.innerHTML = `<div class="header">
    <div class="minimize"></div>
    <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>`;
    document.body.appendChild(sticky);
    let minimize = sticky.querySelector(".minimize");
    let close = sticky.querySelector(".remove");
    let textArea = sticky.querySelector(".note-cont");
    let header = sticky.querySelector(".header");
    let isClosed = false;
    minimize.addEventListener("click", function (e) {
        if (isClosed == false) {
            textArea.style.display = "none";
        } else {
            textArea.style.display = "block";
        }
        isClosed = !isClosed
    })
    close.addEventListener("click", function () {
        sticky.remove();
    })

    header.onmousedown = function (event) {
        dragAndDrop(sticky, event);
    };

    header.ondragstart = function () {
        return false;
    };

})

function dragAndDrop(element, event) {
    let shiftX = event.clientX - element.getBoundingClientRect().left;
    let shiftY = event.clientY - element.getBoundingClientRect().top;

    element.style.position = 'absolute';
    element.style.zIndex = 1000;

    moveAt(event.pageX, event.pageY);

    // moves the ball at (pageX, pageY) coordinates
    // taking initial shifts into account
    function moveAt(pageX, pageY) {
        element.style.left = pageX - shiftX + 'px';
        element.style.top = pageY - shiftY + 'px';
    }

    function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
    }

    // move the ball on mousemove
    document.addEventListener('mousemove', onMouseMove);

    // drop the ball, remove unneeded handlers
    element.onmouseup = function () {
        document.removeEventListener('mousemove', onMouseMove);
        element.onmouseup = null;
    };
}

download.addEventListener("click", (e) => {
    let url = canvas.toDataURL();

    let a = document.createElement("a");
    a.href = url;
    a.download = "board.jpg";
    a.click();
})

upload.addEventListener("click", (e) => {
    // Open file explorer
    let input = document.createElement("input");
    input.setAttribute("type", "file");
    input.click();

    input.addEventListener("change", (e) => {
        let file = input.files[0];
        let url = URL.createObjectURL(file);

        let sticky = document.createElement("div");
        sticky.setAttribute("class", "sticky");
        sticky.innerHTML = `<div class="header">
        <div class="minimize"></div>
        <div class="remove"></div>
        </div>
        <div class="note-cont">
        <img src="${url}"/>
        </div>`;
        document.body.appendChild(sticky);
    let minimize = sticky.querySelector(".minimize");
    let close = sticky.querySelector(".remove");
    let textArea = sticky.querySelector(".note-cont");
    let header = sticky.querySelector(".header");
    let isClosed = false;
    minimize.addEventListener("click", function (e) {
        if (isClosed == false) {
            textArea.style.display = "none";
        } else {
            textArea.style.display = "block";
        }
        isClosed = !isClosed
    })
    close.addEventListener("click", function () {
        sticky.remove();
    })

    header.onmousedown = function (event) {
        dragAndDrop(sticky, event);
    };

    header.ondragstart = function () {
        return false;
    };
    })
})
