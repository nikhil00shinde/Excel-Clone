let rowNumberSection = document.querySelector(".rom-number-section");

for(let i=1;i<=100;i++)
{
    let div = document.createElement("div");
    div.innerText = i;
    div.classList.add("row-number")
    rowNumberSection.append(div);
}

let columnTagSection = document.querySelector(".column-tag-section");

for(let i=0;i<26;i++)
{
    let asciiCode = 65+i;
    let char = String.fromCharCode(asciiCode);

    let div = document.createElement("div");
    div.innerText = char;
    div.classList.add("column-tag");
    
    columnTagSection.append(div);

}


let cellSec  = document.querySelector(".cell-section");
for(let i=1;i<=100;i++)
{
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for(let j=0;j<26;j++)
    {
        let asciiCode = 65+j;
        let char = String.fromCharCode(asciiCode);

        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");

        let code = char + i;
        cellDiv.setAttribute("data-address",code)
        rowDiv.append(cellDiv)
    }
    cellSec.append(rowDiv)
}