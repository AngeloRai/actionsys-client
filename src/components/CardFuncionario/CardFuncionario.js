import React from "react";
import { Link } from "react-router-dom";

function CardFuncionario(props) {
  return (
    <div
      className="col-3 card m-4"
      style={{ width: "19rem", minHeight: "18rem" }}
      key={props.id}
    >
      <div className="card-body">
        <Link to={`/funcionario/detalhes/${props.funcionarios.id}`} className="link-unstyled text-decoration-none text-dark">
            <div className="mb-3 d-flex justify-content-center">
              <img src={props.funcionarios.image_url} alt="foto funcionario" style={{height: "9rem"}}/>      
              </div>
            
            <div className="d-flex justify-content-center mb-3">
              <div className="card-title h4 text-secondary">
                <strong>{props.funcionarios.nome}</strong>
              </div>
            </div>
            <div className="card-text">
              <strong>email:</strong> {props.funcionarios.email}
            </div>
            <div className="card-text">
              <strong>Nascimento:</strong> {props.funcionarios.data_nascimento}
            </div>
            <div className="card-text">
              <strong>Setor:</strong> {props.funcionarios.setor.toUpperCase()}
            </div>
            <div className="card-text">
              <strong>Cargo:</strong> {props.funcionarios.cargo.toUpperCase()}
            </div>
            <div className="card-text">
              <strong>Nivel:</strong> {props.funcionarios.nivel.toUpperCase()}
            </div>
            <div className="card-text"></div>
            <div className="card-text">
              <strong>Admitido em:</strong> {props.funcionarios.data_admissao}
            </div>
            <div className="d-flex justify-content-around mt-3">
              <Link
                to={`/funcionario/atualizar/${props.funcionarios.id}`}
                className="btn btn-primary mx-1"
              >
                Atualizar
              </Link>
            </div>
        </Link>
      </div>
    </div>
  );
}

export default CardFuncionario;
