let url = "https://localhost:7290/ideas";
let operation = "";
let inMemoryEntity;

document.getElementById("modalForm").addEventListener(
    "submit", async (e) => {
        e.preventDefault();
        await request();
    }
);

function postIdea() {
    operation = "post";
    openModal(operation);
}

function getIdeaById() {
    operation = "getById";
    openModal(operation);
}

function getAllIdeas() {
    getAllRequest();
}

function putIdea(entityData) {
    operation = "put";
    createInMemoryEntity(entityData);
    openModal(operation);
}

function deleteIdea(entityData) {
    createInMemoryEntity(entityData);
    let confirmDelete = confirm("Do you really want to delete '" + inMemoryEntity.description + "'?");
    if (confirmDelete) {
        deleteRequest(inMemoryEntity.id);
    } else {
        deleteInMemoryEntity();
    }
}

async function request() {
    switch (operation) {
        case "post":
            await postRequest();
            break;

        case "getById":
            await getByIdRequest();
            break;

        case "put":
            await putRequest();
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
            closeModal();
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
                closeModal();
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

async function putRequest() {
    await fetch(url + "/" + inMemoryEntity.id, {
        method: "PUT",
        body: JSON.stringify({
            "description": document.getElementById("ideaDescription").value,
            "expectation": document.getElementById("ideaExpectation").value
        }),
        headers: {
            "Content-type": "application/json; charset = UTF-8"
        }
    }).then( async (response) => {
        if (response.ok) {
            alert("putRequest: OK!");
            closeModal();
        } else {
            alert("putRequest: NOT OK!");
        }
    }).catch( (error) => {
        alert("putRequest: CATCH -> " + error.message);
    }).finally( () => {
        deleteInMemoryEntity();
    });
}

async function deleteRequest(id) {
    await fetch(url + "/" + id, {
        method: "DELETE"
    }).then( async (response) => {
        if (response.ok) {
            alert("deleteRequest: OK!");
        } else {
            alert("deleteRequest: NOT OK!");
        }
    }).catch( (error) => {
        alert("deleteRequest: CATCH -> " + error.message);
    }).finally( () => {
        deleteInMemoryEntity();
    });
}

function resetForm() {
    document.getElementById("modalForm").reset();
}

class Idea {
    constructor(entityData) {
        let entityChildren = entityData.children;

        this.id = entityChildren[0].innerHTML;
        this.description = entityChildren[1].innerHTML;
        this.author = entityChildren[2].innerHTML;
        this.expectation = entityChildren[3].innerHTML;
        this.createdDate = entityChildren[4].innerHTML;
        this.lastUpdatedDate = entityChildren[5].innerHTML;
    }
}

function createInMemoryEntity(entityData) {
    inMemoryEntity = new Idea(entityData);
}

function deleteInMemoryEntity() {
    inMemoryEntity = null;
}