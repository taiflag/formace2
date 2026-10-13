import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AuthLayout, { Campo, CampoSenha } from "../components/AuthLayout";
import { botaoPrincipal, entrada, linkStyle } from "../components/authEstilos";
import { cadastrarConta } from "../store/contasStore";

const EMAIL_OK = /^\S+@\S+\.\S+$/;

type Erros = { email?: string; senha?: string; confirmar?: string };

function Cadastro() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erros, setErros] = useState<Erros>({});

  const cadastrar = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    const e: Erros = {};
    if (!email.trim()) e.email = "Informe o e-mail.";
    else if (!EMAIL_OK.test(email.trim())) e.email = "Confira o e-mail.";
    if (!senha) e.senha = "Informe a senha.";
    else if (senha.length < 6) e.senha = "Use pelo menos 6 caracteres.";
    if (!confirmar) e.confirmar = "Confirme a senha.";
    else if (confirmar !== senha) e.confirmar = "As senhas não são iguais.";
    setErros(e);
    if (Object.keys(e).length > 0) return;

    // Semana 4: trocar por POST com Axios e tratar a resposta (e-mail já usado, etc.).
    if (!(await cadastrarConta(email, senha))) {
      setErros({ email: "Esse e-mail já está cadastrado." });
      return;
    }
    navigate("/login", {
      state: { aviso: "Cadastro feito. Entre com o seu e-mail e senha." },
    });
  };

  return (
    <AuthLayout aba="cadastro">
      <form onSubmit={cadastrar} noValidate>
        <Campo nome="Email" erro={erros.email}>
          <input
            type="email"
            aria-label="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={entrada}
          />
        </Campo>

        <CampoSenha
          nome="Senha"
          value={senha}
          onChange={setSenha}
          erro={erros.senha}
          autoComplete="new-password"
        />
        <CampoSenha
          nome="Confirmar senha"
          value={confirmar}
          onChange={setConfirmar}
          erro={erros.confirmar}
          autoComplete="new-password"
        />

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          <Button type="submit" style={botaoPrincipal}>
            Cadastrar
          </Button>
        </div>

        <div style={{ marginTop: 14, fontSize: 10, color: "#8689de" }}>
          Já tem uma conta?{" "}
          <Link to="/login" style={linkStyle}>
            Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Cadastro;
