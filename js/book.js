
let sectionRecommendations = document.querySelector("#section-recommendations")

// ---- Fetchs ----

fetchVolumeById(localStorage.selectedBookID)
            .then(response => response.json())
            .then(data => {

                loadBookDataFromAPI(data)

            })

fetchVolumesBySubject("technology")
            .then(response => response.json())
            .then(data => {
                console.log("Recommended data")
                console.log(data)
                createBookList(sectionRecommendations, data)
            })