import { React, useEffect, useState } from "react";
import api from "../../api/axios.config";
import { useParams, useHistory, Link } from "react-router-dom";

import ConfirmationModal from "../ConfirmationModal";

function ListarUmFuncionario() {
  const [funcionario, setFuncionario] = useState({});
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const history = useHistory();
  useEffect(() => {
    async function buscarFuncionarios() {
      try {
        const response = await api.get(`/funcionario/${id}`);
        
        setFuncionario(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    buscarFuncionarios();
  }, [id]);
  
  return (
    <div className="m-4 ">
      {funcionario && (
        

          <div className="d-flex mb-5 justify-content-center">

         <div>
         <div className="d-flex justify-content-center mb-3">
              <img src={funcionario.image_url} alt="foto funcionario" style={{height: "12rem"}}/>      
              </div>
              <div className=" mb-3 h1 text-secondary d-flex justify-content-center ">
                <strong>{funcionario.nome}</strong>
              </div>
                  <div className="m-3 ">
                    <strong>email:</strong> {funcionario.email}
                  </div>
                  <div className="m-3">
                    <strong>Nascimento:</strong> {funcionario.data_nascimento}
                  </div>
                  <div className="m-3">
                    <strong>Setor:</strong> {funcionario.setor}
                  </div>
                  <div className="m-3">
                    <strong>Cargo:</strong> {funcionario.cargo}
                  </div>
                  <div className="m-3">
                    <strong>Nivel:</strong> {funcionario.nivel}
                  </div>
                  
                  <div className="m-3">
                    <strong>Admitido em:</strong> {funcionario.data_admissao}
                  </div>
         </div>
          </div>
        
      )}

      <div className="d-flex justify-content-center ">
        <div className="d-flex justify-content-center w-25">
          <Link
            to={`/funcionario/atualizar/${funcionario.id}`}
            className="btn btn-primary "
          >
            Atualizar
          </Link>
        </div>
        <div className="d-flex justify-content-center w-25">
          <button className="btn btn-danger" onClick={() => setShowModal(true)}>
            Deletar
          </button>
        </div>
      </div>

      <ConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={() => history.push(`/funcionario/deletar/${id}`)}
        title="Tem certeza que deseja deletar este funcionario?"
      >
        <p>Esta ação é irreversível! Clique em Confirmar para "Deletar".</p>
      </ConfirmationModal>
    </div>
  );
}

export default ListarUmFuncionario;
