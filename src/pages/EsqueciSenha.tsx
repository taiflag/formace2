import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import fundo from "../assets/fundo.png";
import logo from "../assets/logo.png";

type Props = {
  onSubmitEmail?: (email: string) => void;
};

export default function EsqueciSenha({ onSubmitEmail }: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Por favor, informe o e-mail para redefinir a sua senha.");
      return;
    }

    setEnviado(true);
    if (onSubmitEmail) {
      onSubmitEmail(email);
    }
  };

  const handleReenviar = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert("Informe o e-mail primeiro para reenviar as instruções.");
      return;
    }
    setEnviado(true);
    alert(`Instruções reenviadas para ${email}.`);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(${fundo})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        fontFamily: "Nunito, sans-serif",
        overflow: "hidden",
        boxSizing: "border-box",
      }}
    >
      {/* ───────── CARTÃO CENTRAL BRANCO ───────── */}
      <div
        style={{
          width: "100%",
          maxWidth: 620,
          minHeight: "100vh",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 48px",
          boxSizing: "border-box",
          boxShadow: "0 12px 36px rgba(4, 8, 20, 0.35)",
        }}
      >
        <div style={{ width: "100%", maxWidth: 420 }}>
          {/* Logotipo */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            <img
              src={logo}
              alt="Formace"
              style={{
                maxWidth: 210,
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>

          {/* Título e subtítulo */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h1
              style={{
                fontSize: 20,
                fontWeight: 700,
                color: "#1e293b",
                margin: "0 0 8px 0",
              }}
            >
              Esqueceu a senha?
            </h1>
            <p
              style={{
                fontSize: 12,
                color: "#64748b",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Informe o e-mail para o qual deseja redefinir a sua senha.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 22 }}>
              <label
                style={{
                  display: "block",
                  fontSize: 12,
                  color: "#64748b",
                  marginBottom: 8,
                  fontWeight: 600,
                }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="seuemail@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputShadowStyle}
              />
            </div>

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
              Cadastrar
            </button>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <a
                href="#reenviar"
                onClick={handleReenviar}
                style={{
                  fontSize: 12,
                  color: "#4f46e5",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Enviar novamente
              </a>

              <button
                type="button"
                onClick={() => navigate("/login")}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: 12,
                  color: "#64748b",
                  cursor: "pointer",
                  fontWeight: 600,
                  fontFamily: "Nunito, sans-serif",
                  padding: 0,
                }}
              >
                Voltar ao login
              </button>
            </div>
          </form>

          {enviado && (
            <div
              style={{
                marginTop: 18,
                background: "#e8effa",
                color: "#1d4ed8",
                padding: "10px 14px",
                borderRadius: 6,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Link de redefinição enviado para {email}.
            </div>
          )}
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