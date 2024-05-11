

// ---- Variables ----
let sectionComputers = document.querySelector("#section-computers")
let sectionManagement = document.querySelector("#section-management")
let sectionfiction = document.querySelector("#section-fiction")




// ---- Fetchs ----

fetchVolumesBySubject("computers")
    .then(responce => responce.json())
    .then(data => {
        console.log("Computers data")
        console.log(data)
        createBookList(sectionComputers, data)
    })

fetchVolumesBySubject("leadership")
    .then(responce => responce.json())
    .then(data => {
        console.log("Leadership data")
        console.log(data)
        createBookList(sectionManagement, data)
    })

fetchVolumesBySubject("fiction")
    .then(responce => responce.json())
    .then(data => {
        console.log("Fiction data")
        console.log(data)
        createBookList(sectionfiction, data)
    })

