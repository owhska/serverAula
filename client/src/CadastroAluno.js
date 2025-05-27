import React, { useState } from 'react';
import api from './api';

function CadastroAluno() {
  const [values, setValues] = useState({ nome: '', idade: '' });
  const [message, setMessage] = useState('');

  const handleChangeValues = (event) => {
    setValues((prevValue) => ({
      ...prevValue,
      [event.target.name]: event.target.value,
    }));
  };

  const handleClickButton = (e) => {
    e.preventDefault();
    setMessage('');
    if (!values.nome || !values.idade) {
      setMessage('Por favor, preencha todos os campos.');
      return;
    }
    if (isNaN(values.idade) || values.idade <= 0) {
      setMessage('Idade deve ser um número positivo.');
      return;
    }
    api
      .post('/register', {
        nome: values.nome,
        idade: Number(values.idade),
      })
      .then((response) => {
        setMessage(response.data.message || 'Aluno cadastrado com sucesso!');
        setValues({ nome: '', idade: '' });
      })
      .catch((error) => {
        setMessage(error.response?.data?.error || 'Erro ao cadastrar aluno.');
        console.error('Error:', error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2>Cadastro de Aluno</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleClickButton}>
            <div className="mb-3">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                id="nome"
                name="nome"
                value={values.nome}
                onChange={handleChangeValues}
                aria-describedby="nomeHelp"
              />
              <div id="nomeHelp" className="form-text">
                Insira o nome completo do aluno.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="idade" className="form-label">
                Idade:
              </label>
              <input
                type="number"
                className="form-control"
                id="idade"
                name="idade"
                value={values.idade}
                onChange={handleChangeValues}
                min="1"
                aria-describedby="idadeHelp"
              />
              <div id="idadeHelp" className="form-text">
                Insira a idade do aluno (número positivo).
              </div>
            </div>
            <button type="submit" className="btn btn-primary">
              Cadastrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CadastroAluno;