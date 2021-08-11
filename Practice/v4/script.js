let rowNumberSection = document.querySelector(".rom-number-section");
let cellSection  = document.querySelector(".cell-section");

let columnTagSection = document.querySelector(".column-tag-section");
let selectedCellFormulaBar = document.querySelector(".selected-cell-div");
let lastCell;

let dataObj = {};

cellSection.addEventListener("scroll",function(e)
{
    //translate is css property in which hum ek element ko move kar sakte hain usko left to right or right to left or top to bottom or bottom to top 
    //if the value is too negative then move toward left same for top also
    // we use transform property  

    //the scrolling is done on cell-section 
    
    //we have negative z-index value to overlap the column and row section while scrolling
    columnTagSection.style.transform = `translateX(-${e.currentTarget.scrollLeft}px)`;
    rowNumberSection.style.transform = `translateY(-${e.currentTarget.scrollTop}px)`;
})




for(let i=1;i<=100;i++)
{
    let div = document.createElement("div");
    div.innerText = i;
    div.classList.add("row-number")
    rowNumberSection.append(div);
}


for(let i=0;i<26;i++)
{
    let asciiCode = 65+i;
    let char = String.fromCharCode(asciiCode);

    let div = document.createElement("div");
    div.innerText = char;
    div.classList.add("column-tag");
    
    columnTagSection.append(div);

}


//inside this nested for loop we are creating individual cells UI + cell Object
for(let i=1;i<=100;i++)
{
    let rowDiv = document.createElement("div");
    rowDiv.classList.add("row");
    for(let j=0;j<26;j++)
    {

        let asciiCode = 65+j;
        let char = String.fromCharCode(asciiCode);
        
        let cellAddress = char + i;
        dataObj[cellAddress] = {
            value:undefined,
            formula:undefined,
            upstream: [],
            downstream:[]
        };



        let cellDiv = document.createElement("div");


       cellDiv.addEventListener("input",function(e)
       {
           //jis cell pr type kra uske attribute se maine uska cell address fetch kra
           let currCellAddress = e.currentTarget.getAttribute("data-address");

           //kuki sare cell objects dataObj me store ho rakhe h using their cell address as key
           //maine jis cell pr click krke type kra uska hi address fetch and uska hi object chahiye
           //to wo address as key use krke dataObj se fetch krlia req cellObj ko
           let currCellObj = dataObj[currCellAddress];
           currCellObj.value = e.currentTarget.innerText;
           console.log(currCellObj);
       })

        cellDiv.classList.add("cell");
        cellDiv.setAttribute("contenteditable",true);
        cellDiv.addEventListener("click",function(e)
        {
            if(lastCell)
            {
                lastCell.classList.remove("cell-selected");
            }
            e.currentTarget.classList.add("cell-selected");
            selectedCellFormulaBar.innerText = e.currentTarget.getAttribute("data-address");
            lastCell = e.currentTarget;
        })
        cellDiv.setAttribute("data-address",cellAddress)
        rowDiv.append(cellDiv)

       
    }
    cellSection.append(rowDiv)
}
