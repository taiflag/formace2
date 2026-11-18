import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type DadosLocatario = {
  nomeCompleto: string;
  cpf: string;
  rg: string;
  orgaoEmissor: string;
  dataNascimento: string;
  nacionalidade: string;
  estadoCivil: string;
  profissao: string;
  email: string;
  celular: string;
  cep: string;
  endereco: string;
  complemento: string;
  bairro: string;
  cidadeUf: string;
};

type Props = {
  onClose?: () => void;
  onSalvar?: (dados: DadosLocatario) => void;
};

export default function CadastroLocatario({ onClose, onSalvar }: Props) {
  const navigate = useNavigate();

  const [d, setD] = useState<DadosLocatario>({
    nomeCompleto: "",
    cpf: "",
    rg: "",
    orgaoEmissor: "",
    dataNascimento: "",
    nacionalidade: "",
    estadoCivil: "",
    profissao: "",
    email: "",
    celular: "",
    cep: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cidadeUf: "",
  });

  const handleChange =
    (k: keyof DadosLocatario) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      setD({ ...d, [k]: e.target.value });
    };

  const handleVoltar = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/imoveis");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSalvar) {
      onSalvar(d);
    } else {
      navigate("/imoveis");
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
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: "#777", marginBottom: 4 }}>
            Imóveis e locatários / Novo locatário
          </div>
          <h1 style={{ fontSize: 20, margin: 0, color: "#111" }}>
            Cadastro de locatário
          </h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Dados para identificação e formalização do contrato de locação.
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

      {/* ───────── FORMULÁRIO PRINCIPAL (2 COLUNAS) ───────── */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
      >
        {/* COLUNA ESQUERDA: Dados do locatário */}
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
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>
              Dados do locatário
            </span>
            <span style={{ fontSize: 11, color: "#888" }}>
              Campos com * são obrigatórios.
            </span>
          </div>
          <div style={{ fontSize: 11, color: "#777", marginBottom: 16 }}>
            Identificação • Pessoa física
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Campo rotulo="Nome completo *" inteira>
              <input
                type="text"
                placeholder="Nome conforme documento"
                value={d.nomeCompleto}
                onChange={handleChange("nomeCompleto")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="CPF *">
              <input
                type="text"
                placeholder="000.000.000-00"
                value={d.cpf}
                onChange={handleChange("cpf")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="RG / CIN *">
              <input
                type="text"
                placeholder="Número do documento"
                value={d.rg}
                onChange={handleChange("rg")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Órgão emissor / UF (opcional)">
              <input
                type="text"
                placeholder="Ex.: SSP / SP"
                value={d.orgaoEmissor}
                onChange={handleChange("orgaoEmissor")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Data de nascimento *">
              <input
                type="text"
                placeholder="DD/MM/AAAA"
                value={d.dataNascimento}
                onChange={handleChange("dataNascimento")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Nacionalidade *">
              <select
                value={d.nacionalidade}
                onChange={handleChange("nacionalidade")}
                style={inputStyle}
              >
                <option value="">Selecione</option>
                <option value="Brasileira">Brasileira</option>
                <option value="Outra">Outra</option>
              </select>
            </Campo>

            <Campo rotulo="Estado civil *">
              <select
                value={d.estadoCivil}
                onChange={handleChange("estadoCivil")}
                style={inputStyle}
              >
                <option value="">Selecione</option>
                <option value="Solteiro(a)">Solteiro(a)</option>
                <option value="Casado(a)">Casado(a)</option>
                <option value="Divorciado(a)">Divorciado(a)</option>
                <option value="Viúvo(a)">Viúvo(a)</option>
              </select>
            </Campo>

            <Campo rotulo="Profissão *">
              <input
                type="text"
                placeholder="Informe a profissão"
                value={d.profissao}
                onChange={handleChange("profissao")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="E-mail *">
              <input
                type="email"
                placeholder="nome@exemplo.com"
                value={d.email}
                onChange={handleChange("email")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Celular *">
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={d.celular}
                onChange={handleChange("celular")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="CEP *">
              <input
                type="text"
                placeholder="00000-000"
                value={d.cep}
                onChange={handleChange("cep")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Endereço e número *">
              <input
                type="text"
                placeholder="Rua, avenida e número"
                value={d.endereco}
                onChange={handleChange("endereco")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Complemento (opcional)">
              <input
                type="text"
                placeholder="Apartamento, bloco..."
                value={d.complemento}
                onChange={handleChange("complemento")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Bairro *">
              <input
                type="text"
                placeholder="Informe o bairro"
                value={d.bairro}
                onChange={handleChange("bairro")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Cidade / UF *">
              <input
                type="text"
                placeholder="Cidade / UF"
                value={d.cidadeUf}
                onChange={handleChange("cidadeUf")}
                style={inputStyle}
              />
            </Campo>
          </div>

          <div style={{ fontSize: 11, color: "#666", marginTop: 22 }}>
            Os dados serão reutilizados no contrato. Revise os documentos antes de salvar.
          </div>
        </div>

        {/* COLUNA DIREITA: Documentos */}
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
            <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 2 }}>
              Documentos
            </div>
            <div style={{ fontSize: 11, color: "#777" }}>
              Anexe os documentos necessários.
            </div>
          </div>

          {/* Upload 1: Documento de identidade */}
          <DocUploadItem
            titulo="Documento de identidade *"
            subtitulo="RG ou CIN • frente e verso"
          />

          {/* Upload 2: Comprovante de residência */}
          <DocUploadItem
            titulo="Comprovante de residência *"
            subtitulo="Documento atualizado"
          />

          {/* Upload 3: Comprovante de renda */}
          <DocUploadItem
            titulo="Comprovante de renda *"
            subtitulo="Holerite ou comprovante equivalente"
          />

          {/* Upload 4: Documentos complementares */}
          <DocUploadItem
            titulo="Documentos complementares (opcional)"
            subtitulo="Certidão civil ou documento do representante"
          />

          <div style={{ fontSize: 10, color: "#999" }}>
            PDF, JPG ou PNG • até X MB por arquivo.
          </div>

          {/* Aviso informativo rodapé direito */}
          <div
            style={{
              background: "#f0f4f8",
              padding: 10,
              borderRadius: 6,
              fontSize: 11,
              color: "#555",
            }}
          >
            Dados e documentos restritos à equipe responsável pela locação.
          </div>

          {/* Botões de Ação Finais */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 4,
            }}
          >
            <button
              type="button"
              onClick={handleVoltar}
              style={{
                background: "#fff",
                border: "1px solid #dcdce6",
                padding: "8px 18px",
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
              type="submit"
              style={{
                background: "#1d4ed8",
                border: "none",
                padding: "8px 18px",
                borderRadius: 6,
                fontSize: 13,
                color: "#fff",
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "Nunito, sans-serif",
              }}
            >
              Salvar locatário
            </button>
          </div>
        </div>
      </form>
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
          marginBottom: 3,
          fontWeight: 600,
        }}
      >
        {rotulo}
      </label>
      {children}
    </div>
  );
}

function DocUploadItem({
  titulo,
  subtitulo,
}: {
  titulo: string;
  subtitulo: string;
}) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#333", marginBottom: 2 }}>
        {titulo}
      </div>
      <div style={{ fontSize: 11, color: "#777", marginBottom: 6 }}>
        {subtitulo}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          type="button"
          style={{
            background: "none",
            border: "1px solid #dcdce6",
            padding: "5px 12px",
            borderRadius: 6,
            fontSize: 11,
            fontWeight: 600,
            color: "#1d4ed8",
            cursor: "pointer",
            fontFamily: "Nunito, sans-serif",
          }}
        >
          Selecionar arquivo
        </button>
        <span style={{ fontSize: 11, color: "#888" }}>
          Nenhum arquivo anexado
        </span>
      </div>
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
};