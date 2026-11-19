import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";
import logo from "../assets/logo.png";

type Props = {
  onLogin?: (email: string) => void;
};

export default function Login({ onLogin }: Props) {
  const navigate = useNavigate();
  const [aba, setAba] = useState<"entrar" | "cadastro">("entrar");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(email);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: "#0a1128",
        fontFamily: "Nunito, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* ───────── LADO ESQUERDO: BANNER E LOGO ───────── */}
      <div
        style={{
          flex: 1.25,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${fundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={logo}
          alt="Formace"
          style={{
            maxWidth: 270,
            width: "65%",
            height: "auto",
            zIndex: 2,
          }}
        />
      </div>

      {/* ───────── LADO DIREITO: FORMULÁRIO DE LOGIN ───────── */}
      <div
        style={{
          flex: 1,
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          {/* Abas Entrar / Cadastro */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 64,
              marginBottom: 42,
            }}
          >
            <button
              type="button"
              onClick={() => setAba("entrar")}
              style={{
                background: "none",
                border: "none",
                fontSize: 15,
                fontWeight: aba === "entrar" ? 700 : 500,
                color: aba === "entrar" ? "#4f46e5" : "#64748b",
                cursor: "pointer",
                padding: "0 18px 10px 18px",
                borderBottom:
                  aba === "entrar"
                    ? "2px solid #93c5fd"
                    : "2px solid transparent",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={() => {
                setAba("cadastro");
                navigate("/cadastro");
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: 15,
                fontWeight: aba === "cadastro" ? 700 : 500,
                color: aba === "cadastro" ? "#4f46e5" : "#64748b",
                cursor: "pointer",
                padding: "0 18px 10px 18px",
                borderBottom:
                  aba === "cadastro"
                    ? "2px solid #93c5fd"
                    : "2px solid transparent",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Cadastro
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Campo E-mail */}
            <div style={{ marginBottom: 20 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "#64748b",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                E-mail
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputShadowStyle}
              />
            </div>

            {/* Campo Senha */}
            <div style={{ marginBottom: 28 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "#64748b",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Senha
              </label>
              <div style={{ position: "relative" }}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="••••••"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  style={{ ...inputShadowStyle, paddingRight: 40 }}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  title="Mostrar/ocultar senha"
                  style={{
                    position: "absolute",
                    right: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#2e7d32",
                    display: "flex",
                    alignItems: "center",
                    padding: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Botão Entrar */}
            <button
              type="submit"
              style={{
                width: "100%",
                background: "#1d4ed8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "12px",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
                marginBottom: 14,
              }}
            >
              Entrar
            </button>

            <div style={{ textAlign: "left", marginBottom: 38 }}>
            <button
              type="button"
              onClick={() => navigate("/esqueci-senha")}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                fontSize: 11,
                color: "#4f46e5",
                cursor: "pointer",
                fontWeight: 600,
                fontFamily: "Nunito, sans-serif",
              }}
            >
            Esqueci a senha
            </button>
</div>
          </form>

          {/* Seção Redes Sociais */}
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: 11,
                color: "#64748b",
                marginBottom: 20,
                fontWeight: 600,
              }}
            >
              Conecte-se com as redes sociais
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 36,
              }}
            >
              {/* Ícone Twitter */}
              <button type="button" style={socialBtnStyle} title="Twitter">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#93c5fd">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </button>

              {/* Ícone Facebook */}
              <button type="button" style={socialBtnStyle} title="Facebook">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#93c5fd">
                  <path d="M15.12 5.32H17V2.14A26.11 26.11 0 0 0 14.26 2c-2.72 0-4.58 1.66-4.58 4.7v2.62H6.61v3.56h3.07V22h3.68v-9.12h3.06l.46-3.56h-3.52V7.05c0-1.05.29-1.73 1.76-1.73z" />
                </svg>
              </button>

              {/* Ícone Google */}
              <button type="button" style={socialBtnStyle} title="Google">
                <svg width="21" height="21" viewBox="0 0 24 24" fill="#93c5fd">
                  <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Estilos Auxiliares ───────── */

const inputShadowStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  borderRadius: 6,
  border: "1px solid #f1f5f9",
  boxShadow: "0 2px 8px rgba(15, 23, 42, 0.06)",
  fontSize: 13,
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "Nunito, sans-serif",
  color: "#333",
  background: "#fff",
};

const socialBtnStyle: React.CSSProperties = {
  background: "none",
  border: "none",
  padding: 4,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};