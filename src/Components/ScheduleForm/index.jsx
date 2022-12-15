import React from "react";
import { useContext, useEffect, useState } from "react";
import api from "../../Services/api";
import styles from "./ScheduleForm.module.css";
import { AuthContext } from "../../Providers/AuthContext";
import { ThemeContext } from "../../Providers/ThemeProvider";
import alert from "../../Services/alert";

const ScheduleForm = () => {
  const { userData } = useContext(AuthContext);
  const { token } = userData;

  const { theme } = useContext(ThemeContext);

  const [dentistas, setDentistas] = useState([]);
  const [pacientes, setPacientes] = useState([]);

  const [dataHoraConsulta, setDataHoraConsulta] = useState("");
  const [dentistaForm, setDentistaForm] = useState("");
  const [pacienteForm, setPacienteForm] = useState("");

  useEffect(() => {
    getDentistas();
    getPacientes();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    postConsulta();
  };

  async function getDentistas() {
    try {
      const res = await api.get("/dentista", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setDentistas(res.data);
    } catch (e) {
      console.log("Erro ao buscar dentistas");
    }
  }

  async function getPacientes() {
    try {
      const res = await api.get("/paciente", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setPacientes(res.data.body);
    } catch (e) {
      console.log("Erro ao buscar pacientes");
    }
  }

  async function postConsulta() {
    const data = {
      paciente: {
        matricula: pacienteForm,
      },
      dentista: {
        matricula: dentistaForm,
      },
      dataHoraAgendamento: dataHoraConsulta,
    };

    console.log(pacienteForm);
    console.log(dentistaForm);
    console.log(data);

    try {
      await api.post("/consulta", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert.fire({
        icon: "success",
        title: "Consulta agendada com sucesso",
      });
    } catch (e) {
      alert.fire({
        icon: "error",
        title: "Erro ao agendar consulta",
      });
    }
  }

  return (
    <>
      <div
        className={
          theme === "light"
            ? `text-center container`
            : `text-center container dark`
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <select
                className="form-select"
                name="dentist"
                id="dentist"
                value={dentistaForm}
                onChange={(e) => setDentistaForm(e.target.value)}
              >
                <option value="none" selected>
                  -
                </option>
                {dentistas.map((dentista) => (
                  <option key={dentista.matricula} value={dentista.matricula}>
                    {`${dentista.nome} ${dentista.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <select
                className="form-select"
                name="patient"
                id="patient"
                value={pacienteForm}
                onChange={(e) => setPacienteForm(e.target.value)}
              >
                <option value="none" selected>
                  -
                </option>
                {pacientes.map((paciente) => (
                  <option key={paciente.matricula} value={paciente.matricula}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data e hora da consulta
              </label>
              <input
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
                value={dataHoraConsulta}
                onChange={(e) => setDataHoraConsulta(e.target.value)}
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button
              className={
                theme === "light"
                  ? `btn btn-light ${styles.button}`
                  : `btn btn-dark ${styles.button}`
              }
              type="submit"
            >
              Marcar consulta
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ScheduleForm;