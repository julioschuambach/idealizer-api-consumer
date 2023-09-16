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
    operation = "getById";
    openModal(operation);
}

function getAllIdeas() {
    alert("getAllIdeas()");
    getAllRequest();
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

        case "getById":
            getByIdRequest();
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
    }).then( async (response) => {
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

async function getByIdRequest() {
    let id = document.getElementById("ideaId").value;

    if (id == "") {
        alert("Invalid identifier.");
    } else {
        await fetch(url + "/" + id, {
            method: "GET"
        }).then( async (response) => {
            if (response.ok) {
                alert("getByIdRequest: OK!");
                insertIntoTable(await response.json());
                finalizeRequest();
            } else {
                alert("getByIdRequest: NOT OK!");
            }
        }).catch( (error) => {
            alert("getByIdRequest: CATCH -> " + error.message);
        });
    }
}

async function getAllRequest() {
    await fetch(url, {
        method: "GET"
    }).then( async (response) => {
        if (response.ok) {
            alert("getAllRequest: OK!");
            insertAllIntoTable(await response.json());
        } else {
            alert("getAllRequest: NOT OK!");
        }
    }).catch( (error) => {
        alert("getAllRequest: CATCH -> " + error.message);
    });
}

function finalizeRequest() {
    resetForm();
    closeModal();
}

function resetForm() {
    document.getElementById("modalForm").reset();
}