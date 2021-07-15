var sn = document.getElementById("sn")
var form = document.getElementById("form")
var note = document.getElementById("note")
var select= document.getElementById("select")
var load= document.getElementById("load")
var btn_select = document.getElementById("btn_select")

load.style.display="none"

btn_select.addEventListener("click", () => {
    select.classList.add("op")

    select.addEventListener("animationend", () => {
        select.style.display="none"
        load.style.display="block"
        load.classList.add("load_ani")
    })
    })
   


function adjust(){
   if(document.body.className == "dark"){
       document.body.classList.remove("dark")
       document.body.classList.add("white")

       sn.style.boxShadow = "1px 1px 5px #333"

       form.style.boxShadow = "1px 1px 5px #333"

       note.style.color="#000"
   }else{
        document.body.classList.add("dark")
        document.body.classList.remove("white")
    }
}