const express = require('express')
const app = express();
const mongoose = require("mongoose");

require("./models/Artigo");
const Artigo = mongoose.model("artigo");

app.use(express.json());


mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão feita com sucesso!")
}).catch((erro) => {
    console.log("Erro: Conexão não foi feita com sucesso!")
});



app.get("/", (req, res) => {
    return res.json({ Titulo: "Introdução a API"})
})


app.post( "/artigo", ( req, res ) => {
    const artigo = Artigo.create(req.body, (err) => {
        if (err)
            return res.status(400).json({
                error: true,
                message: "Error: Não foi possivel cadastrar!"
            })
        return res.status(200).json({
                error: false,
                message: "Cadastrado com sucesso!"
            })
    })
})





app.listen(8080, () => {
    console.log("APP RODANDO!")
})