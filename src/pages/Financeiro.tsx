import React, { useState } from "react";

type RecebimentoItem = {
  id: string;
  data: string;
  recibo: string;
  locatario: string;
  imovel: string;
  status: "Pago" | "Pendente";
  formaPagamento: string;
  valor: string;
};

const ABAS = [
  "Recebimentos",
  "Caixa",
  "Banco",
  "RDD",
  "Gastos e despesas",
  "Cobranças",
  "Fechamento mensal",
];

const RECEBIMENTOS_INICIAIS: RecebimentoItem[] = [
  {
    id: "1",
    data: "26/08",
    recibo: "903458",
    locatario: "Julia Flores",
    imovel: "Rua das Palmeiras, 45",
    status: "Pago",
    formaPagamento: "Pix",
    valor: "R$ 1.200,00",
  },
  {
    id: "2",
    data: "24/08",
    recibo: "043281",
    locatario: "Djavan da Silva",
    imovel: "Av. Jujinho, 909",
    status: "Pago",
    formaPagamento: "Dinheiro",
    valor: "R$ 640,00",
  },
  {
    id: "3",
    data: "22/08",
    recibo: "095265",
    locatario: "Anna Sales",
    imovel: "Av. Central, 902",
    status: "Pago",
    formaPagamento: "Banco",
    valor: "R$ 2.800,00",
  },
  {
    id: "4",
    data: "20/08",
    recibo: "385922",
    locatario: "Sabrina Alencar",
    imovel: "Rua do sol, 23",
    status: "Pago",
    formaPagamento: "Transferência",
    valor: "R$ 5.400,00",
  },
];

function parseBRL(valor: string): number {
  const limpo = valor.replace(/[^\d,-]/g, "").replace(",", ".");
  const n = parseFloat(limpo);
  return Number.isFinite(n) ? n : 0;
}

