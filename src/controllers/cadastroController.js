const fs = require("fs");
const { randomUUID } = require("crypto");

const home = (req, res) => {
  res.send("Seja Bem Vindo ao sistema para celulares roubados");
};

let cadastros = [];

fs.readFile("cadastros.json", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    cadastros = JSON.parse(data);
  }
});

const getAll = (req, res) => {
  cadastroFile();
  res.json(cadastros);
};

const getId = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const cadastroEncontrado = cadastros.find((cadastro) => cadastro.id === id);

  cadastroFile();
  return res.json(cadastroEncontrado);
};

const create = (req, res) => {
  const { cliente, endereco, tipoCelular, localDoRoubo, MEI } = req.body;

  const cadastroAdicionado = {
    cliente,
    endereco,
    tipoCelular,
    localDoRoubo,
    MEI,
    id: randomUUID(),
  };
  console.log(cadastroAdicionado);
  cadastros.push(cadastroAdicionado);

  cadastroFile();
  res.json(cadastroAdicionado);
};

const update = (req, res) => {
  const { id } = req.params;
  console.log(id);
  const { cliente, tipoCelular } = req.body;
  cadastroIndice = cadastros.findIndex((cadastro) => cadastro.id === id);
  cadastros[cadastroIndice] = {
    ...cadastros[cadastroIndice],
    cliente,
    tipoCelular,
  };

  return res.json({ message: "Cadastro Alterado com sucesso" });
};

const remove =  (req, res) => {
  const { id } = req.params;
  console.log(id);
  const cadastroDeletado = cadastros.findIndex(
    (cadastro) => cadastro.id === id
  );
  cadastros.splice(cadastroDeletado, 1);

  res.json({ message: "Cadastro Deletado com Sucesso" });
};

function cadastroFile() {
  fs.writeFile("cadastros.json", JSON.stringify(cadastros), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Cadastro Salvo no Banco...");
    }
  });
}

module.exports = {
  home,
  getAll,
  getId,
  create,
  update,
  remove
};
