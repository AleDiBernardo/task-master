let items = [];

// Carica le attività salvate quando la pagina viene caricata
window.onload = function() {
    if (localStorage.getItem('items')) {
        items = JSON.parse(localStorage.getItem('items'));
        showItems();
    }
}

function addItem() {
    let itemText = document.getElementById('item').value;
    let importanceSelect = document.getElementById('importance');
    let selectedImportance = importanceSelect.options[importanceSelect.selectedIndex].value;

    if (itemText.trim() !== '') {
        let newItem = {
            text: itemText,
            completed: false,
            importance: selectedImportance,
            completionDateTime: null
        };
        items.push(newItem);
        document.getElementById('item').value = '';
        importanceSelect.value = 'none'; // Resetta il menu a tendina
        saveItems(); // Salva le attività
        showItems();
    }
}

function removeItem(index) {
    items.splice(index, 1);
    saveItems(); // Salva le attività
    showItems();
}

function completeItem(index) {
    if (!items[index].completed) {
        items[index].completed = true;
        items[index].completionDateTime = new Date().toLocaleString();
        saveItems(); // Salva le attività
        showItems();
    }
}

function setImportance(index, level) {
    items[index].importance = level;
    saveItems(); // Salva le attività
    showItems();
}

function openSidebar(index) {
    // Verifica se l'elemento cliccato è il pulsante "Completa"
    if (event.target.className !== 'complete-button') {
        let sidebarText = document.getElementById('sidebarText');
        sidebarText.innerText = items[index].text;
        document.getElementById('sidebar').style.width = '100%';
    }
}

function closeSidebar() {
    document.getElementById('sidebar').style.width = '0';
}

function saveItems() {
    // Salva le attività nel Web Storage
    localStorage.setItem('items', JSON.stringify(items));
}

function showItems() {
    let html = '';
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let importanceCircle = '';

        if (item.importance === 'low') {
            importanceCircle = '🟢'; // Green circle
        } else if (item.importance === 'medium') {
            importanceCircle = '🟡'; // Yellow circle
        } else if (item.importance === 'high') {
            importanceCircle = '🔴'; // Red circle
        }

        html += '<li class="' + (item.completed ? 'completed' : '') + '" onclick="openSidebar(' + i + ')">';
        html += importanceCircle;
        html += '<span class="text">' + item.text + '</span>';
        if (item.completed) {
            html += '<span class="completed-text"> (Completato il ' + item.completionDateTime + ')</span>';
        } else {
            html += '<span class="complete-button" onclick="completeItem(' + i + ')">Completa</span>';
        }
        html += '<span class="remove-button" onclick="removeItem(' + i + ')">×</span>';
        html += '</li>';
    }
    document.getElementById('list').innerHTML = html;
}
