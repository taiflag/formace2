import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type ImovelItem = {
  id: string;
  imovel: string;
  locatario: string;
  contrato: string;
  status: "Alugado" | "Vence em breve" | "Vago";
};

type Props = {
  onNovoLocatario?: () => void;
  onNovoImovel?: () => void;
  onGerarContrato?: (imovel?: string) => void;
  onVerContrato?: (item: ImovelItem) => void;
};

const DADOS_INICIAIS: ImovelItem[] = [
  {
    id: "1",
    imovel: "Rua das Palmeiras, 45",
    locatario: "M. Andrade",
    contrato: "até 03/2027",
    status: "Alugado",
  },
  {
    id: "2",
    imovel: "Av. Central, 902",
    locatario: "Padaria Bom Pão",
    contrato: "até 11/2026",
    status: "Vence em breve",
  },
  {
    id: "3",
    imovel: "Rua do Sol, 12",
    locatario: "Carlos Menezes",
    contrato: "até 06/2027",
    status: "Alugado",
  },
  {
    id: "4",
    imovel: "Travessa Nova, 8",
    locatario: "—",
    contrato: "—",
    status: "Vago",
  },
];

export default function ImoveisLocatarios({
  onNovoLocatario,
  onNovoImovel,
  onGerarContrato,
  onVerContrato,
}: Props) {
  const navigate = useNavigate();
  const [abaAtiva, setAbaAtiva] = useState<"imoveis" | "locatarios">("imoveis");
  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("Todos os status");

  const registrosFiltrados = DADOS_INICIAIS.filter((item) => {
    const bateBusca =
      item.imovel.toLowerCase().includes(busca.toLowerCase()) ||
      item.locatario.toLowerCase().includes(busca.toLowerCase());
    const bateStatus =
      filtroStatus === "Todos os status" || item.status === filtroStatus;
    return bateBusca && bateStatus;
  });

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
      {/* Cabeçalho */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 18,
        }}
      >
        <div>
          <h1 style={{ fontSize: 22, margin: 0, color: "#111" }}>
            Imóveis e locatários
          </h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            124 imóveis cadastrados
          </div>
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={() => navigate("/locatarios/novo")}
            style={{
              background: "#fff",
              border: "1px solid #dcdce6",
              padding: "8px 16px",
              borderRadius: 6,
              fontSize: 13,
              color: "#1d4ed8",
              fontWeight: 600,
              cursor: "pointer",
            }}
            > 
            + Novo locatário
            </button>
          <button
            type="button"
            onClick={() => navigate("/imoveis/novo")}
            style={{
               background: "#1d4ed8",
                border: "none",
                padding: "8px 16px",
                borderRadius: 6,
                fontSize: 13,
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
            }}
          >
              + Novo imóvel
          </button>
        </div>
      </div>

      {/* Barra de Abas e Ação Rápida */}
      <div
        style={{
          background: "#eef2f9",
          borderRadius: 10,
          padding: "8px 12px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            type="button"
            onClick={() => setAbaAtiva("imoveis")}
            style={{
              background: abaAtiva === "imoveis" ? "#1d4ed8" : "#fff",
              color: abaAtiva === "imoveis" ? "#fff" : "#333",
              border: abaAtiva === "imoveis" ? "none" : "1px solid #dcdce6",
              padding: "7px 20px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Imóveis
          </button>
          <button
            type="button"
            onClick={() => setAbaAtiva("locatarios")}
            style={{
              background: abaAtiva === "locatarios" ? "#1d4ed8" : "#fff",
              color: abaAtiva === "locatarios" ? "#fff" : "#333",
              border: abaAtiva === "locatarios" ? "none" : "1px solid #dcdce6",
              padding: "7px 20px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Locatários
          </button>
          <span style={{ fontSize: 12, color: "#666", marginLeft: 8 }}>
            Cadastros separados, informações conectadas
          </span>
        </div>

        <button
          type="button"
          onClick={() => onGerarContrato?.()}
          style={{
            background: "#fff",
            border: "1px solid #dcdce6",
            padding: "7px 24px",
            borderRadius: 6,
            fontSize: 12,
            fontWeight: 600,
            color: "#333",
            cursor: "pointer",
          }}
        >
          Gerar contrato
        </button>
      </div>

      {/* Card da Tabela de Registros */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: 20,
          marginBottom: 24,
        }}
      >
        {/* Barra de Busca e Filtro */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              border: "1px solid #dcdce6",
              borderRadius: 20,
              padding: "6px 14px",
              width: 260,
              gap: 8,
            }}
          >
            <span style={{ color: "#888", fontSize: 13 }}>☰</span>
            <input
              type="text"
              placeholder="Buscar imóvel"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                fontSize: 12,
                flex: 1,
                fontFamily: "Nunito, sans-serif",
              }}
            />
            <span style={{ color: "#888", fontSize: 13 }}>🔍</span>
          </div>

          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            style={{
              padding: "7px 14px",
              borderRadius: 6,
              border: "1px solid #dcdce6",
              fontSize: 12,
              color: "#333",
              background: "#fff",
              fontFamily: "Nunito, sans-serif",
              cursor: "pointer",
            }}
          >
            <option value="Todos os status">Todos os status</option>
            <option value="Alugado">Alugado</option>
            <option value="Vence em breve">Vence em breve</option>
            <option value="Vago">Vago</option>
          </select>
        </div>

        {/* Tabela */}
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
              <th style={thStyle}>Locatário</th>
              <th style={thStyle}>Contrato</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {registrosFiltrados.map((item) => (
              <tr
                key={item.id}
                style={{ borderBottom: "1px solid #f1f1f8", color: "#222" }}
              >
                <td style={tdStyle}>{item.imovel}</td>
                <td style={tdStyle}>{item.locatario}</td>
                <td style={tdStyle}>{item.contrato}</td>
                <td style={tdStyle}>
                  <StatusBadge status={item.status} />
                </td>
                <td style={tdStyle}>
                  {item.status === "Vago" ? (
                    <button
                      type="button"
                      onClick={onNovoLocatario}
                      style={btnAcaoStyle}
                    >
                      Cadastrar locatário
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onVerContrato?.(item)}
                      style={btnAcaoStyle}
                    >
                      Ver contrato
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ fontSize: 11, color: "#777", marginTop: 14 }}>
          {registrosFiltrados.length} registros exibidos • 124 imóveis
          cadastrados
        </div>
      </div>

      {/* Seção Inferior: Cadastros e contratos */}
      <div>
        <h2
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: 14,
          }}
        >
          Cadastros e contratos
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          <CardAtalho
            numero="01"
            titulo="Locatários"
            descricao="Dados pessoais, contato e documentos para identificar e formalizar a locação."
            textoBotao="Cadastrar locatário"
            onClick={onNovoLocatario}
          />
          <CardAtalho
            numero="02"
            titulo="Imóveis"
            descricao="Endereço, características e valores de cada imóvel disponível para locação."
            textoBotao="Cadastrar imóvel"
            onClick={onNovoImovel}
          />
          <CardAtalho
            numero="03"
            titulo="Contratos"
            descricao="Vincule cliente e imóvel para preencher automaticamente os dados da locação."
            textoBotao="Gerar contrato"
            destaque
            onClick={() => onGerarContrato?.()}
          />
        </div>
      </div>
    </div>
  );
}

