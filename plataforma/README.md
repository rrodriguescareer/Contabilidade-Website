# Plataforma de clientes — primeira fase: IRS

Esta branch prepara a arquitetura partilhada e os desenhos navegáveis do IRS e da gestão. Não altera os acessos do site público nem liga serviços reais.

- [Arquitetura e mapa de navegação](docs/arquitetura.md)
- [Modelo de dados, relações e permissões](docs/dados-e-permissoes.md)
- [Fluxos e critérios de aceitação do IRS](docs/fluxos-irs.md)
- [Desenho — resumo IRS](desenhos/irs-resumo.png)
- [Desenho — agregado](desenhos/irs-agregado.png)
- [Desenho — painel de gestão](desenhos/gestao-resumo.png)
- Protótipo: `/prototipos/portal/`, servido a partir da raiz do repositório.

O protótipo usa exclusivamente dados fictícios em memória. Não tem autenticação, base de dados, envio de convites, carregamento de ficheiros, pagamentos ou mensagens reais. A seleção «Cliente / Gestão» serve para rever os desenhos, não é uma autorização. Recarregar a página repõe os dados de exemplo. Nunca introduzir dados fiscais ou credenciais reais nesta demonstração.

## Estratégia Git

Uma base de código e um projeto Supabase por ambiente, com identidade e permissões comuns. Branches curtas por trabalho: `feature/portal-clientes-irs`, depois, por exemplo, `feature/portal-empresas`. Não manter branches permanentes por produto. Quando o protótipo e a arquitetura forem aprovados, implementar por incrementos, com revisões e migrações versionadas. Não publicar a demonstração como área de clientes de produção.

## Próximo incremento

Ligar um projeto Supabase de desenvolvimento, implementar migrations e RLS com testes entre contas, autenticação e convites, IRS e armazenamento privado. Só depois ativar mensagens, credenciais externas, faturação e integrações. Não utilizar a chave `service_role` no navegador. Nenhuma alteração foi aplicada a um Supabase nesta fase.

## Validação desta fase

Protótipo testado num navegador: navegação cliente/gestão em cinco larguras (320–1440 px), conta com/sem Empresas, classes e registos por pessoa/imóvel, checklist de pensões, documentos simulados, convite simulado, alerta de 2FA, resolução pelo profissional, mensagem escapada e atualização de progresso. Os cenários repõem-se ao recarregar. Estes testes não validam autenticação, RLS, persistência ou integrações Supabase, que ainda não existem.
