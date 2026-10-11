import { Link } from "react-router-dom";
import Button from "../components/Button";
import { contratosMock } from "../mocks/contratosMock";

function Contratos() {
  return (
    <main style={{ padding: "28px 36px", fontFamily: "'Nunito', sans-serif" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 20, marginBottom: 2, color: "#1a1a2e" }}>
            Contratos
          </h1>
          <p style={{ color: "#999", fontSize: 12 }}>
            Documentos digitalizados, sem arquivamento físico
          </p>
        </div>
        <Button variant="primary">+ Novo contrato PDF</Button>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
        {contratosMock.map((c) => (
          <Link
            key={c.id}
            to={`/contratos/${c.id}`}
            style={{
              textDecoration: "none",
              display: "block",
              width: 170,
              padding: "18px 12px",
              textAlign: "center",
              background: "#fff",
              border: "1px solid #ecebf7",
              borderRadius: 10,
              boxShadow: "0 2px 8px rgba(108, 92, 231, 0.12)",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                margin: "0 auto 10px",
                background: "linear-gradient(90deg, #6c5ce7 50%, #cfcaf5 50%)",
              }}
            />
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: "#1a1a2e",
                marginBottom: 4,
              }}
            >
              {c.locatario}
            </p>
            <p style={{ fontSize: 11, color: "#999" }}>vence {c.vence}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

export default Contratos;
