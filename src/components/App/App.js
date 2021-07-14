import { BrowserRouter, Route, Switch } from "react-router-dom";

import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarComponent from "../NavbarComponent/NavbarComponent"
import NovoFuncionario from "../NovoFuncionario/NovoFuncionario"
import AtualizarFuncionario from "../AtualizarFuncionario/AtualizarFuncionario"
import ListarFuncionarios from "../ListarFuncionarios/ListarFuncionarios"
import DeletarFuncionario from "../DeletarFuncionario"
import ListarUmFuncionario from "../ListarUmFuncioanrio/ListarUmFuncionario"
 

function App() {
  return (
    <div className="m-2">
      
      <BrowserRouter >
      <NavbarComponent/>
      <Switch>
    <div className="container">
      <Route exact path="/" component={ListarFuncionarios} />
      <Route exact path="/funcionario/adicionar" component={NovoFuncionario} />
      <Route exact path="/funcionario/atualizar/:id" component={AtualizarFuncionario} />
      <Route exact path="/funcionario/detalhes/:id" component={ListarUmFuncionario} />
      
      <Route exact path="/funcionario/deletar/:id" component={DeletarFuncionario} />
      
    </div>

      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
