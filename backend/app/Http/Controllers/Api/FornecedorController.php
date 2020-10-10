<?php

namespace App\Http\Controllers\Api;

use App\Fornecedor;
use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FornecedorController extends Controller
{
    private $fornecedor;

    public function __construct(Fornecedor $fornecedor)
    {
        $this->fornecedor = $fornecedor;
    }

    public function index()
    {
        $fornecedores = $this->fornecedor->all();

        return response()->json([
            'data'=>$fornecedores
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        Validator::make($data, [
            'nome'=>['string'],
            'rg'=>['string'],
            'cpf'=>['string'],
            'razao_social'=>['string', "nullable"],
            'nome_fantasia'=>['string'],
            'cnpj'=>['string'],
            'uf'=>['string'],
            'email'=>['string',"nullable"],
            'contato'=>['string'],
            'tipo'=>['required','string']
        ])->validate();

        try{
            $fornecedor = $this->fornecedor->create($data);

            return response()->json([
                'messege'=>"Fornecedor cadastrado com sucesso",
                'data'=>$fornecedor
            ], 201);
        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 400);
        }
    }

    public function show($id)
    {
        try {
            $fornecedor = $this->fornecedor->with('empresas')->findOrFail($id);

            return response()->json([
                'data'=>$fornecedor
            ], 200);
        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 404);
        }
    }

    public function update(Request $request, $id)
    {
        $data = $request->all();

        Validator::make($data, [
            'nome'=>['string'],
            'rg'=>['string'],
            'cpf'=>['string'],
            'razao_social'=>['string', "nullable"],
            'nome_fantasia'=>['string'],
            'cnpj'=>['string'],
            'uf'=>['string'],
            'email'=>['string', 'email', "nullable"],
            'contato'=>['string']
        ])->validate();

        try {
            $fornecedor = $this->fornecedor->findOrFail($id);
            $fornecedor->update($data);

            return response()->json([
                'messege'=>'Fornecedor atualizado com sucesso',
                'data'=>$fornecedor
            ], 200);
        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 400);
        }
    }

    public function destroy($id)
    {
        try {
            $fornecedor = $this->fornecedor->findOrFail($id);
            $fornecedor->delete();

            return response()->json([
                'messege'=>'Fornecedor excluido com sucesso!'
            ], 200);
        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 400);
        }
    }
}
