import { verificaCita } from "../funciones.js";
import { nueva_cita } from "../selectores.js";

class App{
    constructor(){
        this.initApp();
    }

    initApp(){
        nueva_cita.addEventListener('submit', verificaCita);
    }
}

export default App;