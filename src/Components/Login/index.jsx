import React from "react";
import { useState, useContext } from "react";
import api from "../../Services/api";
import alert from "../../Services/alert";
import styles from "../Login/Form.module.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthContext";
import { ThemeContext } from "../../Providers/ThemeProvider";

const LoginForm = () => {

  const navigate = useNavigate();

  const { theme } = useContext(ThemeContext);

  const { fillUserData } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(false);


  const handleSubmit = (e) => {
    //Nesse handlesubmit você deverá usar o preventDefault,
    //enviar os dados do formulário e enviá-los no corpo da requisição 
    //para a rota da api que faz o login /auth
    //lembre-se que essa rota vai retornar um Bearer Token e o mesmo deve ser salvo
    //no localstorage para ser usado em chamadas futuras
    //Com tudo ocorrendo corretamente, o usuário deve ser redirecionado a página principal,com react-router
    //Lembre-se de usar um alerta para dizer se foi bem sucedido ou ocorreu um erro
    e.preventDefault();

    auth();
  };


  async function auth() {
    validateLogin();

    try {
      const res = await api.post("/auth", {
        username,
        password,
      });

      navigate("/home");

      fillUserData({
        token: res.data.token,
      });

      setError(false);
    } catch (e) {
      console.log("Erro de autenticação");
      if (error) {
        alert.fire({
          icon: "error",
          title: "Erro ao logar, verifique os dados digitados",
        });
      }
    }
  }

  const validateLogin = () => {
    if (username.includes(" ")) {
      alert.fire({
        title: "Verifique os dados, nome de usuário não deve conter espaços",
      });
      setError(true);
    }

    if (username.length < 5 || username.length > 15) {
      alert.fire({
        title: "Atenção,o nome de usuário deve ter entre 5 e 15 caracteres",
      });
      setError(true);
    }
  };


  return (
    <>
      {/* //Na linha seguinte deverá ser feito um teste se a aplicação
        // está em dark mode e deverá utilizar o css correto */}
      <div
        className={ theme === "light" ? `text-center card container ${styles.card}` : `text-center card dark container ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            
            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}
              required
            />

            <input
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              required
            />

            <button className="btn btn-primary" type="submit">
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
