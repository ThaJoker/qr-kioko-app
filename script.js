
// Inicializar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyByAQAvlGvwxWu11CUxaydt0n7qOzyzwn0",
  authDomain: "qr-kiosko-app.firebaseapp.com",
  projectId: "qr-kiosko-app",
  storageBucket: "qr-kiosko-app.firebasestorage.app",
  messagingSenderId: "601825821127",
  appId: "1:601825821127:web:d04932822ecf56d72619e2",
  measurementId: "G-RKRYS8RW34"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

function generarQR(url) {
  document.getElementById("qrcode").innerHTML = "";
  new QRCode(document.getElementById("qrcode"), url);
}

async function generarDesdeMenu() {
  const accion = document.getElementById("accion").value;
  const input = document.getElementById("parametro").value.trim();
  const archivoInput = document.getElementById("archivo");
  let valor = input;

  // Si hay archivo, subirlo primero
  if (archivoInput.files.length > 0) {
    const archivo = archivoInput.files[0];
    const ref = storage.ref().child('archivos/' + archivo.name);
    try {
      await ref.put(archivo);
      valor = await ref.getDownloadURL();
    } catch (error) {
      alert("Error al subir archivo: " + error.message);
      return;
    }
  }

  let url = window.location.origin + window.location.pathname + "?accion=" + accion;

  switch (accion) {
    case "imprimir":
    case "mostrar":
      url += "&doc=" + encodeURIComponent(valor);
      break;
    case "alerta":
      url += "&mensaje=" + encodeURIComponent(valor);
      break;
    case "audio":
      url += "&audio=" + encodeURIComponent(valor);
      break;
    case "navegar":
      url += "&destino=" + encodeURIComponent(valor);
      break;
  }

  generarQR(url);
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

if (window.location.search.includes("accion")) {
  ejecutarDirectiva();
}
