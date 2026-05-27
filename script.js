

function renderProdutos(lista) {
  const grid = document.getElementById('grid-produtos');
  grid.innerHTML = lista.map(p => `
    <div class="card reveal">
      <div class="card-img">
        ${p.badge ? `<div class="card-badge">${p.badge}</div>` : ''}
        <span style="font-size:4.5rem">${p.emoji}</span>
      </div>
      <div class="card-body">
        <div class="card-name">${p.nome}</div>
        <div class="card-desc">${p.desc}</div>
        <div class="card-footer">
          <div class="card-price">
            ${p.preco}
            <small>ou 3x sem juros</small>
          </div>
          <a href="https://api.whatsapp.com/send/?phone=5585996630561&text=Ol%C3%A1%21+Tenho+interesse+na+camisa:+${encodeURIComponent(p.nome)}&type=phone_number&app_absent=0" target="_blank" class="card-btn">Pedir agora</a>
        </div>
      </div>
    </div>
  `).join('');
  observeReveal();
}

function filtrar(cat, btn) {
  document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('ativo'));
  btn.classList.add('ativo');
  const lista = cat === 'todos' ? produtos : produtos.filter(p => p.categoria === cat);
  renderProdutos(lista);
}

function observeReveal() {
  const els = document.querySelectorAll('.reveal:not(.visible)');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}

renderProdutos(produtos);
observeReveal();