import React, { useState, useEffect, useRef } from "react";
import { useGame } from "../context/GameContext";
import { useTimer } from "../hooks/useTimer";

const AVATAR_COLORS = [
  { bg: "#ff3e3e22", border: "#ff3e3e", text: "#ff3e3e" },
  { bg: "#9b6dff22", border: "#9b6dff", text: "#9b6dff" },
  { bg: "#3effa322", border: "#3effa3", text: "#3effa3" },
  { bg: "#f5c84222", border: "#f5c842", text: "#f5c842" },
  { bg: "#ff6b3e22", border: "#ff6b3e", text: "#ff6b3e" },
  { bg: "#3eaaff22", border: "#3eaaff", text: "#3eaaff" },
];

const CIRCUMFERENCE = 2 * Math.PI * 24; // r=24

export default function AnswerInput() {
  const {
    jogadores,
    jogadorAtualIdx,
    timerAtivo,
    tempoRodada,
    confirmarResposta,
    rodada,
  } = useGame();
  const [resposta, setResposta] = useState("");
  const [confirmando, setConfirmando] = useState(false);
  const [erro, setErro] = useState("");
  const [timeoutMsg, setTimeoutMsg] = useState(false);
  const inputRef = useRef(null);

  const nomeJogador = jogadores[jogadorAtualIdx];
  const cor = AVATAR_COLORS[jogadorAtualIdx % AVATAR_COLORS.length];

  const handleTimeout = () => setTimeoutMsg(true);
  const { tempo, ativo, porcentagem, iniciar } = useTimer(
    tempoRodada,
    handleTimeout,
  );

  useEffect(() => {
    if (timerAtivo) iniciar();
    inputRef.current?.focus();
    // eslint-disable-next-line
  }, []);

  const timerColor =
    porcentagem > 60
      ? "var(--green)"
      : porcentagem > 30
        ? "var(--gold)"
        : "var(--accent)";

  const handleConfirmar = () => {
    if (!resposta.trim()) {
      setErro("Escreva algo antes de confirmar!");
      return;
    }
    setConfirmando(true);
    setTimeout(() => confirmarResposta(resposta.trim()), 350);
  };

  // Auto-confirma ao acabar o tempo
  useEffect(() => {
    if (timeoutMsg && !confirmando) {
      setTimeout(() => {
        confirmarResposta(resposta.trim() || "(sem resposta)");
      }, 1800);
    }
    // eslint-disable-next-line
  }, [timeoutMsg]);

  return (
    <div className="app-wrapper" style={{ paddingTop: 80 }}>
      {timeoutMsg && (
        <div className="reveal-overlay">
          <div className="reveal-icon">⏰</div>
          <div style={{ fontFamily: "'Bebas Neue'", fontSize: "2.4rem" }}>
            Tempo esgotado!
          </div>
          <div style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Confirmando resposta automaticamente…
          </div>
        </div>
      )}

      <div
        className="card"
        style={{
          maxWidth: 520,
          opacity: confirmando ? 0 : 1,
          transition: "opacity 0.3s",
        }}
      >
        <div className="card-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: cor.bg,
                border: `2px solid ${cor.border}`,
                color: cor.text,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Bebas Neue'",
                fontSize: "1.2rem",
                flexShrink: 0,
              }}
            >
              {nomeJogador[0].toUpperCase()}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "'Bebas Neue'",
                  fontSize: "1.4rem",
                  letterSpacing: "0.04em",
                }}
              >
                {nomeJogador}
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "0.72rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                Jogador {jogadorAtualIdx + 1} de {jogadores.length} · Rodada{" "}
                {rodada}
              </div>
            </div>

            {timerAtivo && (
              <div className="timer-ring">
                <svg viewBox="0 0 58 58" width="58" height="58">
                  <circle className="track" cx="29" cy="29" r="24" />
                  <circle
                    className="fill"
                    cx="29"
                    cy="29"
                    r="24"
                    stroke={timerColor}
                    strokeDasharray={CIRCUMFERENCE}
                    strokeDashoffset={
                      CIRCUMFERENCE - (CIRCUMFERENCE * porcentagem) / 100
                    }
                  />
                </svg>
                <div
                  className="timer-ring label"
                  style={{ color: timerColor, fontSize: "0.82rem" }}
                >
                  {tempo}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="card-body">
          <div
            style={{
              fontWeight: 700,
              fontSize: "0.9rem",
              marginBottom: 10,
              color: "var(--text-secondary)",
            }}
          >
            ✍️ Sua resposta
          </div>

          <textarea
            ref={inputRef}
            className="input-field"
            placeholder="Digite aqui a sua resposta..."
            value={resposta}
            onChange={(e) => {
              setResposta(e.target.value);
              setErro("");
            }}
            rows={4}
            maxLength={280}
            disabled={timeoutMsg}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 6,
            }}
          >
            {erro ? (
              <span style={{ color: "var(--accent)", fontSize: "0.8rem" }}>
                ⚠️ {erro}
              </span>
            ) : (
              <span />
            )}
            <span
              style={{
                color: "var(--text-muted)",
                fontSize: "0.75rem",
                fontFamily: "'Space Mono'",
              }}
            >
              {resposta.length}/280
            </span>
          </div>

          <div
            style={{
              marginTop: 18,
              padding: 14,
              background: "var(--bg-elevated)",
              borderRadius: 10,
              fontSize: "0.8rem",
              color: "var(--text-muted)",
              lineHeight: 1.5,
            }}
          >
            🔒 Não mostre sua resposta para os outros jogadores. Após confirmar,
            passe o dispositivo.
          </div>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-primary btn-full"
            onClick={handleConfirmar}
            disabled={timeoutMsg}
          >
            ✅ Confirmar resposta
          </button>
        </div>
      </div>
    </div>
  );
}
