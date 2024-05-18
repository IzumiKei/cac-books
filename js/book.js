
let sectionRecommendations = document.querySelector("#section-recommendations")
let rawData = window.location.search
let parsedData = new URLSearchParams(rawData)

let isFullSynopsisDisplayed = false;


function changeSynopsisDisplayState(){
    let bookSynopsis = document.getElementsByClassName("book-synopsis")[0]
    let synopsisButton = document.getElementById("synopsis-button")

    if (isFullSynopsisDisplayed){
        bookSynopsis.style.height = "320px";
        synopsisButton.innerText = "Mostrar más"
    } else {
        bookSynopsis.style.height = "auto";
        synopsisButton.innerText = "Mostrar menos"
    }
    isFullSynopsisDisplayed = ! isFullSynopsisDisplayed
}
// ---- Fetchs ----

fetchVolumeById(parsedData.get("id"))
            .then(response => response.json())
            .then(data => {
                
                
                
                loadBookDataFromAPI(data)
                
                if (data.volumeInfo.hasOwnProperty("categories")){
                    let category = data.volumeInfo.categories[0]
                    fetchVolumesBySubject(category, "relevance")
                        .then(response => response.json())
                        .then(data => {
                        if (data.totalItems > 0){
                            console.log("Recommended data")
                            console.log(data)
                            createBookList(sectionRecommendations, data)
                        } else {
                            document.getElementById("section-recommendations").style.display = "none"
                        }
                        
                    })
                } else {
                    console.log("No categories for this book")
                    document.getElementById("section-recommendations").style.display = "none"
                }
                
            })

