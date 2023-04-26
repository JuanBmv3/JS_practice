class Cita {
    constructor(){
        this.citas = [];
    }

    guardarCita(cita){
        this.citas = [...this.citas, cita]
    }

    eliminarCita(id){
        this.citas = [...this.citas.filter( cita => cita.id !== id)];
    }

    acualizarCita(citaNueva){
        this.citas = [...this.citas.map( cita => cita.id === citaNueva.id ? citaNueva : cita)]

        console.log(this.citas)
    }
  
}

export default Cita;