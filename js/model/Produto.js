class Produto{
    _id;
    _nome;
    _qtdProduto;
    _valor;
    
    get id() {
        return this._id;
    }

    set id(value) {
        if(value >= 0)
            this._id = value;
        else{
            throw new Error("Informe ids maiores que zero!!");
        }
    }   
    
    get nome() {
        return this._nome;
    }

    set nome(value) {
        this._nome = value;
    }  
    
    get qtdProduto() {
        return this._qtdProduto;
    }
    set qtdProduto(value) {
        this._qtdProduto = value;
    } 
    
    get valor() {
        return this._valor;
    }
    set valor(value) {
        this._valor = value;
    }  

    ValorTotal(){
        return this._valor * this._qtdProduto;
    }

    constructor(){
        this.id = 0;
    }
   
}