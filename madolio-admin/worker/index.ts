export interface Env {
  DB: D1Database
  ASSETS: Fetcher
  ADMIN_KEY: string
}

function semAutorizacao() {
  return new Response(JSON.stringify({ erro: 'Não autorizado' }), {
    status: 401,
    headers: { 'content-type': 'application/json' },
  })
}

function autorizado(req: Request, env: Env): boolean {
  const chave = req.headers.get('x-admin-key')
  return !!env.ADMIN_KEY && chave === env.ADMIN_KEY
}

async function metricas(env: Env): Promise<Response> {
  const { results } = await env.DB.prepare(
    `SELECT
       site,
       SUM(CASE WHEN tipo = 'visita' THEN 1 ELSE 0 END) AS visitas,
       SUM(CASE WHEN tipo = 'deploy' THEN 1 ELSE 0 END) AS deploys,
       MAX(CASE WHEN tipo = 'deploy' THEN criado_em ELSE NULL END) AS ultimoDeploy,
       MAX(CASE WHEN tipo = 'visita' THEN criado_em ELSE NULL END) AS ultimaVisita
     FROM eventos
     GROUP BY site
     ORDER BY visitas DESC`,
  ).all()

  return new Response(JSON.stringify({ metricas: results }), {
    headers: { 'content-type': 'application/json' },
  })
}

async function registrarEvento(req: Request, env: Env): Promise<Response> {
  const body = await req.json<{ site?: string; tipo?: string }>().catch(() => null)
  if (!body?.site || (body.tipo !== 'visita' && body.tipo !== 'deploy')) {
    return new Response(JSON.stringify({ erro: 'site e tipo (visita|deploy) são obrigatórios' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  await env.DB.prepare('INSERT INTO eventos (site, tipo) VALUES (?, ?)').bind(body.site, body.tipo).run()

  return new Response(JSON.stringify({ ok: true }), {
    status: 201,
    headers: { 'content-type': 'application/json' },
  })
}

export default {
  async fetch(req, env) {
    const url = new URL(req.url)

    if (url.pathname.startsWith('/api/')) {
      if (!autorizado(req, env)) return semAutorizacao()

      if (url.pathname === '/api/metricas' && req.method === 'GET') {
        return metricas(env)
      }
      if (url.pathname === '/api/eventos' && req.method === 'POST') {
        return registrarEvento(req, env)
      }
      return new Response(JSON.stringify({ erro: 'Rota não encontrada' }), {
        status: 404,
        headers: { 'content-type': 'application/json' },
      })
    }

    return env.ASSETS.fetch(req)
  },
} satisfies ExportedHandler<Env>
