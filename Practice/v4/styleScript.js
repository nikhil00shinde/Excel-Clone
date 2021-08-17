let allAlignmentOptions = document.querySelectorAll(".align-cell-content span");
let allFontDropDown = document.querySelectorAll(".font-type-size select");
let boldItalicUnderline = document.querySelectorAll(".bold-italic-underline span");


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


//adding functionality in the font drop down section
let fontStyle = allFontDropDown[0];
let fontSize1 = allFontDropDown[1];

fontStyle.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.fontFamily = e.currentTarget.value;
        let address = lastCell.getAttribute("data-address");
        dataObj[address].textType =  e.currentTarget.value;
    }
})

fontSize1.addEventListener("click",function(e)
{
    if(lastCell)
    {
        lastCell.style.fontSize = `${e.currentTarget.value}px`;
        let address = lastCell.getAttribute("data-address");
        dataObj[address].textSize = `${e.currentTarget.value}px`;
    }
})


//add functionality to bold italic and underline 
//by changing their css property
let bold = boldItalicUnderline[0];
let italic =  boldItalicUnderline[1];
let underline = boldItalicUnderline[2];

bold.addEventListener("click",function(e)
{
    if(lastCell)
    {
        let address = lastCell.getAttribute("data-address");
        if(dataObj[address].bold == "normal")
        {
            lastCell.style.fontWeight = "bold";
            dataObj[address].bold = "bold";
        }
        else
        {
            lastCell.style.fontWeight = "normal";
            dataObj[address].bold = "normal";
        }
        
    }

})

italic.addEventListener("click",function(e)
{
    if(lastCell)
    {

        let address = lastCell.getAttribute("data-address");
        if(dataObj[address].italic == "normal")
        {
            lastCell.style.fontStyle = "italic";
            dataObj[address].italic = "italic";
        }
        else
        {
            lastCell.style.fontStyle = "normal";
            dataObj[address].italic = "normal";
        }
    }
})

underline.addEventListener("click",function(e)
{
    if(lastCell)
    {
        let address = lastCell.getAttribute("data-address");
        if(dataObj[address].underline ==  "")
        {
            lastCell.style.textDecoration = "underline";
            dataObj[address].underline = "underline";
        }
        else
        {
            lastCell.style.textDecoration = "";
            dataObj[address].underline = "";
        }
       
    }
})
