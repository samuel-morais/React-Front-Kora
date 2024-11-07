import React, { useState } from 'react';
import 'styles/Sistemas/MV/EstoqueSimplificado.css';

const EstoqueSimplificado = () => {
    const [unidade, setUnidade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
       
        console.log('Consultando:', { unidade });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">Estoque Simplificado</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o estoque simplificado.</p>
                    <form onSubmit={handleSubmit}>
                        <input type="hidden" name="tipo_consulta" value="estoqueSimplificado" />
                        <input type="hidden" name="prod_mestre" value="N" />
                        
                        <div className="mb-3">
                            <label htmlFor="unidade" className="etiqueta-formulario">Escolha a unidade</label>
                            <select
                                className="selecao-formulario"
                                name="unidade"
                                id="unidade"
                                value={unidade}
                                onChange={(e) => setUnidade(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="cariacica">Hospital Meridional Cariacica</option>
                                <option value="serra">Hospital Meridional Serra</option>
                                <option value="praia_da_costa">Hospital Meridional Praia da Costa</option>
                                <option value="sao_francisco">Hospital Meridional São Francisco</option>
                                <option value="sao_luiz">Hospital Meridional São Luiz</option>
                                <option value="sao_matheus">Hospital Meridional São Matheus e Vitória</option>
                                <option value="anchieta">Hospital Anchieta</option>
                                <option value="neurologia_goiania">Hospital Otoclínica e Instituto de Neurologia de Goiânia</option>
                            </select>
                        </div>

                        <div className="d-grid">
                            <button type="submit" className="botao botao-primario">Consultar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EstoqueSimplificado;
