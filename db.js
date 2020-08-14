const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./ws.db')   // (./) = referencia a pasta raiz do sistema

db.serialize(function() {
    
    //              criar tabela
    db.run(`
        CREATE TABLE IF NOT EXISTS ideias(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            category TEXT,
            description TEXT,
            link TEXT
        );
    `)
    //              inserir dado na tabela
    // const query =`
    // INSERT INTO ideias(
    //     image,
    //     title,
    //     category,
    //     description,
    //     link
    // ) VALUES (?,?,?,?,?);`
    // const values = [
    //     "/img/jogos.png" ,
    //     "Jogos" ,
    //     "Diversão",
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea sit accusamus suscipit corrupti illum, numquam tenetur quod iste quo laborum cupiditate sapiente soluta aperiam fuga iusto animi esse nam adipisci.",
    //     "https://www.linkedin.com/in/wendell-priebe-0113031a1/"
    // ]
    // db.run(query, values, function(err){
    //     if (err) return console.log(err)

    //     console.log(this)
    // })
    //                   consultar dados na tabela
    db.all(`SELECT * FROM ideias`, function(err, rows){
        if (err) return console.log(err)

        console.log(rows)
    })
    //                   deletar um dado da tabela
    // db.run(`DELETE FROM ideias WHERE id = ?`, [1], function(err){   //[1] = id do dado a deletar
    //     if (err) return console.log(err)

    //     console.log("DELETEI",this)
    // })
}) 

module.exports = db //exporta o banco de dados