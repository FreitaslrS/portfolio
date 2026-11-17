# Portfólio · Samuel Freitas

Site estático (HTML, CSS e JS puros), pronto para GitHub Pages.

## Estrutura
```
index.html                 versão em português (fica na raiz para o GitHub Pages achar)
en/index.html              versão em inglês (usa ../ para CSS, JS e imagens)
sitemap.xml                SEO (lista as duas versões; envie no Google Search Console)
CSS/style.css              estilos e paleta (variáveis no topo do arquivo)
CSS/boxicons/              ícones embutidos (não dependem de CDN) + LICENSE (MIT)
CSS/fonts/                 Poppins e JetBrains Mono em woff2 (subset latin) + OFL.txt
JS/script.js               menu mobile, filtro de projetos, animações, lightbox (textos PT/EN)
IMGS/                      foto, logo, favicon, og-image.jpg (imagem de compartilhamento)
IMGS/projetos/             miniaturas dos projetos
IMGS/paineis/thumbs/       miniaturas WebP (640px) usadas nos cards e na galeria
Arquivos/Curriculo/        PDF do currículo (botão "Baixar currículo")
```

## Painéis
As imagens em `IMGS/paineis/` são prints reais com textos, números e logos pixelados.
O site usa as versões `.webp`: a grande (`IMGS/paineis/nome.webp`) abre no lightbox e a miniatura
(`IMGS/paineis/thumbs/nome.webp`) aparece nos cards. Os `.jpg` originais não ficam no repositório
(guarde-os fora dele); só os `.webp` são publicados.

Para adicionar um painel novo:
1. Ofusque a imagem e salve o original **fora do repositório**.
2. Gere as duas versões WebP (exemplo com Python + Pillow):
   ```python
   from PIL import Image
   im = Image.open("caminho/do/original/novo.jpg").convert("RGB")
   im.save("IMGS/paineis/novo.webp", "WEBP", quality=80, method=6)
   th = im.resize((640, round(im.height * 640 / im.width)))
   th.save("IMGS/paineis/thumbs/novo.webp", "WEBP", quality=78, method=6)
   print(th.size)  # use esses números no width/height da <img>
   ```
3. Inclua o item na galeria do `index.html` **e** do `en/index.html`, com `width`/`height` da miniatura.

## Site bilíngue
São duas páginas estáticas: `index.html` (PT) e `en/index.html` (EN). Isso permite que o Google indexe as duas.
- **Toda mudança de conteúdo precisa ser feita nos dois arquivos.**
- Ao alterar `CSS/style.css` ou `JS/script.js`, aumente o `?v=` nos links das duas páginas (ex.: `?v=5`),
  senão quem já visitou o site pode ver o arquivo antigo por até 10 minutos.
- Na versão EN, os caminhos começam com `../` e os IDs das seções estão em inglês (`#about`, `#projects`…).
- O botão de currículo da versão EN aponta para o PDF em português (ainda não há versão em inglês).
- Se o endereço do site mudar (ex.: Vercel ou domínio próprio), troque `https://freitaslrs.github.io/portfolio/`
  nas meta tags das duas páginas e no `sitemap.xml`.

## Publicar no GitHub Pages
O site é publicado pelo repositório `FreitaslrS/portfolio` (branch `main`, pasta `/ (root)`).
Cada push na `main` atualiza `https://freitaslrs.github.io/portfolio/` em 1–2 minutos.

## Privacidade (LGPD)
- O site não usa cookies, analytics nem formulários, e não coleta dados de visitantes.
- Fontes e ícones são servidos pelo próprio site: o IP do visitante não é enviado a terceiros
  (sem Google Fonts/CDN). As únicas conexões externas acontecem quando o visitante clica em
  LinkedIn, GitHub ou WhatsApp.
- O e-mail é montado via JS a partir de `data-email-user`/`data-email-domain`; o `href` do HTML
  usa entidades (`&#64;`, `&#46;`) para continuar funcionando sem JS.

## Segurança
- CSP via `<meta http-equiv="Content-Security-Policy">` nas duas páginas: só recursos do próprio site,
  sem `'unsafe-inline'`. Não use `style=""`, `onclick=""` nem `<script>` inline (o JSON-LD é permitido
  por não ser executável); coloque estilos no `CSS/style.css` e scripts no `JS/script.js`.
- Limite do GitHub Pages: não é possível enviar cabeçalhos HTTP próprios, então `frame-ancestors`
  (proteção contra o site ser embutido em iframe) não funciona via `<meta>` e fica de fora.

## Créditos e licenças
| Recurso | Autor | Licença | Arquivo |
|---|---|---|---|
| [Boxicons](https://github.com/atisawd/boxicons) | Aniket Suvarna | MIT | `CSS/boxicons/LICENSE` |
| [Poppins](https://github.com/itfoundry/Poppins) | The Poppins Project Authors | SIL Open Font License 1.1 | `CSS/fonts/OFL.txt` |
| [JetBrains Mono](https://github.com/JetBrains/JetBrainsMono) | The JetBrains Mono Project Authors | SIL Open Font License 1.1 | `CSS/fonts/OFL.txt` |

As fontes foram baixadas do Google Fonts (woff2, subset latin) e não foram modificadas.

## Paleta
| Cor | Hex |
|---|---|
| Preto | `#121216` |
| Grafite | `#1E1F26` |
| Cinza | `#8D919A` (ajustado para contraste AA) |
| Off white | `#F5F3EE` |
| Índigo | `#5E6ECB` |
| Lavanda | `#98A1FF` |
| Azul | `#0086C4` |
