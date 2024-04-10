let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let tool = canvas.getContext("2d");
let drawingMode = false;
let iX,iY,fX,fY;
let ctheme = true;

//pagintion
let previousPage = document.querySelector(".previousPage");
let nextPage = document.querySelector(".nextPage");
let currentPage = document.querySelector(".currentPage>p")

let pageTracker = -1;
let pagesArr = [];
let undoRedoTracker = []; //Data
let track = 0; // Represent which action from tracker array
// pagesArr.push(undoRedoTracker);
let cColor = "black";
let cSize = 3;

canvas.addEventListener("mousedown", function (e) {
    drawingMode = true;
    iX = e.clientX;
    iY = e.clientY;
    let data = {
        x : iX,
        y : iY
    }
    // if(cTool == "pencilTool" || cTool == "eraser"){
    //     tool.beginPath();
    //     tool.moveTo(iX,iY);
    // }
    if(cTool == "circle" || cTool == "rectTool"){
        return;
    }
    socket.emit("beginPath", data);
})

canvas.addEventListener("mousemove", function (e) {
    if (drawingMode == false)
        return;
    if(cTool == "pencilTool" || cTool == "eraser"){
        
        // fX = e.clientX;
        // fY = e.clientY;
        // tool.lineTo(fX, fY);
        // tool.stroke();
        // iX = fX;
        // iY = fY;
        let data = {
            x : e.clientX,
            y : e.clientY,
            tool: cTool,
            size: cSize,
            color: cColor
        }
        socket.emit("drawStroke", data);
    }
})

canvas.addEventListener("mouseup",function (e) {
    // console.log(e);
    tool.globalCompositeOperation="source-over";
    drawingMode = false;
    // fX = e.clientX;
    // fY = e.clientY;
    // let width = fX - iX;
    // let height = fY - iY;
    if(cTool == "rectTool" || cTool == "lineTool" || cTool == "triangle" || cTool == "arrow" || cTool == "circle" || cTool == "rhombus"){
        let data = {
            iX,
            iY,
            x: e.clientX,
            y: e.clientY,
            tool: cTool,
            size: cSize,
            color: cColor
        }
        // console.log(cSize + cColor)
        socket.emit("drawStroke", data)
    }else{
        let url = canvas.toDataURL();
        track++;
        undoRedoTracker[track] = url;
        
        if(track != undoRedoTracker.length - 1){
            undoRedoTracker.length = track+1;
        }
    }
})

function beginPath(strokeObj) {
    tool.beginPath();
    tool.moveTo(strokeObj.x, strokeObj.y);
    // console.log(strokeObj.x)
    // console.log(strokeObj.y)
}

function drawStroke(strokeObj){
    tool.globalCompositeOperation="source-over";
    // console.log(strokeObj.x)
    // console.log(strokeObj.y)
    tool.strokeStyle = strokeObj.color
    tool.lineWidth = strokeObj.size
    // console.log(strokeObj.color)
    iX = strokeObj.iX;
    iY = strokeObj.iY;
    let height = strokeObj.y - iY;
    let width = strokeObj.x - iX;

    // console.log(strokeObj.tool)
    if(strokeObj.tool == "pencilTool" || strokeObj.tool == "eraser"){
        if(strokeObj.tool == "eraser"){
            tool.globalCompositeOperation="destination-out";
        }
        tool.lineTo(strokeObj.x, strokeObj.y);
        tool.stroke();
    } else{
        if (strokeObj.tool == "rectTool") {
            tool.beginPath();
            tool.strokeRect(iX, iY, width, height);
            tool.stroke()
        } else if(strokeObj.tool == "lineTool"){
            // tool.beginPath();
            // tool.moveTo(iX, iY);
            // console.log("creating line")
            // console.log(tool.strokeStyle)
            tool.lineTo(strokeObj.x, strokeObj.y);
            tool.stroke();
        } else if(strokeObj.tool == "triangle"){
            // tool.beginPath();
            tool.moveTo(iX + width / 2, iY);
            tool.lineTo(strokeObj.x, strokeObj.y);
            tool.lineTo(iX, iY + height);
            tool.lineTo(iX + width / 2, iY);
            tool.stroke();
        } else if(strokeObj.tool == "arrow"){
            // tool.beginPath();
            tool.moveTo(iX, iY);
            tool.lineTo(strokeObj.x, strokeObj.y - height / 2);
            tool.lineTo(iX, iY + height);
            tool.lineTo(iX, iY);
            tool.stroke();
        } else if(strokeObj.tool == "circle"){
            let radius = Math.sqrt(height * height + width * width) / 2;
            tool.beginPath();
            tool.arc((iX + strokeObj.x) / 2,(iY + strokeObj.y) / 2, radius, 0, 2 * Math.PI, false);
            tool.stroke();
        } else if(strokeObj.tool == "rhombus"){
            // tool.beginPath();
            tool.moveTo(iX + width / 2, iY);
            tool.lineTo(iX, iY + height / 2);
            tool.lineTo(iX + width / 2, iY + height);
            tool.lineTo(iX + width, iY + height / 2);
            tool.lineTo(iX + width / 2, iY);
            tool.stroke();
        } 

        let url = canvas.toDataURL();
        track++;
        undoRedoTracker[track] = url;

        if(track != undoRedoTracker.length - 1){
            undoRedoTracker.length = track+1;
        }
    }
}

