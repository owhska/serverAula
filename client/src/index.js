import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import ListaAlunos from './listarAlunos';
import ListaProfessor from './listarProfessores';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ListaAlunos />
      <ListaProfessor />
    </BrowserRouter>
  </React.StrictMode>
);