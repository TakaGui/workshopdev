// usei o express para criar e configurar meu servidor
const express = require("express");
const server = express();

const db = require("./db");

// configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"));

// habilitar uso do req.body
server.use(express.urlencoded({ extended: true }));

// configurar nunjucks
const nunjucks = require("nunjucks");
nunjucks.configure("views", {
  express: server,
  noCache: true
});

//criei uma rota /
// e capturo o pedido do cliente para responder
server.get("/", function(req, res) {
  
  //Consultar dados na tabela
  db.all(`SELECT * FROM ideas;`, function(err, rows) {
    if (err) {
      console.log(err);

      return res.send("Erro no banco de dados!");
    }

    const reversedIdeas = [...rows].reverse();
    let lastIdeas = [];
  
    for (let idea of reversedIdeas) {
      if (lastIdeas.length < 2) {
        lastIdeas.push(idea);
      }
    }
  
    return res.render("index.html", { rows: lastIdeas });
  })

}) 

server.post("/", function(req, res) {
  // Inserir dado na tabela
  const query = `
    INSERT INTO ideas(
        image
      , title
      , category
      , description
      , link
    ) VALUES (?, ?, ?, ?, ?);
  `;
  
  const values = [
    req.body.image,
    req.body.title,
    req.body.category,
    req.body.description,
    req.body.link
  ];
  
  db.run(query, values, function(err) {
    if (err) {
      console.log(err);
      return res.send("Erro no banco de dados!");
    } 

    return res.redirect("/ideas");
  });
})

server.get("/ideas", function(req, res) {

  db.all(`SELECT * FROM ideas;`, function(err, rows) {
    if (err) { 
      console.log(err);

      return res.send("Erro no banco de dados!");
    }

    return res.render("ideas.html", { rows });
  })

})

// liguei meu servidor na porta 3000
server.listen(3000);