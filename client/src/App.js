import { Routes, Route, Link } from 'react-router-dom';
import CadastroAluno from './CadastroAluno';
import CadastroProfessor from './CadastroProfessor';

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sistema</Link>
          <div className="navbar-nav">
            <Link className="nav-link" to="/aluno">Cadastrar Aluno</Link>
            <Link className="nav-link" to="/professor">Cadastrar Professor</Link>
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/aluno" element={<CadastroAluno />} />
        <Route path="/professor" element={<CadastroProfessor />} />
        <Route path="/" element={<h1 className="text-center mt-5">Bem-vindo ao Sistema</h1>} />
      </Routes>
    </div>
  );
}

export default App;