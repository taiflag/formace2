import React, { useState } from "react";

type CobrancaItem = {
  id: string;
  inquilino: string;
  imovel: string;
  vencimento: string;
  atraso: string;
  valor: string;
  status: "Não cobrado" | "Lembrete enviado";
};

type LancamentoItem = {
  id: string;
  imovel: string;
  locatario: string;
  tipo: "Aluguel" | "Gasto";
  valor: string;
};

const COBRANCAS_INICIAIS: CobrancaItem[] = [
  {
    id: "1",
    inquilino: "Ana Costa",
    imovel: "Rua das Acácias, 18",
    vencimento: "10/08",
    atraso: "10 dias em atraso",
    valor: "R$ 1.200",
    status: "Não cobrado",
  },
  {
    id: "2",
    inquilino: "Bruno Lima",
    imovel: "Av. Brasil, 240",
    vencimento: "12/08",
    atraso: "8 dias em atraso",
    valor: "R$ 1.500",
    status: "Lembrete enviado",
  },
  {
    id: "3",
    inquilino: "Lucia Santos",
    imovel: "Rua dos Ipês, 62",
    vencimento: "15/08",
    atraso: "5 dias em atraso",
    valor: "R$ 1.200",
    status: "Não cobrado",
  },
];

const LANCAMENTOS_INICIAIS: LancamentoItem[] = [
  {
    id: "1",
    imovel: "Rua das Palmeiras, 45",
    locatario: "M. Andrade",
    tipo: "Aluguel",
    valor: "R$ 1.200",
  },
  {
    id: "2",
    imovel: "Av. Central, 902",
    locatario: "Padaria Bom Pão",
    tipo: "Aluguel",
    valor: "R$ 2.800",
  },
  {
    id: "3",
    imovel: "Residencial — manutenção",
    locatario: "—",
    tipo: "Gasto",
    valor: "R$ 640",
  },
  {
    id: "4",
    imovel: "Rua do Sol, 12",
    locatario: "C. Menezes",
    tipo: "Aluguel",
    valor: "R$ 950",
  },
];

