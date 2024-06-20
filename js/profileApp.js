import {cacHeader, cacFooter} from "./Components/CacNavigation.js";

const {createApp} = Vue;

// Vue
createApp({
    components: {
        "navegacion": cacHeader,
        "pie": cacFooter,
    },
    data() {
        return{
            sections: [
                {name: "favoritos", isSelected: {"selected": true}},
                {name: "carrito", isSelected: {"selected": false}},
                {name: "log_out", isSelected: {"selected": false}}],
            selectedSection: 0,
        }
    },
    methods: {
        selectSection(sectionIndex){
            this.sections.forEach((value, index) => {
                if (sectionIndex == index){
                    this.selectedSection = value.name;
                    value.isSelected["selected"] = true;
                } else {
                    value.isSelected["selected"] = false;
                }
            })
        },
        logOut(){
            localStorage.setItem("isLogged", 0);
            localStorage.setItem("userId", "")
            location = "/index.html"
        }
    }
}).mount("#app")