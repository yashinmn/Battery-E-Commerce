document.addEventListener("DOMContentLoaded", function() {
  document.body.insertAdjacentHTML("beforeend", `
    <footer style="background:#222; color:#fff; padding:20px 0; margin-top:40px;">
      <div class="container" style="display:flex; justify-content:space-between; flex-wrap:wrap;">
        <div>
          <h3>Battery Store</h3>
          <p>Your trusted partner for automotive, inverter, and industrial batteries.</p>
          <p>&copy; 2025 Battery Store. All rights reserved.</p>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul style="list-style:none; padding:0;">
            <li><a href="index.html" style="color:#fff; text-decoration:none;">Home</a></li>
            <li><a href="products.html" style="color:#fff; text-decoration:none;">Shop Batteries</a></li>
            <li><a href="contact.html" style="color:#fff; text-decoration:none;">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4>Legal</h4>
          <ul style="list-style:none; padding:0;">
            <li><a href="privacy.html" style="color:#fff; text-decoration:none;">Privacy Policy</a></li>
            <li><a href="terms.html" style="color:#fff; text-decoration:none;">Terms & Conditions</a></li>
          </ul>
        </div>
      </div>
    </footer>
  `);
});
