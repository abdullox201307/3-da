const productBox = document.getElementById("productBox");
const APIurl = "https://fakestoreapi.com/products?limit=10";

fetch(APIurl)
  .then(res => res.json())
  .then(data => {
    productBox.innerHTML = ""; // Clear before adding
    data.forEach(product => {
      productBox.innerHTML += `
        <div class="card">
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p>${product.description.substring(0, 60)}...</p>
          <div class="price">$${product.price}</div>
          <button onclick="buy('${product.title}', ${product.price})">Sotib olish</button>
        </div>
      `;
    });
  });

// Sotib olish funksiyasi
function buy(name, price) {
  alert(`✅ Siz "${name}" mahsulotini $${price} evaziga sotib oldingiz.`);
}
let total = 0;

function buy(name, price) {
  total += price;
  document.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`;
  alert(`✅ Siz "${name}" mahsulotini $${price} evaziga sotib oldingiz.`);
}
