import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type DadosContrato = {
  locatario: string;
  imovel: string;
  modeloContrato: string;
  garantia: string;
  inicioLocacao: string;
  terminoLocacao: string;
  diaVencimento: string;
  indiceReajuste: string;
  periodicidade: string;
};

export default function NovoContrato() {
  const navigate = useNavigate();

  const [form, setForm] = useState<DadosContrato>({
    locatario: "",
    imovel: "",
    modeloContrato: "Locação residencial",
    garantia: "",
    inicioLocacao: "",
    terminoLocacao: "",
    diaVencimento: "",
    indiceReajuste: "",
    periodicidade: "Anual",
  });

  const handleChange = (k: keyof DadosContrato) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [k]: e.target.value });
  };

  const handleVoltar = () => {
    navigate("/contratos");
  };

  const handleGerar = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Contrato gerado com sucesso!");
    navigate("/contratos");
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
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>
            Contratos / Novo contrato
          </div>
          <h1 style={{ fontSize: 20, margin: 0, color: "#111" }}>
            Gerar contrato de locação
          </h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Vincule os cadastros e revise as condições antes de gerar o documento.
          </div>
        </div>

        <button
          type="button"
          onClick={handleVoltar}
          style={{
            background: "#fff",
            border: "1px solid #dcdce6",
            padding: "8px 16px",
            borderRadius: 6,
            fontSize: 13,
            color: "#333",
            cursor: "pointer",
            fontWeight: 600,
            fontFamily: "Nunito, sans-serif",
          }}
        >
          Voltar aos cadastros
        </button>
      </div>

      {/* ───────── BARRA DE ETAPAS (WIZARD) ───────── */}
      <div
        style={{
          background: "#eef2f9",
          borderRadius: 8,
          padding: "10px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
          marginBottom: 20,
          textAlign: "center",
          fontSize: 12,
        }}
      >
        <div style={{ fontWeight: 700, color: "#1d4ed8" }}>
          1. Selecionar locatário e imóvel
        </div>
        <div style={{ color: "#666" }}>2. Definir condições</div>
        <div style={{ color: "#666" }}>3. Gerar e revisar contrato</div>
      </div>

      {/* ───────── FORMULÁRIO PRINCIPAL (2 COLUNAS) ───────── */}
      <form
        onSubmit={handleGerar}
        style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
      >
        {/* COLUNA ESQUERDA: Cadastros e Condições */}
        <div
          style={{
            flex: 1.45,
            background: "#fff",
            border: "1px solid #e5e5ef",
            borderRadius: 12,
            padding: 24,
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: 14,
            }}
          >
            Cadastros vinculados
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
            <Campo rotulo="Cliente / locatário *">
              <select
                value={form.locatario}
                onChange={handleChange("locatario")}
                style={inputStyle}
              >
                <option value="">Busque pelo nome ou CPF / CNPJ</option>
                <option value="Julia Flores">Julia Flores</option>
                <option value="M. Andrade">M. Andrade</option>
                <option value="Padaria Bom Pão">Padaria Bom Pão</option>
              </select>
            </Campo>

            <Campo rotulo="Imóvel disponível *">
              <select
                value={form.imovel}
                onChange={handleChange("imovel")}
                style={inputStyle}
              >
                <option value="">Busque pelo endereço ou identificação</option>
                <option value="Rua das Palmeiras, 45">Rua das Palmeiras, 45</option>
                <option value="Av. Central, 902">Av. Central, 902</option>
                <option value="Rua do Sol, 12">Rua do Sol, 12</option>
              </select>
            </Campo>
          </div>

          <div style={{ fontSize: 11, color: "#777", marginBottom: 20 }}>
            Os dados pessoais, documentos e informações do imóvel serão importados.
          </div>

          <div
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "#1a1a2e",
              marginBottom: 14,
            }}
          >
            Condições da locação
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
          >
            <Campo rotulo="Modelo de contrato *">
              <select
                value={form.modeloContrato}
                onChange={handleChange("modeloContrato")}
                style={inputStyle}
              >
                <option value="Locação residencial">Locação residencial</option>
                <option value="Locação comercial">Locação comercial</option>
              </select>
            </Campo>

            <Campo rotulo="Garantia locatícia *">
              <select
                value={form.garantia}
                onChange={handleChange("garantia")}
                style={inputStyle}
              >
                <option value="">Selecione a modalidade</option>
                <option value="Caução">Caução</option>
                <option value="Fiador">Fiador</option>
                <option value="Seguro fiança">Seguro fiança</option>
              </select>
            </Campo>

            <Campo rotulo="Início da locação *">
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                value={form.inicioLocacao}
                onChange={handleChange("inicioLocacao")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Término da locação *">
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                value={form.terminoLocacao}
                onChange={handleChange("terminoLocacao")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Dia do vencimento *">
              <select
                value={form.diaVencimento}
                onChange={handleChange("diaVencimento")}
                style={inputStyle}
              >
                <option value="">Selecione o dia</option>
                <option value="5">Dia 5</option>
                <option value="10">Dia 10</option>
                <option value="15">Dia 15</option>
                <option value="20">Dia 20</option>
              </select>
            </Campo>

            <Campo rotulo="Índice de reajuste *">
              <select
                value={form.indiceReajuste}
                onChange={handleChange("indiceReajuste")}
                style={inputStyle}
              >
                <option value="">Selecione o índice</option>
                <option value="IGPM">IGPM</option>
                <option value="IPCA">IPCA</option>
              </select>
            </Campo>

            <Campo rotulo="Periodicidade *" inteira>
              <select
                value={form.periodicidade}
                onChange={handleChange("periodicidade")}
                style={inputStyle}
              >
                <option value="Anual">Anual</option>
                <option value="Semestral">Semestral</option>
              </select>
            </Campo>
          </div>
        </div>

        {/* COLUNA DIREITA: Preenchimento Automático */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #e5e5ef",
            borderRadius: 12,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 14,
                color: "#1a1a2e",
                marginBottom: 2,
              }}
            >
              Preenchimento automático
            </div>
            <div style={{ fontSize: 11, color: "#777" }}>
              Um único contrato, sem redigitar os cadastros.
            </div>
          </div>

          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: "#333", marginBottom: 2 }}>
              Locatário
            </div>
            <div style={{ color: "#666", fontSize: 11, lineHeight: 1.4 }}>
              Nome / razão social, CPF / CNPJ, endereço e documentos de identificação.
            </div>
          </div>

          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: "#333", marginBottom: 2 }}>
              Locador e imóvel
            </div>
            <div style={{ color: "#666", fontSize: 11, lineHeight: 1.4 }}>
              Qualificação do locador, endereço, matrícula e características do imóvel selecionado.
            </div>
          </div>

          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: "#333", marginBottom: 2 }}>
              Valores da locação
            </div>
            <div style={{ color: "#666", fontSize: 11, lineHeight: 1.4 }}>
              Aluguel, condomínio e IPTU importados do cadastro do imóvel.
            </div>
          </div>

          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 700, color: "#333", marginBottom: 2 }}>
              Prazo e condições
            </div>
            <div style={{ color: "#666", fontSize: 11, lineHeight: 1.4 }}>
              Datas, vencimento, garantia e reajuste definidos neste formulário.
            </div>
          </div>

          <div
            style={{
              background: "#f0f4f8",
              padding: 10,
              borderRadius: 6,
              fontSize: 11,
              color: "#555",
            }}
          >
            Após gerar, revise o documento antes de exportar em PDF ou encaminhar para assinatura.
          </div>
        </div>
      </form>

      {/* ───────── RODAPÉ INFERIOR ───────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          background: "#fff",
          border: "1px solid #e5e5ef",
          borderRadius: 12,
          padding: "16px 24px",
        }}
      >
        <span style={{ fontSize: 11, color: "#777" }}>
          Preencha os campos obrigatórios para gerar o contrato.
        </span>

        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            onClick={handleVoltar}
            style={{
              background: "#fff",
              border: "1px solid #dcdce6",
              padding: "9px 20px",
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGerar}
            style={{
              background: "#1d4ed8",
              border: "none",
              padding: "9px 20px",
              borderRadius: 6,
              fontSize: 13,
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "Nunito, sans-serif",
            }}
          >
            Gerar contrato
          </button>
        </div>
      </div>
    </div>
  );
}

/* ───────── Componentes Auxiliares ───────── */

function Campo({
  rotulo,
  children,
  inteira,
}: {
  rotulo: string;
  children: React.ReactNode;
  inteira?: boolean;
}) {
  return (
    <div style={inteira ? { gridColumn: "1 / -1" } : undefined}>
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
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #dcdce6",
  fontSize: 12,
  boxSizing: "border-box",
  outline: "none",
  fontFamily: "Nunito, sans-serif",
  color: "#333",
  background: "#fff",
  height: 36,
};