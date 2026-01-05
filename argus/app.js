// Minimal interactions for prototype
document.addEventListener('DOMContentLoaded', () => {
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(b => b.addEventListener('click', (e) => {
    navBtns.forEach(x => x.classList.remove('active'));
    e.currentTarget.classList.add('active');
    const view = e.currentTarget.dataset.view;
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(`view-${view}`).classList.add('active');
  }));

  // Open/close report modal
  const reportModal = document.getElementById('report-modal');
  document.getElementById('open-report').addEventListener('click', () => {
    reportModal.setAttribute('aria-hidden','false');
  });
  document.getElementById('close-report').addEventListener('click', () => {
    reportModal.setAttribute('aria-hidden','true');
  });

  // Simulate analysis run
  document.getElementById('run-analysis').addEventListener('click', () => {
    const results = document.querySelector('.results');
    const tile = document.createElement('div');
    tile.className = 'result-item ia';
    tile.innerHTML = `
      <div class="r-header">
        <div class="r-title">Analyse IA — Nouvel item</div>
        <div class="r-meta">ARGUS‑LM v1.3 · confiance 0.43</div>
      </div>
      <div class="r-body">Suggestion : signal faible détecté. Vérifier provenance et demander autorisation.</div>
      <div class="r-actions">
        <button class="btn ghost" data-action="annotate">Annoter</button>
        <button class="btn" data-action="accept">Accepter (intégrer)</button>
        <button class="btn danger" data-action="reject">Rejeter</button>
      </div>
    `;
    results.prepend(tile);
    // announce
    const footer = document.querySelector('.footer');
    footer.style.opacity = '1';
  });

  // Simple view triggers on evidence actions
  document.querySelectorAll('.e-card button[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Aperçu de la preuve (redacted pour clients). Actions sensibles journalisées.');
    });
  });

  document.querySelectorAll('.e-card button[data-action="analyze"]').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('button[data-view="analysis"]').click();
      setTimeout(() => document.getElementById('run-analysis').click(), 600);
    });
  });

  // Preview report just closes modal and shows notice
  document.getElementById('preview-report').addEventListener('click', () => {
    document.getElementById('report-modal').setAttribute('aria-hidden','true');
    alert('Prévisualisation du rapport — export nécessitera validation Super Admin.');
  });
});