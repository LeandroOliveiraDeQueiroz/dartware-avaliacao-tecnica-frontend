## Electron.js

Shell (concha) multiplataforma. Shell: interface para acesso as serviços dos sistema operacional via CLI (linha de comando/ programação) e GUI (interface gráfica).

Multiplataforma: MacOS, Linux e Windows

Arquitetura do Electron

O Electron roda em Node.js com uma arquitetura de multiprocessos.

O processo principal que utilizando o Node.js tem acesso recursos do sistema operacional (utilizando chamadas nativas) e funciona como o Backend. Esse processo também é responsável por criar as janelas das aplicação (na prática o processo de cada janela - BrowswerWindow, Tray)

Ao abrir uma janela da aplicação é iniciado um processo de renderização. Cada processo roda um Chromium que renderiza a página web. Assim é possível utilizar qualquer tecnologia web dentro desse processo, como : typescript, React.js, Vue.js, Angular.js

- Seguranças na arquitetura

Por segurança nenhum processo de renderização tem acesso ao processo principal. Assim, a comunicação é feita por IPC (Inter Process Comunication) usando o método RCP.

Cada janela tem um processo separado igual é feito no Google Chrome, assim uma falha de segurança em uma janela/aba não afeta as outras.

Comunicação (IPC - Inter-Process Communication)

Comunicação é realizada por passagem de messagem por canais pré-definidos pelo programador ("nóis") a partir dos módulos ipcMain e ipcRenderer. Os canais são arbitrarios e bidirecional.

--- Comunicação

-- Preload script

Script que roda nos processos de renderização antes do conteúdo web começar a carregar.

Ele anexado a janela nas configurações da janela (BrowerWindow) no main.js

const { BrowserWindow } = require('electron')
//...
const win = new BrowserWindow({
webPreferences: {
preload: 'path/to/preload.js',
},
})

O script pode acessar as API's do Node.js e serve para compartilhar uma interface de janela global com o renderers (processos de redenrização).

Assim é possível compartilhar variáveis, métodos, procedimentos e ,principalmente, a exposição indireta (ver Isolamento de Contexto de Processos) do ipcRenderer

```
preload.js
------------------------
// preload with contextIsolation enabled
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})

```

```
renderer.js
---------------
// use the exposed API in the renderer
window.myAPI.doAThing()
```

-- Isolamento de Contexto de Processos

Por segurança é importante separar o Electron (por processos), como já dito, e também o preload script por causas das APIs que eles podem acessar.

Por isso, para passar o dados para os renderes utilizasse o contextBridge.

Desativando o contextIsolation é possível utilizar o load script assim:

```
preload.js
-----
// preload with contextIsolation disabled
window.myAPI = {
  doAThing: () => {}
}

```

```
renderer.js
--------
// use the exposed API in the renderer
window.myAPI.doAThing()
```

Considerações:

Não expor a IPC API's diretamente. Cada método deve prover somente uma mensagem IPC.

```
// ❌ Bad code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

```
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

-- Render para o Main

Mandar mensangem: ipcRenderer.send
Receber: ipcMain.on

-- Render para o Main (Ida e Volta)

Mandar mensangem: ipcRenderer.invoke
Receber: ipcMain.handle('dialog:openFile', (event, params)=> any)

Main to renderer

Receber: ipcRenderer.on
Mandar mensangem: webContents.send

Rodar Electron + React

Pela porta

webpack

build -> electron on js files

#Tray
Tray - config básica:

- image
- Title
- ToolTip

usar:

- menu padrão do SO passando os valores e usando os eventos da tray.
- Criar uma janela na posição do tray. Ao clicar no try fazer toogle. Obs.: dificuldade de calcular posição
