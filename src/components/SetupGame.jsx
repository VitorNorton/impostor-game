import React, { useState } from "react";
import { useGame } from "../context/GameContext";

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

export default function SetupGame() {
  const {
    numJogadores,
    setNumJogadores,
    timerAtivo,
    setTimerAtivo,
    tempoRodada,
    setTempoRodada,
    iniciarJogo,
  } = useGame();

  const [step, setStep] = useState(0);
  const [nomes, setNomes] = useState(Array(numJogadores).fill(""));
  const [erro, setErro] = useState("");

  const handleNumChange = (v) => {
    const n = Math.max(3, Math.min(10, Number(v)));
    setNumJogadores(n);
    setNomes((prev) => {
      const arr = [...prev];
      while (arr.length < n) arr.push("");
      return arr.slice(0, n);
    });
  };

  const handleNome = (idx, val) => {
    setNomes((prev) => {
      const a = [...prev];
      a[idx] = val;
      return a;
    });
  };

  const avancarParaNomes = () => {
    setStep(1);
    setErro("");
  };

  const confirmarNomes = () => {
    const preenchidos = nomes.map((n) => n.trim());
    if (preenchidos.some((n) => !n)) {
      setErro("Preencha o nome de todos os jogadores!");
      return;
    }
    const unicos = new Set(preenchidos.map((n) => n.toLowerCase()));
    if (unicos.size < preenchidos.length) {
      setErro("Nomes duplicados não são permitidos!");
      return;
    }

    setErro("");
    iniciarJogo(preenchidos);
  };

  return (
    <div className="app-wrapper" style={{ paddingTop: 80 }}>
      <div className="card">
        <div className="card-header">
          {step === 0 ? (
            <>
              <div className="title-eyebrow">🎮 Configuração</div>
              <h1 className="title-main">
                Descubra o<br />
                <span style={{ color: "var(--accent)" }}>Impostor</span>
              </h1>
              <p className="title-sub">Configure a partida antes de começar.</p>
            </>
          ) : (
            <>
              <div className="title-eyebrow">👥 Jogadores</div>
              <h1 className="title-main" style={{ fontSize: "2rem" }}>
                Nomes dos
                <br />
                Jogadores
              </h1>
              <p className="title-sub">Insira o nome de cada participante.</p>
            </>
          )}

          <div className="step-indicator" style={{ marginTop: 16 }}>
            {[0, 1].map((i) => (
              <div
                key={i}
                className={`step-dot ${i === step ? "active" : i < step ? "done" : ""}`}
              />
            ))}
          </div>
        </div>

        <div className="card-body">
          {step === 0 && (
            <>
              <div className="input-group">
                <label className="input-label">Número de jogadores</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "10px 16px", fontSize: "1.2rem" }}
                    onClick={() => handleNumChange(numJogadores - 1)}
                    disabled={numJogadores <= 3}
                  >
                    −
                  </button>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontFamily: "'Bebas Neue'",
                      flex: 1,
                      textAlign: "center",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {numJogadores}
                  </span>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: "10px 16px", fontSize: "1.2rem" }}
                    onClick={() => handleNumChange(numJogadores + 1)}
                    disabled={numJogadores >= 10}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="toggle-row">
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                    ⏱ Timer por rodada
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    Limite de tempo para responder
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    checked={timerAtivo}
                    onChange={(e) => setTimerAtivo(e.target.checked)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>

              {timerAtivo && (
                <div className="input-group">
                  <label className="input-label">Tempo (segundos)</label>
                  <input
                    className="input-field"
                    type="number"
                    min={15}
                    max={300}
                    value={tempoRodada}
                    onChange={(e) => setTempoRodada(Number(e.target.value))}
                  />
                </div>
              )}
            </>
          )}

          {step === 1 && (
            <>
              {nomes.map((nome, idx) => {
                const avatar = AVATARS[idx % AVATARS.length];
                return (
                  <div
                    key={idx}
                    className="input-group"
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      className="avatar"
                      style={{
                        background: avatar.bg,
                        border: `2px solid ${avatar.border}`,
                        color: avatar.text,
                        fontSize: "1.4rem",
                      }}
                    >
                      {avatar.emoji}
                    </div>
                    <input
                      className="input-field"
                      style={{ marginBottom: 0 }}
                      placeholder={`Jogador ${idx + 1}`}
                      value={nome}
                      maxLength={20}
                      onChange={(e) => handleNome(idx, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && idx + 1 < nomes.length)
                          document.getElementById(`nome-${idx + 1}`)?.focus();
                      }}
                      id={`nome-${idx}`}
                      autoFocus={idx === 0}
                    />
                  </div>
                );
              })}

              {erro && (
                <div
                  className="error-badge"
                  style={{
                    marginTop: 8,
                    color: "var(--accent)",
                    fontSize: "0.85rem",
                  }}
                >
                  ⚠️ {erro}
                </div>
              )}
            </>
          )}
        </div>

        <div className="card-footer">
          {step === 1 && (
            <button className="btn btn-secondary" onClick={() => setStep(0)}>
              ← Voltar
            </button>
          )}
          {step === 0 ? (
            <button className="btn btn-primary" onClick={avancarParaNomes}>
              Próximo →
            </button>
          ) : (
            <button className="btn btn-primary" onClick={confirmarNomes}>
              🎮 Iniciar Jogo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
