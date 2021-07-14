import { parse, isDate } from "date-fns";
import * as Yup from "yup";


const InputFeedback = (props) => {
  return (
    <div className={props.invalid ? "invalid-feedback" : "valid-feedback"}>
      {props.children}
    </div>
  );
}


// Funcao para configurar a data para chegar no backend na forma correta
function parseDateString(value, originalValue) {
  const parsedDate = isDate(originalValue)
  ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date());
    
    return parsedDate;
  }


// Schema de controle para validar campos do formulario
const NovoFuncionarioSchema = Yup.object().shape({
  nome: Yup.string()
  .required("Por favor informe nome.")
  .max(200, "Nome deve conter no maximo 200 caracteres"),
  email: Yup.string().email("Insira um email valido").required("Por favor informe email."),
  data_nascimento: Yup.date()
  .transform(parseDateString)
  .required("Por favor informe data de nascimento."),
  data_admissao: Yup.date()
  .transform(parseDateString)
  .required("Por favor informe data de admissão"),
  setor: Yup.string()
  .required("Campo exigido")
  .max(100, "Setor deve conter no maximo 100 caracteres"),
  cargo: Yup.string()
  .required("Campo exigido")
  .max(100, "Cargo deve conter no maximo 100 caracteres"),
  nivel: Yup.string()
  .required("Campo exigido")
  .max(100, "Cargo deve conter no maximo 100 caracteres"),
});

export {InputFeedback, NovoFuncionarioSchema};
