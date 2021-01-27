class iniciarModelo{
    constructor(info)
    {
        this._info = "";
        if (info !== undefined) {
            this._info = info;
        }
        this._imagem = "";
        this._descricao = "";
        this._copyright = "";
    }
    //https://api.nasa.gov/planetary/apod?api_key=CIELwAyWt3lEaFOO5pTWFWD5T3EVC3w8QXBeb4hF
    conectarAPI()
    {
        let requisicao = new XMLHttpRequest();
        requisicao.addEventListener("load", () => {
            if (requisicao.status == 200)
            {
                let dados = this._Reorganiza(requisicao.responseText);
                this._TrazerDados(dados);
        }
    });
    requisicao.open("GET", "https://api.nasa.gov/planetary/apod?api_key=CIELwAyWt3lEaFOO5pTWFWD5T3EVC3w8QXBeb4hF&date=" + this._info, false);
    requisicao.send();
    }

    _Reorganiza(info) {
        let conversao = JSON.parse(info);
        return conversao;
    }

    _TrazerDados(dados) {

        this._titulo = dados.title;
        this._info = dados.date;
        this._imagem = dados.url;
        this._descricao = dados.explanation;
        this._copyright = dados.copyright;
    }
    getTitulo() {
        return this._titulo
    }

    getData() {
        return this._info;
    }

    getImagem() {
        return this._imagem;
    }

    getDescricao() {
        return this._descricao;
    }

    getCopyright() {
        return this._copyright;
    }
}

class visualizar {
    constructor() {
        console.log("sem atributos")
    }

    recebe(model) {
        let criar = document.createElement('div');
        criar.innerHTML = `
            <h1>${model.getTitulo()}</h1>
            <p>${model.getData()}</p>
            <img src= ${model.getImagem()}>
            <p>${model.getDescricao()}</p>
            <p>${model.getCopyright()}</p>
            `

        document.body.appendChild(criar);
    }

}

class Controlador {
    constructor() {
        console.log("controller.")
    }

    AtualizaDia() {
        let data = document.getElementById("input-data");
        let modelo = new iniciarModelo(data.value);
        modelo.conectarAPI();

        let view = new visualizar();
        view.recebe(modelo);
    }
}
let controll = new Controlador();
document.getElementById("enviar").addEventListener("click", controll.AtualizaDia);
