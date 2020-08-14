
//   PARA EXERCUTAR SERVER NO TERMINAL DO VSCODE = npm run dev
//   PARA EXECUTAR SERVER NO TERMINAL WINDOS = npm start


//usei o express para criar e configurar meu servidor
const express = require("express")
const server = express()

const db = require("./db")

// const ideias = [
//     {
//         img:"/img/programmer.png" ,
//         title:"Cursos de Programação" ,
//         category: "Estudo",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea sit accusamus suscipit corrupti illum, numquam tenetur quod iste quo laborum cupiditate sapiente soluta aperiam fuga iusto animi esse nam adipisci.",
//         url: "https://www.linkedin.com/in/wendell-priebe-0113031a1/"
//     },
//     {
//         img:"/img/exercise.png" ,
//         title:"Exercícios" ,
//         category: "Saúde",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea sit accusamus suscipit corrupti illum, numquam tenetur quod iste quo laborum cupiditate sapiente soluta aperiam fuga iusto animi esse nam adipisci.",
//         url: "https://www.linkedin.com/in/wendell-priebe-0113031a1/"
//     },
//     {
//         img:"/img/meditation.png" ,
//         title:"Meditação" ,
//         category: "Relaxar",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea sit accusamus suscipit corrupti illum, numquam tenetur quod iste quo laborum cupiditate sapiente soluta aperiam fuga iusto animi esse nam adipisci.",
//         url: "https://www.linkedin.com/in/wendell-priebe-0113031a1/"
//     },
//     {
//         img:"/img/jogos.png" ,
//         title:"Jogos" ,
//         category: "Diversão",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea sit accusamus suscipit corrupti illum, numquam tenetur quod iste quo laborum cupiditate sapiente soluta aperiam fuga iusto animi esse nam adipisci.",
//         url: "https://www.linkedin.com/in/wendell-priebe-0113031a1/"
//     }
// ]

//configurar arquivos estaticos (css, js, img)
server.use(express.static("public"))//ele entende q a pasta public é uma pasta raiz

//habilita uso do req.body
server.use(express.urlencoded({ extended: true}))

//configuraçao nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, //boolean
})

//criei uma rota "/"
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {
    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err){
            return console.log(err)
            return res.send("Erro no banco de dados!")  
        }

        const reversedIdeias = [...rows].reverse()
        
        const lastIdeias = []
        for (let ideia of reversedIdeias){    //.reverse inverte a ordem das ideias
            if(lastIdeias.length <2){
                lastIdeias.push(ideia)
            }
        }
        return res.render("index.html", {ideias: lastIdeias})
        //especificar caminho completo (_dirname = pasta)("/index.html = arquivo dentro da pasta") 
    })
})
server.get("/ideias", function(req, res) {
    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err){
            return console.log(err)
            return res.send("Erro no banco de dados!")  
        }
        const reversedIdeias = [...rows].reverse()  
        return res.render("ideias.html", {ideias: reversedIdeias})
    })
})
server.post("/", function(req,res){
    //inserir dado na tabela
    const query =`
    INSERT INTO ideias(
        image,
        title,
        category,
        description,
        link
    ) VALUES (?,?,?,?,?);`
    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link
    ]
    db.run(query, values, function(err){
        if (err){
            return console.log(err)
            return res.send("Erro no banco de dados!")  
        }
        return res.redirect("/ideias")
    })
})
// liguei o servidor na porta 3000
server.listen(3000)