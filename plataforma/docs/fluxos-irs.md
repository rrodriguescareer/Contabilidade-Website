# IRS: recolha e trabalho do profissional

## Registo e agregado

O titular regista nome completo, email, palavra-passe da plataforma, telemóvel, morada, data de nascimento e NIF. A palavra-passe é enviada exclusivamente ao serviço Auth, por HTTPS. O estado inicial é email/adesão pendente; o profissional valida a relação comercial e os módulos. Convites e comunicações transacionais só são enviados depois de configurar o serviço e mediante ação autorizada.

Dentro do processo anual, adiciona cônjuge, descendentes, ascendentes ou outros membros: nome, nascimento, NIF, parentesco, email opcional, informação fiscal relevante e indicação de 2FA fiscal. A necessidade de senha fiscal é tratada como integração separada, não como credencial do agregado em texto simples. Um email opcional permite pedir/enviar convite para colaboração; sem email, a pessoa existe na mesma. Alterar membros num ano não altera processos anteriores.

## Ecrãs do cliente

1. **Resumo:** ano dos rendimentos, etapa atual, pedidos pendentes, documentos a rever, acesso rápido à conversa e próximas ações. Não confundir o contador de completude com uma validação fiscal.
2. **Agregado:** cartões por pessoa, estado dos dados e do convite, 2FA e pedidos de revisão. O titular fica identificado e não pode ser removido deixando o processo órfão.
3. **Rendimentos:** «Adicionar classe»; dentro de cada classe, «Adicionar rendimento». O utilizador escolhe preenchimento manual ou só documentos. Há alternativa «Não tive este rendimento» quando apropriado.
4. **Despesas e benefícios:** entradas por pessoa ou agregado, categoria, descrição, montante, documentos e «Outros». Os benefícios são sujeitos a confirmação do profissional.
5. **Documentos:** checklist agrupada por pessoa/rendimento ou imóvel, campos específicos e «Outros» em todos os contextos; ficheiros recebidos, pendentes, rejeitados e pedidos de substituição.
6. **Mensagens:** conversa com o profissional, anexos privados e indicação de resposta. O profissional pode responder, pedir esclarecimentos e entregar documentos.
7. **Progresso:** registo cronológico publicado pelo profissional, separado do chat. Etapas: recolha, enviado para revisão, análise, elementos em falta, pronto para validação, aguarda autorização, submetido, concluído. O portal não submete uma declaração à AT nesta fase.
8. **Faturação:** faturas, vencimentos, documentos e movimentos/saldo. Não existe botão de pagamento operacional até à integração do fornecedor.

O cliente envia o processo para revisão por ação explícita. A operação valida dados mínimos e pendências relevantes no servidor; o profissional pode pedir correções e reabrir a recolha. Nenhuma contagem de uploads significa que a declaração está correta ou submetida.

## Classes e campos de documentos

| Classe | Associação visível | Campos específicos, sempre com «Outros» |
|---|---|---|
| Trabalho dependente | Uma pessoa do agregado por rendimento | Recibos de vencimento; declaração anual da entidade empregadora; Outros |
| Pensões | Uma pessoa, subtipo dentro de «Trabalho e pensões» | Declaração anual da Segurança Social; declaração anual de seguradora/entidade pagadora; Outros |
| Independente / recibos verdes | Uma pessoa por atividade ou fonte | Recibos/faturas; resumo anual; contribuições e retenções quando aplicáveis; Outros |
| Mais/menos-valias de imóveis | Imóvel 1, Imóvel 2…; sem seleção obrigatória de pessoa no upload | Escritura de compra; escritura de venda; despesas de aquisição; despesas de venda; obras/despesas associadas; impostos na aquisição; impostos na venda, quando aplicáveis; Outros |
| Mais/menos-valias de ações e títulos | Uma pessoa por conta/intermediário ou fonte | Relatório fiscal da corretora; extratos/comprovativos de compra e venda; comissões; Outros |
| Rendas de imóveis | Imóvel 1, Imóvel 2…; sem seleção obrigatória de pessoa no upload | Contratos; recibos/mapa anual de rendas; IMI/condomínio/despesas aplicáveis; Outros |
| Despesas e benefícios | Pessoa ou agregado conforme o caso | Saúde; educação; habitação; despesas gerais; PPR; donativos; Outros, sujeitos às regras do ano |

Os campos recebem vários ficheiros, sem obrigar a digitar novamente o conteúdo só para enviar documentos. O sistema não declara extração automática/OCR enquanto essa capacidade não existir. O modo manual e o documental podem ser complementados posteriormente, com rastreio de alterações.

