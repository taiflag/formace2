import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import AuthLayout, { Campo, CampoSenha } from "../components/AuthLayout";
import {
  botaoPrincipal,
  entrada,
  erroStyle,
  linkStyle,
} from "../components/authEstilos";
import { entrarNaConta } from "../store/contasStore";

const EMAIL_OK = /^\S+@\S+\.\S+$/;

type Erros = { email?: string; senha?: string; geral?: string };

function Login() {
  const navigate = useNavigate();
  // o Cadastro manda o aviso "Cadastro feito" por aqui
  const avisoInicial =
    (useLocation().state as { aviso?: string } | null)?.aviso ?? "";

  const [esqueci, setEsqueci] = useState(false);
  const [linkEnviado, setLinkEnviado] = useState(false);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erros, setErros] = useState<Erros>({});
  const [aviso, setAviso] = useState(avisoInicial);

  const abrirEsqueci = (valor: boolean) => {
    setEsqueci(valor);
    setLinkEnviado(false);
    setErros({});
    setAviso("");
    setSenha("");
  };

  const validarEmail = (e: Erros) => {
    if (!email.trim()) e.email = "Informe o e-mail.";
    else if (!EMAIL_OK.test(email.trim())) e.email = "Confira o e-mail.";
  };

  const entrar = async (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    const e: Erros = {};
    validarEmail(e);
    if (!senha) e.senha = "Informe a senha.";
    setErros(e);
    setAviso("");
    if (Object.keys(e).length > 0) return;

    // Semana 4: trocar por POST com Axios, guardar o token e só então navegar.
    if (!(await entrarNaConta(email, senha))) {
      setErros({ geral: "E-mail ou senha incorretos." });
      return;
    }
    navigate("/dashboard");
  };

  const pedirLink = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    const e: Erros = {};
    validarEmail(e);
    setErros(e);
    if (Object.keys(e).length > 0) return;
    // Semana 4: trocar por POST com Axios que manda o link de redefinição para o e-mail.
    setLinkEnviado(true);
  };

  const campoEmail = (
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
  );

  /* ---------- esqueci a senha ---------- */
  if (esqueci) {
    return (
      <AuthLayout aba={null} semSociais>
        <div style={{ textAlign: "center", margin: "0 auto 32px" }}>
          <h1
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#1a1a2e",
              margin: 0,
            }}
          >
            Esqueci a senha
          </h1>
          <p style={{ fontSize: 11, color: "#777", margin: "6px 0 0" }}>
            Informe o e-mail da sua conta e enviaremos um link para criar uma
            nova senha.
          </p>
        </div>

        {linkEnviado ? (
          <>
            <div
              role="status"
              style={{
                background: "#f1f2fc",
                borderRadius: 8,
                padding: 16,
                fontSize: 12,
                color: "#333",
                lineHeight: 1.5,
              }}
            >
              Se existir uma conta com <b>{email.trim()}</b>, o link já está a
              caminho. Confira a caixa de entrada e o spam.
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 22,
              }}
            >
              <Button
                type="button"
                onClick={() => abrirEsqueci(false)}
                style={botaoPrincipal}
              >
                Voltar ao login
              </Button>
            </div>
          </>
        ) : (
          <form onSubmit={pedirLink} noValidate>
            {campoEmail}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 8,
              }}
            >
              <Button type="submit" style={botaoPrincipal}>
                Enviar link
              </Button>
            </div>
            <div style={{ marginTop: 14, fontSize: 10 }}>
              <button
                type="button"
                onClick={() => abrirEsqueci(false)}
                style={linkStyle}
              >
                Voltar ao login
              </button>
            </div>
          </form>
        )}
      </AuthLayout>
    );
  }

  /* ---------- login ---------- */
  return (
    <AuthLayout aba="login">
      <form onSubmit={entrar} noValidate>
        {campoEmail}
        <CampoSenha
          nome="Senha"
          value={senha}
          onChange={setSenha}
          erro={erros.senha}
          autoComplete="current-password"
        />

        {erros.geral && (
          <div style={{ ...erroStyle, marginBottom: 10 }}>{erros.geral}</div>
        )}
        {aviso && (
          <div style={{ color: "#4a4cb0", fontSize: 11, marginBottom: 10 }}>
            {aviso}
          </div>
        )}

        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 8 }}
        >
          <Button type="submit" style={botaoPrincipal}>
            Login
          </Button>
        </div>

        <div style={{ marginTop: 14, fontSize: 10 }}>
          <button
            type="button"
            onClick={() => abrirEsqueci(true)}
            style={linkStyle}
          >
            Esqueci a senha
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default Login;
