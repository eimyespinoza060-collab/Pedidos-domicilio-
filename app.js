const productos = [
  {
    id: 1,
    categoria: "comida",
    nombre: "Burger Kingo Doble + Papas",
    tiempo: "25 min",
    envio: "Envío Gratis",
    precio: 9.50,
    desc: "Doble carne a la parrilla, queso cheddar, papas medianas y soda.",
    imagen: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    categoria: "comida",
    nombre: "Pizza Familiar Pepperoni",
    tiempo: "30 min",
    envio: "Envío $1.50",
    precio: 13.99,
    desc: "8 porciones grandes con extra queso mozzarella y pepperoni.",
    imagen: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    categoria: "super",
    nombre: "Canasta Express Súper",
    tiempo: "20 min",
    envio: "Envío Gratis",
    precio: 15.00,
    desc: "Pan, leche, huevos, frutas frescas y snacks para la semana.",
    imagen: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    categoria: "postres",
    nombre: "Caja 6 Donas Glaseadas",
    tiempo: "18 min",
    envio: "Envío Gratis",
    precio: 7.25,
    desc: "Surtido de chocolate, fresa, caramelo y azúcar glaseada.",
    imagen: "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    categoria: "comida",
    nombre: "Pollo Crispy 4 Piezas",
    tiempo: "25 min",
    envio: "Envío $1.00",
    precio: 8.75,
    desc: "Pollo crujiente recién hecho con ensalada y bebida fría.",
    imagen: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    categoria: "postres",
    nombre: "Helado Artesanal 1 Litro",
    tiempo: "22 min",
    envio: "Envío Gratis",
    precio: 6.50,
    desc: "Sabores vainilla, brownie y dulce de leche con topping.",
    imagen: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=600&q=80"
  }
];