function formatBRL(valor: number): string {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export default function Financeiro() {
  const [abaAtiva, setAbaAtiva] = useState("Recebimentos");

  // Estados do formulário "Lançar recebimento de aluguel"
  const [imovel, setImovel] = useState("");
  const [locatario, setLocatario] = useState("");
  const [mesReferencia, setMesReferencia] = useState("");
  const [vencimento, setVencimento] = useState("");
  const [valorAluguel, setValorAluguel] = useState("");
  const [iptu, setIptu] = useState("");
  const [outrosValores, setOutrosValores] = useState("");
  const [correcaoMonetaria, setCorrecaoMonetaria] = useState("");
  const [juros, setJuros] = useState("");
  const [multa, setMulta] = useState("");
  const [formaPagamento, setFormaPagamento] = useState("Dinheiro");

  // Estados da lista "Últimos recebimentos"
  const [recebimentos, setRecebimentos] = useState<RecebimentoItem[]>(
    RECEBIMENTOS_INICIAIS,
  );
  const [periodoFiltro, setPeriodoFiltro] = useState("01/08/2026 - 31/08/2026");
  const [imovelFiltro, setImovelFiltro] = useState("Todos os imóveis");
  const [locatarioFiltro, setLocatarioFiltro] = useState("Todos os locatários");
  const [statusFiltro, setStatusFiltro] = useState("Todos os status");

  const totalCalculado =
    parseBRL(valorAluguel) +
    parseBRL(iptu) +
    parseBRL(outrosValores) +
    parseBRL(correcaoMonetaria) +
    parseBRL(juros) +
    parseBRL(multa);

  const handleRegistrar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imovel || !locatario || totalCalculado <= 0) return;

    const novo: RecebimentoItem = {
      id: String(Date.now()),
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
      }),
      recibo: String(Math.floor(100000 + Math.random() * 900000)),
      locatario,
      imovel,
      status: "Pago",
      formaPagamento,
      valor: formatBRL(totalCalculado),
    };

    setRecebimentos([novo, ...recebimentos]);
    setValorAluguel("");
    setIptu("");
    setOutrosValores("");
    setCorrecaoMonetaria("");
    setJuros("");
    setMulta("");
  };

  const recebimentosFiltrados = recebimentos.filter((r) => {
    const matchImovel =
      imovelFiltro === "Todos os imóveis" || r.imovel === imovelFiltro;
    const matchLoc =
      locatarioFiltro === "Todos os locatários" ||
      r.locatario === locatarioFiltro;
    const matchStatus =
      statusFiltro === "Todos os status" || r.status === statusFiltro;
    return matchImovel && matchLoc && matchStatus;
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
          <h1 style={{ fontSize: 22, margin: 0, color: "#111" }}>Financeiro</h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Lançamento de aluguéis, recibos e gastos
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

      {/* ───────── CARD: DISPONIBILIDADE FINANCEIRA (RDD) ───────── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: "18px 22px",
          marginBottom: 18,
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
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>
            Disponibilidade financeira (RDD)
          </span>
          <span
            style={{
              background: "#eef2f9",
              color: "#64748b",
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 12px",
              borderRadius: 6,
            }}
          >
            Referência: 26/09/2026
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1.15fr",
            gap: 16,
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>
              Caixa
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#333" }}>
              R$ 4.250,00
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>
              Contas Bancárias
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#333" }}>
              R$ 18.730,00
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>
              Aplicações financeiras
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#333" }}>
              R$ 35.000,00
            </div>
          </div>

          <div
            style={{
              background: "#e8effa",
              borderRadius: 10,
              padding: "12px 16px",
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: "#1d4ed8",
                marginBottom: 2,
              }}
            >
              Total disponível
            </div>
            <div style={{ fontSize: 21, fontWeight: 700, color: "#1d4ed8" }}>
              R$ 57.980,00
            </div>
          </div>
        </div>
      </div>

      {/* ───────── BARRA DE ABAS DE NAVEGAÇÃO ───────── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 10,
          padding: 6,
          display: "flex",
          justifyContent: "space-between",
          gap: 6,
          marginBottom: 18,
          overflowX: "auto",
        }}
      >
        {ABAS.map((aba) => {
          const ativa = abaAtiva === aba;
          return (
            <button
              key={aba}
              type="button"
              onClick={() => setAbaAtiva(aba)}
              style={{
                flex: 1,
                background: ativa ? "#1d4ed8" : "transparent",
                color: ativa ? "#fff" : "#475569",
                border: "none",
                borderRadius: 7,
                padding: "8px 14px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              {aba}
            </button>
          );
        })}
      </div>

      {/* ───────── FORMULÁRIO: LANÇAR RECEBIMENTO DE ALUGUEL ───────── */}
      <form
        onSubmit={handleRegistrar}
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: 24,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 18,
          }}
        >
          <div>
            <h2 style={{ fontSize: 16, margin: 0, color: "#111" }}>
              Lançar recebimento de aluguel
            </h2>
            <div style={{ fontSize: 11, color: "#666", marginTop: 3 }}>
              Registre o pagamento do aluguel e gere o recibo automaticamente.
            </div>
          </div>
          <span style={{ fontSize: 11, color: "#777" }}>
            Campos com * são obrigatórios. Valores em reais (R$).
          </span>
        </div>

        {/* Subseção: Identificação do aluguel */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 13, fontWeight: 700, color: "#1a1a2e" }}>
            Identificação do aluguel
          </span>
          <span style={{ fontSize: 11, color: "#777" }}>
            Confira imóvel, locatário e referência antes de registrar.
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 20,
          }}
        >
          <Campo rotulo="Imóvel *">
            <select
              value={imovel}
              onChange={(e) => setImovel(e.target.value)}
              style={inputStyle}
            >
              <option value="">Selecione o imóvel</option>
              <option value="Rua das Palmeiras, 45">
                Rua das Palmeiras, 45
              </option>
              <option value="Av. Central, 902">Av. Central, 902</option>
              <option value="Rua do Sol, 12">Rua do Sol, 12</option>
            </select>
          </Campo>

          <Campo rotulo="Locatário *">
            <select
              value={locatario}
              onChange={(e) => setLocatario(e.target.value)}
              style={inputStyle}
            >
              <option value="">Selecione o locatário</option>
              <option value="Julia Flores">Julia Flores</option>
              <option value="M. Andrade">M. Andrade</option>
              <option value="Padaria Bom Pão">Padaria Bom Pão</option>
            </select>
          </Campo>

          <Campo rotulo="Mês de referência *">
            <input
              type="text"
              placeholder="MM/AAAA"
              value={mesReferencia}
              onChange={(e) => setMesReferencia(e.target.value)}
              style={inputStyle}
            />
          </Campo>

          <Campo rotulo="Vencimento *">
            <input
              type="text"
              placeholder="DD/MM/AAAA"
              value={vencimento}
              onChange={(e) => setVencimento(e.target.value)}
              style={inputStyle}
            />
          </Campo>
        </div>

        {/* Subseção: Valores do recebimento */}
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1a1a2e",
            marginBottom: 10,
          }}
        >
          Valores do recebimento
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 14,
            marginBottom: 14,
          }}
        >
          <Campo rotulo="Valor do aluguel *">
            <input
              type="text"
              placeholder="R$ 0,00"
              value={valorAluguel}
              onChange={(e) => setValorAluguel(e.target.value)}
              style={{ ...inputStyle, textAlign: "right" }}
            />
          </Campo>

          <Campo rotulo="IPTU">
            <input
              type="text"
              placeholder="R$ 0,00"
              value={iptu}
              onChange={(e) => setIptu(e.target.value)}
              style={{ ...inputStyle, textAlign: "right" }}
            />
          </Campo>
        </div>

        {/* Box azul claro: Valores adicionais */}
        <div
          style={{
            background: "#eef3fa",
            borderRadius: 10,
            padding: 16,
            marginBottom: 18,
          }}
        >
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              color: "#1d4ed8",
              marginBottom: 10,
            }}
          >
            Valores adicionais
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 12,
            }}
          >
            <Campo rotulo="Outros valores">
              <input
                type="text"
                placeholder="R$ 0,00"
                value={outrosValores}
                onChange={(e) => setOutrosValores(e.target.value)}
                style={{ ...inputStyle, textAlign: "right" }}
              />
            </Campo>

            <Campo rotulo="Correção monetária">
              <input
                type="text"
                placeholder="R$ 0,00"
                value={correcaoMonetaria}
                onChange={(e) => setCorrecaoMonetaria(e.target.value)}
                style={{ ...inputStyle, textAlign: "right" }}
              />
            </Campo>

            <Campo rotulo="Juros">
              <input
                type="text"
                placeholder="R$ 0,00"
                value={juros}
                onChange={(e) => setJuros(e.target.value)}
                style={{ ...inputStyle, textAlign: "right" }}
              />
            </Campo>

            <Campo rotulo="Multa">
              <input
                type="text"
                placeholder="R$ 0,00"
                value={multa}
                onChange={(e) => setMulta(e.target.value)}
                style={{ ...inputStyle, textAlign: "right" }}
              />
            </Campo>
          </div>
        </div>

        {/* Rodapé do formulário: Forma de pagamento + Total e Botão */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: "#1a1a2e",
                marginBottom: 8,
              }}
            >
              Forma de pagamento *
            </div>

            <div style={{ display: "flex", gap: 24, marginBottom: 8 }}>
              {["Dinheiro", "Pix", "Transferência", "Depósito"].map((opcao) => (
                <label
                  key={opcao}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "#333",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="formaPagamento"
                    value={opcao}
                    checked={formaPagamento === opcao}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                    style={{ accentColor: "#1d4ed8" }}
                  />
                  {opcao}
                </label>
              ))}
            </div>

            <div style={{ fontSize: 11, color: "#777" }}>
              Dinheiro → Caixa • Pix, transferência e depósito → Banco
            </div>
          </div>

          {/* Box de Total e Botão Registrar */}
          <div
            style={{
              background: "#e8effa",
              borderRadius: 10,
              padding: "14px 20px",
              display: "flex",
              alignItems: "center",
              gap: 28,
            }}
          >
            <div>
              <div style={{ fontSize: 11, color: "#475569", fontWeight: 600 }}>
                Total
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1d4ed8" }}>
                {formatBRL(totalCalculado)}
              </div>
            </div>

            <button
              type="submit"
              style={{
                background: "#1d4ed8",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "10px 20px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Registrar e gerar recibo
            </button>
          </div>
        </div>
      </form>

      {/* ───────── CARD INFERIOR: ÚLTIMOS RECEBIMENTOS ───────── */}
      <div
        style={{
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: 24,
        }}
      >
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>
            Últimos recebimentos
          </div>
          <div style={{ fontSize: 11, color: "#777", marginTop: 2 }}>
            Consulte pagamentos registrados e os status dos recibos
          </div>
        </div>

        {/* Filtros */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr 1fr auto",
            gap: 12,
            alignItems: "end",
            marginBottom: 18,
          }}
        >
          <Campo rotulo="Período do pagamento">
            <input
              type="text"
              value={periodoFiltro}
              onChange={(e) => setPeriodoFiltro(e.target.value)}
              style={inputStyle}
            />
          </Campo>

          <Campo rotulo="Imóvel">
            <select
              value={imovelFiltro}
              onChange={(e) => setImovelFiltro(e.target.value)}
              style={inputStyle}
            >
              <option value="Todos os imóveis">Todos os imóveis</option>
              <option value="Rua das Palmeiras, 45">
                Rua das Palmeiras, 45
              </option>
              <option value="Av. Jujinho, 909">Av. Jujinho, 909</option>
              <option value="Av. Central, 902">Av. Central, 902</option>
              <option value="Rua do sol, 23">Rua do sol, 23</option>
            </select>
          </Campo>

          <Campo rotulo="Locatário">
            <select
              value={locatarioFiltro}
              onChange={(e) => setLocatarioFiltro(e.target.value)}
              style={inputStyle}
            >
              <option value="Todos os locatários">Todos os locatários</option>
              <option value="Julia Flores">Julia Flores</option>
              <option value="Djavan da Silva">Djavan da Silva</option>
              <option value="Anna Sales">Anna Sales</option>
              <option value="Sabrina Alencar">Sabrina Alencar</option>
            </select>
          </Campo>

          <Campo rotulo="Situação do recibo">
            <select
              value={statusFiltro}
              onChange={(e) => setStatusFiltro(e.target.value)}
              style={inputStyle}
            >
              <option value="Todos os status">Todos os status</option>
              <option value="Pago">Pago</option>
              <option value="Pendente">Pendente</option>
            </select>
          </Campo>

          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              background: "#fff",
              border: "1px solid #dcdce6",
              borderRadius: 6,
              padding: "8px 16px",
              fontSize: 12,
              fontWeight: 600,
              color: "#333",
              cursor: "pointer",
              height: 34,
              whiteSpace: "nowrap",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Novo recebimento
          </button>
        </div>

        {/* Tabela de Recebimentos */}
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
              <th style={thStyle}>Data</th>
              <th style={thStyle}>Recibo</th>
              <th style={thStyle}>Locatário</th>
              <th style={thStyle}>Imóvel</th>
              <th style={{ ...thStyle, textAlign: "center" }}>Status</th>
              <th style={thStyle}>Forma de pagamento</th>
              <th style={{ ...thStyle, textAlign: "right" }}>Valor</th>
            </tr>
          </thead>
          <tbody>
            {recebimentosFiltrados.map((item) => (
              <tr
                key={item.id}
                style={{ borderBottom: "1px solid #f1f1f8", color: "#222" }}
              >
                <td style={tdStyle}>{item.data}</td>
                <td style={tdStyle}>{item.recibo}</td>
                <td style={tdStyle}>{item.locatario}</td>
                <td style={tdStyle}>{item.imovel}</td>
                <td style={{ ...tdStyle, textAlign: "center" }}>
                  <span
                    style={{
                      display: "inline-block",
                      background: "#e6f4ea",
                      color: "#1e7e34",
                      padding: "3px 14px",
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    {item.status}
                  </span>
                </td>
                <td style={tdStyle}>{item.formaPagamento}</td>
                <td
                  style={{
                    ...tdStyle,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#111",
                  }}
                >
                  {item.valor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ───────── Componentes Auxiliares ───────── */

function Campo({
  rotulo,
  children,
}: {
  rotulo: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 11,
          color: "#475569",
          marginBottom: 4,
          fontWeight: 600,
        }}
      >
        {rotulo}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "7px 10px",
  borderRadius: 6,
  border: "1px solid #dcdce6",
  fontSize: 12,
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "Nunito, sans-serif",
  color: "#333",
  background: "#fff",
  height: 34,
};

const thStyle: React.CSSProperties = {
  padding: "9px 10px",
  fontWeight: 600,
  fontSize: 11,
};

const tdStyle: React.CSSProperties = {
  padding: "11px 10px",
  verticalAlign: "middle",
};