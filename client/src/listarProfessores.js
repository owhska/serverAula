import React, { useState, useEffect } from 'react';
import Axios from "axios";

function ListaProfessor() {
  // Defina o estado para armazenar a lista de professores.
  const [professores, setProfessores] = useState([]);
 
  // Adicione o estado 'editingProfessor' para rastrear o professor atualmente em edição.
  const [editingProfessor, setEditingProfessor] = useState(null);
  // Adicione o estado 'editedData' para rastrear os dados editados.
  const [editedData, setEditedData] = useState({nome: '', idade: '', disciplina: '' });
  
  // Use o useEffect para fazer uma solicitação GET e obter a lista de professores.
  useEffect(() => {
    Axios.get("http://localhost:3001/listar/professores")
      .then((response) => {
        setProfessores(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  
  // Função para lidar com a exclusão de um professor.
  const handleExcluirProfessor = (professorId) => {
    Axios.delete(`http://localhost:3001/excluir/professor/${professorId}`)
      .then((response) => {
        // Atualize a lista de professores após a exclusão bem-sucedida.
        setProfessores((prevProfessores) => prevProfessores.filter((professor) => professor.id !== professorId));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // Função para lidar com o clique no botão "Editar".
  const handleEditClick = (professor) => {
    // Defina o professor atualmente em edição e seus dados atuais.
    setEditingProfessor(professor);
    setEditedData({ nome: professor.nome, idade: professor.idade, disciplina: professor.disciplina });
  };
  
  // Função para lidar com o clique no botão "Salvar".
  const handleSaveClick = () => {
    // Envie uma solicitação PUT para a rota de edição com os novos dados.
    Axios.put(`http://localhost:3001/editar/professor/${editingProfessor.id}`, editedData)
      .then((response) => {
        console.log(response.data);
        // Atualize a lista de professores após a edição bem-sucedida.
        setProfessores((prevProfessores) =>
          prevProfessores.map((professor) =>
            professor.id === editingProfessor.id ? { ...professor, ...editedData } : professor
          )
        );
        // Limpe os estados de edição.
        setEditingProfessor(null);
        setEditedData({ nome: '', idade: '', disciplina: '' });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  // Função para cancelar a edição
  const handleCancelEdit = () => {
    setEditingProfessor(null);
    setEditedData({ nome: '', idade: '', disciplina: '' });
  };
  
  // Renderize a lista de professores e os botões de edição/exclusão.
  return (
    <div className="container mt-4">
      <h2>Lista de Professores</h2>
      {professores.length === 0 ? (
        <p>Nenhum professor cadastrado.</p>
      ) : (
        <ul className="list-group">
          {professores.map((professor) => (
            <li className="list-group-item" key={professor.id}>
              {editingProfessor && editingProfessor.id === professor.id ? (
                // Renderize os campos de edição quando o professor estiver em edição.
                <div>
                  <div className="row">
                    <div className="col-md-4 mb-2">
                      <label className="form-label">Nome:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editedData.nome}
                        onChange={(e) => setEditedData({ ...editedData, nome: e.target.value })}
                      />
                    </div>
                    <div className="col-md-2 mb-2">
                      <label className="form-label">Idade:</label>
                      <input
                        type="number"
                        className="form-control"
                        value={editedData.idade}
                        onChange={(e) => setEditedData({ ...editedData, idade: e.target.value })}
                        min="1"
                      />
                    </div>
                    <div className="col-md-4 mb-2">
                      <label className="form-label">Disciplina:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={editedData.disciplina}
                        onChange={(e) => setEditedData({ ...editedData, disciplina: e.target.value })}
                      />
                    </div>
                    <div className="col-md-2 d-flex align-items-end mb-2">
                      <button className="btn btn-success btn-sm me-2" onClick={handleSaveClick}>
                        Salvar
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={handleCancelEdit}>
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Renderize os dados do professor quando não estiver em edição.
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Nome:</strong> {professor.nome}
                    <br />
                    <strong>Idade:</strong> {professor.idade}
                    <br />
                    <strong>Disciplina:</strong> {professor.disciplina}
                  </div>
                  <div>
                    <button 
                      className="btn btn-primary btn-sm me-2" 
                      onClick={() => handleEditClick(professor)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-danger btn-sm" 
                      onClick={() => handleExcluirProfessor(professor.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListaProfessor;