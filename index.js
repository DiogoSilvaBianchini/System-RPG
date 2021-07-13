const express = require("express")
const bodyParser = require("body-parser")
const router = require("./src/routers/index")

const app = express()
const PORT = process.env.PORT || 8082

app.set("view engine", "pug")
app.set("views", "./src/views")

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname + "/src/public"))
app.use(express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free"))
app.use("/", router)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})
