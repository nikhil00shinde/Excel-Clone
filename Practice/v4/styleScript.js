let allAlignmentOptions = document.querySelectorAll(".align-cell-content span");
let allFontDropDown = document.querySelectorAll(".font-type-size select");



let leftAlign = allAlignmentOptions[0];
let centerAlign = allAlignmentOptions[1];
let rightAlign = allAlignmentOptions[2];

leftAlign.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.textAlign = "left";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].align = "left";
    }
});

centerAlign.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.textAlign = "center";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].align = "center";
    }
    
});


rightAlign.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.textAlign = "right";
        let address = lastCell.getAttribute("data-address");
        dataObj[address].align = "right";
    }
    
});


let fontStyle = allFontDropDown[0];
let fontSize1 = allFontDropDown[1];

fontStyle.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.fontFamily = e.currentTarget.value;
        let address = lastCell.getAttribute("data-address");
        dataObj[address].textType =  e.currentTarget.value;
        console.log(dataObj);
    }
})

fontSize1.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.fontSize = `${e.currentTarget.value}px`;
        let address = lastCell.getAttribute("data-address");
        dataObj[address].textSize = `${e.currentTarget.value}px`;
        console.log(dataObj);
    }
})


