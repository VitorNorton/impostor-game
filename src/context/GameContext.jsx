import React, { createContext, useContext, useState, useCallback } from "react";
import {
  sortearImpostores,
  sortearPergunta,
  embaralharRespostas,
  contarVotos,
} from "../utils/gameUtils";

const GameContext = createContext(null);

export const FASES = {
  SETUP: "SETUP",
  NOMES: "NOMES",
  PERGUNTA_JOGADOR: "PERGUNTA_JOGADOR",
  RESPOSTA_JOGADOR: "RESPOSTA_JOGADOR",
  RESULTADOS: "RESULTADOS",
  VOTACAO: "VOTACAO",
  PLACAR_FINAL: "PLACAR_FINAL",
};

export function GameProvider({ children }) {
  const [fase, setFase] = useState(FASES.SETUP);
  const [numJogadores, setNumJogadores] = useState(4);
  const [modoJogo, setModoJogo] = useState(1);
  const [jogadores, setJogadores] = useState([]);
  const [impostoresIdx, setImpostoresIdx] = useState([]);
  const [perguntaAtual, setPerguntaAtual] = useState(null);
  const [jogadorAtualIdx, setJogadorAtualIdx] = useState(0);
  const [respostas, setRespostas] = useState([]);
  const [respostasEmbaralhadas, setRespostasEmbaralhadas] = useState([]);
  const [votos, setVotos] = useState([]);
  const [votanteAtualIdx, setVotanteAtualIdx] = useState(0);
  const [timerAtivo, setTimerAtivo] = useState(false);
  const [tempoRodada, setTempoRodada] = useState(60);
  const [darkMode, setDarkMode] = useState(true);
  const [rodada, setRodada] = useState(1);

  const iniciarJogo = useCallback((nomesJogadores) => {
    const impostores = sortearImpostores(nomesJogadores.length, 1);
    const pergunta = sortearPergunta();

    setJogadores(nomesJogadores);
    setImpostoresIdx(impostores);
    setPerguntaAtual(pergunta);
    setJogadorAtualIdx(0);
    setRespostas([]);
    setVotos([]);
    setVotanteAtualIdx(0);
    setFase(FASES.PERGUNTA_JOGADOR);
  }, []);

  const novaRodada = useCallback(() => {
    const impostores = sortearImpostores(jogadores.length, 1);
    const pergunta = sortearPergunta();

    setImpostoresIdx(impostores);
    setPerguntaAtual(pergunta);
    setJogadorAtualIdx(0);
    setRespostas([]);
    setVotos([]);
    setVotanteAtualIdx(0);
    setRodada((r) => r + 1);
    setFase(FASES.PERGUNTA_JOGADOR);
  }, [jogadores]);

  const irParaResposta = useCallback(() => {
    setFase(FASES.RESPOSTA_JOGADOR);
  }, []);

  const confirmarResposta = useCallback(
    (resposta) => {
      const novaResposta = {
        nome: jogadores[jogadorAtualIdx],
        resposta,
        jogadorIdx: jogadorAtualIdx,
      };
      const novasRespostas = [...respostas, novaResposta];
      setRespostas(novasRespostas);

      if (jogadorAtualIdx + 1 < jogadores.length) {
        setJogadorAtualIdx(jogadorAtualIdx + 1);
        setFase(FASES.PERGUNTA_JOGADOR);
      } else {
        setRespostasEmbaralhadas(embaralharRespostas(novasRespostas));
        setFase(FASES.RESULTADOS);
      }
    },
    [jogadores, jogadorAtualIdx, respostas],
  );

  const iniciarVotacao = useCallback(() => {
    setVotanteAtualIdx(0);
    setFase(FASES.VOTACAO);
  }, []);

  const registrarVoto = useCallback(
    (votadoIdx) => {
      const novoVoto = { votanteIdx: votanteAtualIdx, votadoIdx };
      const novosVotos = [...votos, novoVoto];
      setVotos(novosVotos);

      if (votanteAtualIdx + 1 < jogadores.length) {
        setVotanteAtualIdx(votanteAtualIdx + 1);
      } else {
        setFase(FASES.PLACAR_FINAL);
      }
    },
    [votanteAtualIdx, votos, jogadores.length],
  );

  const reiniciarJogo = useCallback(() => {
    setFase(FASES.SETUP);
    setJogadores([]);
    setImpostoresIdx([]);
    setPerguntaAtual(null);
    setJogadorAtualIdx(0);
    setRespostas([]);
    setVotos([]);
    setVotanteAtualIdx(0);
    setRodada(1);
  }, []);

  const resultadoVotos = contarVotos(votos);

  const value = {
    fase,
    setFase,
    numJogadores,
    setNumJogadores,
    modoJogo,
    setModoJogo,
    jogadores,
    impostoresIdx,
    perguntaAtual,
    jogadorAtualIdx,
    respostas,
    respostasEmbaralhadas,
    votos,
    votanteAtualIdx,
    resultadoVotos,
    timerAtivo,
    setTimerAtivo,
    tempoRodada,
    setTempoRodada,
    darkMode,
    setDarkMode,
    rodada,
    iniciarJogo,
    irParaResposta,
    confirmarResposta,
    iniciarVotacao,
    registrarVoto,
    novaRodada,
    reiniciarJogo,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
