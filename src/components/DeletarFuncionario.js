import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import api from "../api/axios.config";

function DeletarFuncionario() {
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function deletarFuncionario() {
      try {
        await api.delete(`/funcionario/${id}`);

        history.push("/");
      } catch (err) {
        console.error(err);
      }
    }
    deletarFuncionario();
  }, [id, history]);

  return <p>Deletando...</p>;
}

export default DeletarFuncionario;