import { useEffect } from 'react'

type SeoProps = {
  title: string
  description: string
  path: string
}

function setMeta(selector: string, attr: string, content: string) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute(attr, content)
}

export default function Seo({ title, description, path }: SeoProps) {
  useEffect(() => {
    const url = `https://madolio.com.br${path}`

    document.title = title
    setMeta('meta[name="description"]', 'content', description)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:title"]', 'content', title)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', title)
    setMeta('meta[name="twitter:description"]', 'content', description)
  }, [title, description, path])

  return null
}
