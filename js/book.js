
import { BookDetail } from "./Components/BookData.js";
import { cacHeader } from "./Components/CacNavigation.js";

let sectionRecommendations = document.querySelector("#section-recommendations")

const { createApp } = Vue;

createApp({
    components: {
        "book-details": BookDetail,
        "navegacion": cacHeader
    }
}).mount("#app")

// ---- Fetchs ----

