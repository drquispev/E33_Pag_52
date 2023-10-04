
MATRIX = [  0.5858, 0.8863, 0.8378, 0.3203, 0.4115, 0.2710, 0.9238, 0.1959, 0.9268, 0.6702,
            0.6213, 0.4360, 0.6279, 0.8415, 0.5786, 0.0543, 0.3567, 0.1655, 0.3380, 0.8080,
            0.1931, 0.0843, 0.9152, 0.6093, 0.7587, 0.4515, 0.3203, 0.5139, 0.7070, 0.9123,
            0.1242, 0.8826, 0.9921, 0.8523, 0.6723, 0.8540, 0.4722, 0.4781, 0.2101, 0.1680,
            0.8658, 0.4028, 0.6136, 0.8720, 0.1126, 0.5857, 0.9172, 0.8943, 0.8095, 0.6408   ];

//MATRIX = [0.67,0.62,0.05,0.49,0.59,0.42,0.64,0.06,0.74,0.67];

/*const tablita = document.getElementById("ri");
const lista = "<ul>" + MATRIX.map(item => `<li>${item}</li>`).join("") + "</ul>";
tablita.innerHTML = lista;*/
/*
const resultadoElement = document.getElementById("ri");

        // Dividir el arreglo en grupos de 10 elementos
        const gruposDe10 = [];
        for (let i = 0; i < MATRIX.length; i += 10) {
            gruposDe10.push(MATRIX.slice(i, i + 10));
        }

        // Generar HTML para cada grupo de 10 elementos
        gruposDe10.forEach(grupo => {
            const listaHTML = "<ul>" + grupo.map(item => `<li>${item}</li>`).join("") + "</ul>";
            resultadoElement.innerHTML += listaHTML;
        });*/
// Obtener el elemento donde mostrarás el arreglo
const resultadoElement = document.getElementById("ri");

// Generar elementos HTML para cada elemento del arreglo
MATRIX.forEach(item => {
    const elementoHTML = document.createElement("div");
    elementoHTML.className = "elemento";
    elementoHTML.textContent = item;
    resultadoElement.appendChild(elementoHTML);
});
//var alpha = 0.5;
// var beta = 0.8;
var alpha = 0.6;
 var beta = 0.7;
var niv_ace = 0.9; //90% 
var S = [];
// SE DEFINE EL ARREGLO S
for (let i=0; i<MATRIX.length; i++) {
    if ((MATRIX[i]>=alpha) && (MATRIX[i]<=beta)) {
        S[i] = 1;
    }
    else {
        S[i] = 0;
    }
}
console.log(S);
//HALLAR H, Y EÑL TAMAÑO DE CADA HUECO
var H, Tam_Huecos = [];
var Band1 = false;
var Band2 = false;
var Auxiliar = 0;
var cont = 0;
var cont_Band = 0;

 for (let i=0; i<S.length; i++){
    if(S[i] == 1 && Band1 == false){
        Band1 = true;
        //cont_Band++;
    }
    else if(S[i] == 1 && Band1 == true) {
        i--;
        Band1 = false;
        cont = 0;
        Auxiliar++;
    }
    else {
        cont++;
    }
    Tam_Huecos[Auxiliar] = cont;   
}
Tam_Huecos.pop();
console.log(`Tam_Huecos: ${Tam_Huecos}`,`long: ${Tam_Huecos.length}`);

//CALCULAMOS EL HUECO MAS GRANDE
var Hmax = 0;
for (let i=0; i<Tam_Huecos.length; i++){
    if(Tam_Huecos[i]>=Hmax){
        Hmax = Tam_Huecos[i];
    }
}
console.log(`hmax: ${Hmax}`)

// ESTABLECER TABLA DE FRECUENCIAS OBSERVADAS Y ESPERADAS
var MATRIX_PRINT = [];
var Oi = [], Ei= [];
var Ti = [];
var auxi = 0;
for (let i=0; i< Hmax+2 ; i++){
    if(i==Hmax+1){
        Ti[i] =`>= ${i}`
    }
    else{
        Ti[i] = `${i}`;
    }
    for(let j=0; j<Hmax+1; j++){
        if(i == Tam_Huecos[j]){
            auxi++;
            Oi[i] = auxi;
        }
        else{
            Oi[i] = auxi;
        }
    }
    auxi=0;
    Ei[i] = (Tam_Huecos.length)*(beta-alpha)* Math.pow((1-(beta-alpha)),i);
}
console.log(Ti,Oi,Ei)

// CALCULAR EL VALOR ESTADISTICO DE TABLA
ep = 0; //Estadisticp de prueba
et = 0; //Estadistico de Tabla
for ( let i = 0; i<Hmax+1 ; i++) {
    ep =  (Math.pow(Ei[i]-Oi[i],2)/Ei[i]) + ep
}


console.log(ep);
// DECIDIR SI SE RECHAZA LA HIPOTESIS
if(ep <= et){
    console.log("Se acepta la hipótesis de la independencia entre los números.");
}
else {
    console.log("Se rechaza la hipótesis de la independencia entre los números.");
}