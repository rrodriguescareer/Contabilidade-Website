RR — WEBSITE COMERCIAL / SCROLLYTELLING

Para visualizar com os endereços públicos sem .html, execute python3 -m http.server 8000 nesta pasta e abra o servidor num navegador. Consulte URLS.md.

ESTRUTURA
- index.html: homepage de promoção dos serviços.
- contabilidade/index.html: narrativa scrollytelling com 4 etapas.
- tecnologia/index.html: narrativa scrollytelling com 4 etapas.
- internacional/index.html: narrativa scrollytelling com 4 etapas.
- contacto/index.html: contactos e formulário que prepara email.
- privacidade/index.html: texto preliminar a validar antes de publicar.
- assets/style.css e assets/main.js: estilos, animações, parallax e idioma PT/EN.

CARACTERÍSTICAS
- Design branco / azul / azul-marinho com margens laterais reduzidas.
- Páginas de serviços independentes, cada uma com visual sticky, progresso das etapas e animações de scroll.
- Elementos parallax, esferas animadas, navegação responsiva, barra de progresso.
- Alternância PT/EN guardada no navegador.
- Sem bibliotecas JavaScript externas. A fonte Google Fonts é opcional; existe fallback local.

PENDENTE PARA PUBLICAÇÃO DEFINITIVA
- URL do portal de clientes e URL da aplicação IRS: ainda não fornecidos, por isso não foram inventados botões funcionais.
- O formulário usa mailto, não envia dados para um servidor.
- Rever texto de privacidade e requisitos RGPD conforme o alojamento e as ferramentas escolhidas.
- Validar âmbito de todos os serviços e informação profissional.

DEPLOY GRÁTIS
1. Extrair ZIP.
2. Abrir https://app.netlify.com/drop
3. Arrastar a pasta rr_mega_website com index.html para Netlify Drop.

ATUALIZAÇÃO: marca RR. sem quadrado; consultoria técnica B2B como foco de tecnologia; secção IRS na homepage; botão Área de clientes em todas as páginas.
IMPORTANTE: ainda não foram fornecidos URLs reais do portal empresarial e da aplicação IRS. Os botões encaminham para pedidos de acesso pelo formulário de contacto; não existe autenticação ou aplicação IRS incorporada.
