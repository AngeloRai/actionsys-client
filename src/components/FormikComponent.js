import React from "react";
import { InputFeedback, NovoFuncionarioSchema } from "./InputFeedback";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../api/axios.config";

function FormikComponent(props) {
  return (
    <div>
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
              uploadedImageUrl = await props.handleFileUpload(values.image);
            }
            const valuesCopy = { ...values };
            delete valuesCopy.image;
            let image_url = "";
            if (uploadedImageUrl) {
              image_url = uploadedImageUrl;
            } else {
              image_url =
                "https://res.cloudinary.com/angeloraimondi/image/upload/v1626280658/actionsys/file_li7mxl.png";
            }

            await api.post("/funcionario", {
              ...valuesCopy,
              image_url: image_url,
            });
            setSubmitting(false);

            props.history.push("/");
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
              <div className="h4">
                <label htmlFor="fotoFuncionario">Foto Funcionario </label>
              </div>
              <input
                className="form-group"
                type="file"
                name="image"
                onChange={(event) =>
                  setFieldValue("image", event.target.files[0])
                }
              />
            </div>
            <div className="form-group">
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
            <div className="form-group my-1">
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
            <div className="form-group my-1 w-50">
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
            <div className="form-group my-1 w-50">
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
            <div className="form-group my-1">
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
                {props.setores.map((setor, i) => (
                  <option key={i} value={setor}>
                    {setor}
                  </option>
                ))}
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
            <div className="form-group my-1">
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
                {props.cargos.map((cargo, i) => (
                  <option key={i} value={cargo}>
                    {cargo}
                  </option>
                ))}
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
            <div className="form-group my-1">
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
                {props.niveis.map((nivel, i) => (
                  <option key={i} value={nivel}>
                    {nivel}
                  </option>))}
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
    </div>
  );
}

export default FormikComponent;
