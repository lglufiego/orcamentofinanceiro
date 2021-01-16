class Despesa {
	constructor(ano, mes, dia, tipo, descricao, valor){
		this.ano = ano;
		this.mes = mes;
		this.dia = dia;
		this.tipo = tipo;
		this.descricao = descricao;
		this.valor = valor;
	}

	validarDados(){
		let arr = new Array(this.ano, this.mes, this.dia, this.tipo, this.descricao, this.valor);
		for (let i = 0; i < arr.length; i++){
			if ( arr[i] == undefined || arr[i] == '' || arr[i] == null){
				return false;
			} else {
				return true;
			}
		}


		// for(let i in this){
		// 	if( this[i] == undefined || this[i] == '' || this[i] == null) {
		// 		return false;
		// 	} else {
		// 		return true;
		// 	}
		// }
	}
}

class Bd{

	constructor(){
		let id = localStorage.getItem('id');
	
		if(id === null){
			localStorage.setItem('id', 0);
		}
	}

	getProximoId(){
		let proximoId = localStorage.getItem('id');
		return parseInt(proximoId) + 1;


	}

	gravar(d){
		
		let id = this.getProximoId();
		localStorage.setItem(id, JSON.stringify(d));
		localStorage.setItem('id', id)
	}



}

let bd = new Bd();

let modalbox = 0;

function cadastrarDespesa() {

	let ano = document.getElementById("ano");
	let mes = document.getElementById('mes');
	let dia = document.getElementById('dia');
	let tipo = document.getElementById('tipo');
	let descricao = document.getElementById('descricao');
	let valor = document.getElementById('valor');

	let despesa = new Despesa(ano.value, mes.value, dia.value, tipo.value, descricao.value, valor.value);


	if(despesa.validarDados()){
		bd.gravar(despesa);
		$('#sucessoGravacao').modal('show');
	} else {
		$('#erroGravacao').modal('show');
	}
}
	
function fecharModal(){
	$('#erroGravacao').modal('hide');
}
function fecharModal2(){
	$('#sucessoGravacao').modal('hide');
}



