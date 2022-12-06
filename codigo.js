

const nombre = document.getElementById("name")
const idclient = document.getElementById("idclient")
const telefono = document.getElementById("telefono")
const email = document.getElementById("email")
const form = document.getElementById("form")
const parrafo = document.getElementById("warnings")
const equipos = document.getElementById("equipos")
const diasAlquiler = document.getElementById("diasAlquiler")
const diasAdicionales = document.getElementById("diasAdicionales")
const dentroC = document.getElementById("dentroCiudad")
const fueraC = document.getElementById("fueraCiudad")
const estableci = document.getElementById("establecimiento")
const parrafoS = document.getElementById("success")

function valorAlquiler(dias,equipos) {
    let totalEquipos = equipos.value
    let diasAlq = dias.value
    let costPerDia = 35000
    valorTotalEqui = costPerDia * totalEquipos
    resultValor = valorTotalEqui * diasAlq
    console.log('gggg')
    console.log(resultValor)
    return resultValor

} 
function valorAdicionales(adicionales, equipos){
   let totalEquipos = equipos.value
   let diasAdd =  adicionales.value
   let costPerDia = 35000
   valorTotalEqui = costPerDia * totalEquipos
   valorAddEquipos = diasAdd * valorTotalEqui
   resultValor = valorAddEquipos * 0.02
   return resultValor
}
function descuentos(){
    if(document.getElementById("fueraCiudad").checked == true || document.getElementById("establecimiento").checked == true){
       let totalAlquiler =  valorAlquiler(diasAlquiler, equipos)  
       let totalAdicional = valorAdicionales(diasAdicionales, equipos)
       resultValorFuera = totalAlquiler + totalAdicional
       incremento = resultValorFuera * 0.05
       console.log(incremento)
       console.log('aee')
       return incremento
    } else{
        return 0
    }
}
function resultadoTotal(){
    if(document.getElementById("fueraCiudad").checked == true){
        let totalAlquiler =  valorAlquiler(diasAlquiler, equipos)  
        let totalAdicional = valorAdicionales(diasAdicionales, equipos)
        let incremento = descuentos()
        resultValorFuera = (totalAlquiler + totalAdicional + incremento)
        console.log(resultValorFuera)
        return resultValorFuera

    } else if(document.getElementById("establecimiento").checked == true){
        let totalAlquiler =  valorAlquiler(diasAlquiler, equipos)  
        let totalAdicional = valorAdicionales(diasAdicionales, equipos)
        let descuento = descuentos()
        resultValorEstablecimiento = (totalAlquiler + totalAdicional - descuento)
        console.log(resultValorEstablecimiento)
        return resultValorEstablecimiento
    } else{
        let totalAlquiler =  valorAlquiler(diasAlquiler, equipos)  
        let totalAdicional = valorAdicionales(diasAdicionales, equipos)
        resultValorDentro = totalAlquiler + totalAdicional
        return resultValorDentro
    }
}
form.addEventListener("submit", e => {
    e.preventDefault()
    let warnings = ""
    let success = ""
    let entrar = false
    let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    let regexTexto = /^[A-Z]+$/i
    let regexNumeros = /^[0-9]+$/
    parrafo.innerHTML = ""
    parrafoS.innerHTML = ""

    if (nombre.value.length <= 0 || !regexTexto.test(nombre.value)) {
        warnings += `El nombre no es valido <br>`
        entrar = true
    } else {
        success += `Nombre: ` + nombre.value + ` <br>`
    }
    if (idclient.value.length <= 0 || !regexNumeros.test(idclient.value)) {
        warnings += `El id del cliente no es valido <br>`
        entrar = true
    } else {
        success += `Id cliente: ` + idclient.value + ` <br>`
    }
    if (telefono.value.length != 10 || !regexNumeros.test(telefono.value)) {
        warnings += `El celular debe tener 10 caracteres numericos <br>`
        entrar = true
    } else {
        success += `Celular: ` + telefono.value + ` <br>`
    }
    if (equipos.value < 2 || !regexNumeros.test(equipos.value)) {
        warnings += `Debes elegir un minimo de 2 equipos <br>`
        entrar = true
    } else {
        success += `Numero de equipos: ` + equipos.value + ` <br>`
    }
    if (diasAlquiler.value <= 0 || !regexNumeros.test(diasAlquiler.value)) {
        warnings += `Debes ingresar un numero de dias valido <br>`
        entrar = true
    } else {
        success += `Dias de alquiler: ` + diasAlquiler.value + ` <br>`
    }
    if (diasAdicionales.value == '' || !regexNumeros.test(diasAdicionales.value)) {
        warnings += `Debes ingresar un numero de dias adicionales valido <br>`
        entrar = true
    } else {
        success += `Dias adicionales: ` + diasAdicionales.value + ` <br>`
    }

    if (!regexEmail.test(email.value)) {
        warnings += `El email no es valido <br>`
        entrar = true
    } else {
        success += `Email: ` + email.value + ` <br>`
    }
    if (document.getElementById("dentroCiudad").checked == true) {
        success += `Tipo de servicio: ` + dentroC.value + ` <br>`
    } else if (document.getElementById("fueraCiudad").checked == true) {
        success += `Tipo de servicio: ` + fueraC.value + ` <br>`
    } else if (document.getElementById("establecimiento").checked == true) {
        success += `Tipo de servicio: ` + estableci.value + ` <br>`
    } else{
        warnings += `Debes elegir alguna opcion de servicio <br>`
        entrar = true
    }

    success += `Valor alquiler: ` +valorAlquiler(diasAlquiler, equipos) + ` <br>`
    success += `Valor dias adicionales: ` +valorAdicionales(diasAdicionales, equipos) + ` <br>`
    success += `Valor por tipo de servicio: ` +descuentos() + ` <br>`
    success += `Valor total a pagar: ` +resultadoTotal() + ` <br>`

    if (entrar) {
        parrafo.innerHTML = warnings
    } else {
        success += `Valor alquiler: ` +valorAlquiler(diasAlquiler, equipos) + ` <br>`
        parrafoS.innerHTML = success
    }
})