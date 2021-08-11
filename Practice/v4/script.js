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
           currCellObj.formula = undefined;

           //1- Loop on upstream
           //2- for each cell go to its downstram and remove ourself 
           //3- apni upstream ko empty array krdo

           let currUpstream = currCellObj.upstream;
           

           for(let k=0;k<currUpstream.length;k++)
           {
               //removeFromDownstream(parent,child)

               removeFromDownstream(currUpstream[k],currCellAddress);
           }



           currCellObj.upstream = []


           let currDownstream = currCellObj.downstream;
          
        //    C1(20) => [E1] E1 (2*C1) [40]

           for(let i=0;i<currDownstream.length;i++)
           {
               updateCell(currDownstream[i]);
           }
    
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


//C1 = Formula(2*A1)
//A1 = parent
// C1 = child

//is function kisi ki upstream se mtlb nhi hai
//iska bs itna kaam h ki parent do and child do , aur mai parent ki downstream se child ko hta dunga
//taki unke bichka connection khtm hojai
//taki agr parent update ho to connection khtm hone ke baad child update na ho

function removeFromDownstream(parentCell,childCell)
{
    //  1- fetch parentCell's downstream 

    let parentDownstream = dataObj[parentCell].downstream;

    //2- filter kro childCell ko parent ki downstream se
    let filteredDownstream = [];

    for(let i=0;i<parentDownstream.length;i++)
    {
        if(parentDownstream[i] != childCell)
        {
            filteredDownstream.push(parentDownstream[i]);
        }
    }

    //3- filtered downstream ko wapis save krwado dataObj me req cell me
    dataObj[parentCell].downstream = filteredDownstream;
}


function updateCell(cell)
{
    let cellObj = dataObj[cell];

    let upstream = dataObj.upstream;  //[(A1=10), B1=10]
    let formula = dataObj.formula; // A1 + B1


    //upstream me jobhi cell hai unke objects me jaunga whase unki value lekr aunga
    //wo sari values mai ek object me key value pair form me store krunga where key being the cell address


    // {
    //     A1:20,
    //     B1:10
    // }



    let valObj = {};

    for(let i=0;i<upstream.length;i++)
    {

        let cellValue = dataObj[upstream[i]].value;

        valObj[upstream[i]] = cellValue;
    }

    //A1 + B1

    for(let key in valObj)
    {
        formula = formula.replace(key,valObj[key]);
    }

    //20 + 10

    let newValue = eval(formula);
}