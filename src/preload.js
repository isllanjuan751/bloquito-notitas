const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("M_files", {
    Abrir: (nome) => ipcRenderer.invoke("abrir_arquivo", nome),
    Salvar: (nome, conteudo) => ipcRenderer.invoke("salvar", nome, conteudo),
    Excluir: (nome) => ipcRenderer.invoke("excluir", nome),
    Criar: (nome, conteudo) => ipcRenderer.invoke("criar", nome, conteudo),
});

contextBridge.exposeInMainWorld("sos", {
    Versions: () => ipcRenderer.invoke("so_o"),
    User: () => ipcRenderer.invoke("name_user"),
});