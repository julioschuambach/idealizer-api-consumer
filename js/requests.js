let url = "https://localhost:7290/ideas";
let operation = "";

document.getElementById("modalForm").addEventListener(
    "submit", async (e) => {
        e.preventDefault();
        await request();
    }
);

function postIdea() {
    alert("postIdea()");
    operation = "post";
    openModal(operation);
}

function getIdeaById() {
    alert("getIdeaById()");
    openModal("getById");
}

function getAllIdeas() {
    alert("getAllIdeas()");
}

function putIdea() {
    alert("putIdea()");
}

function deleteIdea() {
    alert("deleteIdea()");
}

async function request() {
    switch (operation) {
        case "post":
            postRequest();
            break;
    }
}

async function postRequest() {
    let description = document.getElementById("ideaDescription").value;
    let author = document.getElementById("ideaAuthor").value;
    let expectation = document.getElementById("ideaExpectation").value;

    await fetch(url, {
        method: "POST",
        body: JSON.stringify({
            "description": description,
            "author": author,
            "expectation": expectation
        }),
        headers: {
            "Content-type": "application/json; charset = UTF-8"
        }
    }).then( (response) => {
        if (response.ok) {
            alert("postRequest: OK!");
            finalizeRequest();
        } else {
            alert("postRequest: NOT OK!");
        }
    }).catch ( (error) => {
        alert("postRequest: CATCH -> " + error.message);
    });
}

function finalizeRequest() {
    resetForm();
    closeModal();
}

function resetForm() {
    document.getElementById("modalForm").reset();
}