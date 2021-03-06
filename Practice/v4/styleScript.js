let allAlignmentOptions = document.querySelectorAll(".align-cell-content span");
let allFontDropDown = document.querySelectorAll(".font-type-size select");
let boldItalicUnderline = document.querySelectorAll(".bold-italic-underline span");
let allColorOptions = document.querySelectorAll(".cell-color-option span");
let body = document.querySelector("body");

let menuBarOptions = document.querySelectorAll(".menu-bar-section div");

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


let bgColorPicker = allColorOptions[0];
let fontColorPicker = allColorOptions[1];

bgColorPicker.addEventListener("click",function(e)
{
        let colorPickerElement = document.createElement("input");
        colorPickerElement.type = "color";
        body.append(colorPickerElement);
        colorPickerElement.click();

        colorPickerElement.addEventListener("input",function(e)
        {
            if(lastCell)
            {
                lastCell.style.backgroundColor = e.currentTarget.value;
                let address = lastCell.getAttribute("data-address");
                dataObj[address].bgColor = e.currentTarget.value;
                checkBody();
            }
        });
        
});

fontColorPicker.addEventListener("click",function(e)
{
        let colorPickerElement = document.createElement("input");
        colorPickerElement.type = "color";
        body.append(colorPickerElement);
        colorPickerElement.click();

        colorPickerElement.addEventListener("input",function(e)
        {
            if(lastCell)
            {
                lastCell.style.color= e.currentTarget.value;
                let address = lastCell.getAttribute("data-address");
                dataObj[address].color = e.currentTarget.value;
                checkBody();
            }
        });
        
});


//for removing the input element from html
function checkBody()
{
    let check = document.querySelectorAll("body > input");

    for(let i=0;i<check.length;i++)
    {
        check[i].remove();
    }
}


//help and file option
let fileOption = menuBarOptions[0];
let helpOption = menuBarOptions[1];

fileOption.addEventListener("click",function(e)
{
    let isOpen = fileOption.getAttribute("data-open");
      
    if(isOpen == "true")
    {
          fileOption.setAttribute("data-open","false");
          document.querySelector(".file-drop-down").remove();
    }
    else
    {
        let dropDown = document.createElement("div");
        dropDown.classList.add("file-drop-down");
        dropDown.innerHTML = `<p>Save</p>
                              <p>Clear</p>`;
        fileOption.append(dropDown);
        
        let allOptions = dropDown.querySelectorAll("p");
  
        let saveOption = allOptions[0];
        let clearOption = allOptions[1];
         
        saveOption.addEventListener("click",function(e)
        {
            localStorage.setItem("sheet",JSON.stringify(dataObj));
            // when we click on the save option in a file we have applied a attribute to check if div is present or not, basicall when we click it passes event to fileOption then automatically delete the div
            // e.stopPropagation();
        })
        clearOption.addEventListener("click",function(e)
        {
                localStorage.setItem("sheet","");
        })
        fileOption.setAttribute("data-open","true");
    } 
});


helpOption.addEventListener("click",function()
{
    let isOpen = helpOption.getAttribute("data-open");

    if(isOpen == "true")
    {
        helpOption.setAttribute("data-open","false")
        console.log(document.querySelector(".help-modal"));
        document.querySelector(".help-modal").remove();
    }
    else
    {
        let modal = document.createElement("div");
        modal.classList.add("help-modal");

        modal.innerHTML = `<p>Excel Clone</p>
                           <p>It perform Arithmetic Operation.</p>
                           <p>It uses a Graph data structure.</p>`
        helpOption.setAttribute("data-open","true")
        helpOption.append(modal);
    }
})
