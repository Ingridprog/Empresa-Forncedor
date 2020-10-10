function cadastroFornecedor() {
    let nome = $("#nome").val();
    let nomeFantasia = $("#nome_fantasia").val();
    let razaoSocial = $("#razao_social").val() ?? "";
    let rg = $("#rg").val();
    let cpf = $("#cpf").val();
    let cnpj = $("#cnpj").val();
    let uf = $("#uf").val();
    let email = $("#email").val() ?? "";
    let contato = $("#contato").val();
    let tipoFornecedor = $("input[name='tipo_fornecedor']:checked").val();

    if (tipoFornecedor == 1) {
        fornecedorData = {
            nome: nome,
            rg: rg,
            cpf: cpf,
            uf: uf,
            email: email,
            contato: contato,
            tipo: 1
        }
    } else {
        fornecedorData = {
            nome_fantasia: nomeFantasia,
            razao_social: razaoSocial,
            cnpj: cnpj,
            uf: uf,
            email: email,
            contato: contato,
            tipo: 2
        }
    }

    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/fornecedores',
        type: 'POST',
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: fornecedorData,
        beforeSend: function () {
            $("#double_req_block").removeClass('d-none')
        },
        success: function (data) {
            $("#double_req_block").addClass('d-none')
            alert(data.messege)
            resetarCampos()
            window.location.href = `home.html`;
        },
        error: function (data) {
            $("#double_req_block").addClass('d-none')
            alert(Object.values(data.responseJSON.errors).map((error) => {
                return `Error: ${error}`
            }))
        }
    })
}

function buscarFornecedorPorId(id) {
    $.ajax({
        url: `http://127.0.0.1:8000/api/v1/fornecedores/${id}`,
        type: 'GET',
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        beforeSend: function () {
            $('.botao_editar').attr('disabled', true);
        },
        success: function (data) {
            $('.botao_editar').attr('disabled', false);
            localStorage.setItem('fornecedor', JSON.stringify(data.data))
            window.location.href = `cadastro-fornecedor.html`;
        },
        error: function () {

        }
    })
}

function atualizarFornecedor(id) {
    let nome = $("#nome").val();
    let nomeFantasia = $("#nome_fantasia").val();
    let razaoSocial = $("#razao_social").val() ?? "";
    let rg = $("#rg").val();
    let cpf = $("#cpf").val();
    let cnpj = $("#cnpj").val();
    let uf = $("#uf").val();
    let email = $("#email").val() ?? "";
    let contato = $("#contato").val();
    let tipoFornecedor = $("input[name='tipo_fornecedor']:checked").val();

    if (tipoFornecedor == 1) {
        fornecedorData = {
            nome: nome,
            rg: rg,
            cpf: cpf,
            uf: uf,
            email: email,
            contato: contato,
            tipo: 1
        }
    } else {
        fornecedorData = {
            nome_fantasia: nomeFantasia,
            razao_social: razaoSocial,
            cnpj: cnpj,
            uf: uf,
            email: email,
            contato: contato,
            tipo: 2
        }
    }

    $.ajax({
        url: `http://127.0.0.1:8000/api/v1/fornecedores/${id}`,
        type: 'PUT',
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: fornecedorData,
        beforeSend: function () {
            $("#double_req_block").removeClass('d-none')
        },
        success: function (data) {
            $("#double_req_block").addClass('d-none')
            alert(data.messege)
            resetarCampos()
            window.location.href = `home.html`;
        },
        error: function (data) {
            $("#double_req_block").addClass('d-none')
            alert(Object.values(data.responseJSON.errors).map((error) => {
                return `Error: ${error}`
            }))
        }
    })
}

function recuperarDadosFornecedor() {
    if (!localStorage.getItem('fornecedor'))
        return null
    else {
        let json = JSON.parse(localStorage.getItem('fornecedor'))
        let tipoFornecedor = json.tipo

        if (tipoFornecedor == 1) {
            $("#pessoa_fisica").attr('checked', true);
        } else {
            $("#pessoa_juridica").attr('checked', true);
        }

        mudarTipoFornecedor()

        if (json.tipo == 1) {
            $("#nome").val(json.nome);
            $("#rg").val(json.rg);
            $("#cpf").val(json.cpf);
            $("#btn-cadastrar").attr('onclick', `validaCpf($('#cpf').val()) ? atualizarFornecedor(${json.id}) : alert('CPF inválido!')`)
        } else {
            $("#razao_social").val(json.razao_social);
            $("#nome_fantasia").val(json.nome_fantasia);
            $("#cnpj").val(json.cnpj);
            $("#btn-cadastrar").attr('onclick', `validaCnpj($('#cnpj').val()) ? atualizarFornecedor(${json.id}) : alert('CNPJ inválido!')`)
        }

        $("#uf").val(json.uf)
        $("#email").val(json.email);
        $("#contato").val(json.contato);

        $("#btn-cadastrar").html("Salvar")

        setTimeout(function () {
            json.fornecedores.map((fornecedor) => {
                $(`#fornecedor${fornecedor.id}`).attr('checked', true)
                $("#fornecedor").attr('disabled', false)
                $(".selectBox").attr('onclick', 'showCheckboxes()')
            })
        }, 1000)

        localStorage.removeItem('fornecedor');
    }
}

function resetarCampos() {
    $("#nome").val("");
    $("#nome_fantasia").val("");
    $("#razao_social").val("");
    $("#rg").val("");
    $("#cpf").val("");
    $("#cnpj").val("");
    $("#uf").val(0);
    $("#email").val("");
    $("#contato").val("");
    $("input[name='tipo_fornecedor']:checked").val(1);
}


