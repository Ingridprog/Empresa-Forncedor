<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Fornecedor extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'rg',
        'cpf',
        'razao_social',
        'nome_fantasia',
        'cnpj',
        'uf',
        'email',
        'contato' ,
        'tipo'
    ];

    public function empresas()
    {
        return $this->belongsToMany(Empresa::class, 'empresa_fornecedor', 'id_fornecedor', 'id_empresa');
    }
}
