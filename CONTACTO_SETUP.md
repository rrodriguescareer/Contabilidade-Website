# Ativar mensagens e marcações

A configuração pública fica em `assets/site-config.js`. Nunca coloque passwords ou chaves de API neste ficheiro: os ficheiros do site são públicos.

## Mensagens pelo formulário — Formspree

1. Crie uma conta em https://formspree.io e um formulário com o email que deve receber os pedidos. Confirme esse email e conclua a ativação pedida pelo serviço.
2. Copie o endpoint fornecido, no formato `https://formspree.io/f/IDENTIFICADOR`.
3. Preencha `contactEndpoint` em `assets/site-config.js` com esse endpoint. O identificador do formulário é público, não é uma chave de API.
4. Publique a alteração no alojamento. Faça uma submissão real e confirme a mensagem na caixa de entrada e no painel Formspree. Configure as opções de antispam e verifique os limites do seu plano.

Quando configurado, o botão passa a «Enviar mensagem» e o site envia os campos por HTTPS para o Formspree. Mostra sucesso apenas depois de uma resposta HTTP bem-sucedida; se falhar, mantém os campos para nova tentativa. Uma resposta aceite pelo serviço não garante entrega na caixa de entrada: confirme a configuração do destinatário.

Enquanto `contactEndpoint` estiver vazio, mantém-se «Preparar email»: abre o programa de email do visitante e não envia automaticamente.

## Marcação dentro do modal — Calendly

1. Crie uma conta em https://calendly.com e ligue o calendário que utiliza para evitar conflitos.
2. Crie um tipo de reunião. Defina duração, disponibilidade, fuso horário `Europe/Lisbon`, intervalo entre reuniões e local (presencial, telefone ou videoconferência). Configure confirmação e lembretes conforme o plano.
3. Copie o endereço público do perfil (mostra os tipos de reunião disponíveis) ou de uma reunião específica: `https://calendly.com/UTILIZADOR/REUNIAO`.
4. Preencha `bookingUrl` em `assets/site-config.js` com esse endereço e publique a alteração.
5. Abra «Marcar uma reunião», conclua uma marcação de teste e confirme que aparece no seu calendário e que os emails chegam. Cancele depois a marcação de teste.

O botão abre um modal com o calendário incorporado. O visitante escolhe o horário e conclui a marcação no Calendly sem sair do site. A ligação alternativa abre o serviço numa nova janela caso o calendário incorporado não carregue. O Calendly só é carregado quando o visitante abre o modal; o site não lhe envia automaticamente os campos do formulário.

Esta integração utiliza a página de marcação incorporada. Não precisa de uma chave de API. Uma integração API própria (criar ou consultar marcações no seu backend, sincronizar CRM ou tratar webhooks) é um projeto adicional: as credenciais têm de ficar no servidor.

Enquanto `bookingUrl` estiver vazio, o modal informa que a agenda ainda não está disponível e sugere pedir uma reunião pelo formulário. Não são mostrados horários fictícios.

## Antes de colocar em produção

- Confirme em que plataforma o site está alojado. Fazer push para o GitHub só atualiza o site se o alojamento estiver ligado à branch `main` e publicar automaticamente; caso contrário, publique os ficheiros no alojamento.
- Atualize a política de privacidade com os serviços efetivamente usados, finalidades, destinatários, conservação e eventuais transferências de dados. Reveja as condições e opções de privacidade/cookies dos fornecedores para o seu caso.
- Se o alojamento tiver Content Security Policy, permita `https://formspree.io` em `connect-src` e `https://calendly.com` em `frame-src`, preservando as restantes regras necessárias.
- Os testes locais cobrem o modal e os estados de envio com respostas simuladas. A entrega de email e a marcação real só podem ser confirmadas depois de configurar as contas e os endereços reais.

## Configuração atual

O modal já está ligado a `https://calendly.com/career-rubensdmrodrigues`, o perfil público fornecido. Apresenta os tipos de reunião que estiverem públicos nessa conta. Para abrir diretamente uma reunião, substitua pelo endereço específico. O envio pelo Formspree ainda depende da criação do formulário e do respetivo endpoint.
