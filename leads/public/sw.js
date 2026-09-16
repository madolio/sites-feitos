// Service worker mínimo — só o necessário pra o navegador considerar o
// app "instalável" como PWA. Sem cache offline: a busca depende de rede
// (API da Google) de qualquer forma, então não há ganho real em cachear.
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', () => self.clients.claim())