A propriedade é apresentada como unidade na recolha; a titularidade e percentagem de cada beneficiário serão confirmadas pelo profissional antes de qualquer apuramento fiscal. Os montantes, datas, países de origem, retenções e outras informações dependem da classe e do exercício e serão validados no incremento de implementação.

## Ecrãs de gestão

- Fila por cliente, ano, estado, responsável e pendências.
- Alertas de 2FA por pessoa/processo, com «Assumir» e «Resolver»; nenhuma senha ou OTP na notificação.
- Processo: agregado, rendimentos, documentos, pedidos de correção, mensagens, progresso publicado e notas internas separadas.
- Contas e acessos: ativar/desativar módulos, ligar várias empresas e gerir convites. Manter o controlo de acesso fora da edição de dados pessoais do cliente.
- Entregas: partilha de documentos privados, histórico de revisões e confirmação de autorização.
- Faturação: documentos e movimentos, inicialmente manuais/importados; pagamento online posterior.

## Estados indispensáveis ao produto final

Loading, vazio, erro de ligação, sessão expirada, acesso revogado, convite pendente/expirado, sem acesso ao módulo, upload em curso/falhado/quarentena, dados por guardar, edição concorrente e processo bloqueado para revisão. Sempre permitir recuperar uma falha sem perder dados ou criar duplicados.

## O que os desenhos demonstram

O protótipo permite navegar como cliente e gestão, adicionar classes e entradas fictícias, ver documentos por contexto, desenhar pedidos de ficheiros, escrever mensagens locais, publicar progresso local e testar o aviso de acesso Empresas. O cenário «XYZ · IRS + 3 empresas» demonstra o seletor; o cenário «Cliente apenas IRS» demonstra a rejeição e permanência em IRS. Nada é persistido nem transmitido e não existe autenticação de produção.

## Conteúdo dos formulários a implementar depois dos desenhos

As perguntas são condicionais e versionadas por ano; a sua aplicação fiscal é revista pelo profissional. As listas abaixo guiam o próximo incremento e não representam já um motor de cálculo ou a cobertura de todos os anexos da AT.

- **Titular/agregado:** identificação, nascimento, parentesco, email de colaboração, residência fiscal/país e alterações durante o ano, estado civil e datas relevantes, opção de tributação quando aplicável, residência alternada/guarda de dependentes, incapacidade fiscal e respetivos comprovativos quando aplicável. Morada e contactos pertencem ao titular; IBAN para reembolso é tratado como dado financeiro protegido e recolhido apenas quando necessário.
- **Trabalho/pensões:** pessoa, entidade pagadora e NIF/país, tipo, período, rendimento bruto, retenção, contribuições obrigatórias e situação nacional/estrangeira; campos documentais mostram apenas o subtipo escolhido, mantendo «Outros».
- **Independente:** pessoa, atividade/CAE ou código profissional, enquadramento e regime a confirmar, entidades/fontes nacionais ou estrangeiras, montantes por natureza, retenções, contribuições e despesas/comprovativos relevantes. Não presumir que todos os recibos verdes têm o mesmo enquadramento.
- **Alienação de imóveis:** imóvel, localização/país, identificação matricial e afetação quando aplicável, datas e valores de aquisição e realização, forma de aquisição, encargos documentados, impostos, obras e despesas de compra/venda, eventual habitação própria e intenção/realização de reinvestimento. A titularidade e quotas são confirmadas numa etapa de revisão, sem obrigar a associar o upload a uma pessoa.
- **Títulos:** pessoa, intermediário, país e moeda, tipo de instrumento, identificação quando aplicável, datas, quantidades, valores de aquisição/alienação, comissões, impostos/retensões e relatórios. Não tratar todos os instrumentos como se tivessem idênticas regras fiscais; prever indicação para revisão especializada.
- **Rendas:** imóvel, contrato e período, rendas recebidas, retenções, despesas e impostos documentados, eventual alteração/cessação do contrato e situação nacional/estrangeira. Associar proprietários na revisão, não na checklist de carregamento.
- **Despesas/benefícios:** pessoa ou agregado conforme o contexto, categoria, montante e moeda, entidade/país, ano, comprovativo, observações e pendência de validação; permitir «Outros» sem garantir elegibilidade.

A secção de rendimentos deve ainda perguntar se existem rendimentos não abrangidos nas classes apresentadas ou situações no estrangeiro, com opção de pedir análise ao profissional. Esta primeira fase não deve ocultar situações que exijam novas classes: dividendos/juros, criptoativos, heranças e outras situações podem exigir extensão do questionário antes de considerar uma recolha completa.
