# Portfólio · Samuel Freitas

Site estático (HTML, CSS e JS puros), pronto para GitHub Pages.

## Estrutura
```
index.html                 versão em português (fica na raiz para o GitHub Pages achar)
en/index.html              versão em inglês (usa ../ para CSS, JS e imagens)
sitemap.xml                SEO (lista as duas versões; envie no Google Search Console)
CSS/style.css              estilos e paleta (variáveis no topo do arquivo)
CSS/boxicons/              ícones embutidos (não dependem de CDN)
JS/script.js               menu mobile, filtro de projetos, animações, lightbox (textos PT/EN)
IMGS/                      foto, logo, favicon, og-image.jpg (imagem de compartilhamento)
IMGS/projetos/             miniaturas dos projetos
IMGS/paineis/thumbs/       miniaturas WebP (640px) usadas nos cards e na galeria
Arquivos/Curriculo/        PDF do currículo (botão "Baixar currículo")
```

## Painéis
As imagens em `IMGS/paineis/` são prints reais com textos, números e logos pixelados.
O site usa as versões `.webp`: a grande (`IMGS/paineis/nome.webp`) abre no lightbox e a miniatura
(`IMGS/paineis/thumbs/nome.webp`) aparece nos cards. Os `.jpg` ficam guardados como original.

Para adicionar um painel novo:
1. Salve a imagem já ofuscada nessa pasta.
2. Gere as duas versões WebP (exemplo com Python + Pillow):
   ```python
   from PIL import Image
   im = Image.open("IMGS/paineis/novo.jpg").convert("RGB")
   im.save("IMGS/paineis/novo.webp", "WEBP", quality=80, method=6)
   th = im.resize((640, round(im.height * 640 / im.width)))
   th.save("IMGS/paineis/thumbs/novo.webp", "WEBP", quality=78, method=6)
   print(th.size)  # use esses números no width/height da <img>
   ```
3. Inclua o item na galeria do `index.html` **e** do `en/index.html`, com `width`/`height` da miniatura.

## Site bilíngue
São duas páginas estáticas: `index.html` (PT) e `en/index.html` (EN). Isso permite que o Google indexe as duas.
- **Toda mudança de conteúdo precisa ser feita nos dois arquivos.**
- Ao alterar `CSS/style.css` ou `JS/script.js`, aumente o `?v=` nos links das duas páginas (ex.: `?v=3`),
  senão quem já visitou o site pode ver o arquivo antigo por até 10 minutos.
- Na versão EN, os caminhos começam com `../` e os IDs das seções estão em inglês (`#about`, `#projects`…).
- O botão de currículo da versão EN aponta para o PDF em português (ainda não há versão em inglês).
- Se o endereço do site mudar (ex.: Vercel ou domínio próprio), troque `https://freitaslrs.github.io/portfolio/`
  nas meta tags das duas páginas e no `sitemap.xml`.

## Publicar no GitHub Pages
O site é publicado pelo repositório `FreitaslrS/portfolio` (branch `main`, pasta `/ (root)`).
Cada push na `main` atualiza `https://freitaslrs.github.io/portfolio/` em 1–2 minutos.

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
