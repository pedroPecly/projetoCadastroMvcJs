class ProdutoController{
    _produtos = [];

    inicializaElementos(){
        this.inpCodigo = document.querySelector("#inpCodigo");
        this.btnSalvar = document.querySelector("#btnSalvar");
        this.bodyProduto = document.querySelector("#bodyProduto");
        this.inpNome = document.querySelector("#inpNome");
        this.inpValor = document.querySelector("#inpValor");
        this.inpQtd = document.querySelector("#inpQtd");
        this.divTotal = document.querySelector("#divTotal");
    }

    excluir(pId){
        if(pId){
            if (confirm('Deseja excluir?')){
                this._produtos = this._produtos.filter(p => p.id != pId);
            }
        }
        this.exibir();
    }

    alterar(pId){
        if(pId){
            let p = this._produtos.filter(p => p.id == pId)[0];

            if(p){
                this.inpCodigo.value = p.id;
                this.inpNome.value = p.nome;
                this.inpQtd.value = p.qtdProduto;
                this.inpValor.value = p.valor;
            }
        }
    }

    salvar(pId, pNome, pQtdProduto, pValor){
        let p;
        if(pId == 0){
            p = new Produto();
        } else {
          p = this._produtos.filter(p => p.id == pId)[0];
          if(!p)
            p = new Produto();
        }
        p.nome = pNome;
        p.qtdProduto = pQtdProduto;
        p.valor = pValor;

        if(pId == 0){
            p.id = this._produtos.length + 1;
            this._produtos.push(p);
        }

    }

    exibir(){
        let linhas = "";
        this._produtos.forEach(p => {
            linhas += 
            `<tr>
               <td>${p.id}</td>
               <td>${p.nome}</td>
               <td>${p.valor}</td>
               <td>${p.qtdProduto}</td>
               <td>${p.ValorTotal()}</td>
               <td>
                 <button id="btnAlterar${p.id}" class="btn btn-primary btn-db" data-id="${p.id}">Alterar</button>
                 <button id="btnExcluir${p.id}" class="btn btn-danger btn-db" data-id="${p.id}">Excluir</button>
               </td>
             </tr>                     
            `
        });
        this.bodyProduto.innerHTML = linhas;
        this.eventosDB();
        this.calculaTotal();
    }

    eventosDB(){
        let self = this;
        this.bodyProduto.querySelectorAll('.btn-db').forEach(btn => {
            let id = btn.id.toUpperCase();
                       
            if (id.indexOf('BTNEXCLUIR') != -1){
                btn.onclick = () => {
                    self.excluir(btn.dataset.id);
                }
            }

            if (id.indexOf('BTNALTERAR') != -1){
                btn.onclick = () => {
                    self.alterar(btn.dataset.id);
                }
            }          
        });
    }

    calculaTotal(){
        let total = this._produtos.reduce((pTotal, p) =>{
            return pTotal + parseFloat(p.valor);
        },0);
        this.divTotal.innerHTML = "R$ " + total;
    }

    limpar(){
        this.inpNome.value = "";
        this.inpQtd.value = 0;
        this.inpValor.value = 0;
        this.inpCodigo.value = 0;
    }

    inicializaEventos(){
        this.btnSalvar.onclick = () => {
            if (this.inpNome.value && this.inpQtd.value && this.inpValor.value) {
                this.salvar(this.inpCodigo.value, this.inpNome.value, this.inpQtd.value, this.inpValor.value);
                this.exibir();
                this.limpar();
                this.inpNome.focus();
            } else {
                alert("Campos não preenchidos corretamente");
            }
        }
    }

    constructor(){
        this.inicializaElementos();
        this.inicializaEventos();
    }
}