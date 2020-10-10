function cadastrarEmpresa() {
    let razaoSocial = $("#razao_social").val() ?? "";
    let nomeFantasia = $("#nome_fantasia").val();
    let cnpj = $("#cnpj").val();
    let uf = $("#uf").val();
    let email = $("#email").val() ?? "";
    let contato = $("#contato").val() ?? "";
    let tipoFornecedor = []

    $("input[name='fornecedores_lista[]']:checked").each(function () {
        tipoFornecedor.push($(this).val());
    })

    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/empresas',
        type: 'POST',
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: {
            razao_social: razaoSocial ?? "",
            nome_fantasia: nomeFantasia,
            cnpj: cnpj,
            uf: uf,
            email: email,
            contato: contato,
            fornecedores: tipoFornecedor.toString()
        },
        beforeSend: function () {
            $("#double_req_block").removeClass('d-none')
        },
        success: function (data) {
            resetarCampos()
            alert(data.messege)
            $("#double_req_block").addClass('d-none')
            window.location.href = 'home.html';
        },
        error: function (data) {
            $("#double_req_block").addClass('d-none')
            alert(Object.values(data.responseJSON.errors).map((error) => {
                return `Error: ${error}`
            }))
        }
    })
}

function buscarEmpresaPorId(id) {
    $.ajax({
        url: `http://127.0.0.1:8000/api/v1/empresas/${id}`,
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
            localStorage.setItem('empresa', JSON.stringify(data.data))
            window.location.href = `cadastro-empresa.html`;
        },
        error: function () {

        }
    })
}

function atualizarEmpresa(id) {
    let razaoSocial = ($("#razao_social").val()) ?? "";
    let nomeFantasia = $("#nome_fantasia").val();
    let cnpj = $("#cnpj").val();
    let uf = $("#uf").val();
    let email = $("#email").val() ?? "";
    let contato = $("#contato").val() ?? "";
    let tipoFornecedor = []

    $("input[name='fornecedores_lista[]']:checked").each(function () {
        tipoFornecedor.push($(this).val());
    })


    $.ajax({
        url: `http://127.0.0.1:8000/api/v1/empresas/${id}`,
        type: 'PUT',
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        data: {
            razao_social: razaoSocial,
            nome_fantasia: nomeFantasia,
            cnpj: cnpj,
            uf: uf,
            email: email,
            contato: contato,
            fornecedores: tipoFornecedor.toString()
        },
        beforeSend: function () {
            $("#double_req_block").removeClass('d-none')
        },
        success: function (data) {
            localStorage.removeItem('empresa')
            resetarCampos()
            alert(data.messege)
            $("#double_req_block").addClass('d-none')
            window.location.href = 'home.html';
        },
        error: function (data) {
            $("#double_req_block").addClass('d-none')
            alert(Object.values(data.responseJSON.errors).map((error) => {
                return `Error: ${error}`
            }))
        }
    })
}

// renderiza os fornecedores cadastrados 
function renderizarSelectFornecedores(json) {
    return json.map((fornecedor) => {
        if (fornecedor.cpf != null)
            identificador = `CPF ${fornecedor.cpf}`;
        else
            identificador = `CNPJ ${fornecedor.cnpj}`;

        return `
            <label >
                    <input id="fornecedor${fornecedor.id}" type="checkbox" value="${fornecedor.id}"  name="fornecedores_lista[]" class="checkboxes-item"/>${fornecedor.nome ?? fornecedor.nome_fantasia} - ${identificador}
            </label>

        `
    })
}

function listaFornecedores() {
    $.ajax({
        url: 'http://127.0.0.1:8000/api/v1/fornecedores',
        type: 'GET',
        success: function (data) {
            $("#checkboxes").html(renderizarSelectFornecedores(data.data))
            console.log(data.data)
        }
    })
}

function recuperarDadosEmpresa() {
    if (!localStorage.getItem('empresa'))
        return null
    else {
        let json = JSON.parse(localStorage.getItem('empresa'))
        $("#btn-cadastrar").attr('onclick', `validaCnpj($('#cnpj').val()) ? atualizarEmpresa(${json.id}) : alert('CNPJ inválido!')`)
        $("#btn-cadastrar").html("Salvar")
        $("#razao_social").val(json.razao_social);
        $("#nome_fantasia").val(json.nome_fantasia);
        $("#cnpj").val(json.cnpj);
        $("#uf").val(json.uf);
        $("#email").val(json.email);
        $("#contato").val(json.contato);

        if (json.fornecedores.length > 0) {
            $("#fornecedor").attr('disabled', true)
            $(".selectBox").removeAttr('onclick')
            setTimeout(function () {
                json.fornecedores.map((fornecedor) => {
                    $(`#fornecedor${fornecedor.id}`).attr('checked', true)
                    $("#fornecedor").attr('disabled', false)
                    $(".selectBox").attr('onclick', 'showCheckboxes()')
                })
            }, 1000)
        }

        localStorage.removeItem('empresa');
    }
}

function resetarCampos() {
    $("#razao_social").val("");
    $("#nome_fantasia").val("");
    $("#cnpj").val("");
    $("#uf").val(0);
    $("#email").val("");
    $("#contato").val("");
}