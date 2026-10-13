import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import fundo from "../assets/fundo.png";
import logo from "../assets/logo.png";
import { entrada, erroStyle, rotulo } from "./authEstilos";

/* ───────── campos compartilhados por Login e Cadastro ───────── */

export function Campo({
  nome,
  erro,
  children,
}: {
  nome: string;
  erro?: string;
  children: ReactNode;
}) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={rotulo}>{nome}</label>
      {children}
      {erro && <div style={erroStyle}>{erro}</div>}
    </div>
  );
}

function Olho({ aberto }: { aberto: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#8689de"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
      <circle cx="12" cy="12" r="3" />
      {!aberto && <line x1="3" y1="3" x2="21" y2="21" />}
    </svg>
  );
}

export function CampoSenha({
  nome,
  value,
  onChange,
  erro,
  autoComplete,
}: {
  nome: string;
  value: string;
  onChange: (v: string) => void;
  erro?: string;
  autoComplete: string;
}) {
  const [visivel, setVisivel] = useState(false);
  return (
    <Campo nome={nome} erro={erro}>
      <div style={{ position: "relative" }}>
        <input
          type={visivel ? "text" : "password"}
          aria-label={nome}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ ...entrada, paddingRight: 40 }}
        />
        <button
          type="button"
          onClick={() => setVisivel((v) => !v)}
          aria-label={visivel ? "Esconder senha" : "Mostrar senha"}
          style={{
            position: "absolute",
            right: 10,
            top: "50%",
            transform: "translateY(-50%)",
            border: "none",
            background: "none",
            cursor: "pointer",
            padding: 4,
            display: "flex",
          }}
        >
          <Olho aberto={visivel} />
        </button>
      </div>
    </Campo>
  );
}

/* ───────── redes sociais ───────── */

const SOCIAIS: { nome: string; cor: string; caminho: string }[] = [
  {
    nome: "Twitter",
    cor: "#c9cbf0",
    caminho:
      "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
  },
  {
    nome: "Facebook",
    cor: "#c9cbf0",
    caminho:
      "M14 8V6c0-.9.2-1.5 1.6-1.5H17V1.2C16.7 1.1 15.7 1 14.6 1 12.1 1 10.4 2.5 10.4 5.3V8H7.5v3.4h2.9V23H14V11.4h2.7L17.1 8z",
  },
  {
    nome: "Google",
    cor: "#8689de",
    caminho:
      "M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81z",
  },
];

/* ───────── moldura: painel azul + abas + redes sociais ───────── */

type Props = {
  aba: "login" | "cadastro" | null; // null esconde as abas (tela de esqueci a senha)
  semSociais?: boolean;
  children: ReactNode;
};

function AuthLayout({ aba, semSociais, children }: Props) {
  const [aviso, setAviso] = useState("");

  const tab = (qual: "login" | "cadastro", texto: string) => (
    <Link
      to={`/${qual}`}
      role="tab"
      aria-selected={aba === qual}
      style={{
        flex: 1,
        textAlign: "center",
        padding: "10px 0",
        fontSize: 13,
        color: "#1a1a2e",
        textDecoration: "none",
        borderBottom: `2px solid ${aba === qual ? "#c9cbf0" : "transparent"}`,
      }}
    >
      {texto}
    </Link>
  );

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "'Nunito', sans-serif",
        background: "#fafbff",
      }}
    >
      <div
        style={{
          flex: "0 0 48%",
          backgroundImage: `url(${fundo})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "#0e1a5c",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={logo} alt="Formace" style={{ width: "60%", maxWidth: 380 }} />
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 32,
        }}
      >
        <div style={{ width: "100%", maxWidth: 360 }}>
          {aba && (
            <nav
              role="tablist"
              style={{ display: "flex", maxWidth: 240, margin: "0 auto 40px" }}
            >
              {tab("login", "Login")}
              {tab("cadastro", "Cadastro")}
            </nav>
          )}

          {children}

          {!semSociais && (
            <>
              {aviso && (
                <div style={{ color: "#4a4cb0", fontSize: 11, marginTop: 14 }}>
                  {aviso}
                </div>
              )}
              <p
                style={{
                  textAlign: "center",
                  fontSize: 9,
                  color: "#aaa",
                  margin: "26px 0 10px",
                }}
              >
                Conecte-se com as redes sociais
              </p>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 36 }}
              >
                {SOCIAIS.map((s) => (
                  <button
                    key={s.nome}
                    type="button"
                    aria-label={`Entrar com ${s.nome}`}
                    onClick={() =>
                      setAviso(
                        `Entrar com ${s.nome} entra com a integração do back-end.`,
                      )
                    }
                    style={{
                      border: "none",
                      background: "none",
                      cursor: "pointer",
                      padding: 4,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill={s.cor}
                      aria-hidden="true"
                    >
                      <path d={s.caminho} />
                    </svg>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
