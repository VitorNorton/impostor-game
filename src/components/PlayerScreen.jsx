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

export default function PlayerScreen() {
  const {
    jogadores,
    jogadorAtualIdx,
    impostoresIdx,
    perguntaAtual,
    irParaResposta,
    rodada,
  } = useGame();

  const [revelado, setRevelado] = useState(false);
  const [passando, setPassando] = useState(false);

  const nomeJogador = jogadores[jogadorAtualIdx];
  const ehImpostor = impostoresIdx.includes(jogadorAtualIdx);
  const cor = AVATAR_COLORS[jogadorAtualIdx % AVATAR_COLORS.length];

  const handleRevelar = () => setRevelado(true);

  const handleContinuar = () => {
    setPassando(true);
    setTimeout(() => irParaResposta(), 350);
  };

  if (!revelado) {
    return (
      <div className="app-wrapper" style={{ paddingTop: 80 }}>
        <div
          style={{
            textAlign: "center",
            marginBottom: 32,
            animation: "slideUp 0.4s ease",
          }}
        >
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 8,
            }}
          >
            Rodada {rodada} · Jogador {jogadorAtualIdx + 1} de{" "}
            {jogadores.length}
          </div>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: cor.bg,
              border: `3px solid ${cor.border}`,
              color: cor.text,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Bebas Neue'",
              fontSize: "2.2rem",
              margin: "0 auto 16px",
              boxShadow: `0 0 30px ${cor.border}44`,
            }}
          >
            {nomeJogador[0].toUpperCase()}
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "2rem",
              letterSpacing: "0.04em",
            }}
          >
            {nomeJogador}
          </div>
          <div
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.9rem",
              marginTop: 6,
            }}
          >
            Passe o dispositivo para este jogador
          </div>
        </div>

        <div className="card" style={{ maxWidth: 400 }}>
          <div className="card-body" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: 16 }}>🤫</div>
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
                {nomeJogador}
              </strong>{" "}
              deve estar olhando para a tela agora.
              <br />
              <br />
              Quando estiver pronto, toque no botão abaixo para ver a sua
              instrução.
            </p>
            <button
              className="btn btn-primary btn-full"
              onClick={handleRevelar}
            >
              🔓 Revelar minha instrução
            </button>
          </div>
        </div>
      </div>
    );
  }

  // A lógica de qual pergunta mostrar continua a mesma internamente
  const instrucao = ehImpostor ? perguntaAtual.impostor : perguntaAtual.normal;

  return (
    <div
      className="app-wrapper"
      style={{
        paddingTop: 80,
        opacity: passando ? 0 : 1,
        transition: "opacity 0.3s",
      }}
    >
      <div className="card" style={{ maxWidth: 500 }}>
        <div className="card-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
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
              }}
            >
              {nomeJogador[0].toUpperCase()}
            </div>
            {/* AGORA TODOS SÃO MOSTRADOS APENAS COMO "JOGADOR" */}
            <span className="badge badge-gray">👤 Jogador</span>
          </div>

          <div
            style={{
              fontFamily: "'Bebas Neue'",
              fontSize: "1.6rem",
              letterSpacing: "0.04em",
            }}
          >
            {nomeJogador}
          </div>
          <div
            style={{
              color: "var(--text-muted)",
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 4,
            }}
          >
            Rodada {rodada} · Leia com atenção
          </div>
        </div>

        <div className="card-body">
          {/* REMOVIDA A CLASSE 'impostor-box' PARA FICAR IGUAL PARA TODOS */}
          <div className="question-box">
            <div
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: 12,
              }}
            >
              💬 Sua pergunta
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                lineHeight: 1.5,
                color: "var(--text-primary)",
              }}
            >
              "{instrucao}"
            </div>
          </div>

          {/* DICA ÚNICA E GENÉRICA PARA TODOS OS JOGADORES */}
          <div
            style={{
              marginTop: 20,
              padding: "14px",
              background: "var(--bg-elevated)",
              borderRadius: 10,
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              lineHeight: 1.5,
            }}
          >
            💡 Responda naturalmente à instrução acima. Lembre-se de que alguém
            pode ter recebido uma pergunta diferente! O objetivo é descobrir o
            impostor na hora da votação.
          </div>
        </div>

        <div className="card-footer">
          <button
            className="btn btn-primary btn-full"
            onClick={handleContinuar}
          >
            ✍️ Escrever minha resposta
          </button>
        </div>
      </div>
    </div>
  );
}
