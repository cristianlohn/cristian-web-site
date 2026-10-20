# Portfólio de Cristian Nazario Lohn

Website estático, com a identidade visual do Catuto. Não exige framework nem etapa de build para publicação.

- `index.html`: conteúdo original em português.
- `en/index.html`: versão inglesa completa, gerada e incluída no repositório.
- `assets/locales/en.json`: traduções dos textos, metadados e rótulos de acessibilidade.
- `assets/css/design-system.css`: fontes, cores e tokens visuais.
- `assets/css/catuto.css`: componentes e ajustes responsivos da identidade Catuto.

Após editar o conteúdo em português ou as traduções, execute:

```sh
node scripts/generate-english.mjs
```

O gerador avisa se algum texto visível ficou sem tradução. Nomes próprios e termos técnicos compartilhados estão listados em `unchanged` no script. Não edite `en/index.html` diretamente.

Publique a raiz do projeto, incluindo `en/` e `assets/`. Os idiomas usam URLs próprias (`/` e `/en/`) e links alternativos `hreflang`. O seletor funciona sem JavaScript; quando disponível, o JavaScript preserva a âncora da seção atual. Cada versão aponta para o currículo no respectivo idioma; o link inglês é definido no gerador.

O conteúdo profissional foi revisado com base no resumo do LinkedIn fornecido em 20/10/2026. As datas são apresentadas sem calcular durações. As descrições priorizam atividades documentadas, sem acrescentar métricas de resultado. A formação complementar agrupa cursos e certificações mencionados no documento; estudos atuais são apresentados separadamente.

Para conferir localmente, abra `index.html` ou sirva a pasta com um servidor HTTP estático. Confira os dois idiomas em larguras de celular e desktop, o menu por teclado, o seletor PT/EN e a preferência de movimento reduzido.
