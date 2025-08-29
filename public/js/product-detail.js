const params = new URLSearchParams(location.search);
const id = params.get('id');
fetch('/api/products/' + id).then(r=>r.json()).then(p => {
  const el = document.getElementById('product-detail');
  el.innerHTML = `
    <div class="card">
      <img src="${p.image || '/images/placeholder.jpg'}" alt=""/>
      <div class="p">
        <h2>${p.name}</h2>
        <div class="price">$${p.price.toFixed(2)}</div>
        <p>${p.description || ''}</p>
        <div class="small">Category: ${p.category || '-'}</div>
        <div style="display:flex; gap:8px; margin-top:10px;">
          <input id="qty" type="number" value="1" min="1" style="width:80px;"/>
          <button id="add">Add to Cart</button>
        </div>
        <div id="status" class="small" style="margin-top:6px;"></div>
      </div>
    </div>
  `;
  document.getElementById('add').addEventListener('click', async () => {
    const qty = parseInt(document.getElementById('qty').value || '1', 10);
    const res = await fetch('/api/cart/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...authHeader() },
      body: JSON.stringify({ product_id: p.id, quantity: qty })
    });
    const out = await res.json();
    document.getElementById('status').textContent = out.message || out.error;
  });
});
