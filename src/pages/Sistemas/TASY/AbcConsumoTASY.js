import React, { useState } from 'react';
import 'styles/Sistemas/TASY/AbcDeConsumoTasy.css';

const AbcDeConsumoTasy = () => {
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [unidade, setUnidade] = useState('');
    const [estabelecimentos, setEstabelecimentos] = useState([]);
    const [codigoEstabelecimento, setCodigoEstabelecimento] = useState('');

    const handleUnidadeChange = (e) => {
        const unidadeSelecionada = e.target.value;
        setUnidade(unidadeSelecionada);

        // Simulando a push estabelecimentos (substitua backend)
        const mockEstabelecimentos = {
            "sao_matheus_cuiaba": [
                { id: '1', nome: 'Estabelecimento A' },
                { id: '2', nome: 'Estabelecimento B' }
            ],
            "santa_thereza": [
                { id: '3', nome: 'Estabelecimento C' },
                { id: '4', nome: 'Estabelecimento D' }
            ]
           
        };

        setEstabelecimentos(mockEstabelecimentos[unidadeSelecionada] || []);
        setCodigoEstabelecimento('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Consultando:', { mes, ano, unidade, codigoEstabelecimento });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">ABC de Consumo - TASY</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o ABC de Consumo no sistema TASY.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="mes" className="etiqueta-formulario">Mês</label> <br />
                            <select
                                className="selecao-formulario"
                                id="mes"
                                name="mes"
                                value={mes}
                                onChange={(e) => setMes(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                <option value="01">Janeiro</option>
                                <option value="02">Fevereiro</option>
                                <option value="03">Março</option>
                                <option value="04">Abril</option>
                                <option value="05">Maio</option>
                                <option value="06">Junho</option>
                                <option value="07">Julho</option>
                                <option value="08">Agosto</option>
                                <option value="09">Setembro</option>
                                <option value="10">Outubro</option>
                                <option value="11">Novembro</option>
                                <option value="12">Dezembro</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="etiqueta-formulario">Ano</label> <br />
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
                                onChange={handleUnidadeChange}
                            >
                                <option value="">Selecione</option>
                                <option value="sao_matheus_cuiaba">Hospital Meridional São Matheus</option>
                                <option value="santa_thereza">Sociedade Hospitalar Santa Thereza</option>
                                <option value="palmas">Hospital Palmas Medical</option>
                                <option value="sao_francisco">Hospital São Francisco Brasília</option>
                                <option value="encore">Hospital Encore</option>
                                <option value="IRT">Instituto de Radioterapia de Taguatinga</option>
                            </select>
                        </div>

                        <div className="mb-5">
                            <label htmlFor="estabelecimentos" className="etiqueta-formulario">Escolha o estabelecimento</label>
                            <select
                                className="selecao-formulario"
                                name="codigo_estabelecimento"
                                id="estabelecimentos"
                                value={codigoEstabelecimento}
                                onChange={(e) => setCodigoEstabelecimento(e.target.value)}
                            >
                                <option value="">Selecione</option>
                                {estabelecimentos.map((estab) => (
                                    <option key={estab.id} value={estab.id}>
                                        {estab.nome}
                                    </option>
                                ))}
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

export default AbcDeConsumoTasy;
