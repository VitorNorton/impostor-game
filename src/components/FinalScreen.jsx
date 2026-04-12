import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import { labelModo } from "../utils/gameUtils";

const AVATARS = [
  { emoji: "🦊", bg: "#ff3e3e22", border: "#ff3e3e", text: "#ff3e3e" },
  { emoji: "👾", bg: "#9b6dff22", border: "#9b6dff", text: "#9b6dff" },
  { emoji: "🦖", bg: "#3effa322", border: "#3effa3", text: "#3effa3" },
  { emoji: "🐱", bg: "#f5c84222", border: "#f5c842", text: "#f5c842" },
  { emoji: "🦁", bg: "#ff6b3e22", border: "#ff6b3e", text: "#ff6b3e" },
  { emoji: "🐧", bg: "#3eaaff22", border: "#3eaaff", text: "#3eaaff" },
  { emoji: "🐷", bg: "#ff3eb522", border: "#ff3eb5", text: "#ff3eb5" },
  { emoji: "🐬", bg: "#3effee22", border: "#3effee", text: "#3effee" },
  { emoji: "👽", bg: "#aaff3e22", border: "#aaff3e", text: "#aaff3e" },
  { emoji: "👻", bg: "#ffffff22", border: "#ffffff", text: "#ffffff" },
];

const BAR_COLORS = [
  "var(--accent)",
  "var(--purple)",
  "var(--gold)",
  "var(--green)",
  "#ff6b3e",
  "#3eaaff",
  "#ff3eb5",
  "#3effee",
  "#aaff3e",
  "#ffffff",
];

export default function FinalScreen() {
  const {
    jogadores,
    impostoresIdx,
    resultadoVotos,
    modoJogo,
    novaRodada,
    reiniciarJogo,
    rodada,
    perguntaAtual,
  } = useGame();
  const [animado, setAnimado] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimado(true), 600);
    return () => clearTimeout(t);
  }, []);

  const maxVotos = Math.max(
    ...jogadores.map((_, i) => resultadoVotos[i] || 0),
    1,
  );
  const maisVotadoIdx = jogadores.reduce((acc, _, i) => {
    return (resultadoVotos[i] || 0) > (resultadoVotos[acc] || 0) ? i : acc;
  }, 0);

  const acertou = impostoresIdx.includes(maisVotadoIdx);
  const nomesImpostores = impostoresIdx.map((i) => jogadores[i]).join(" & ");

  return (
    <div className="app-wrapper" style={{ paddingTop: 80, paddingBottom: 60 }}>
      <div className="card" style={{ maxWidth: 560 }}>
        <div
          style={{
            background: "var(--bg-elevated)",
            borderBottom: "1px solid var(--border)",
            padding: "32px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "4rem",
              marginBottom: 16,
              animation: "pulse 2s ease infinite",
            }}
          >
            {acertou ? "🎉" : "😈"}
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "1.6rem",
              letterSpacing: "0.04em",
              color: "var(--text-secondary)",
              marginBottom: 4,
            }}
          >
            {acertou ? "Impostor descoberto!" : "O impostor escapou!"}
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "2.8rem",
              letterSpacing: "0.04em",
              color: acertou ? "var(--green)" : "var(--accent)",
              textShadow: acertou
                ? "0 0 30px rgba(62,255,163,0.5)"
                : "0 0 30px rgba(255,62,62,0.5)",
              marginBottom: 12,
            }}
          >
            {nomesImpostores}
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <span className="badge badge-red">🎭 IMPOSTOR</span>
            <span className="badge badge-gray">{labelModo(modoJogo)}</span>
            <span className="badge badge-purple">Rodada {rodada}</span>
          </div>
        </div>

        <div className="card-body">
          <div style={{ marginBottom: 24 }}>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: 12,
              }}
            >
              📋 As perguntas desta rodada
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              <div
                style={{
                  background: "var(--bg-elevated)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--text-muted)",
                    marginBottom: 4,
                  }}
                >
                  👤 Pergunta dos jogadores normais
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  "{perguntaAtual?.normal}"
                </div>
              </div>
              <div
                style={{
                  background: "var(--accent-dim)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  border: "1px solid var(--border-accent)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--accent)",
                    marginBottom: 4,
                  }}
                >
                  🎭 Instrução do(s) impostor(es)
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                  "{perguntaAtual?.impostor}"
                </div>
              </div>
            </div>
          </div>
          <div className="divider" />
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-muted)",
                marginBottom: 16,
              }}
            >
              🗳️ Placar de votos
            </div>
            {jogadores.map((nome, idx) => {
              const votos = resultadoVotos[idx] || 0;
              const pct = maxVotos > 0 ? (votos / maxVotos) * 100 : 0;
              const ehImpostor = impostoresIdx.includes(idx);
              const avatar = AVATARS[idx % AVATARS.length];
              const barCor = BAR_COLORS[idx % BAR_COLORS.length];

              return (
                <div
                  key={idx}
                  className="result-bar-wrap"
                  style={{ animation: `slideUp 0.4s ease ${idx * 100}ms both` }}
                >
                  <div className="result-bar-header">
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: "50%",
                          background: avatar.bg,
                          border: `2px solid ${avatar.border}`,
                          color: avatar.text,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "1rem",
                        }}
                      >
                        {avatar.emoji}
                      </div>
                      <span style={{ fontWeight: 700 }}>{nome}</span>
                      {ehImpostor && (
                        <span
                          className="badge badge-red"
                          style={{ padding: "2px 7px", fontSize: "0.65rem" }}
                        >
                          IMPOSTOR
                        </span>
                      )}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono'",
                        fontWeight: 700,
                        color:
                          votos > 0
                            ? "var(--text-primary)"
                            : "var(--text-muted)",
                      }}
                    >
                      {votos} voto{votos !== 1 ? "s" : ""}
                    </div>
                  </div>
                  <div className="result-bar-track">
                    <div
                      className="result-bar-fill"
                      style={{
                        width: animado ? `${pct}%` : "0%",
                        background: barCor,
                        opacity: votos > 0 ? 1 : 0.3,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className="card-footer"
          style={{ justifyContent: "space-between" }}
        >
          <button className="btn btn-secondary" onClick={reiniciarJogo}>
            🏠 Menu
          </button>
          <button className="btn btn-primary" onClick={novaRodada}>
            🔄 Nova rodada
          </button>
        </div>
      </div>
    </div>
  );
}
