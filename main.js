const APIurl = "https://fakestoreapi.com/products?limit=10";
const productBox = document.getElementById("productBox");
const categoryFilter = document.getElementById("categoryFilter");
const sortBy = document.getElementById("sortBy");
const searchInput = document.getElementById("searchInput");

let products = [];

fetch(APIurl)
  .then(res => res.json())
  .then(data => {
    products = data;
    renderProducts(products);
  });

function renderProducts(data) {
  productBox.innerHTML = ""; 
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
}

function filterAndSortProducts() {
  let filtered = [...products];

  const selectedCategory = categoryFilter.value;
  const selectedSort = sortBy.value;
  const searchTerm = searchInput.value.toLowerCase();

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.title.toLowerCase().includes(searchTerm)
    );
  }


  if (selectedSort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", filterAndSortProducts);
sortBy.addEventListener("change", filterAndSortProducts);
searchInput.addEventListener("input", filterAndSortProducts);

let total = 0;
function buy(name, price) {
  total += price;
  document.getElementById("totalAmount").textContent = `$${total.toFixed(2)}`;
  alert(` Siz "${name}" mahsulotini $${price} evaziga sotib oldingiz.`);
}
