import { React, useEffect, useState } from "react";

import api from "../../api/axios.config";
import CardFuncionario from "../CardFuncionario/CardFuncionario";

function ListarFuncionarios() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [filteredFuncionarios, setFilteredFuncionarios] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    async function buscarFuncionarios() {
      try {
        const response = await api.get("/funcionarios");

        setFuncionarios([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    buscarFuncionarios();
  }, []);
  
  useEffect(() => {
    async function buscarFuncionarios() {
      try {
        let filteredArray = [];

        if (funcionarios.length !== 0 && searchWord.length !== 0) {
          filteredArray = funcionarios.filter((funcionario) =>
          funcionario.nome.toLowerCase().includes(searchWord.toLowerCase())
          );
        }
        setFilteredFuncionarios([...filteredArray]);
      } catch (err) {
        console.error(err);
      }
    }
    buscarFuncionarios();
  }, [funcionarios, searchWord]);

  function handleChange(event) {
    setSearchWord(event.target.value);
  }

  return (
    <div className="row d-flex justify-content-center">
      <div className="form-group mb-4 d-flex justify-content-center">
        <input
          placeholder="BUSCAR FUNCIONARIO"
          type="text"
          className="mt-2 w-50 form-control shadow-none no-border"
          id="searchWord"
          name="searchWord"
          onChange={handleChange}
          value={searchWord}
        />
      </div>
        {searchWord && filteredFuncionarios.map((funcionario, i) => (
          <div className="d-flex justify-content-center"><CardFuncionario funcionarios={funcionario} id={i} /></div>
        ))}

      {funcionarios &&
        funcionarios.map((funcionario, i) => (
          <CardFuncionario key={i} funcionarios={funcionario} />
        ))}


    </div>
  );
}

export default ListarFuncionarios;