// color.forEach((colorElem) => {
//     colorElem.addEventListener("click", (e) => {
//         let color = colorElem.classList[1];
//         penColor = color;
//         tool.strokeStyle = penColor;
//     })
// })

color1.addEventListener("click", ()=>{
    // tool.strokeStyle = "black"
    cColor = "black";
})

color2.addEventListener("click", ()=>{
    // tool.strokeStyle = "blue"
    cColor = "blue"
})

color3.addEventListener("click", ()=>{
    // tool.strokeStyle = "red"
    cColor = "red"
})

size.addEventListener("click", (e) =>{
    let sizeArr = ["size1", "size2", "size3", "size4"];
    let firstClass = e.target.classList[0];
    if(sizeArr.includes(firstClass)){
        if(firstClass == "size1"){
            // tool.lineWidth = 1;
            cSize = 1;
        }else if(firstClass == "size2"){
            // tool.lineWidth = 3;
            cSize = 3;
        }else if(firstClass == "size3"){
            // tool.lineWidth = 5;
            cSize = 5;
        }else if(firstClass == "size4"){
            // tool.lineWidth = 10;
            cSize = 10;
        }
    }
})

undo.addEventListener("click", (e) => {
    if (track >= 0) track--;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("redoUndo", data)
    // undoRedoCanvas(data);
})

redo.addEventListener("click", (e) => {
    if (track < undoRedoTracker.length-1) track++;
    // track action
    let data = {
        trackValue: track,
        undoRedoTracker
    }
    socket.emit("redoUndo", data)
    // undoRedoCanvas(data);
})

function undoRedoCanvas(trackObj) {
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
    tool.clearRect(0, 0, canvas.width, canvas.height);
    let url = undoRedoTracker[track];
    let img = new Image(); // new image reference element
    img.src = url;
    img.onload = (e) => {
        tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    }
}

function clearAll(data){
    track++;
    // undoRedoTracker = data.undoRedoTracker;
    tool.clearRect(0, 0, canvas.width, canvas.height);
    // let url = canvas.toDataURL();
    // undoRedoTracker[track] = url;
}

dustBin.addEventListener("click", () =>{
    data = {
        track,
        undoRedoTracker
    }
    socket.emit("clearAll", data);
    // tool.clearRect(0, 0, canvas.width, canvas.height);
    // let url = canvas.toDataURL();
    // undoRedoTracker[track] = url;
})


