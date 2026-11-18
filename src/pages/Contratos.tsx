import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type ContratoItem = {
  id: string;
  imovel: string;
  vencimento: string;
};

type Props = {
  onNovoContrato?: () => void;
  onVerContrato?: (id: string) => void;
};

const CONTRATOS_INICIAIS: ContratoItem[] = [
  { id: "1", imovel: "R. Palmeiras, 45", vencimento: "03/2027" },
  { id: "2", imovel: "Av. Central, 902", vencimento: "11/2026" },
  { id: "3", imovel: "Rua do Sol, 12", vencimento: "06/2027" },
  { id: "4", imovel: "Alameda Verde, 220", vencimento: "01/2027" },
  { id: "5", imovel: "R. Palmeiras, 45", vencimento: "03/2027" },
];

export default function Contratos({ onNovoContrato, onVerContrato }: Props) {
  const navigate = useNavigate();
  const [busca, setBusca] = useState("");

  const contratosFiltrados = CONTRATOS_INICIAIS.filter((item) =>
    item.imovel.toLowerCase().includes(busca.toLowerCase())
  );

  const handleNovo = () => {
    if (onNovoContrato) {
      onNovoContrato();
    } else {
      navigate("/contratos/novo"); // Ajuste a rota conforme seu App.tsx
    }
  };

  const handleVer = (id: string) => {
    if (onVerContrato) {
      onVerContrato(id);
    } else {
      navigate(`/contratos/${id}`);
    }
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
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, margin: 0, color: "#111" }}>Contratos</h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Documentos digitalizados, sem arquivamento físico
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate("/contratos/:id")}
          style={{
            background: "#1d4ed8",
            border: "none",
            padding: "9px 18px",
            borderRadius: 6,
            fontSize: 13,
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "Nunito, sans-serif",
          }}
         >
          + Novo contrato PDF
        </button>
      </div>

      {/* ───────── CARD PRINCIPAL DE CONTRATOS ───────── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: 24,
        }}
      >
        {/* Barra de Busca */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #dcdce6",
            borderRadius: 20,
            padding: "6px 14px",
            width: 300,
            gap: 8,
            marginBottom: 20,
          }}
        >
          <span style={{ color: "#888", fontSize: 13 }}>☰</span>
          <input
            type="text"
            placeholder="Buscar contrato"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              fontSize: 12,
              flex: 1,
              fontFamily: "Nunito, sans-serif",
              background: "transparent",
            }}
          />
          <span style={{ color: "#888", fontSize: 13 }}>🔍</span>
        </div>

        {/* Tabela de Contratos */}
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            textAlign: "left",
          }}
        >
          <thead>
            <tr style={{ borderBottom: "1px solid #ececf4", color: "#555" }}>
              <th style={thStyle}>Imóvel</th>
              <th style={thStyle}>Vencimento</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contratosFiltrados.map((item) => (
              <tr
                key={item.id + "-" + Math.random()}
                style={{ borderBottom: "1px solid #f1f1f8", color: "#222" }}
              >
                <td style={tdStyle}>{item.imovel}</td>
                <td style={{ ...tdStyle, color: "#1d4ed8", fontWeight: 600 }}>
                  {item.vencimento}
                </td>
                <td style={{ ...tdStyle, textAlign: "right" }}>
                  <button
                    type="button"
                    onClick={() => handleVer(item.id)}
                    style={{
                      background: "#fff",
                      border: "1px solid #dcdce6",
                      borderRadius: 6,
                      padding: "6px 16px",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "#1d4ed8",
                      cursor: "pointer",
                      fontFamily: "Nunito, sans-serif",
                    }}
                  >
                    Ver contrato
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Rodapé da tabela */}
        <div style={{ fontSize: 11, color: "#777", marginTop: 16 }}>
          {contratosFiltrados.length} documentos exibidos • Consulte o imóvel e o vencimento antes de abrir.
        </div>
      </div>
    </div>
  );
}

/* ───────── Estilos Auxiliares ───────── */

const thStyle: React.CSSProperties = {
  padding: "10px 8px",
  fontWeight: 600,
  fontSize: 12,
};

const tdStyle: React.CSSProperties = {
  padding: "12px 8px",
  verticalAlign: "middle",
};