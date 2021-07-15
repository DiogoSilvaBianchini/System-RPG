const express = require("express")
const fs = require("fs")
const path = require("path")
const router = express.Router()
const bcrypt = require("bcryptjs")

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

router.post("/registrar", async (req,res) => {
    var { nome, email, senha } = req.body
    const id = Math.random().toString(32).substr(1, 25)
    
    const hash = await bcrypt.hash(senha, 10)
    senha = hash
    
    const newobj = { id , nome, email, senha}
   
    const object = read()
    object.push(newobj)

    write(object)
    res.redirect("/login")
})

router.post("/login", async (req,res) => {
    const { login, password } = req.body

    try{
        const busca = read()
        const index = busca.find((item) => item.email === login) 

        const id = index.id

        if(!index){
            res.send("Errado")
        }

    
        if(await bcrypt.compare(password, index.senha)){
            console.log("logado")
            res.redirect(`${index.id}`)
        }
        if(!await bcrypt.compare(password, index.senha)){
            console.log("Não logado")
            res.redirect("/login")
        }
    }catch(err){
        console.log("não logado:" + err)
    }
})

router.get("/:id", (req,res) => {
    const busca = read()
    const index = busca.find((item) => item.id === req.params.id)

    res.render("user", {
        name: index.nome
    })
})

router.post("/:id", (req,res) => {

})
module.exports = router