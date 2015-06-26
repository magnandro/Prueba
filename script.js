//Prueba VIVELAB: 
//Ingeniero Luis Alejandro Moreno Fresneda
//Funcion que enlaza el click del boton con la funcionalidad
function btnConvertir(){
	var val=document.getElementById('txNumero').value;
	if(!isNaN(val)){
	//Se asigna una variable que se va a contener la conversión del numero décimal
	var str= ConvertirRomano(document.getElementById('txNumero').value);
	//Una vez se tiene el resultado se inyecta en el area de la interfaz donde el usuario lo puede consultar
	document.getElementById('Resultado').innerHTML=str;
	}
	else
	{
		alert('El valor debe ser numerico');
	}
}
//Funcion recurrente que se encarga de la conversion del numero decimal
function ConvertirRomano(numero){
	//Se declara una variable vacia
	var temp='';
	//Se calcula la base del numero Ejm: 5000 tiene base 1000 con vase en la cantidad de digitos del número
	base=Math.pow(10,numero.toString().length-1);
	//Se extrae el resifuo de divivir el numero por la base, esto nos permite extraer bien sea las unidades de mil de las centenas y asi sucesivamnte, esto le da sentido al recorrido digito por digito de izquierda a derecha
	subnumero=numero%base;
	//Si la funcion llega al analisis de un solo digito, temina la recurrencia, de lo contrario la invoca hasta llegar a un solo digito.
	if(base==1){ temp=Armado(numero,base);}else{temp=Armado(numero,base) + ConvertirRomano(subnumero);}
	//Retorna el resultado del armado del numero romano
	return(temp);
}

//Funcion para armado del numero romano digito por digito segun la base
function Armado(numero,base){
	//Asigna por defecto los valores cuando se llega a las Unidades
	var V1='I';V5='V';V10='X',T='';
	//Se establece para cada tipo de base el set de simbolos que corresponden con la forma de escritura romana
	switch(base){
		case 10:	V1='X';V5='L';V10='C'; break;
		case 100:	V1='C';V5='D';V10='M'; break;
		//Para los valores mayores o iguales a 4000 se adiciona el tag de html span, de esta manera se pueden utilizar las mismas letras indicando la multiplicacion por 1000
		case 1000:	V1='M';V5='<span class="over">V</span>';V10='<span class="over">X</span>'; break;
		case 10000:	V1='<span class="over">X</span>';V5='<span class="over">L</span>';V10='<span class="over">C</span>'; break;
		case 100000:V1='<span class="over">C</span>';V5='<span class="over">D</span>';V10='<span class="over">M</span>'; break;
	}

	//Segun el valor del digito que se esta convirtiendo se realizan diferentes acciones
	switch(Math.floor(numero/base)){
		//Para los casos 1,2,3 se crea un conjunto de expresiones del valor V1 que corresponde al menor balor para cada base
		case 1:
		case 2:
		case 3: T=completar(V1, Math.floor(numero/base)); break;
		//Para el caso 4 se antepone el menor valor segun la base y se antepone al valor multiplo de 5
		case 4: T=V1 + V5; break;
		//Para el caso 5 se utiliza el caracter que representa al 5 segun la base
		case 5: T=V5;break;
		case 6:
		case 7:
		//para los casos 6,7,8se coloca el valor del 5 en esa base y se adiciona un conjunto de expresiones del valor V1 que corresponde al menor balor para cada base 
		case 8: T=V5 + completar(V1,Math.floor((numero-(5*base))/base));break;
		// Para el caso 9 se antepone la unidad de la base V1 y se antepone al mayor valor en la base V10
		case 9: T=V1 + V10;break;
	}
	
	return(T);
}
//Funcion que emula la funcion en VBScript String
function completar(caracter, veces){
	var str='';
	for(i=1;i<=veces;i++){str=str + caracter;}
	return(str);
}