export default function Dashboard() {
  const [cobrancas, setCobrancas] =
    useState<CobrancaItem[]>(COBRANCAS_INICIAIS);

  const handleRegistrarCobranca = (id: string) => {
    setCobrancas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "Lembrete enviado" } : item,
      ),
    );
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
          <h1 style={{ fontSize: 22, margin: 0, color: "#111" }}>
            Visão geral
          </h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Visão gerencial da fundação • agosto de 2026 • dados ilustrativos
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

      {/* ───────── LINHA 1: 4 CARDS DE MÉTRICAS (KPIs) ───────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 20,
        }}
      >
        <KpiCard
          titulo="Imóveis alugados"
          valor="108/124"
          rodape="16 vagos • 87% de ocupação"
          corValor="#111"
        />
        <KpiCard
          titulo="Receita de aluguel (mês)"
          valor="R$ 67.200"
          rodape="+4% vs. mês anterior"
          corValor="#1d4ed8"
          corRodape="#1d4ed8"
        />
        <KpiCard
          titulo="Contratos a vencer (30 dias)"
          valor="7"
          rodape="3 vencem nesta semana"
          corValor="#1d4ed8"
        />
        <KpiCard
          titulo="Inquilinos inadimplentes"
          valor="3"
          rodape="R$ 3.900 em aberto"
          corValor="#1d4ed8"
          corRodape="#1d4ed8"
          destaque
        />
      </div>

      {/* ───────── LINHA 2: PAGAMENTOS DOS ALUGUÉIS & COBRANÇAS PENDENTES ───────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.65fr",
          gap: 16,
          marginBottom: 20,
        }}
      >
        {/* Card Esquerdo: Pagamentos dos aluguéis */}
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
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>
              Pagamentos dos aluguéis
            </div>
            <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>
              Agosto/2026 • exemplo em 20/08
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: 18,
              }}
            >
              <BarraProgresso
                label="Pagos"
                quantidade={95}
                porcentagem="≈ 88%"
                largura={88}
                cor="#1d4ed8"
              />
              <BarraProgresso
                label="A vencer"
                quantidade={10}
                porcentagem="≈ 9%"
                largura={9}
                cor="#7fa3d1"
              />
              <BarraProgresso
                label="Em atraso"
                quantidade={3}
                porcentagem="≈ 3%"
                largura={3}
                cor="#1e3a8a"
              />
            </div>
          </div>

          <div
            style={{
              fontSize: 11,
              color: "#666",
              marginTop: 20,
              paddingTop: 12,
              borderTop: "1px solid #f1f1f8",
            }}
          >
            108 aluguéis • 13 ainda não pagos
          </div>
        </div>

        {/* Card Direito: Cobranças pendentes */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5ef",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: 14,
            }}
          >
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>
                Cobranças pendentes
              </div>
              <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>
                3 inquilinos em atraso • R$ 3.900 a receber
              </div>
            </div>
            <span
              style={{
                background: "#eef2f9",
                color: "#64748b",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 6,
              }}
            >
              Dados ilustrativos
            </span>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              textAlign: "left",
            }}
          >
            <thead>
              <tr
                style={{
                  background: "#f1f5fb",
                  color: "#555",
                  borderRadius: 6,
                }}
              >
                <th style={{ ...thStyle, borderTopLeftRadius: 6 }}>
                  Inquilino / imóvel
                </th>
                <th style={thStyle}>Vencimento</th>
                <th style={thStyle}>Valor</th>
                <th style={thStyle}>Acompanhamento</th>
                <th style={{ ...thStyle, borderTopRightRadius: 6 }}>Ação</th>
              </tr>
            </thead>
            <tbody>
              {cobrancas.map((c) => (
                <tr
                  key={c.id}
                  style={{ borderBottom: "1px solid #f1f1f8", color: "#222" }}
                >
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 700, color: "#111" }}>
                      {c.inquilino}
                    </div>
                    <div style={{ fontSize: 11, color: "#777" }}>
                      {c.imovel}
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 600, color: "#1d4ed8" }}>
                      {c.vencimento}
                    </div>
                    <div style={{ fontSize: 11, color: "#1d4ed8" }}>
                      {c.atraso}
                    </div>
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      fontWeight: 700,
                      color: "#111",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {c.valor}
                  </td>
                  <td style={tdStyle}>
                    <span
                      style={{
                        display: "inline-block",
                        background:
                          c.status === "Não cobrado" ? "#e8effa" : "#eef2f7",
                        color:
                          c.status === "Não cobrado" ? "#1d4ed8" : "#475569",
                        padding: "4px 10px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                      }}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td style={tdStyle}>
                    {c.status === "Não cobrado" ? (
                      <button
                        type="button"
                        onClick={() => handleRegistrarCobranca(c.id)}
                        style={{
                          background: "#1d4ed8",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "6px 12px",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                          width: "100%",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Registrar cobrança
                      </button>
                    ) : (
                      <button
                        type="button"
                        style={{
                          background: "#fff",
                          color: "#1d4ed8",
                          border: "1px solid #dcdce6",
                          borderRadius: 6,
                          padding: "6px 12px",
                          fontSize: 11,
                          fontWeight: 600,
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        Acompanhar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ───────── LINHA 3: ÚLTIMOS LANÇAMENTOS FINANCEIROS & ALERTAS ───────── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.65fr 1fr",
          gap: 16,
        }}
      >
        {/* Card Esquerdo: Últimos lançamentos financeiros */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5ef",
            borderRadius: 12,
            padding: 20,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>
              Últimos lançamentos financeiros
            </div>
            <span
              style={{
                border: "1px solid #dcdce6",
                color: "#555",
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 14px",
                borderRadius: 6,
              }}
            >
              Último mês
            </span>
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: 12,
              textAlign: "left",
            }}
          >
            <thead>
              <tr style={{ background: "#f1f5fb", color: "#555" }}>
                <th style={{ ...thStyle, borderTopLeftRadius: 6 }}>Imóvel:</th>
                <th style={thStyle}>Locatário</th>
                <th style={{ ...thStyle, textAlign: "center" }}>Tipo</th>
                <th
                  style={{
                    ...thStyle,
                    textAlign: "right",
                    borderTopRightRadius: 6,
                  }}
                >
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {LANCAMENTOS_INICIAIS.map((l) => (
                <tr
                  key={l.id}
                  style={{ borderBottom: "1px solid #f1f1f8", color: "#222" }}
                >
                  <td style={tdStyle}>{l.imovel}</td>
                  <td style={tdStyle}>{l.locatario}</td>
                  <td style={{ ...tdStyle, textAlign: "center" }}>
                    <span
                      style={{
                        display: "inline-block",
                        background:
                          l.tipo === "Aluguel" ? "#e8effa" : "#f1f5f9",
                        color: l.tipo === "Aluguel" ? "#1d4ed8" : "#475569",
                        padding: "3px 16px",
                        borderRadius: 6,
                        fontSize: 11,
                        fontWeight: 600,
                        minWidth: 52,
                      }}
                    >
                      {l.tipo}
                    </span>
                  </td>
                  <td
                    style={{
                      ...tdStyle,
                      textAlign: "right",
                      fontWeight: 700,
                      color: l.tipo === "Aluguel" ? "#111" : "#1d4ed8",
                    }}
                  >
                    {l.valor}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card Direito: Alertas */}
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e5ef",
            borderRadius: 12,
            padding: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <div style={{ fontWeight: 700, fontSize: 14, color: "#111" }}>
            Alertas
          </div>

          <div
            style={{
              background: "#e8effa",
              borderRadius: 8,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 11, color: "#1d4ed8", marginBottom: 4 }}>
              Contratos • prazo nesta semana
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#111",
                marginBottom: 4,
              }}
            >
              3 contratos vencem nesta semana
            </div>
            <div style={{ fontSize: 11, color: "#1d4ed8" }}>
              Revisar os vencimentos.
            </div>
          </div>

          <div
            style={{
              background: "#e8effa",
              borderRadius: 8,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 11, color: "#1d4ed8", marginBottom: 4 }}>
              Residencial • pendência operacional
            </div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                color: "#111",
                marginBottom: 4,
              }}
            >
              Estoque do residencial:
              <br />
              DML abaixo do mínimo
            </div>
            <div style={{ fontSize: 11, color: "#1d4ed8" }}>
              Conferir reposição de DML.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Componentes Auxiliares ───────── */

function KpiCard({
  titulo,
  valor,
  rodape,
  corValor,
  corRodape = "#666",
  destaque,
}: {
  titulo: string;
  valor: string;
  rodape: string;
  corValor: string;
  corRodape?: string;
  destaque?: boolean;
}) {
  return (
    <div
      style={{
        background: destaque ? "#e8effa" : "#fff",
        border: destaque ? "1px solid #d2e1f8" : "1px solid #e5e5ef",
        borderRadius: 12,
        padding: "18px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ fontSize: 12, color: "#555", fontWeight: 600 }}>
        {titulo}
      </div>
      <div
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: corValor,
          margin: "8px 0",
        }}
      >
        {valor}
      </div>
      <div style={{ fontSize: 11, color: corRodape }}>{rodape}</div>
    </div>
  );
}

function BarraProgresso({
  label,
  quantidade,
  porcentagem,
  largura,
  cor,
}: {
  label: string;
  quantidade: number;
  porcentagem: string;
  largura: number;
  cor: string;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 6,
        }}
      >
        <span style={{ fontSize: 12, color: "#333" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: "#1d4ed8" }}>
            {quantidade}
          </span>
          <span style={{ fontSize: 11, color: "#777", minWidth: 36 }}>
            {porcentagem}
          </span>
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 7,
          background: "#eef2f9",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${largura}%`,
            height: "100%",
            background: cor,
            borderRadius: 99,
          }}
        />
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "8px 10px",
  fontWeight: 600,
  fontSize: 11,
};

const tdStyle: React.CSSProperties = {
  padding: "10px",
  verticalAlign: "middle",
};