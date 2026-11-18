import React, { useState } from "react";

export default function Relatorio() {
  const [periodo, setPeriodo] = useState("Ano de 2026");
  const [formato, setFormato] = useState("PDF");
  const [gerando, setGerando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const handleGerarRelatorio = (e: React.FormEvent) => {
    e.preventDefault();
    setGerando(true);
    setSucesso(false);

    // Simula a geração do relatório / exportação
    setTimeout(() => {
      setGerando(false);
      setSucesso(true);
      setTimeout(() => setSucesso(false), 4000); // Oculta a mensagem após 4 segundos
    }, 1200);
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#f8f9fc",
        padding: "24px 36px",
        fontFamily: "Nunito, sans-serif",
        color: "#1a1a2e",
        boxSizing: "border-box",
      }}
    >
      {/* ───────── CABEÇALHO SUPERIOR ───────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, margin: 0, color: "#111" }}>
            Relatórios / Ministério Público de Sergipe
          </h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Prestação de contas anual ao MP-SE • exportação dos registros financeiros
          </div>
        </div>

        {/* Badge Perfil Gestor */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#eef2f9",
            padding: "6px 14px 6px 8px",
            borderRadius: 20,
            border: "1px solid #dce3f0",
          }}
        >
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #60a5fa, #1d4ed8)",
            }}
          />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>
            Gestor
          </span>
        </div>
      </div>

      {/* ───────── CARD: GERAR RELATÓRIO CONSOLIDADO ───────── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: 24,
          maxWidth: "100%",
        }}
      >
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111",
            marginBottom: 18,
          }}
        >
          Gerar relatório consolidado
        </div>

        <form onSubmit={handleGerarRelatorio}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 20,
              marginBottom: 16,
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#475569",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Período do relatório *
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                style={inputStyle}
              >
                <option value="Ano de 2026">Ano de 2026</option>
                <option value="Ano de 2025">Ano de 2025</option>
                <option value="1º Semestre de 2026">1º Semestre de 2026</option>
                <option value="2º Semestre de 2026">2º Semestre de 2026</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: 11,
                  color: "#475569",
                  marginBottom: 6,
                  fontWeight: 600,
                }}
              >
                Formato de exportação
              </label>
              <select
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                style={inputStyle}
              >
                <option value="PDF">PDF</option>
                <option value="Excel (XLSX)">Excel (XLSX)</option>
                <option value="CSV">CSV</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 24,
              paddingTop: 16,
              borderTop: "1px solid #f1f1f8",
            }}
          >
            <span style={{ fontSize: 11, color: "#777" }}>
              Confira o período e os lançamentos financeiros antes de gerar o relatório para conferência.
            </span>

            <button
              type="submit"
              disabled={gerando}
              style={{
                background: "#1d4ed8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "9px 22px",
                fontSize: 12,
                fontWeight: 600,
                cursor: gerando ? "not-allowed" : "pointer",
                opacity: gerando ? 0.7 : 1,
                fontFamily: "Nunito, sans-serif",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {gerando ? "Gerando relatório..." : "Gerar relatório"}
            </button>
          </div>
        </form>

        {sucesso && (
          <div
            style={{
              marginTop: 14,
              background: "#e6f4ea",
              color: "#1e7e34",
              padding: "10px 14px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: "1px solid #ceead6",
            }}
          >
            Relatório do {periodo} exportado com sucesso em formato {formato}!
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────── Estilos Auxiliares ───────── */

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 6,
  border: "1px solid #dcdce6",
  fontSize: 12,
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "Nunito, sans-serif",
  color: "#333",
  background: "#fff",
  height: 38,
  cursor: "pointer",
};