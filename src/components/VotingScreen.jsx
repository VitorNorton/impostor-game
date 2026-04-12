import React, { useState } from "react";
import { useGame } from "../context/GameContext";

const AVATAR_COLORS = [
  { bg: "#ff3e3e22", border: "#ff3e3e", text: "#ff3e3e" },
  { bg: "#9b6dff22", border: "#9b6dff", text: "#9b6dff" },
  { bg: "#3effa322", border: "#3effa3", text: "#3effa3" },
  { bg: "#f5c84222", border: "#f5c842", text: "#f5c842" },
  { bg: "#ff6b3e22", border: "#ff6b3e", text: "#ff6b3e" },
  { bg: "#3eaaff22", border: "#3eaaff", text: "#3eaaff" },
];

export default function VotingScreen() {
  const { jogadores, votanteAtualIdx, registrarVoto, rodada } = useGame();
  const [selecionado, setSelecionado] = useState(null);
  const [revelado, setRevelado] = useState(false);
  const [confirmando, setConfirmando] = useState(false);

  const votante = jogadores[votanteAtualIdx];
  const corVotante = AVATAR_COLORS[votanteAtualIdx % AVATAR_COLORS.length];

  const handleVotar = () => {
    if (selecionado === null) return;
    setConfirmando(true);
    setTimeout(() => {
      registrarVoto(selecionado);
      setSelecionado(null);
      setRevelado(false);
      setConfirmando(false);
    }, 350);
  };

  if (!revelado) {
    return (
      <div className="app-wrapper" style={{ paddingTop: 80 }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 28,
            animation: "slideUp 0.4s ease",
          }}
        >
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            🗳️ Votação · Rodada {rodada} · {votanteAtualIdx + 1}/
            {jogadores.length}
          </div>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: corVotante.bg,
              border: `3px solid ${corVotante.border}`,
              color: corVotante.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Bebas Neue'",
              fontSize: "2rem",
              margin: "0 auto 14px",
              boxShadow: `0 0 30px ${corVotante.border}44`,
            }}
          >
            {votante[0].toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "2rem",
              letterSpacing: "0.04em",
            }}
          >
            {votante}
          </div>
          <div
            style={{
              color: "var(--text-secondary)",
              marginTop: 8,
              fontSize: "0.9rem",
            }}
          >
            Passe o dispositivo para este jogador
          </div>
        </div>

        <div className="card" style={{ maxWidth: 400 }}>
          <div className="card-body" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🗳️</div>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                marginBottom: 24,
              }}
            >
              Apenas{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {votante}
              </strong>{" "}
              deve estar olhando.
              <br />
              <br />
              Quando estiver pronto para votar, toque no botão abaixo.
            </p>
            <button
              className="btn btn-primary btn-full"
              onClick={() => setRevelado(true)}
            >
              🗳️ Ver opções de voto
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-wrapper" style={{ paddingTop: 80 }}>
      <div
        className="card"
        style={{
          maxWidth: 500,
          opacity: confirmando ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <div className="card-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: corVotante.bg,
                border: `2px solid ${corVotante.border}`,
                color: corVotante.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue'",
                fontSize: "1.1rem",
              }}
            >
              {votante[0].toUpperCase()}
            </div>
            <div>
              <div style={{ fontFamily: "'Bebas Neue'", fontSize: "1.3rem" }}>
                {votante}
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                Votando agora
              </div>
            </div>
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.88rem" }}>
            Quem você acha que é o impostor? Você não pode votar em si mesmo.
          </p>
        </div>

        <div className="card-body">
          <div className="scroll-list">
            {jogadores.map((nome, idx) => {
              const cor = AVATAR_COLORS[idx % AVATAR_COLORS.length];
              const eEuMesmo = idx === votanteAtualIdx;
              const selecionadoEste = selecionado === idx;

              return (
                <button
                  key={idx}
                  className={`vote-option ${selecionadoEste ? "selected" : ""}`}
                  onClick={() => !eEuMesmo && setSelecionado(idx)}
                  disabled={eEuMesmo}
                  style={{ opacity: eEuMesmo ? 0.35 : 1 }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      background: cor.bg,
                      border: `2px solid ${cor.border}`,
                      color: cor.text,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Bebas Neue'",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {nome[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1, fontWeight: 700 }}>{nome}</div>
                  {eEuMesmo && (
                    <span
                      style={{
                        fontSize: "0.72rem",
                        color: "var(--text-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      (você)
                    </span>
                  )}
                  {selecionadoEste && (
                    <span
                      style={{ color: "var(--accent)", fontSize: "1.2rem" }}
                    >
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-primary"
            onClick={handleVotar}
            disabled={selecionado === null}
          >
            ✅ Confirmar voto
          </button>
        </div>
      </div>
    </div>
  );
}
