let rowNumberSection = document.querySelector(".row-numbers-section");
let columnNumberSection = document.querySelector(".column-number-section");
let cellSection = document.querySelector(".cell-section");
let formulaSelection = document.querySelector(".visible-section div");


cellSection.addEventListener("scroll",function(e)
{
    rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
    columnNumberSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`
})


for(let i=1;i<=100;i++)
{
    let div = document.createElement("div");
    div.innerText = i;
    div.classList.add("row-numbers");
    rowNumberSection.append(div);
}


for(let i=0;i<26;i++)
{
   let div = document.createElement("div");
   div.innerText = String.fromCharCode(65+i);
   div.classList.add("column-number");
   columnNumberSection.append(div)
}

let selectedCell;

for(let i=1;i<=100;i++)
{
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for(let j=0;j<26;j++)
    {
        let cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");

        let ascii = 65+j;

        let charCode = String.fromCharCode(ascii);

        let code = charCode + i;
        cellDiv.setAttribute("data-address",code);
        cellDiv.addEventListener("click",function(e)
        {
            if(selectedCell)
            {
                selectedCell.classList.remove("cell-selected");
            }
            e.currentTarget.classList.add("cell-selected");
            formulaSelection.innerText =  e.currentTarget.getAttribute("data-address");
            selectedCell = e.currentTarget;
        })
        rowDiv.append(cellDiv);
    }
    cellSection.append(rowDiv)
}

