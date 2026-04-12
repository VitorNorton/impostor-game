import React from "react";
import { useGame, FASES } from "../context/GameContext";

export default function TopBar() {
  const { darkMode, setDarkMode, fase, reiniciarJogo, rodada } = useGame();

  const isGame = fase !== FASES.SETUP;

  return (
    <div className="topbar">
      <div className="topbar-logo">
        <img
          src={`${process.env.PUBLIC_URL}/logo-horizontal-V2.png`}
          alt="Logo Descubra o Impostor"
          style={{
            height: "70px",
            width: "auto",
          }}
        />
      </div>
      <div className="topbar-actions">
        {isGame && (
          <span
            style={{
              fontFamily: "'Space Mono'",
              fontSize: "0.72rem",
              color: "var(--text-muted)",
              marginRight: 8,
            }}
          >
            R{rodada}
          </span>
        )}

        <button
          className="btn btn-ghost"
          style={{ padding: "8px", fontSize: "1.1rem", lineHeight: 1 }}
          onClick={() => {
            const next = darkMode ? "light" : "dark";
            setDarkMode(!darkMode);
            document.documentElement.setAttribute("data-theme", next);
          }}
          title={darkMode ? "Modo claro" : "Modo escuro"}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
        {isGame && (
          <button
            className="btn btn-ghost"
            style={{
              padding: "8px",
              fontSize: "0.78rem",
              color: "var(--text-muted)",
            }}
            onClick={() => {
              if (
                window.confirm("Voltar para o menu? O jogo atual será perdido.")
              )
                reiniciarJogo();
            }}
            title="Voltar ao menu"
          >
            🏠
          </button>
        )}
      </div>
    </div>
  );
}
