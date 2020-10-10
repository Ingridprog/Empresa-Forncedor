<?php

namespace App\Http\Controllers\Api;

use App\Empresa;
use App\Http\Controllers\Controller;
use http\Env\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmpresaController extends Controller
{
     private $empresa;

     public function __construct(Empresa $empresa)
     {
         $this->empresa = $empresa;
     }

    public function index()
    {
        $empresas = $this->empresa->all();

        return response()->json([
           'data'=>$empresas
        ], 200);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        Validator::make($data, [
            'razao_social'      =>['string', "nullable"],
            'nome_fantasia'     =>['required','string'],
            'cnpj'              =>['required','string'],
            'uf'                =>['required','string'],
            'email'             =>['string', "nullable"],
            'contato'           =>['string', "nullable"]
        ])->validate();

        try{
            $empresa = $this->empresa->create($data);

            if(isset($data['fornecedores'])){
                $fornedores = explode(',',$data['fornecedores']);
                $empresa->fornecedores()->sync($fornedores);
            }

            return response()->json([
                'messege'=>"Empresa cadastrada com sucesso",
                'data'=>$empresa
            ], 201);
        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 400);
        }
    }

    public function show($id)
    {
        try{
            $empresa = $this->empresa->with('fornecedores')->findOrFail($id);

            return response()->json([
                'data'=>$empresa
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
            'razao_social'      =>['string', "nullable"],
            'nome_fantasia'     =>['string'],
            'cnpj'              =>['string'],
            'uf'                =>['string'],
            'email'             =>['string', 'email', "nullable"],
            'contato'           =>['string', "nullable"]
        ])->validate();

        try{
            $empresa = $this->empresa->findOrFail($id);

            if(isset($data['fornecedores'])){
                $fornedores = explode(',',$data['fornecedores']);
                $empresa->fornecedores()->sync($fornedores);
            }

            $empresa->update($data);

            return response()->json([
                'messege'=>"Empresa atualizada com sucesso",
                'data'=>$empresa
            ], 200);
        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 404);
        }
    }

    public function destroy($id)
    {
        try{
            $empresa = $this->empresa->findOrFail($id);
            $empresa->delete();

            return response()->json([
                'messege'=>"Empresa excluída com sucesso"
            ], 200);

        }catch (\Exception $e){
            $messege = new ApiMesseges($e->getMessage());
            return response()->json($messege->getMessege(), 404);
        }
    }
}
