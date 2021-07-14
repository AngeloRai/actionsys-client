import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import api from "../../api/axios.config";

import { InputFeedback, NovoFuncionarioSchema } from "../InputFeedback";

function NovoFuncionario() {
  const history = useHistory();

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
    <Formik
      initialValues={{
        nome: "",
        email: "",
        setor: "",
        cargo: "",
        nivel: "",
        data_admissao: "",
        data_nascimento: "",
        image: "",
      }}
      validationSchema={NovoFuncionarioSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
               
        try {
          
          let uploadedImageUrl = "";
          if (values.image) {
            uploadedImageUrl = await handleFileUpload(values.image);
          }
          
          await api.post("/funcionario", {
            ...values,
            image_url: uploadedImageUrl,
            image: "",
          });

          setSubmitting(false);
          
          history.push("/");
        } catch (err) {
          console.error(err);
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, setFieldValue }) => (
        <Form>
          <h1>Cadastre Novo Funcionario</h1>
          <h2 className="mt-3">Dados Pessoais do Funcionario</h2>
          <hr />
         <div className="d-flex-column">
            <div className="h4"><label htmlFor="fotoFuncionario">Foto Funcionario </label></div>
            
            <input
              className="form-group my-2"
              type="file"
              name="image"
              onChange={(event) => setFieldValue("image", event.target.files[0])}
            />
         </div>
          <div className="form-group my-2">
            <label htmlFor="registroNome">Full Name</label>
            <Field
              type="text"
              className={`form-control ${
                errors.nome && touched.nome ? "is-invalid" : "is-valid"
              }`}
              id="registroNome"
              name="nome"
            />
            <ErrorMessage
              name="nome"
              render={(msg) => (
                <InputFeedback invalid={errors.nome && touched.nome}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="registroEmail">Endereço de email</label>
            <Field
              type="email"
              className={`form-control ${
                errors.email && touched.email ? "is-invalid" : "is-valid"
              }`}
              id="registroEmail"
              aria-describedby="emailHelp"
              name="email"
            />
            <ErrorMessage
              name="email"
              render={(msg) => (
                <InputFeedback invalid={errors.email && touched.email}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <div className="form-group my-2 w-50">
            <label htmlFor="registroDataNascimento">Data de Nascimento</label>
            <Field
              type="date"
              className={`form-control ${
                errors.data_nascimento && touched.data_nascimento
                  ? "is-invalid"
                  : "is-valid"
              }`}
              id="registroDataNascimento"
              name="data_nascimento"
            />
            <ErrorMessage
              name="data_nascimento"
              render={(msg) => (
                <InputFeedback
                  invalid={errors.data_nascimento && touched.data_nascimento}
                >
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <h2 className="mt-3">Data de Admissão e Cargo</h2>
          <hr />

          <div className="form-group my-2 w-50">
            <label htmlFor="registroDataAdmissao">Data de Admissão</label>
            <Field
              type="date"
              className={`form-control ${
                errors.data_admissao && touched.data_admissao
                  ? "is-invalid"
                  : "is-valid"
              }`}
              id="registroDataAdmissao"
              name="data_admissao"
            />
            <ErrorMessage
              name="data_admissao"
              render={(msg) => (
                <InputFeedback
                  invalid={errors.data_admissao && touched.data_admissao}
                >
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="registroSetor">Setor</label>
            <Field
              id="registroSetor"
              name="setor"
              as="select"
              className={`form-control ${
                errors.setor && touched.setor ? "is-invalid" : "is-valid"
              }`}
            >
              <option value=""></option>
              <option value="engenharia">engenharia</option>
              <option value="compras">compras</option>
              <option value="vendas">vendas</option>
              <option value="financeiro">financeiro</option>
            </Field>

            <ErrorMessage
              name="setor"
              render={(msg) => (
                <InputFeedback invalid={errors.setor && touched.setor}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="registroCargo">Cargo</label>
            <Field
              id="registroCargo"
              name="cargo"
              as="select"
              className={`form-control ${
                errors.cargo && touched.cargo ? "is-invalid" : "is-valid"
              }`}
            >
              <option value=""></option>
              <option value="auxiliar">auxiliar</option>
              <option value="técnico">técnico</option>
              <option value="engenheiro">engenheiro</option>
              <option value="diretor">diretor</option>
            </Field>
            <ErrorMessage
              name="cargo"
              render={(msg) => (
                <InputFeedback invalid={errors.cargo && touched.cargo}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="registroNivel">Nivel</label>

            <Field
              id="registroNivel"
              name="nivel"
              as="select"
              className={`form-control ${
                errors.nivel && touched.nivel ? "is-invalid" : "is-valid"
              }`}
            >
              <option value=""></option>
              <option value="junior">junior</option>
              <option value="pleno">pleno</option>
              <option value="senior">senior</option>
              <option value="estagiario">estagiario</option>
            </Field>
            <ErrorMessage
              name="nivel"
              render={(msg) => (
                <InputFeedback invalid={errors.nivel && touched.nivel}>
                  {msg}
                </InputFeedback>
              )}
            />
          </div>

          <hr />
          <div className="d-flex justify-content-center my-4">
            <button
              type="submit"
              className="btn btn-primary w-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span>Cadastrando</span>
                </>
              ) : (
                <span>Cadastrar</span>
              )}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default NovoFuncionario;
