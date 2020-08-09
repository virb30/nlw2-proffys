import React from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";

import heartIcon from "../../assets/images/icons/purple-heart.svg";

import "./styles.css";

function Login() {
  console.log("login");

  return (
    <div id="page-login" className="container">
      <div className="login-content">
        <div className="login-form">
          <form>
            <h1 id="title">Fazer Login</h1>
            <div className="input-group">
              <Input name="email" type="email" placeholder="E-mail" />
              <Input name="password" type="password" placeholder="Senha" />
            </div>

            <div className="login-helpers">
              <Checkbox name="remind-me" label="Lembrar-me" />
              <Link to="forgot">Esqueci minha senha</Link>
            </div>

            <button type="submit" disabled>
              Entrar
            </button>
          </form>
        </div>

        <div className="login-footer">
          <div id="register-link">
            Não tem conta?
            <Link to="register">Cadastre-se</Link>
          </div>
          <span>
            É de graça
            <img src={heartIcon} alt="Coração Roxo" />
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