function renderProductos(filtro = "todos") {
  const listaProductos = document.getElementById("lista-productos");
  const detallePedido = document.getElementById("cliente-detalle");
  if (!listaProductos) return;

  listaProductos.innerHTML = "";
  const filtrados = filtro === "todos"
    ? productos
    : productos.filter(function(p) { return p.categoria === filtro; });

  filtrados.forEach(function(prod) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<img src="' + prod.imagen + '" alt="' + prod.nombre + '" class="img-prod" />' +
      '<span class="tag-envio">🛵 ' + prod.tiempo + ' • ' + prod.envio + '</span>' +
      '<h3>' + prod.nombre + '</h3>' +
      '<p>' + prod.desc + '</p>' +
      '<p class="precio">$' + prod.precio.toFixed(2) + '</p>' +
      '<button type="button" class="btn btn-agregar">+ Agregar al pedido</button>';

    const img = card.querySelector(".img-prod");
    if (img) {
      img.addEventListener("error", function() {
        img.style.display = "none";
      });
    }

    const btnAgregar = card.querySelector(".btn-agregar");
    if (btnAgregar && detallePedido) {
      btnAgregar.addEventListener("click", function() {
        const actual = detallePedido.value.trim();
        const textoNuevo = prod.nombre + " ($" + prod.precio.toFixed(2) + ")";
        detallePedido.value = actual ? actual + ", " + textoNuevo : textoNuevo;
        detallePedido.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }

    listaProductos.appendChild(card);
  });
}

document.querySelectorAll(".cat-btn").forEach(function(btn) {
  btn.addEventListener("click", function() {
    renderProductos(btn.dataset.cat);
  });
});

const btnIa = document.getElementById("btn-ia");
const inputIa = document.getElementById("input-ia");
const resultadoIa = document.getElementById("resultado-ia");
const detallePedidoGlobal = document.getElementById("cliente-detalle");

if (btnIa && inputIa && resultadoIa) {
  btnIa.addEventListener("click", function() {
    const texto = (inputIa.value || "").toLowerCase();
    let sugerencia = "Burger Kingo Doble + Papas ($9.50) — llega en 25 min con envío gratis.";

    if (texto.indexOf("2") !== -1 || texto.indexOf("dos") !== -1 || texto.indexOf("compartir") !== -1) {
      sugerencia = "Pizza Familiar Pepperoni ($13.99) + Caja 6 Donas Glaseadas ($7.25) para compartir.";
    } else if (texto.indexOf("dulce") !== -1 || texto.indexOf("postre") !== -1 || texto.indexOf("helado") !== -1) {
      sugerencia = "Helado Artesanal 1 Litro ($6.50) o Caja 6 Donas Glaseadas ($7.25) con envío gratis.";
    } else if (texto.indexOf("super") !== -1 || texto.indexOf("casa") !== -1 || texto.indexOf("despensa") !== -1) {
      sugerencia = "Canasta Express Súper ($15.00) — entrega en 20 min directo a tu puerta.";
    }

    resultadoIa.innerHTML =
      '<strong>🤖 Sugerencia PideYa IA:</strong> ' + sugerencia +
      '<br /><button type="button" class="btn-secundario" id="btn-usar-ia">Agregar sugerencia al carrito</button>';

    const btnUsarIa = document.getElementById("btn-usar-ia");
    if (btnUsarIa && detallePedidoGlobal) {
      btnUsarIa.addEventListener("click", function() {
        const actual = detallePedidoGlobal.value.trim();
        detallePedidoGlobal.value = actual ? actual + ", " + sugerencia : sugerencia;
        detallePedidoGlobal.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  });
}

function obtenerPedidos() {
  try {
    return JSON.parse(localStorage.getItem("pedidos_pideya") || "[]");
  } catch (e) {
    return [];
  }
}

function guardarPedidos(pedidos) {
  localStorage.setItem("pedidos_pideya", JSON.stringify(pedidos));
}

function renderPedidos() {
  const listaPedidos = document.getElementById("lista-pedidos");
  if (!listaPedidos) return;

  const pedidos = obtenerPedidos();
  listaPedidos.innerHTML = "";

  if (pedidos.length === 0) {
    listaPedidos.innerHTML = "<li>Aún no hay pedidos en cola.</li>";
    return;
  }

  pedidos.forEach(function(p, i) {
    const li = document.createElement("li");
    li.textContent = "Pedido #" + (i + 1) + " | Cliente: " + p.nombre + " (" + p.telefono + ") | Entrega: " + p.direccion + " | Orden: " + p.detalle;
    listaPedidos.appendChild(li);
  });
}

const formPedido = document.getElementById("form-pedido");
const mensajePedido = document.getElementById("mensaje-pedido");

if (formPedido) {
  formPedido.addEventListener("submit", function(e) {
    e.preventDefault();
    const nombre = (document.getElementById("cliente-nombre").value || "").trim();
    const telefono = (document.getElementById("cliente-telefono").value || "").trim();
    const direccion = (document.getElementById("cliente-direccion").value || "").trim();
    const detalle = (document.getElementById("cliente-detalle").value || "").trim();

    const pedidos = obtenerPedidos();
    pedidos.push({ nombre: nombre, telefono: telefono, direccion: direccion, detalle: detalle });
    guardarPedidos(pedidos);

    formPedido.reset();
    if (mensajePedido) {
      mensajePedido.textContent = "🛵 ¡Pedido recibido! Tu repartidor PideYa ya está preparando la ruta.";
    }
    renderPedidos();
  });
}

const btnLogin = document.getElementById("btn-login");
const loginAdmin = document.getElementById("login-admin");
const panelGestion = document.getElementById("panel-gestion");
const errorLogin = document.getElementById("error-login");
const btnLimpiar = document.getElementById("btn-limpiar");

if (btnLogin) {
  btnLogin.addEventListener("click", function() {
    const userInput = document.getElementById("admin-usuario");
    const passInput = document.getElementById("admin-clave");
    const user = (userInput ? userInput.value : "").trim();
    const pass = (passInput ? passInput.value : "").trim();

    if (user === "admin" && pass === "1234") {
      if (loginAdmin) loginAdmin.style.display = "none";
      if (panelGestion) panelGestion.style.display = "block";
      if (errorLogin) errorLogin.textContent = "";
      renderPedidos();
    } else if (errorLogin) {
      errorLogin.textContent = "Credenciales incorrectas (usa admin / 1234).";
    }
  });
}

if (btnLimpiar) {
  btnLimpiar.addEventListener("click", function() {
    localStorage.removeItem("pedidos_pideya");
    renderPedidos();
  });
}

renderProductos();
