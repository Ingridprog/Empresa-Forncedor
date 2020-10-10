function mudarTipoFornecedor() {
    let tipoFornecedor = $("input[name='tipo_fornecedor']:checked").val();

    if (tipoFornecedor == 2) {

        $("#nome_wrapper").addClass("d-none");
        $("#rg_wrapper").addClass("d-none");
        $("#cpf_wrapper").addClass("d-none");
        $("#nome").attr('disabled', true);
        $("#rg").attr('disabled', true);
        $("#cpf").attr('disabled', true);

        $("#nome_fantasia_wrapper").removeClass("d-none");
        $("#razao_social_wrapper").removeClass("d-none");
        $("#cnpj_wrapper").removeClass("d-none");
        $("#nome_fantasia").attr('disabled', false);
        $("#razao_social").attr('disabled', false);
        $("#cnpj").attr('disabled', false);

    } else {
        $("#nome_wrapper").removeClass("d-none");
        $("#rg_wrapper").removeClass("d-none");
        $("#cpf_wrapper").removeClass("d-none");
        $("#nome").attr('disabled', false);
        $("#rg").attr('disabled', false);
        $("#cpf").attr('disabled', false);


        $("#nome_fantasia_wrapper").addClass("d-none");
        $("#razao_social_wrapper").addClass("d-none");
        $("#cnpj_wrapper").addClass("d-none");
        $("#nome_fantasia").attr('disabled', true);
        $("#razao_social").attr('disabled', true);
        $("#cnpj").attr('disabled', true);

    }

}
