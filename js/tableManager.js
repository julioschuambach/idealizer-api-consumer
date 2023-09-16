let table = document.getElementById("contentTable");
let tableBody = document.getElementById("tableBody");

function insertAllIntoTable(array) {
    array.forEach(insertIntoTable);
}

function insertIntoTable(obj) {
    let tr = document.createElement("tr");

    insertIntoRow(tr, obj.id);
    insertIntoRow(tr, obj.description);
    insertIntoRow(tr, obj.author);
    insertIntoRow(tr, obj.expectation);
    insertIntoRow(tr, obj.createdDate);
    insertIntoRow(tr, obj.lastUpdatedDate);
    insertActions(tr);

    tableBody.appendChild(tr);
}

function insertIntoRow(tr, data) {
    let td = document.createElement("td");

    td.innerHTML = data;
    tr.appendChild(td);
}

function insertActions(tr) {
    let td = document.createElement("td");

    td.innerHTML = '<i class = "bx bx-edit" onclick = "putIdea(this.parentNode.parentNode)"></i><i class = "bx bx-trash" onclick = "deleteIdea(this.parentNode.parentNode)"></i>';
    tr.appendChild(td);
}