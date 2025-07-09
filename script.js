function generarQR() {
  const url = document.getElementById("urlInput").value;
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), url);
}

function ejecutarDirectiva() {
  const params = new URLSearchParams(window.location.search);
  const accion = params.get("accion");
  const documento = params.get("doc");
  const mensaje = params.get("mensaje");
  const destino = params.get("destino");
  const audio = params.get("audio");

  const log = document.getElementById("logKiosko");

  switch (accion) {
    case "imprimir":
      log.innerText = `🖨️ Imprimiendo: ${documento}`;
      break;
    case "mostrar":
      log.innerHTML = `📄 Mostrando: <a href="${documento}" target="_blank">${documento}</a>`;
      break;
    case "alerta":
      alert(mensaje || "Alerta sin mensaje");
      log.innerText = `🚨 Alerta mostrada`;
      break;
    case "audio":
      if (audio) {
        const player = new Audio(audio);
        player.play();
        log.innerText = `🔊 Reproduciendo audio`;
      }
      break;
    case "navegar":
      if (destino) {
        log.innerText = `➡️ Redirigiendo a ${destino}`;
        window.location.href = destino;
      }
      break;
    default:
      log.innerText = `❓ Acción desconocida: ${accion}`;
  }
}

// Ejecutar si hay parámetros
if (window.location.search.includes("accion")) {
  ejecutarDirectiva();
}
