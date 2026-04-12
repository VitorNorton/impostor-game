import perguntas from "../data/perguntas";

export function embaralhar(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Sorteia os índices dos impostores dentre os jogadores
 * @param {number} totalJogadores
 * @param {number} numImpostores - 0 = modo caótico (todos)
 * @returns {number[]} índices dos impostores
 */
export function sortearImpostores(totalJogadores, numImpostores) {
  const indices = Array.from({ length: totalJogadores }, (_, i) => i);
  if (numImpostores === 0) return indices; // todos são impostores
  const embaralhados = embaralhar(indices);
  return embaralhados.slice(0, numImpostores);
}

export function sortearPergunta() {
  const idx = Math.floor(Math.random() * perguntas.length);
  return perguntas[idx];
}

export function embaralharRespostas(respostas) {
  return embaralhar(respostas);
}

export function contarVotos(votos) {
  const contagem = {};
  votos.forEach(({ votadoIdx }) => {
    contagem[votadoIdx] = (contagem[votadoIdx] || 0) + 1;
  });
  return contagem;
}

export function labelModo(modo) {
  if (modo === 0) return "🌀 Modo Caótico";
  if (modo === 1) return "🕵️ 1 Impostor";
  return `🕵️ ${modo} Impostores`;
}
