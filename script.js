const campo = document.getElementById("campo-tarefa");
const botao = document.getElementById("botao-adicionar");
const lista = document.getElementById("lista-tarefas");
const contador = document.getElementById("contador-tarefas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];


/* =========================
   ADICIONAR TAREFA
========================= */

botao.addEventListener("click", function () {

    if (campo.value.trim() === "") {
        alert("Digite uma tarefa!");
        return;
    }

    tarefas.push({
        texto: campo.value,
        concluida: false
    });

    campo.value = "";

    salvarTarefas();
    mostrarTarefas();
});


/* =========================
   MOSTRAR TAREFAS
========================= */

function mostrarTarefas() {

    lista.innerHTML = "";

    tarefas.forEach(function (tarefa, index) {

        let item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <span>${tarefa.texto}</span>

            <div>

                <button onclick="concluir(${index})" title="Concluir">
                    <i class="fa-solid fa-circle-check"></i>
                </button>

                <button onclick="editar(${index})" title="Editar">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button onclick="excluir(${index})" title="Excluir">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
        `;

        lista.appendChild(item);
    });

    contador.textContent = tarefas.length +
        (tarefas.length === 1
            ? " tarefa na lista"
            : " tarefas na lista");
}


/* =========================
   CONCLUIR TAREFA
========================= */

function concluir(index) {

    tarefas[index].concluida = !tarefas[index].concluida;

    salvarTarefas();
    mostrarTarefas();
}


/* =========================
   EDITAR TAREFA
========================= */

function editar(index) {

    const novoTexto = prompt(
        "Edite sua tarefa:",
        tarefas[index].texto
    );

    if (novoTexto === null) {
        return;
    }

    if (novoTexto.trim() === "") {
        alert("A tarefa não pode ficar vazia!");
        return;
    }

    tarefas[index].texto = novoTexto.trim();

    salvarTarefas();
    mostrarTarefas();
}


/* =========================
   EXCLUIR TAREFA
========================= */

function excluir(index) {

    const confirmar = confirm(
        "Tem certeza que deseja excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    tarefas.splice(index, 1);

    salvarTarefas();
    mostrarTarefas();
}


/* =========================
   SALVAR TAREFAS
========================= */

function salvarTarefas() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );
}


/* =========================
   MODO ESCURO
========================= */

const botaoTema =
    document.getElementById("botao-alternar-tema");

botaoTema.addEventListener("click", function () {

    document.body.classList.toggle("tema-escuro");

    if (document.body.classList.contains("tema-escuro")) {

        botaoTema.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        botaoTema.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }
});


/* =========================
   CARREGAR TAREFAS AO ABRIR
========================= */

mostrarTarefas();