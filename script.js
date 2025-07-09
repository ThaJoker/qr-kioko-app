
function generarQR() {
  const url = document.getElementById("urlInput").value;
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), url);
}

function ejecutarDirectiva() {
  const params = new URLSearchParams(window.location.search);
  const accion = params.get("accion");
  const documento = params.get("documento");

  if (accion === "imprimir" && documento) {
    document.getElementById("logKiosko").innerText = `📄 Imprimiendo documento: ${documento}...`;
  } else if (accion) {
    document.getElementById("logKiosko").innerText = `🔧 Ejecutando acción: ${accion}`;
  }
}

if (window.location.search.includes("accion")) {
  ejecutarDirectiva();
}
