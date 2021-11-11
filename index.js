const express = require('express')
const app = express();
const mongoose = require("mongoose");

const cors = require("cors")

require("./models/Artigo");
const Artigo = mongoose.model("artigo");

app.use(express.json());

app.use((req, res, next) =>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE")
    app.use(cors())
    next();
})

mongoose.connect('mongodb://localhost/celke', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Conexão feita com sucesso!")
}).catch((erro) => {
    console.log("Erro: Conexão não foi feita com sucesso!")
});



app.get("/", (req, res) => {
    Artigo.find({}).then( (artigo) => {
        return res.json(artigo);

    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum Artigo encontrado."
        })
    })
})

app.get( "/artigo/:id", ( req, res ) => {
    Artigo.findOne({id: req.params.id}).then( (artigo) => {
        return res.json(artigo);

    }).catch((erro) => {
        return res.status(400).json({
            error: true,
            message: "Nenhum Artigo encontrado."
        })
    })
})

app.put("/artigo/:id", (req, res) =>{
    const artigo = Artigo.updateOne({_id: req.params.id }, req.body, (erro) => {
       if(erro) return res.status(400).json({
           erro: true,
           message: "Error: Artigo não foi editado"
       }) 
       return res.status(200).json({
        erro: false,
        message: "Editado com sucesso!"
    }) 
    })
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

app.delete("/artigo/:id", (req, res) =>{
    const artigo = Artigo.deleteOne({_id: req.params.id }, req.body, (erro) => {
       if(erro) return res.status(400).json({
           erro: true,
           message: "Error: Artigo não foi deletado"
       }) 
       return res.status(200).json({
        erro: false,
        message: "Deletado com sucesso!"
    }) 
    })
})



app.listen(8080, () => {
    console.log("APP RODANDO!")
})