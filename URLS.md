# Endereços públicos

Os links do site usam pastas, sem extensão de ficheiro:

- Início: `/`
- Contabilidade: `/contabilidade/`
- Tecnologia: `/tecnologia/`
- Internacional: `/internacional/`
- Contacto: `/contacto/`
- Privacidade: `/privacidade/`
- Termos e Condições: `/termos/`

Cada pasta contém o respetivo `index.html`, servido automaticamente pelo alojamento. O nome do ficheiro não aparece na navegação normal. Os caminhos relativos permitem publicar tanto na raiz de um domínio como numa subpasta de GitHub Pages.

Os antigos `contacto.html`, `tecnologia.html` e restantes ficheiros de página foram mantidos apenas como encaminhadores para não quebrar links guardados. O JavaScript preserva os parâmetros e a âncora. Sem JavaScript, o encaminhamento por meta refresh leva à página base, sem preservar esses parâmetros.

Pedidos diretos a `index.html` também são encaminhados para o endereço da pasta pelo script `assets/clean-url.js`.

Para garantir que um endereço antigo nem sequer apresenta `.html` durante o carregamento, o alojamento deve fazer um redirecionamento HTTP antes de enviar a página. Esse comportamento depende da plataforma: o GitHub Pages não disponibiliza regras de redirecionamento HTTP personalizadas. A navegação por links do site já utiliza sempre os endereços sem extensão.

Para testar localmente, inicie `python3 -m http.server 8000` na raiz do repositório e abra as rotas acima. Abrir os HTML diretamente por `file://` não reproduz o funcionamento do alojamento.
