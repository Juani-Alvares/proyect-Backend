const socket = io();

const form = document.getElementById("productForm");
const list = document.getElementById("productsList");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const product = {
    title: document.getElementById("title").value,
    price: Number(document.getElementById("price").value),
    description: "Producto en tiempo real",
    code: "RT" + Date.now(),
    stock: 10,
    category: "realtime"
  };

  socket.emit("addProduct", product);
  form.reset();
});

function deleteProduct(id) {
  socket.emit("deleteProduct", id);
}

socket.on("updateProducts", (products) => {
  list.innerHTML = "";

  products.forEach((p) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price}
      <button onclick="deleteProduct(${p.id})">Eliminar</button>
    `;
    list.appendChild(li);
  });
});
