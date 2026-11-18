import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

type DadosImovel = {
  identificacao: string;
  situacao: string;
  cep: string;
  endereco: string;
  complemento: string;
  bairro: string;
  cidadeUf: string;
  tipoImovel: string;
  finalidade: string;
  areaPrivativa: string;
  quartos: string;
  banheiros: string;
  vagas: string;
  observacoes: string;
  aluguel: string;
  condominio: string;
  iptu: string;
  proprietario: string;
  matricula: string;
};

type Props = {
  onClose?: () => void;
  onSalvar?: (dados: DadosImovel) => void;
};

export default function CadastroImoveis({ onClose, onSalvar }: Props) {
  const navigate = useNavigate();

  const [d, setD] = useState<DadosImovel>({
    identificacao: "",
    situacao: "Disponível para locação",
    cep: "",
    endereco: "",
    complemento: "",
    bairro: "",
    cidadeUf: "",
    tipoImovel: "",
    finalidade: "",
    areaPrivativa: "",
    quartos: "0",
    banheiros: "0",
    vagas: "0",
    observacoes: "",
    aluguel: "",
    condominio: "",
    iptu: "",
    proprietario: "",
    matricula: "",
  });

  const handleChange =
    (k: keyof DadosImovel) =>
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
      {/* Cabeçalho superior da página */}
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
            Imóveis e locatários / Novo imóvel
          </div>
          <h1 style={{ fontSize: 20, margin: 0, color: "#111" }}>
            Cadastro de imóvel
          </h1>
          <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>
            Registre o endereço, as características e as condições para locação.
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
          }}
        >
          Voltar aos cadastros
        </button>
      </div>

      {/* Formulário Principal (Grid de 2 Colunas) */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 20, alignItems: "flex-start" }}
      >
        {/* COLUNA ESQUERDA: Informações do imóvel */}
        <div
          style={{
            flex: 1.4,
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
              marginBottom: 16,
            }}
          >
            <span style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e" }}>
              Informações do imóvel
            </span>
            <span style={{ fontSize: 11, color: "#888" }}>
              Campos com * são obrigatórios.
            </span>
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
          >
            <Campo rotulo="Identificação do imóvel *" inteira>
              <input
                type="text"
                placeholder="Ex.: Casa 02 — Vila Nova"
                value={d.identificacao}
                onChange={handleChange("identificacao")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Situação *">
              <select
                value={d.situacao}
                onChange={handleChange("situacao")}
                style={inputStyle}
              >
                <option value="Disponível para locação">
                  Disponível para locação
                </option>
                <option value="Alugado">Alugado</option>
                <option value="Manutenção">Manutenção</option>
              </select>
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

            <Campo rotulo="Endereço e número *" inteira>
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

            <Campo rotulo="Tipo de imóvel *">
              <select
                value={d.tipoImovel}
                onChange={handleChange("tipoImovel")}
                style={inputStyle}
              >
                <option value="">Casa, apartamento, sala...</option>
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Sala comercial">Sala comercial</option>
              </select>
            </Campo>

            <Campo rotulo="Finalidade *">
              <select
                value={d.finalidade}
                onChange={handleChange("finalidade")}
                style={inputStyle}
              >
                <option value="">Residencial ou comercial</option>
                <option value="Residencial">Residencial</option>
                <option value="Comercial">Comercial</option>
              </select>
            </Campo>

            <Campo rotulo="Área privativa (m²) *">
              <input
                type="text"
                placeholder="0,00"
                value={d.areaPrivativa}
                onChange={handleChange("areaPrivativa")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Quartos">
              <input
                type="number"
                value={d.quartos}
                onChange={handleChange("quartos")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Banheiros">
              <input
                type="number"
                value={d.banheiros}
                onChange={handleChange("banheiros")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Vagas de garagem">
              <input
                type="number"
                value={d.vagas}
                onChange={handleChange("vagas")}
                style={inputStyle}
              />
            </Campo>

            <Campo rotulo="Características e observações (opcional)" inteira>
              <textarea
                placeholder="Descreva a conservação, os ambientes, a mobília e os diferenciais do imóvel."
                value={d.observacoes}
                onChange={handleChange("observacoes")}
                rows={3}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </Campo>
          </div>
        </div>

        {/* COLUNA DIREITA: Condições de locação */}
        <div
          style={{
            flex: 1,
            background: "#fff",
            border: "1px solid #e5e5ef",
            borderRadius: 12,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "#1a1a2e",
              marginBottom: 4,
            }}
          >
            Condições de locação
          </span>

          <Campo rotulo="Aluguel mensal *">
            <input
              type="text"
              placeholder="R$ 0,00"
              value={d.aluguel}
              onChange={handleChange("aluguel")}
              style={inputStyle}
            />
          </Campo>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            <Campo rotulo="Condomínio (opcional)">
              <input
                type="text"
                placeholder="R$ 0,00"
                value={d.condominio}
                onChange={handleChange("condominio")}
                style={inputStyle}
              />
            </Campo>
            <Campo rotulo="IPTU (opcional)">
              <input
                type="text"
                placeholder="R$ 0,00"
                value={d.iptu}
                onChange={handleChange("iptu")}
                style={inputStyle}
              />
            </Campo>
          </div>

          <Campo rotulo="Proprietário / locador *">
            <select
              value={d.proprietario}
              onChange={handleChange("proprietario")}
              style={inputStyle}
            >
              <option value="">Selecione o responsável cadastrado</option>
              <option value="Fundação Manuel Cruz">Fundação Manuel Cruz</option>
            </select>
          </Campo>

          <Campo rotulo="Matrícula / inscrição do imóvel (opcional)">
            <input
              type="text"
              placeholder="Número de registro"
              value={d.matricula}
              onChange={handleChange("matricula")}
              style={inputStyle}
            />
          </Campo>

          {/* Seção de Fotos e Documentos */}
          <div style={{ marginTop: 8 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: "#333",
                marginBottom: 2,
              }}
            >
              Fotos e documentos do imóvel
            </div>
            <div style={{ fontSize: 11, color: "#777", marginBottom: 8 }}>
              Fotos, matrícula e laudo de vistoria.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <button
                type="button"
                style={{
                  background: "none",
                  border: "1px solid #dcdce6",
                  padding: "6px 14px",
                  borderRadius: 6,
                  fontSize: 12,
                  fontWeight: 600,
                  color: "#4f46e5",
                  cursor: "pointer",
                }}
              >
                Adicionar arquivos
              </button>
              <span style={{ fontSize: 11, color: "#888" }}>
                Nenhum arquivo anexado
              </span>
            </div>
            <div style={{ fontSize: 10, color: "#999", marginTop: 6 }}>
              JPG, PNG ou PDF • até 10 MB por arquivo.
            </div>
          </div>

          {/* Aviso informativo rodapé direito */}
          <div
            style={{
              background: "#f0f4f8",
              padding: 10,
              borderRadius: 6,
              fontSize: 11,
              color: "#555",
              marginTop: 6,
            }}
          >
            Endereço, locador e valores serão preenchidos na geração do
            contrato.
          </div>

          {/* Botões de Ação Finais */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 12,
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
              }}
            >
              Salvar imóvel
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
          color: "#555",
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

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  borderRadius: 6,
  border: "1px solid #dcdce6",
  fontSize: 12,
  boxSizing: "border-box" as const,
  outline: "none",
  fontFamily: "Nunito, sans-serif",
  color: "#333",
  background: "#fff",
};