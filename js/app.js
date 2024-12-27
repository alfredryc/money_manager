// Array
const ingresos = [
    // Object from other file
    new Ingreso('Salary', 2500.00),
    new Ingreso('Car sold', 10000)
];

const egresos = [
    new Egreso('Rent', 1000),
    new Egreso('Phone', 500.00)
];


// Arrow funtion start in html
let cargarApp = ()=>{
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();

}

// Calcula la suma de los valores de todos los elementos en el arreglo ingresos.
// Se utiliza un bucle for...of para recorrer el arreglo y sumar cada valor.
let totalIngresos = ()=>{
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

// Hace lo mismo, pero con el arreglo egresos
let totalEgresos = ()=>{
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = ()=>{
    // Calcula el presupuesto como la diferencia entre ingresos totales y egresos totales.
    let presupuesto = totalIngresos() - totalEgresos();
    // Calcula el porcentaje de egresos sobre los ingresos.
    let porcentajeEgreso = totalEgresos()/totalIngresos();

    // Actualiza los valores en elementos HTML con IDs específicos
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

// Crea el signo de numero
const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD', minimumFractionDigits:2})
}
// Crea el signo de porcentage
const formatoPorcentaje = (valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2})
}

const cargarIngresos = ()=>{
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    // Sustituye el html
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

// Crea listas con los ingresos
const crearIngresoHTML = (ingreso)=>{
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
    return ingresoHTML;
}

const eliminarIngreso = (id)=>{
    // Encuentra el indice del objeto que buscamos / recupera el id y lo compara
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}
//

const cargarEgresos = ()=>{
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    // Sustituye el html
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

// Crea listas con los ingresos
const crearEgresoHTML = (egreso)=>{
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento_eliminar">
                <button class='elemento_eliminar--btn'>
                    <ion-icon name="close-circle-outline"
                    onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return egresoHTML;
}

let eliminarEgreso = (id)=>{
    // Encuentra el indice del objeto que buscamos / recupera el id y lo compara
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

let agregarDato = ()=>{
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarIngresos();
        }
        else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }
}