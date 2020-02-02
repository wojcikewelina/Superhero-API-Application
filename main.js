// Zrobić zadanie z wykorzystaniem Fetch'a:

// Pobierz z dostarczonego apilistę osób
// 2.Wyświetl wyniki w liście w formacie (name: publisher)
// 3.Po kliknięciu w element listy pokaż wszystkie informacje o osobie 
// 4.Stwórz formularz do dodawania nowych osób
// 5.Stwórz możliwość Usuwania osób
// 6.Stwórz możliwość edycji istniejących osób
// 7.*Dodaj loadingi informacje o błędach

const API_URL = "https://us-central1-itfighters-hero.cloudfunctions.net/api/hero";

window.onload = () => {

    const ulPartOfList = document.querySelector("ul");
    const detailsOfSelectedHero = document.querySelector("div");
    const urlOfPicture = document.querySelector("img");

    const inputSuperhero = document.querySelector("#inputSuperhero");
    const inputPublisher = document.querySelector("#inputPublisher");
    const inputfirstApperance = document.querySelector("#inputfirstApperance");
    const inputCharacters = document.querySelector("#inputCharacters");
    const inputURL = document.querySelector("#inputURL");
    const submitButton = document.querySelector("#submitAddition");

    const inputId = document.querySelector("#inputId");
    const inputSuperheroEdit = document.querySelector("#inputSuperheroEdit");
    const inputPublisherEdit = document.querySelector("#inputPublisherEdit");
    const inputfirstApperanceEdit = document.querySelector("#inputfirstApperanceEdit");
    const inputCharactersEdit = document.querySelector("#inputCharactersEdit");
    const inputURLEdit = document.querySelector("#inputURLEdit");
    const editButton = document.querySelector("#submitEdittion");

    fetch(API_URL)
        .then(resp => resp.json())
        .then(respJson => {
            const arreyOfHeroes = respJson;
            arreyOfHeroes.forEach(element => createLi(element));
        });


    function createLi(element) {
        var liCreation = document.createElement("li");
        liCreation.innerText = "id: " + element.id + ", superhero: " +
            element.superhero + ", publisher: " + element.publisher;

        var deleteButton = document.createElement("button")
        deleteButton.innerText = "x";

        deleteButton.addEventListener("click", () => {
            fetch(API_URL + "/" + element.id, {
                method: "DELETE",
            })
                .then(() => location.reload())
        });

        liCreation.appendChild(deleteButton);

        liCreation.addEventListener("click", () => {
            fetch(API_URL + "/" + element.id)
                .then((resp) => resp.json())
                .then((respJson) => {

                    var detailsOfHero = "Id:" + respJson.id +
                        "\n Superhero: " + respJson.superhero +
                        "\n Publisher: " + respJson.publisher +
                        "\n FirstApperance: " + respJson.firstAppearance +
                        "\n Characters " + respJson.characters +
                        "\n Description " + respJson.description;
                    detailsOfSelectedHero.innerText = detailsOfHero;
                    urlOfPicture.setAttribute("src", respJson.url);
                })
        })
        ulPartOfList.appendChild(liCreation);
    };


    submitButton.addEventListener("click", () => {
        fetch(API_URL, {
            method: "POST",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                superhero: inputSuperhero.value,
                publisher: inputPublisher.value,
                firstAppearance: inputfirstApperance.value,
                characters: inputCharacters.value,
                url: inputURL.value
            })
        })
            .then(clearInput())
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    Promise.reject("http code: ", resp.status);
                } console.log("response: ", resp);
            }).then(data => console.log("dane od serwera", data))
            .catch(err => console.warn("nie działa", err))
            .then(() => location.reload())
    })

    editButton.addEventListener("click", () => {
        // alert(API_URL + "/" + inputId.value)

        fetch(API_URL + "/" + inputId.value, {
            method: "PUT",
            headers: { "Content-type": "application/json; charset=UTF-8" },
            body: JSON.stringify({
                superhero: inputSuperheroEdit.value,
                publisher: inputPublisherEdit.value,
                firstAppearance: inputfirstApperanceEdit.value,
                characters: inputCharactersEdit.value,
                url: inputURLEdit.value,
            })
        })
            .then(clearInput())
            .then(() => location.reload())
    });
    
}

function clearInput() {
    inputSuperhero.value = "";
    inputPublisher.value = "";
    inputfirstApperance.value = "";
    inputCharacters.value = "";
    inputURL.value = "";
    inputSuperheroEdit.value = "";
    inputPublisherEdit.value = "";
    inputfirstApperanceEdit.value = "";
    inputCharactersEdit.value = "";
    inputURLEdit.value = "";
    inputId.value = ""
};










