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

			despesa.id = i;

			despesas.push(despesa);
			
			
			
		}
		return despesas;
	}

	pesquisar(despesa){

		let despesasFiltradas = Array ();
		
		despesasFiltradas = this.recuperarTodosRegistros();
		
		
		//ano
		if(despesa.ano != ""){
			despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
		}
		//mes
		if(despesa.mes != ""){
			despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes)
		}
		//dia
		if(despesa.dia != ""){
			despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia)
		}
		//tipo
		if(despesa.tipo != ""){
			despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo)
		}
		//descricao
		if(despesa.descricao != ""){descricao
			despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
		}
		//valor
		if(despesa.valor != ""){
			despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor)
		}
		console.log(despesasFiltradas);
		
		return despesasFiltradas;
	}

	remover(id){
		localStorage.removeItem(id);
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


function carregaListaDespesas(despesas = Array()){

	if(despesas.length == 0){
		despesas = bd.recuperarTodosRegistros();
	}

	let listaDespesas = document.getElementById('listaDespesas');
	listaDespesas.innerHTML = '';

	despesas.forEach(function(d){
		//creating rows <tr>
		let linha = listaDespesas.insertRow();
		//creating column <td>
		linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
		switch(d.tipo){	
			case '1':
				linha.insertCell(1).innerHTML = `Alimentação`;
			break;
			case '2':
				linha.insertCell(1).innerHTML = `Educação`;
			break;
			case '3':
				linha.insertCell(1).innerHTML = `Lazer`;
			break;
			case '4':
				linha.insertCell(1).innerHTML = `Saúde`;
			break;
			case '5':
				linha.insertCell(1).innerHTML = `Transporte`;
			break;
			case '6':
				linha.insertCell(1).innerHTML = `Contas`;
			break;
			case '7':
				linha.insertCell(1).innerHTML = `Outros`;
			break;
		}
		linha.insertCell(2).innerHTML = d.descricao;
		linha.insertCell(3).innerHTML = d.valor;

		//delete button
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger';
		btn.innerHTML = '<i class="fas fa-times"></i>';
		btn.id = `id_despesa_${d.id}`;
		btn.onclick = function(){ 
			//delete expense
			let id = this.id.replace('id_despesa_', '');
			bd.remover(id);
			location.reload();
			alert(`A despesa "${d.descricao}" de ${d.dia}/${d.mes}/${d.ano} foi removida.`);
		}
		linha.insertCell(4).append(btn);

		console.log(d);
	})
	
}

function pesquisarDespesa(){
	let ano = document.getElementById('ano').value;
	let mes = document.getElementById('mes').value;
	let dia = document.getElementById('dia').value;
	let tipo = document.getElementById('tipo').value;
	let descricao = document.getElementById('descricao').value;
	let valor = document.getElementById('valor').value;

	let despesa = new Despesa (ano, mes, dia, tipo, descricao, valor);

	let despesas = bd.pesquisar(despesa);

	carregaListaDespesas(despesas);
}