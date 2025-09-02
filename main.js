const { app, BrowserWindow, Menu } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const http = require('http');

let mainWindow;
let nuxtProcess;
let backendProcess;

const isPackaged = app.isPackaged;
const appPath = isPackaged ? path.dirname(process.execPath) : __dirname;

// ressources qui sont dans dist/win-unpacked suit au build electron
// client est récupéré à partir du build de nuxt (client/.output/public)
//tout ça est géré dans le package.json au niveau de buil → files
const backendPath = path.join(appPath,'resources','backend', 'app.js');
const nuxtDistPath = path.join(appPath,'resources', 'client');

const nuxtUrl = "http://localhost:3000";

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
    console.log("⏏️ Fermeture du backend...");
    backendProcess.kill('SIGTERM');
  }
}

app.whenReady().then(async () => {
  console.log("🚀 Lancement du backend Express...");
  backendProcess = exec(`node ${backendPath}`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Erreur backend :", stderr);
    } else {
      console.log("🎉 Backend lancé avec succès :", stdout);
    }
  });

  console.log("🌍 Lancement du serveur Nuxt...");
  if (isPackaged) {
    const express = require('express');
    const nuxtServer = express();
    nuxtServer.use(express.static(nuxtDistPath));
    nuxtServer.get('*', (req, res) => {
      res.sendFile(path.join(nuxtDistPath, 'index.html'));
    });
    nuxtServer.listen(3000, () => console.log('✅ Nuxt lancé en production'));
  } else {
    nuxtProcess = exec('npm run start --prefix client', (err, stdout, stderr) => {
      if (err) {
        console.error("❌ Erreur Nuxt :", stderr);
      } else {
        console.log("🎉 Serveur Nuxt lancé :", stdout);
      }
    });
  }

  try {
    await waitForNuxt(nuxtUrl);
  } catch (error) {
    console.error(error);
    stopBackend();
    return;
  }

  const template = [
    {
      label: 'Fichier',
      submenu: [
        { role: 'quit', label:"Quitter" }
      ]
    },
    {
      label: 'Écran',
      submenu: [
        { role: 'reload', label: "Rafraichir" },
        // { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom', label: "Réinitialiser le zoom" },
        { role: 'zoomIn', label: "Zoom +" },
        { role: 'zoomOut', label: "Zoom -" },
        { type: 'separator' },
        { role: 'togglefullscreen', label: "Plein écran" }
      ]
    },
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

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
  mainWindow.loadURL(nuxtUrl);

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
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  console.log("💥 Application se ferme, tuer les processus...");
  stopBackend();
  if (nuxtProcess) nuxtProcess.kill();
});
