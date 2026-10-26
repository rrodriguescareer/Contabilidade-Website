/* Avisos do escritório, vindos da plataforma de IRS.
 *
 * O website é estático e não fala com a base de dados. Vai buscá-los a um
 * endereço público que só devolve os que estão no ar e dentro da janela de
 * datas — a decisão do que mostrar é tomada lá, não aqui.
 *
 * Se o pedido falhar, não acontece nada: um aviso é um extra, não pode
 * partir a página de quem está só a ler os serviços. */
(function () {
  'use strict';
  var ORIGEM = 'https://irs.rr-contabilidade.com/api/avisos';

  function mostrar(avisos) {
    var paraAqui = avisos.filter(function (a) { return a.no_website; });
    if (!paraAqui.length) return;

    var faixa = document.createElement('div');
    faixa.className = 'faixa-avisos';
    faixa.setAttribute('role', 'status');

    paraAqui.forEach(function (a) {
      var p = document.createElement('p');
      p.className = 'aviso-site';
      p.setAttribute('data-tom', a.tom || 'info');
      p.textContent = a.mensagem;
      faixa.appendChild(p);
    });

    document.body.insertBefore(faixa, document.body.firstChild);
  }

  try {
    fetch(ORIGEM, { mode: 'cors' })
      .then(function (r) { return r.ok ? r.json() : null; })
      .then(function (d) { if (d && d.avisos) mostrar(d.avisos); })
      .catch(function () { /* sem avisos, segue a vida */ });
  } catch (e) { /* browser antigo */ }
})();
