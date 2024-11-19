function getItems() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

function handleFormSubmit(e) {
  e.preventDefault();

  const items = getItems();
  const id = localStorage.getItem("editIndex");
  const name = document.getElementById("itemName").value;

  if (id !== null) {
    items[id].name = name;
  } else {
    items.push({ name });
  }

  saveItems(items);
  localStorage.removeItem("editIndex");
  window.location.href = "gerenciamento.html";
}

function populateForm() {
  const editIndex = localStorage.getItem("editIndex");
  if (editIndex !== null) {
    const items = getItems();
    const item = items[editIndex];
    document.getElementById("itemId").value = editIndex;
    document.getElementById("itemName").value = item.name;
  }
}

function renderItems() {
  const items = getItems();
  const itemsTable = document.getElementById("itemsTable");
  if (itemsTable) {
    itemsTable.innerHTML = "";
    items.forEach((item, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${item.name}</td>
        <td class="actions">
          <button onclick="editItem(${index})">Editar</button>
          <button onclick="deleteItem(${index})">Excluir</button>
        </td>
      `;
      itemsTable.appendChild(row);
    });
  }
}

function editItem(index) {
  localStorage.setItem("editIndex", index);
  window.location.href = "index.html";
}

function deleteItem(index) {
  const items = getItems();
  items.splice(index, 1);
  saveItems(items);
  renderItems();
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("itemForm");
  if (form) {
    populateForm();
    form.addEventListener("submit", handleFormSubmit);
  }
  renderItems();
});
