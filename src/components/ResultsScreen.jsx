import React, { useState } from "react";
import { useGame } from "../context/GameContext";

const PALETTE = [
  "#ff3e3e",
  "#9b6dff",
  "#3effa3",
  "#f5c842",
  "#ff6b3e",
  "#3eaaff",
];

export default function ResultsScreen() {
  const { respostasEmbaralhadas, iniciarVotacao, rodada, perguntaAtual } =
    useGame();
  const [lidas, setLidas] = useState(false);

  return (
    <div className="app-wrapper" style={{ paddingTop: 80, paddingBottom: 40 }}>
      <div className="card" style={{ maxWidth: 560 }}>
        <div className="card-header">
          <div className="title-eyebrow">📋 Rodada {rodada} · Resultados</div>
          <h2 className="title-main" style={{ fontSize: "2rem" }}>
            A Pergunta era:
          </h2>

          {/* Pegamos a propriedade .normal do objeto perguntaAtual */}
          <div
            style={{
              background: "var(--bg-elevated)",
              padding: "16px",
              borderRadius: "12px",
              borderLeft: "4px solid var(--accent)",
              marginTop: "12px",
              textAlign: "left",
            }}
          >
            <p
              style={{
                fontSize: "1.1rem",
                fontWeight: "700",
                color: "var(--text-primary)",
                margin: 0,
                fontStyle: "italic",
              }}
            >
              "{perguntaAtual?.normal}"
            </p>
          </div>

          <p className="title-sub" style={{ marginTop: 15 }}>
            O Impostor teve que responder algo diferente. Quem está mentindo?
          </p>
        </div>

        <div className="card-body">
          <div className="scroll-list">
            {respostasEmbaralhadas.map((item, idx) => {
              const cor = PALETTE[idx % PALETTE.length];
              return (
                <div
                  key={idx}
                  className="resposta-card"
                  style={{ animationDelay: `${idx * 80}ms` }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 14,
                    }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: `${cor}22`,
                        border: `2px solid ${cor}`,
                        color: cor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Bebas Neue'",
                        fontSize: "1rem",
                        flexShrink: 0,
                      }}
                    >
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: "0.88rem",
                          color: "var(--text-secondary)",
                          marginBottom: 4,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {item.nome}
                      </div>
                      <div
                        style={{
                          fontSize: "1.1rem",
                          lineHeight: 1.55,
                          color: "var(--text-primary)",
                        }}
                      >
                        {item.resposta}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!lidas && (
            <div style={{ marginTop: 16 }}>
              <button
                className="btn btn-secondary btn-full"
                onClick={() => setLidas(true)}
              >
                ✅ Todos lemos as respostas
              </button>
            </div>
          )}

          {lidas && (
            <div
              style={{
                marginTop: 16,
                padding: 16,
                background: "var(--accent-dim)",
                border: "1px solid var(--border-accent)",
                borderRadius: 12,
                textAlign: "center",
                animation: "slideUp 0.3s ease",
              }}
            >
              <div style={{ fontSize: "1.4rem", marginBottom: 8 }}>🗳️</div>
              <div
                style={{
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  marginBottom: 6,
                }}
              >
                Hora de votar!
              </div>
              <div
                style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
              >
                Cada jogador irá votar em quem acha que é o impostor.
              </div>
            </div>
          )}
        </div>

        <div className="card-footer">
          <button
            className="btn btn-primary"
            onClick={iniciarVotacao}
            disabled={!lidas}
          >
            VOTAR AGORA →
          </button>
        </div>
      </div>
    </div>
  );
}
