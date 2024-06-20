
import {cacHeader, cacFooter} from "./Components/CacNavigation.js";
import {BookList, BookItem } from "./Components/BookList.js";

const {createApp} = Vue;


const IndexApp = {
    props: ["firstTopic", "secondTopic", "thirdTopic"],
    components:{
        "book-list": BookList
    },
    template: `
        <book-list section-title="Ficción" :section-topic="firstTopic"/>
        <book-list section-title="Informática" :section-topic="secondTopic"/>
        <book-list section-title="Liderazgo" :section-topic="thirdTopic"/>`
    
}

// Vue
createApp({
    components: {
        "navegacion": cacHeader,
        "pie": cacFooter,
        "index-app": IndexApp
    },
    data(){
        return {
            userIsLogged: localStorage.getItem("isLogged"),
            userData: {}
        }
    },
    methods: {
        checkLogInStatus(){
            if (localStorage.getItem("isLogged")){
                alert("Logged as user " + localStorage.getItem("userId"));
            }
        }
    }
}).mount("#app")



