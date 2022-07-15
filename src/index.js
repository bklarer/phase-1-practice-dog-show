const dogURL = "http://localhost:3000/dogs/"

function requestDogData () {
    fetch(dogURL)
        .then(res => res.json())
        .then(dogs => createDogTable(dogs))
        .catch(error => console.log(error))
}

function createDogTable(dogs) {
    dogs.forEach(dog => createDogRow(dog))
}

function createDogRow(dog) {
    const dogTable = document.querySelector("#table-body")
    
    const dogRow = document.createElement("tr")
        dogRow.id = dog.id

    const dogName = document.createElement("td")
        dogName.textContent = dog.name

    const dogBreed = document.createElement("td")
        dogBreed.textContent = dog.breed

    const dogSex = document.createElement("td")
        dogSex.textContent = dog.sex

    const dogEdit = document.createElement("td")

    const dogEditButton = document.createElement("button")
        dogEditButton.textContent = "Edit Dog"
        dogEditButton.addEventListener("click", () => {
            console.log(dog)
            const dogForm = document.querySelector("#dog-form")
            dogForm.children[0].value = dog.name
            dogForm.children[1].value = dog.breed
            dogForm.children[2].value = dog.sex



            dogForm.addEventListener("submit", (e) => {
                e.preventDefault();
        
                dog.name = dogForm.children[0].value
                dog.breed = dogForm.children[1].value
                dog.sex = dogForm.children[2].value

                updateDog(dog)
                
            })

        })

    dogEdit.append(dogEditButton)

    dogRow.append(dogName, dogBreed, dogSex, dogEdit)

    dogTable.append(dogRow)
}


function updateDog (dog) {
    const dogTable = document.querySelector("#table-body")
    const updatedDog = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(dog)
    }
    
    fetch (dogURL+`${dog.id}`, updatedDog)
    .then(res => res.json())
    .then(response => {
        console.log(response)
        dogTable.innerHTML = ""
        requestDogData()
    })
    .catch(error => console.log(error))


}





document.addEventListener('DOMContentLoaded', () => {
requestDogData()
})
