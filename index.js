const express = require('express')
const app = express();
const bd = [] //Base de Datos
app.use(express.json())
//Validaciones 
function esValido(fullName,age,curse){
    const cuenta = [ fullName.trim().slice(fullName.trim().indexOf(" "),-1), fullName.trim().slice(0,fullName.trim().indexOf(" ")) ]
    switch (true){
        case ((cuenta[0] == " ") && (cuenta[1] == " ")): //Nombre y Apellido este no funco
            return {
                error: 'Debe contener nombre y apellido',
                estado: false
            }
            break;
        case (typeof fullName != 'string'): //Nombre no es String
            return {
                error: 'El nombre debe ser de tipo "string" ',
                estado: false
            }
            break;
        case (fullName.trim() == ""): //Nombre Vacío
            return {
                error: 'El nombre completo no puede estar vacío',
                estado: false
            }
            break;
        case (typeof curse != 'string'): //Curso no es String
            return {
                error: 'El curso debe ser de tipo "string"',
                estado: false
            }
            break;
        case (curse.trim() == ""): //Curso vacío
            return {
                error: 'El curso no puede estar vacío',
                estado: false
            }
            break;
        case (typeof age != 'number'): //Edad no es Number
            return {
                error: 'La edad debe ser de tipo "number"',
                estado: false
            }
            break;
        case (age < 12 || age > 25): //Edad no adecuada para un estudiante
            return {
                error: 'La edad debe estar entre los valores 12 y 2',
                estado: false
            }
            break;
        default:
            return {
                estado: true
            }
            break;
    }
    return true;
}
//GET 
app.get('/students',(req,res)=>{
    res.status(200).send(bd)
})
//GET POR ID
app.get('/students/:id',(req,res)=>{
    const {id} = req.params
    const estudiante = bd.find((element)=>element.id == parseInt(id))
    console.log(estudiante);
    if (estudiante === undefined){
        res.status(404).send('No se encontró el estudiante')
    }
    else{
        res.status(200).send(estudiante)
    }
})
//POST
app.post('/students',(req,res)=>{
    const id = new Date().getTime();
    const { fullName,age,curse } = req.body
    const {estado, error} = (esValido(fullName,age,curse))
    if (estado){
        console.log(estado)
        bd.push({
            id:parseInt(id),
            fullName,
            age,
            curse
        })
        res.status(200).send('Estudiante agregado correctamente')
    }else{
        console.log("No valido")
        res.status(400).send(error)
    }
})
//DELETE
app.delete('/students/:id',(req,res)=>{
    const {id} = req.params
    const indice = bd.findIndex((element)=>element.id === parseInt(id))
    console.log(indice)
    if (indice === -1){
        res.status(404).send('No se encontró el estudiante')
    }else{
        bd.splice(indice,1)
        res.status(200).send('Estudiante eliminado correctamente')
    }
})
//PUT 
app.put('/students/:id',(req,res)=>{
    const { id } = req.params
    const { fullName, age, curse} = req.body
    const { estado, error } = (esValido(fullName, age, curse))
    if (!estado){
        res.status(400).send(error)
    }else{
        const indice = bd.findIndex((element)=>element.id === parseInt(id))
        if (indice === -1){
            res.status(404).send('No se encontró el estudiante')}
            else{
                bd[indice] = {
                    id:parseInt(id),
                    fullName,
                    age,
                    curse
                }
                res.status(200).send('Estudiante modificado correctamente')
            }
    }
})


//Servidor
app.listen(4321,()=>{
    console.log('Servidor corriendo en el puerto 4321')
})