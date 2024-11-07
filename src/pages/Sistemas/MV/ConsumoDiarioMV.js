import React, { useState } from 'react';
import 'styles/Sistemas/MV/ConsumoDiario.css';

const ConsumoDiario = () => {
    const [dataInicial, setDataInicial] = useState('');
    const [dataFinal, setDataFinal] = useState('');
    const [unidade, setUnidade] = useState('cariacica');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Consultando:', { dataInicial, dataFinal, unidade });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">Consumo Diário</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o consumo diário.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="dt_inicial" className="etiqueta-formulario">
                                Data Inicial
                            </label>
                            <input
                                type="date"
                                className="controle-formulario"
                                name="dt_inicial"
                                id="dt_inicial"
                                value={dataInicial}
                                onChange={(e) => setDataInicial(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="dt_final" className="etiqueta-formulario">
                                Data Final
                            </label>
                            <input
                                type="date"
                                className="controle-formulario"
                                name="dt_final"
                                id="dt_final"
                                value={dataFinal}
                                onChange={(e) => setDataFinal(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="unidade" className="etiqueta-formulario">Escolha a unidade</label>
                            <select
                                className="selecao-formulario"
                                name="unidade"
                                id="unidade"
                                value={unidade}
                                onChange={(e) => setUnidade(e.target.value)}
                            >
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

export default ConsumoDiario;
