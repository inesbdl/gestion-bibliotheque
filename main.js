const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, // ou false selon ton besoin
      contextIsolation: false, // ou true pour plus de sécurité
    },
  });

  // Si tu es en développement, charge Nuxt via localhost
  if (process.env.NODE_ENV !== 'production') {
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // En production, charge le fichier généré par Nuxt
    mainWindow.loadFile(path.join(__dirname, 'client/.output/public/index.html'));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
