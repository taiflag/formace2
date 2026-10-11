import { useState } from "react";
import Button from "../components/Button";

function Relatorio() {
  const [periodo, setPeriodo] = useState("2026");
  const [formato, setFormato] = useState("PDF");

  function gerarRelatorio() {
    console.log("Gerar relatório:", {
      periodo,
      formato,
    });

    // Futuramente, integrar com o back-end
  }

  return (
    <main
      style={{
        padding: "20px 18px",
        fontFamily: "'Nunito', sans-serif",
        minHeight: "100%",
        background: "#fff",
      }}
    >
      {/* Cabeçalho */}
      <div style={{ marginBottom: 20 }}>
        <h1
          style={{
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 2,
            color: "#1a1a2e",
          }}
        >
          Relatórios / Ministério Público
        </h1>

        <p style={{ color: "#777", fontSize: 11, margin: 0 }}>
          Exportação para prestação de contas anual
        </p>
      </div>

      {/* Card do relatório */}
      <section
        style={{
          width: "100%",
          maxWidth: 820,
          padding: "12px",
          background: "#fff",
          border: "1px solid #ecebf7",
          borderRadius: 12,
          boxShadow: "0 2px 4px rgba(108, 92, 231, 0.15)",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#333",
            margin: "0 0 14px",
          }}
        >
          Gerar relatório consolidado
        </h2>

        {/* Campos */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 32,
            marginBottom: 16,
          }}
        >
          {/* Período */}
          <div>
            <label
              htmlFor="periodo"
              style={{
                display: "block",
                fontSize: 10,
                color: "#777",
                marginBottom: 5,
              }}
            >
              Período
            </label>

            <input
              id="periodo"
              type="number"
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              placeholder="Ano de 2026"
              style={{
                width: "100%",
                height: 24,
                padding: "0 8px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 6,
                fontFamily: "'Nunito', sans-serif",
                fontSize: 10,
                color: "#555",
                outline: "none",
              }}
            />
          </div>

          {/* Formato */}
          <div>
            <label
              htmlFor="formato"
              style={{
                display: "block",
                fontSize: 10,
                color: "#777",
                marginBottom: 5,
              }}
            >
              Formato
            </label>

            <select
              id="formato"
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
              style={{
                width: "100%",
                height: 24,
                padding: "0 8px",
                boxSizing: "border-box",
                border: "1px solid #ccc",
                borderRadius: 6,
                background: "#fff",
                fontFamily: "'Nunito', sans-serif",
                fontSize: 10,
                color: "#555",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="PDF">PDF</option>
              <option value="XLSX">Excel (.xlsx)</option>
            </select>
          </div>
        </div>

        {/* Botão */}
        <Button variant="primary" onClick={gerarRelatorio}>
          Gerar relatório
        </Button>
      </section>
    </main>
  );
}

export default Relatorio;
