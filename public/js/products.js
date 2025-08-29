fetch('/api/products').then(r=>r.json()).then(products => {
  const list = document.getElementById('product-list');
  list.innerHTML = products.map(p => `
    <div class="card">
      <img src="${p.image || '/images/placeholder.jpg'}" alt=""/>
      <div class="p">
        <div><strong>${p.name}</strong></div>
        <div class="small">${p.category || ''}</div>
        <div class="price">$${p.price.toFixed(2)}</div>
        <a class="btn" href="/product.html?id=${p.id}">Details</a>
      </div>
    </div>
  `).join('');
});
