import { desenharBlazer, desenharCalca, desenharCamisa, desenharColete, type Desenho } from '../desenho'

// Dados do configurador (Configurador.tsx). Preço e prazo "base" de cada
// peça vêm dos preços já publicados no catálogo (data/pecas.ts) — a peça
// de referência de cada tipo é tratada como o corte "Clássico". Os
// multiplicadores de tecido e corte são estimativas plausíveis (a Encaixe
// é uma alfaiataria fictícia, não existe tabela real pra consultar), mas
// nunca contradizem os preços que já apareciam no catálogo.
export type TipoPeca = {
  id: string
  nome: string
  desenhar: (label: string) => Desenho
  precoBase: number
  prazoBaseSemanas: number
  detalhe: string
}

export const tipos: TipoPeca[] = [
  { id: 'blazer', nome: 'Blazer', desenhar: desenharBlazer, precoBase: 2400, prazoBaseSemanas: 4, detalhe: 'lapela entalhada à mão' },
  { id: 'calca', nome: 'Calça', desenhar: desenharCalca, precoBase: 980, prazoBaseSemanas: 2, detalhe: 'prega frontal simples' },
  { id: 'colete', nome: 'Colete', desenhar: desenharColete, precoBase: 780, prazoBaseSemanas: 2, detalhe: 'bolso com aba' },
  { id: 'camisa', nome: 'Camisa social', desenhar: desenharCamisa, precoBase: 590, prazoBaseSemanas: 2, detalhe: 'punho com botão duplo' },
]

export type Tecido = { id: string; nome: string; multiplicador: number }

export const tecidos: Tecido[] = [
  { id: 'la-fria', nome: 'Lã fria', multiplicador: 1 },
  { id: 'linho', nome: 'Linho', multiplicador: 0.9 },
  { id: 'flanela', nome: 'Flanela', multiplicador: 1.1 },
  { id: 'tweed', nome: 'Tweed', multiplicador: 1.2 },
  { id: 'algodao-egipcio', nome: 'Algodão egípcio', multiplicador: 0.85 },
]

export type Corte = { id: string; nome: string; multiplicador: number }

export const cortes: Corte[] = [
  { id: 'slim', nome: 'Slim', multiplicador: 1.05 },
  { id: 'classico', nome: 'Clássico', multiplicador: 1 },
  { id: 'oversized', nome: 'Oversized', multiplicador: 1.15 },
]
