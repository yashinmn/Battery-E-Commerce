async function loadCart(){
  const res = await fetch('/api/cart', { headers: { ...authHeader() }});
  const items = await res.json();
  const el = document.getElementById('cart-items');
  if (!Array.isArray(items) || items.error) { el.textContent = items.error || 'Login to view your cart.'; return; }
  let total = 0;
  el.innerHTML = `
    <table>
      <thead><tr><th>Product</th><th>Qty</th><th>Price</th><th>Subtotal</th><th></th></tr></thead>
      <tbody>
        ${items.map(it => {
          const sub = it.price * it.quantity; total += sub;
          return `<tr>
            <td>${it.name}</td>
            <td><input type="number" min="1" value="${it.quantity}" data-id="${it.id}" class="qty"/></td>
            <td>$${it.price.toFixed(2)}</td>
            <td>$${sub.toFixed(2)}</td>
            <td><button class="remove" data-id="${it.id}">Remove</button></td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>
    <div style="margin-top:10px;"><strong>Total: $${total.toFixed(2)}</strong></div>
  `;
  document.querySelectorAll('.qty').forEach(inp => {
    inp.addEventListener('change', async (e) => {
      const id = e.target.getAttribute('data-id');
      const quantity = parseInt(e.target.value, 10);
      const res = await fetch('/api/cart/update/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ quantity })
      });
      await res.json();
      loadCart();
    });
  });
  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.getAttribute('data-id');
      const res = await fetch('/api/cart/remove/' + id, {
        method: 'DELETE',
        headers: { ...authHeader() }
      });
      await res.json();
      loadCart();
    });
  });
}
document.getElementById('checkout').addEventListener('click', async () => {
  const res = await fetch('/api/orders/checkout', { method: 'POST', headers: { ...authHeader() }});
  const out = await res.json();
  document.getElementById('cart-status').textContent = out.message || out.error;
  loadCart();
});
loadCart();
