-- Log de eventos por site-conceito. "site" é o slug do projeto (mesmo id
-- usado no worker/wrangler, ex: 'cardume', 'torno', 'prisma'). "tipo" é
-- 'visita' ou 'deploy'. Os dados são simulados (os sites-conceito são
-- fictícios, não têm tráfego real) mas persistem de verdade no D1 —
-- não são números soltos no código do frontend.
CREATE TABLE IF NOT EXISTS eventos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('visita', 'deploy')),
  criado_em TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_eventos_site ON eventos (site);
CREATE INDEX IF NOT EXISTS idx_eventos_tipo ON eventos (tipo);
