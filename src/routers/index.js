const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()

const read = () => {
    const data = fs.readFileSync(path.join(__dirname + "/../database/users.json"), 'utf-8')
    return JSON.parse(data)
}

const write = (object) => {
    const obj = JSON.stringify(object)
    fs.writeFileSync(path.join(__dirname + "/../database/users.json"), obj, 'utf-8') 
    
}


const view = () => {
    const data = fs.readFileSync(path.join(__dirname + "/../database/users.json"), 'utf-8')
    const obj = JSON.parse(data)
    return JSON.stringify(obj)
}
router.get("/", (req,res) => {
    res.render("home")
})

router.get("/login", (req,res) => {
    res.render("login")
})

router.get("/register", (req,res) => {
    res.render("registro")
})

router.post("/registrar", (req,res) => {
    const { nome, email, senha } = req.body
    const id = Math.random().toString(32).substr(1, 25)
    const newobj = { id , nome, email, senha}
   
    const object = read()
    object.push(newobj)

    write(object)
    res.redirect("/login")
})

router.post("/login", (req,res) => {
    const { login, password } = req.body

    const busca = read()
    const index = busca.find((item) => item.email === login) 

    const id = index.id

    if(!index){
        res.send("Errado")
    }

    if(index){
        console.log("email correto")
        if(password === index.senha){
            res.redirect(`/${id}`)
        }else(
            res.send("Senha errada")
        )
    }
})

router.get("/:id", (req,res) => {
    const busca = read()
    const index = busca.find((item) => item.id === req.params.id)

    const name = index.nome

    res.render("user", {
        name: name
    })
})
module.exports = router