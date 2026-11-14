const input_caminho = document.getElementById("Caminho");
const btn_abrir = document.getElementById("Abrir");
const btn_salvar = document.getElementById("Salvar");
const input_conteudo = document.getElementById("Conteudo");
const btn_apagar = document.getElementById("Apagar");
const btn_criar = document.getElementById("Criar");


btn_abrir.addEventListener("click", async() => {
    if (input_caminho.value === "Help") {
        input_conteudo.value = "Olá, caro usuario, para Excluir, coloque um caminho e clique em excluir.\n Para Criar, coloque o caminho e um conteudo e clique em criar.\n Para salvar, coloque um caminho e conteudo e clique em salvar.\n Para abrir, apenas cloque o caminho e clique em Abrir"
        return;
    } else if (input_caminho.value === "Owner") {
        input_conteudo.value = "O criador é Isllan!";
        return;
    } else if (input_caminho.value === "body: true, blue") {
        document.body.style.backgroundColor = "blue";
        return;
    } else if (input_caminho.value === "system: info, object: System, OS: true") {
        const dados = await window.sos.Versions();
        input_conteudo.value = dados;
        return;
    } else if (input_caminho.value === "system: info-help") {
        input_conteudo.value = "Help: mostrar informações de como usar\nOwner: Mostra o criador\nbody: true, blue: Muda o fundo para azul\nsystem: info, object: System, OS: true: Mostra informações do sistema\nsystem: info-user: Mostra informação do usuario.";
        return;
    } else if (input_caminho.value === "system: info-user") {
        const info = await window.sos.User();
        input_conteudo.value = info;
        return;
    } else if (input_caminho.value === "") {
        input_conteudo.value = "system: info-help";
        return;
    }
    
    const nome = input_caminho.value;
    const texto = await window.M_files.Abrir(nome);
    input_conteudo.value = texto;
});

btn_salvar.addEventListener("click", async() => {
    const nome = input_caminho.value;
    const conteudo = input_conteudo.value;
    await window.M_files.Salvar(nome, conteudo);
    alert("Sucesso");
});

btn_apagar.addEventListener("click", async() => {
    const nome = input_caminho.value;
    await window.M_files.Excluir(nome);
    alert("Sucesso");
})

btn_criar.addEventListener("click", async() => {
    const nome = input_caminho.value;
    const conteudo = input_conteudo.value;

    await window.M_files.Criar(nome, conteudo);
    alert("Sucesso");
});

const texto = async() => {
    const info = await window.sos.User();
    await window.M_files.Criar("Info-user", info);
}
texto();