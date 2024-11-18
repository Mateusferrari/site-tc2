const itemForm = document.getElementById("itemForm");
const itemName = document.getElementById("itemName");
const itemId = document.getElementById("itemId");
const itemsTable = document.getElementById("itemsTable");

function getItems() {
  return JSON.parse(localStorage.getItem("items")) || [];
}

function saveItems(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

function renderItems() {
  const items = getItems();
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

itemForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const items = getItems();
  const id = itemId.value;
  const name = itemName.value;

  if (id) {
    items[id].name = name;
  } else {
    items.push({ name });
  }

  saveItems(items);
  renderItems();
  itemForm.reset();
  itemId.value = "";
});

function editItem(index) {
  const items = getItems();
  itemId.value = index;
  itemName.value = items[index].name;
}

function deleteItem(index) {
  const items = getItems();
  items.splice(index, 1);
  saveItems(items);
  renderItems();
}

renderItems();
