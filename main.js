const { app, BrowserWindow } = require('electron');
const { exec } = require('child_process');
const http = require('http');

let mainWindow;
let nuxtProcess;
let backendProcess;

function waitForNuxt(url, timeout = 30000) {
  return new Promise((resolve, reject) => {
    const startTime = Date.now();

    function check() {
      http.get(url, (res) => {
        if (res.statusCode === 200) {
          console.log("✅ Nuxt est prêt !");
          resolve();
        } else {
          console.log("❌ Nuxt pas encore prêt...");
          setTimeout(check, 1000);
        }
      }).on("error", () => {
        if (Date.now() - startTime > timeout) {
          reject(new Error("⏳ Temps d'attente dépassé pour Nuxt !"));
        } else {
          console.log("🔄 Attente de Nuxt...");
          setTimeout(check, 1000);
        }
      });
    }

    check();
  });
}

function stopBackend() {
  if (backendProcess) {
    console.log("⏏️ Fermeture propre du backend...");
    backendProcess.kill('SIGTERM');
  }
}

app.whenReady().then(async () => {
  console.log("🚀 Lancement du backend Express...");
  backendProcess = exec('node backend/app.js', (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erreur backend :", stderr);
    } else {
      console.log("🎉 Backend lancé avec succès :", stdout);
    }
  });

  console.log("🌍 Lancement du serveur Nuxt...");
  nuxtProcess = exec('npm run start --prefix client', (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erreur Nuxt :", stderr);
    } else {
      console.log("🎉 Serveur Nuxt lancé :", stdout);
    }
  });

  try {
    await waitForNuxt("http://localhost:3000");
  } catch (error) {
    console.error(error);
    stopBackend();
    return;
  }

  console.log("🖥️ Création de la fenêtre Electron...");
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  console.log("🌍 Chargement de Nuxt dans Electron...");
  mainWindow.loadURL("http://localhost:3000");

  mainWindow.on("closed", () => {
    console.log("🔒 Fermeture de la fenêtre Electron...");
    stopBackend();
    if (nuxtProcess) {
      console.log("⏏️ Fermeture du processus Nuxt...");
      nuxtProcess.kill();
    }
  });
});

app.on("window-all-closed", () => {
  console.log("🛑 Fermeture de l'application Electron...");
  stopBackend();
  if (nuxtProcess) {
    console.log("⏏️ Fermeture du processus Nuxt...");
    nuxtProcess.kill();
  }
  app.quit();
});

app.on('before-quit', () => {
  console.log("💥 Application se ferme, tuer les processus...");
  stopBackend();
  if (nuxtProcess) nuxtProcess.kill();
});