/* ───────── Componentes Auxiliares ───────── */

function StatusBadge({ status }: { status: ImovelItem["status"] }) {
  const estilos: Record<
    ImovelItem["status"],
    { bg: string; color: string }
  > = {
    Alugado: { bg: "#e6effb", color: "#1d4ed8" },
    "Vence em breve": { bg: "#e8f0fe", color: "#2563eb" },
    Vago: { bg: "#eceef2", color: "#555" },
  };

  return (
    <span
      style={{
        display: "inline-block",
        background: estilos[status].bg,
        color: estilos[status].color,
        padding: "4px 12px",
        borderRadius: 6,
        fontSize: 12,
        fontWeight: 600,
        minWidth: 110,
      }}
    >
      {status}
    </span>
  );
}

function CardAtalho({
  numero,
  titulo,
  descricao,
  textoBotao,
  destaque,
  onClick,
}: {
  numero: string;
  titulo: string;
  descricao: string;
  textoBotao: string;
  destaque?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e5ef",
        borderRadius: 12,
        padding: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#1d4ed8",
            marginBottom: 4,
          }}
        >
          {numero}
        </div>
        <div
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#111",
            marginBottom: 6,
          }}
        >
          {titulo}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "#666",
            lineHeight: 1.45,
            marginBottom: 18,
          }}
        >
          {descricao}
        </div>
      </div>

      <button
        type="button"
        onClick={onClick}
        style={{
          width: "100%",
          padding: "9px 14px",
          borderRadius: 6,
          fontSize: 12,
          fontWeight: 600,
          cursor: "pointer",
          background: destaque ? "#1d4ed8" : "#fff",
          color: destaque ? "#fff" : "#1d4ed8",
          border: destaque ? "none" : "1px solid #dcdce6",
        }}
      >
        {textoBotao}
      </button>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "10px 8px",
  fontWeight: 600,
  fontSize: 12,
};

const tdStyle: React.CSSProperties = {
  padding: "11px 8px",
  verticalAlign: "middle",
};

const btnAcaoStyle: React.CSSProperties = {
  background: "#fff",
  border: "1px solid #dcdce6",
  borderRadius: 6,
  padding: "5px 14px",
  fontSize: 12,
  fontWeight: 600,
  color: "#1d4ed8",
  cursor: "pointer",
  minWidth: 145,
};