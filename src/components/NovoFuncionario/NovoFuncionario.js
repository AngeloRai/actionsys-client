import { useHistory } from "react-router-dom";
import FormikComponent from "../FormikComponent";
import api from "../../api/axios.config";


function NovoFuncionario() {
  const history = useHistory();
  const setores = ["auxiliar", "técnico", "engenheiro", "diretor"]
  const cargos = ["engenharia", "compras", "vendas", "financeiro"]
  const niveis = ["junior", "pleno", "senior", "estagiario"]
  async function handleFileUpload(file) {
    try {
      const uploadData = new FormData();
      uploadData.append("image", file);
      const response = await api.post("/image-upload", uploadData);

      return response.data.fileUrl;
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <FormikComponent
        handleFileUpload={handleFileUpload}
        history={history}
        setores={setores}
        cargos={cargos}
        niveis={niveis}
      />
    </div>
  );
}

export default NovoFuncionario;