theme.addEventListener("click", ()=>{
    if(ctheme){
        // tool.strokeStyle = "white";
        theme.src = "Images/sun.png";
        // canvas.style.backgroundColor = "white";
        canvas.style.filter = "invert(100%)";
        color1.style.backgroundColor = "white";
        color2.style.backgroundColor = "yellow";
        color3.style.backgroundColor = "cyan"
        // let color1 = document.querySelector(".color1");
        // color1.classList.remove("black");
        // color1.classList.add("white");
        
        // let color2 = document.querySelector(".blue");
        // color2.classList.remove("blue");
        // color2.classList.add("yellow");
    }else{
        // tool.strokeStyle = "black";
        theme.src = "Images/moon.png";
        // canvas.style.backgroundColor = "white";
        // let color1 = document.querySelector(".white");
        canvas.style.filter = "invert(0%)";
        color1.style.backgroundColor = "black";
        color2.style.backgroundColor = "blue";
        color3.style.backgroundColor = "red";
        // color1.classList.remove("white");
        // color1.classList.add("black");

        // let color2 = document.querySelector(".yellow");
        // color2.classList.remove("yellow");
        // color2.classList.add("blue");
    }
    ctheme = !ctheme;
})

function pageChange(data){
    pagesArr = data.pagesArr;
    pageTracker = data.pageTracker;
    if(data.type){
        undoRedoTracker = pagesArr[pageTracker];
        tool.clearRect(0, 0, canvas.width, canvas.height);
        let url = undoRedoTracker[undoRedoTracker.length - 1];
        let img = new Image(); // new image reference element
        img.src = url;
        img.onload = () => {
            tool.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        currentPage.innerText = `${pageTracker + 1}/${pagesArr.length}`;
    }else{
        tool.clearRect(0, 0, canvas.width, canvas.height);
        undoRedoTracker = [];
        track = 0;
        currentPage.innerText = `${pageTracker + 2}/${pagesArr.length + 1}`;
    }
}

previousPage.addEventListener("click", ()=>{

    // if(pageTracker == pageTracker.length - 1){
    //     pagesArr.push(undoRedoTracker)
    //     pageTracker++;
    // }
    // pageTracker--;
    // console.log(pageTracker)
    if(pageTracker == pagesArr.length - 1){
        pagesArr.push(undoRedoTracker)
        pageTracker++;
    }
    pageTracker--;
    if(pageTracker == -1){
        pageTracker = 0;
        return;
    }

    data = {
        pageTracker : pageTracker,
        pagesArr : pagesArr,
        type: true
    }
    socket.emit("pageChange", data);
    // tool.clearRect(0, 0, canvas.width, canvas.height);
    // undoRedoTracker = pagesArr[pageTracker];
    
    // let url = undoRedoTracker[undoRedoTracker.length - 1]; 
    // let img = new Image(); // new image reference element
    //     img.src = url;
    //     img.onload = () => {
    //         tool.drawImage(img, 0, 0, canvas.width, canvas.height);
    //     }
    //     currentPage.innerText = `${pageTracker + 1}/${pagesArr.length}`;
})

nextPage.addEventListener("click", ()=>{

    if(pageTracker == pagesArr.length - 1){
        pagesArr.push(undoRedoTracker);
        pageTracker++;
        data = {
            pageTracker : pageTracker,
            pagesArr : pagesArr,
            type: false
        }
        socket.emit("pageChange", data);
        // tool.clearRect(0, 0, canvas.width, canvas.height);
        // undoRedoTracker = [];
        // track = 0;
        // console.log(pageTracker)

        // currentPage.innerText = `${pageTracker + 2}/${pagesArr.length + 1}`;
    }else{
        pageTracker++;
        data = {
            pageTracker : pageTracker,
            pagesArr : pagesArr,
            type: true
        }
        socket.emit("pageChange", data);
        // undoRedoTracker = pagesArr[pageTracker];
        // tool.clearRect(0, 0, canvas.width, canvas.height);
        // let url = undoRedoTracker[undoRedoTracker.length - 1];
        // let img = new Image(); // new image reference element
        // img.src = url;
        // img.onload = () => {
        //     tool.drawImage(img, 0, 0, canvas.width, canvas.height);
        // }

        // currentPage.innerText = `${pageTracker + 1}/${pagesArr.length}`;
    }   
})

socket.on("beginPath", (data) => {
    // data -> data from server
    beginPath(data);
})
socket.on("drawStroke", (data) => {
    drawStroke(data);
})
socket.on("redoUndo", (data) => {
    undoRedoCanvas(data);
})

socket.on("pageChange", (data)=>{
    pageChange(data);
})

socket.on("clearAll", (data)=>{
    clearAll(data);
})