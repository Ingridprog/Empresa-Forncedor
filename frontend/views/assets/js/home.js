// Consumindo requisição GET /empresas
function listaEmpresa() {
     $.ajax({
          url: 'http://127.0.0.1:8000/api/v1/empresas',
          type: 'GET',
          headers: {
               "accept": "application/json",
               "Access-Control-Allow-Origin": "*"
          },
          beforeSend: function () {
               $("#spinner-loader").removeClass('d-none');

          },
          success: function (data) {
               $("#spinner-loader").addClass('d-none');
               $("#tabela").html(renderizarListaEmpresas(data.data));
          },
          error: function () {
               console.log("ERROR");
          }

     })
}

// Consumindo requisição GET /fornecedores
function listarFornecedor() {
     $.ajax({
          url: 'http://127.0.0.1:8000/api/v1/fornecedores',
          type: 'GET',
          headers: {
               "accept": "application/json",
               "Access-Control-Allow-Origin": "*"
          },
          beforeSend: function () {
               $("#spinner-loader").removeClass('d-none');
          },
          success: function (data) {
               $("#spinner-loader").addClass('d-none');
               $("#tabela").html(renderizarListaFornecedores(data.data));
          },
          error: function () {
               console.log("ERROR");
          }

     })
}

// Renderizando lista de /empresas
function renderizarListaEmpresas(json) {
     return json.map((empresa) => {
          return `
          <tr>
               <th scope="row">${empresa.nome_fantasia}</th>
               <td>${empresa.cnpj}</td>
               <td>${empresa.uf}</td>
               <td> 
                    <button type="button" class="btn btn-info" onclick="abrirModal(${empresa.id}, 'empresa')">Ver fornecedores</button>
                    <button type="button" class="btn btn-warning botao_editar" onclick="buscarEmpresaPorId(${empresa.id})">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="deletarRecurso(${empresa.id}, 'empresas')">Excluir</button>
               </td>
          </tr>    
          `
     })
}

// Renderizando lista de fornecedores
function renderizarListaFornecedores(json) {
     return json.map((fornecedor) => {
          return `
          <tr>
               <th scope="row">${fornecedor.nome_fantasia ?? fornecedor.nome}</th>
               <td>${fornecedor.cnpj ?? fornecedor.cpf}</td>
               <td>${fornecedor.uf}</td>
               <td> 
                    <button type="button" class="btn btn-info" onclick="abrirModal(${fornecedor.id}, 'fornecedor')">Ver Empresas</button>
                    <button type="button" class="btn btn-warning botao_editar" onclick="buscarFornecedorPorId(${fornecedor.id})">Editar</button>
                    <button type="button" class="btn btn-danger" onclick="deletarRecurso(${fornecedor.id}, 'fornecedores')">Excluir</button>
               </td>
          </tr>    
          `
     })
}

function deletarRecurso(id, resourse) {
     let confirma = confirm("Deseja realmente excluir?")

     if (!confirma) return null;

     $.ajax({
          url: `http://127.0.0.1:8000/api/v1/${resourse}/${id}`,
          type: 'DELETE',
          headers: {
               "accept": "application/json",
               "Access-Control-Allow-Origin": "*"
          },
          success: function (data) {
               if (resourse == "empresas") {
                    alert(data.messege)
                    listaEmpresa()
               }
               else {
                    alert(data.messege)
                    listarFornecedor()
               }
          },
          error: function () {
               console("Não foi")
          }
     })
}

function alterarListagem() {
     let tipoFornecedor = $("input[name='tipo_lista']:checked").val();

     if (tipoFornecedor == 1)
          listaEmpresa()
     else
          listarFornecedor()
}

// Modal
function abrirModal(id, tipoModal) {
     $("#modal").css({ display: 'flex' });

     if (tipoModal == "empresa") {
          $.ajax({
               url: `http://127.0.0.1:8000/api/v1/empresas/${id}`,
               type: 'GET',
               success: function (data) {
                    $("#titulo-modal").html("Fornecedores")
                    $("#tabela-modal").html(renderizarListaModal(data.data.fornecedores))
               },
               error: function () {

               }
          })
     } else {
          $.ajax({
               url: `http://127.0.0.1:8000/api/v1/fornecedores/${id}`,
               type: 'GET',
               success: function (data) {
                    $("#titulo-modal").html("Empresas")
                    $("#tabela-modal").html(renderizarListaModal(data.data.empresas))
               },
               error: function () {

               }
          })
     }


}


function fecharModal() {
     $("#spinner-loader").addClass('d-none');
     $("#modal").css({ display: 'none' });
}

function renderizarListaModal(array) {
     return array.map((elemento) => {
          return `
          <tr>
               <th>${elemento.nome ?? elemento.nome_fantasia}</th>
               <td>${elemento.cpf ?? elemento.cnpj}</td>
          </tr>    
          `
     })
}



