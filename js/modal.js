let modalTitle = document.getElementById("modalTitle");
let ideaIdFormField = document.getElementById("ideaIdFormField");
let ideaDescriptionFormField = document.getElementById("ideaDescriptionFormField");
let ideaAuthorFormField = document.getElementById("ideaAuthorFormField");
let ideaExpectationFormField = document.getElementById("ideaExpectationFormField");

function openModal(operation) {
    let modal = document.getElementById("modal");
    modal.classList.add("show-modal");

    showFields(operation);
}

function closeModal() {
    let modal = document.getElementById("modal");
    modal.classList.remove("show-modal");
}

function showFields(operation) {
    switch (operation) {
        case "post":
            modalTitle.innerHTML = "New register"
            ideaIdFormField.style.display = "none";
            ideaDescriptionFormField.style.display = "block";
            ideaAuthorFormField.style.display = "block";
            ideaExpectationFormField.style.display = "block";
            break;

        case "getById":
            modalTitle.innerHTML = "Search"
            ideaIdFormField.style.display = "block";
            ideaDescriptionFormField.style.display = "none";
            ideaAuthorFormField.style.display = "none";
            ideaExpectationFormField.style.display = "none";
            break;
    }
}