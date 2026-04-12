import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Hook para gerenciar o timer de cada rodada
 */
export function useTimer(duracaoInicial = 60, onFim) {
  const [tempo, setTempo] = useState(duracaoInicial);
  const [ativo, setAtivo] = useState(false);
  const intervalRef = useRef(null);
  const onFimRef = useRef(onFim);

  useEffect(() => { onFimRef.current = onFim; }, [onFim]);

  useEffect(() => {
    if (!ativo) return;
    intervalRef.current = setInterval(() => {
      setTempo(t => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setAtivo(false);
          if (onFimRef.current) onFimRef.current();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [ativo]);

  const iniciar = useCallback(() => {
    setTempo(duracaoInicial);
    setAtivo(true);
  }, [duracaoInicial]);

  const pausar = useCallback(() => setAtivo(false), []);
  const reiniciar = useCallback(() => {
    clearInterval(intervalRef.current);
    setAtivo(false);
    setTempo(duracaoInicial);
  }, [duracaoInicial]);

  const porcentagem = (tempo / duracaoInicial) * 100;

  return { tempo, ativo, porcentagem, iniciar, pausar, reiniciar };
}
