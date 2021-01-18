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
		let aux = true;
		for (let i = 0; i < arr.length; i++){
			if ( arr[i] == undefined || arr[i] == '' || arr[i] == null){
				return false;
			}
		}
		return aux;
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

	recuperarTodosRegistros(){
		let id = localStorage.getItem('id');

		let despesas = new Array();
		
		for(let i = 1; i <= id; i++){
			
			let despesa = JSON.parse(localStorage.getItem(i));

			if (despesa == null){
				continue;
			}
				despesas.push(despesa);
			
			
			
		}
		return despesas;
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
		document.getElementById("ano").value = ''
		document.getElementById("mes").value = ''
		document.getElementById("dia").value = ''
		document.getElementById("tipo").value = ''
		document.getElementById("descricao").value = ''
		document.getElementById("valor").value = ''
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


function carregaListaDespesas(){
	bd.recuperarTodosRegistros();
}