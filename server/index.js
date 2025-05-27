const express = require("express");
const app = express();
const mysql = require('mysql2');
const cors = require("cors");
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senha",
    database: "crudalunos",
});
app.use(cors());
app.use(express.json());

// Cadastrar aluno
app.post("/register", (req, res) => {
    const { nome, idade } = req.body;
    // Validação básica
    if (!nome || !idade) {
        console.error("Erro: Nome e idade são obrigatórios");
        return res.status(400).json({ error: "Nome e idade são obrigatórios" });
    }
    let SQL = "INSERT INTO alunos (nome, idade) VALUES (?, ?)";
   
    db.query(SQL, [nome, idade], (err, result) => {
        if (err) {
            console.error("Erro ao inserir aluno:", err);
            return res.status(500).json({ error: "Erro ao cadastrar aluno" });
        }
        res.status(201).json({ message: "Aluno cadastrado com sucesso", id: result.insertId });
    });
});

// Cadastrar professor
app.post("/register/professor", (req, res) => {
    const { nome, idade, disciplina } = req.body;
    // Validação básica
    if (!nome || !idade || !disciplina) {
        console.error("Erro: Nome, idade e disciplina são obrigatórios");
        return res.status(400).json({ error: "Nome, idade e disciplina são obrigatórios" });
    }
    let SQL = "INSERT INTO professores (nome, idade, disciplina) VALUES (?, ?, ?)";
   
    db.query(SQL, [nome, idade, disciplina], (err, result) => {
        if (err) {
            console.error("Erro ao inserir professor:", err);
            return res.status(500).json({ error: "Erro ao cadastrar professor" });
        }
        res.status(201).json({ message: "Professor cadastrado com sucesso", id: result.insertId });
    });
});

// Listar alunos
app.get("/listar", (req, res) => {
    let SQL = "SELECT * FROM alunos";
    db.query(SQL, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: "Erro ao listar alunos" });
        } else {
            res.json(result); // Enviar os dados dos alunos como resposta
        }
    });
});

// Listar professores
app.get("/listar/professores", (req, res) => {
    let SQL = "SELECT * FROM professores";
    db.query(SQL, (err, result) => {
        if (err) {
            console.error("Erro ao listar professores:", err);
            res.status(500).json({ error: "Erro ao listar professores" });
        } else {
            res.json(result); // Enviar os dados dos professores como resposta
        }
    });
});

// Excluir aluno
app.delete("/excluir/:id", (req, res) => {
    const alunoId = req.params.id;
 
    // Execute uma consulta SQL para excluir o aluno com base no ID
    const SQL = "DELETE FROM alunos WHERE id = ?";
    db.query(SQL, [alunoId], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao excluir aluno" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Aluno não encontrado" });
        } else {
          res.json({ message: "Aluno excluído com sucesso" });
        }
      }
    });
});

// Excluir professor
app.delete("/excluir/professor/:id", (req, res) => {
    const professorId = req.params.id;
 
    // Execute uma consulta SQL para excluir o professor com base no ID
    const SQL = "DELETE FROM professores WHERE id = ?";
    db.query(SQL, [professorId], (err, result) => {
      if (err) {
        console.error("Erro ao excluir professor:", err);
        res.status(500).json({ error: "Erro ao excluir professor" });
      } else {
        if (result.affectedRows === 0) {
          res.status(404).json({ error: "Professor não encontrado" });
        } else {
          res.json({ message: "Professor excluído com sucesso" });
        }
      }
    });
});
   
app.listen(3001, () => {
    console.log("rodando servidor");
});