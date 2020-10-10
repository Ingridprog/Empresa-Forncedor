<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'razao_social', 'nome_fantasia', 'cnpj', 'uf', 'email', 'contato'
    ];

    public function fornecedores()
    {
        return $this->belongsToMany(Fornecedor::class, 'empresa_fornecedor', 'id_empresa', 'id_fornecedor');
    }
}
