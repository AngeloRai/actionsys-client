import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import api from "../../api/axios.config";
import { InputFeedback, NovoFuncionarioSchema } from "../InputFeedback";
import ConfirmationModal from "../ConfirmationModal";

function AtualizarFuncionario(props) {
  const { id } = useParams();
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
   
  const [state, setState] = useState({
    nome: "",
    email: "",
    setor: "",
    cargo: "",
    nivel: "",
    data_admissao: "",
    data_nascimento: "",
    image_url: ""
  });

  // Pré-popula o formulário com os dados do produto através do id da URL
  useEffect(() => {
    async function buscarFuncionario() {
      try {
        const response = await api.get(`/funcionario/${id}`);

        setState({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    buscarFuncionario();
  }, [id]);
  
  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={{
          nome: state.nome,
          email: state.email,
          setor: state.setor,
          cargo: state.cargo,
          nivel: state.nivel,
          data_admissao: state.data_admissao,
          data_nascimento: state.data_nascimento,
          image_url: state.image_url
        }}
        validationSchema={NovoFuncionarioSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
  
          try {
            await api.put(`/funcionario/${id}`, { ...values });
  
            setSubmitting(false);
  
            history.push("/");
          } catch (err) {
            console.error(err);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form>
            <h1>Atualize Funcionario</h1>
            <h2 className="mt-3">Dados Pessoais do Funcionario</h2>
            <hr />
  
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
            <div className="d-flex justify-content-center">
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
                    <span>Atualizando</span>
                  </>
                ) : (
                  <span>Atualizar</span>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="d-flex justify-content-center my-4">
        <button className="btn btn-danger w-50" onClick={() => setShowModal(true)}>
              Deletar
        </button>
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

export default AtualizarFuncionario;
