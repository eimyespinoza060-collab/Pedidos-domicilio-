const productos = [
  { id: 1, nombre: "Combo Clasico", precio: 8.50, desc: "Plato principal + bebida + acompanamiento." },
  { id: 2, nombre: "Combo Doble", precio: 14.00, desc: "Ideal para compartir o para un antojo grande." },
  { id: 3, nombre: "Menu Rapido", precio: 6.25, desc: "Listo en minutos para resolver el almuerzo o cena." },
  { id: 4, nombre: "Dulce / Postre", precio: 4.50, desc: "Para cerrar el pedido con algo dulce." }
];

const listaProductos = document.getElementById("lista-productos");
const detallePedido = document.getElementById("cliente-detalle");
const formPedido = document.getElementById("form-pedido");
const mensajePedido = document.getElementById("mensaje-pedido");
const listaPedidos = document.getElementById("lista-pedidos");

function renderProductos() {
  if (!listaProductos) return;
  listaProductos.innerHTML = "";

  productos.forEach((prod) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${prod.nombre}</h3>
      <p>${prod.desc}</p>
      <p class="precio">$${prod.precio.toFixed(2)}</p>
      <button type="button" class="btn btn-agregar">Agregar al pedido</button>
    `;

    card.querySelector(".btn-agregar").addEventListener("click", () => {
      const actual = detallePedido.value.trim();
      const textoNuevo = `${prod.nombre} ($${prod.precio.toFixed(2)})`;
      detallePedido.value = actual ? `${actual}, ${textoNuevo}` : textoNuevo;
      detallePedido.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    listaProductos.appendChild(card);
  });
}

// IA recomendadora sencilla
const btnIa = document.getElementById("btn-ia");
const inputIa = document.getElementById("input-ia");
const resultadoIa = document.getElementById("resultado-ia");

if (btnIa) {
  btnIa.addEventListener("click", () => {
    const texto = (inputIa.value || "").toLowerCase();
    let sugerencia = "Te recomiendo el Combo Clasico ($8.50): equilibrado y rapido para pedir hoy.";

    if (texto.includes("2") || texto.includes("dos") || texto.includes("pareja") || texto.includes("compartir")) {
      sugerencia = "Para 2 personas te conviene el Combo Doble ($14.00) y agregar un Dulce / Postre ($4.50).";
    } else if (texto.includes("rapido") || texto.includes("economico") || texto.includes("barato") || texto.includes("poco")) {
      sugerencia = "Si buscas algo rapido y economico, el Menu Rapido ($6.25) es la mejor opcion.";
    } else if (texto.includes("dulce") || texto.includes("postre") || texto.includes("antojo")) {
      sugerencia = "Para calmar el antojo, pide un Dulce / Postre ($4.50) junto a un Menu Rapido ($6.25).";
    }

    resultadoIa.innerHTML = `
      <strong>Recomendacion IA:</strong> ${sugerencia}
      <br />
      <button type="button" class="btn-secundario" id="btn-usar-ia">Pasar al formulario de pedido</button>
    `;

    document.getElementById("btn-usar-ia").addEventListener("click", () => {
      const actual = detallePedido.value.trim();
      detallePedido.value = actual ? `${actual} | Sugerencia: ${sugerencia}` : sugerencia;
      detallePedido.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
}

// Guardar pedidos en localStorage
function obtenerPedidos() {
  return JSON.parse(localStorage.getItem("pedidos_domicilio") || "[]");
}

function guardarPedidos(pedidos) {
  localStorage.setItem("pedidos_domicilio", JSON.stringify(pedidos));
}

function renderPedidos() {
  if (!listaPedidos) return;
  const pedidos = obtenerPedidos();
  listaPedidos.innerHTML = "";

  if (pedidos.length === 0) {
    listaPedidos.innerHTML = "<li>No hay pedidos registrados todavia.</li>";
    return;
  }

  pedidos.forEach((p, i) => {
    const li = document.createElement("li");
    li.textContent = `#${i + 1} - ${p.nombre} (${p.telefono}) | Dir: ${p.direccion} | Pedido: ${p.detalle}`;
    listaPedidos.appendChild(li);
  });
}

if (formPedido) {
  formPedido.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoPedido = {
      nombre: document.getElementById("cliente-nombre").value.trim(),
      telefono: document.getElementById("cliente-telefono").value.trim(),
      direccion: document.getElementById("cliente-direccion").value.trim(),
      detalle: detallePedido.value.trim()
    };

    const pedidos = obtenerPedidos();
    pedidos.push(nuevoPedido);
    guardarPedidos(pedidos);

    formPedido.reset();
    mensajePedido.textContent = "¡Listo! Tu pedido/solicitud quedó registrado.";
    renderPedidos();
  });
}

// Login simple para Admin
const btnLogin = document.getElementById("btn-login");
const loginAdmin = document.getElementById("login-admin");
const panelGestion = document.getElementById("panel-gestion");
const errorLogin = document.getElementById("error-login");
const btnLimpiar = document.getElementById("btn-limpiar");

if (btnLogin) {
  btnLogin.addEventListener("click", () => {
    const user = document.getElementById("admin-usuario").value.trim();
    const pass = document.getElementById("admin-clave").value.trim();

    if (user === "admin" && pass === "1234") {
      loginAdmin.style.display = "none";
      panelGestion.style.display = "block";
      errorLogin.textContent = "";
      renderPedidos();
    } else {
      errorLogin.textContent = "Usuario o contraseña incorrectos (prueba con admin / 1234).";
    }
  });
}

if (btnLimpiar) {
  btnLimpiar.addEventListener("click", () => {
    localStorage.removeItem("pedidos_domicilio");
    renderPedidos();
  });
}

renderProductos();
  { id: 7, categoria: "super", nombre: "Pack Bebidas Frías x6", tiempo: "18 min", envio: "Envío Gratis", precio: 5.50, desc: "6 sodas o jugos surtidos bien fríos para acompañar." },
  { id: 8, categoria: "comida", nombre: "Tacos Mexicanos x3", tiempo: "25 min", envio: "Envío $1.00", precio: 7.90, desc: "3 tacos al pastor con salsa verde, cilantro y cebolla." }
  { id: 9, categoria: "postres", nombre: "Batido de Fresa y Banana", tiempo: "15 min", envio: "Envío Gratis", precio: 4.75, desc: "Batido cremoso preparado al momento con leche fría." }
