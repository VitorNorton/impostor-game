import React, { useEffect } from 'react';
import { GameProvider, useGame, FASES } from './context/GameContext';
import SetupGame    from './components/SetupGame';
import PlayerScreen from './components/PlayerScreen';
import AnswerInput  from './components/AnswerInput';
import ResultsScreen from './components/ResultsScreen';
import VotingScreen  from './components/VotingScreen';
import FinalScreen   from './components/FinalScreen';
import TopBar        from './components/TopBar';
import './styles.css';

function Router() {
  const { fase } = useGame();

  switch (fase) {
    case FASES.SETUP:
      return <SetupGame />;
    case FASES.PERGUNTA_JOGADOR:
      return <PlayerScreen />;
    case FASES.RESPOSTA_JOGADOR:
      return <AnswerInput />;
    case FASES.RESULTADOS:
      return <ResultsScreen />;
    case FASES.VOTACAO:
      return <VotingScreen />;
    case FASES.PLACAR_FINAL:
      return <FinalScreen />;
    default:
      return <SetupGame />;
  }
}

function AppInner() {
  return (
    <>
      <TopBar />
      <Router />
    </>
  );
}

export default function App() {
  // Define o tema dark como padrão
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
  }, []);

  return (
    <GameProvider>
      <AppInner />
    </GameProvider>
  );
}
