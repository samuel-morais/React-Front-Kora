import React, { useState } from 'react';
import 'styles/Sistemas/MV/EstoqueConsolidado.css';

const EstoqueConsolidado = () => {
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [unidade, setUnidade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Consultando:', { mes, ano, unidade });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">Estoque Consolidado</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o estoque consolidado.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="mes" className="etiqueta-formulario">Mês</label><br />
                            <select
                                className="selecao-formulario"
                                id="mes"
                                name="mes"
                                value={mes}
                                onChange={(e) => setMes(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="1">Janeiro</option>
                                <option value="2">Fevereiro</option>
                                <option value="3">Março</option>
                                <option value="4">Abril</option>
                                <option value="5">Maio</option>
                                <option value="6">Junho</option>
                                <option value="7">Julho</option>
                                <option value="8">Agosto</option>
                                <option value="9">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="etiqueta-formulario">Ano</label><br />
                            <div className="opcoes-ano">
                                <button
                                    type="button"
                                    className={`botao-ano ${ano === '2023' ? 'selecionado' : ''}`}
                                    onClick={() => setAno('2023')}
                                >
                                    2023
                                </button>
                                <button
                                    type="button"
                                    className={`botao-ano ${ano === '2024' ? 'selecionado' : ''}`}
                                    onClick={() => setAno('2024')}
                                >
                                    2024
                                </button>
                            </div>
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

export default EstoqueConsolidado;
