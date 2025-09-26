function adicionarTarefa(event) {
  event.preventDefault(); // evita que o form recarregue a página

  const input = document.getElementById('tarefaInput');
  const texto = input.value.trim();
  if (!texto) return; // não adiciona tarefa vazia

  const ul = document.getElementById('listaTarefas');

  // cria <li> com flex
  const li = document.createElement('li');
  li.style.display = 'flex';
  li.style.alignItems = 'center';
  li.style.justifyContent = 'space-between';
  li.style.marginBottom = '8px';
  li.style.padding = '4px 0';

  // label para checkbox + texto
  const label = document.createElement('label');
  label.style.display = 'flex';
  label.style.alignItems = 'center';
  label.style.gap = '8px';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';

  const span = document.createElement('span');
  span.textContent = texto;

  label.appendChild(checkbox);
  label.appendChild(span);

  // botão "X" para excluir
  const btnExcluir = document.createElement('button');
  btnExcluir.textContent = 'X';
  btnExcluir.style.cursor = 'pointer';
  btnExcluir.style.background = 'transparent';
  btnExcluir.style.marginLeft = '60px';
  btnExcluir.style.width = '25px';
  btnExcluir.style.height = '25px';
  btnExcluir.style.marginTop = '2px';
  btnExcluir.style.border = 'none';
  btnExcluir.style.color = 'black';
  btnExcluir.style.fontWeight = 'bold';
  btnExcluir.addEventListener('click', () => {
    li.remove(); // remove a tarefa inteira
  });

  // monta a tarefa
  li.appendChild(label);      // checkbox + texto
  li.appendChild(btnExcluir); // botão X
  ul.appendChild(li);

  input.value = '';
  input.focus();
}

// Função para salvar todas as tarefas no localStorage
function salvarTarefas() {
  const ul = document.getElementById('listaTarefas');
  const tarefas = [];

  ul.querySelectorAll('li').forEach(li => {
    const checkbox = li.querySelector('input[type="checkbox"]');
    const texto = li.querySelector('span').textContent;
    tarefas.push({ texto, concluida: checkbox.checked });
  });

  localStorage.setItem('minhasTarefas', JSON.stringify(tarefas));
}

// Função para carregar tarefas do localStorage
function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem('minhasTarefas')) || [];
  const ul = document.getElementById('listaTarefas');
  ul.innerHTML = ''; // limpa a lista antes de popular

  tarefas.forEach(t => {
    const li = document.createElement('li');
    li.style.display = 'flex';
    li.style.alignItems = 'center';
    li.style.justifyContent = 'space-between';
    li.style.marginBottom = '8px';

    const label = document.createElement('label');
    label.style.display = 'flex';
    label.style.alignItems = 'center';
    label.style.gap = '8px';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = t.concluida;

    const span = document.createElement('span');
    span.textContent = t.texto;
    if (t.concluida) span.style.textDecoration = 'line-through';

    // atualiza localStorage quando marcar/desmarcar
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) span.style.textDecoration = 'line-through';
      else span.style.textDecoration = 'none';
      salvarTarefas();
    });

    // botão de excluir
    const btnExcluir = document.createElement('button');
    btnExcluir.textContent = 'X';
    btnExcluir.style.cursor = 'pointer';
    btnExcluir.style.background = 'transparent';
    btnExcluir.style.border = 'none';
    btnExcluir.style.color = 'red';
    btnExcluir.style.fontWeight = 'bold';
    btnExcluir.addEventListener('click', () => {
      li.remove();
      salvarTarefas();
    });

    label.appendChild(checkbox);
    label.appendChild(span);
    li.appendChild(label);
    li.appendChild(btnExcluir);
    ul.appendChild(li);
  });
}

// Carrega as tarefas automaticamente quando a página abrir
document.addEventListener('DOMContentLoaded', () => {
  carregarTarefas();
});
