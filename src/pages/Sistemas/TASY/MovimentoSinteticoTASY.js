import React, { useState } from 'react';
import 'styles/Sistemas/TASY/MovimentoSinteticoTASY.css';

const MovimentoSinteticoTASY = () => {
    const [mes, setMes] = useState('');
    const [ano, setAno] = useState('');
    const [agrupamento, setAgrupamento] = useState('geral');
    const [unidade, setUnidade] = useState('');
    const [codigoEstabelecimento, setCodigoEstabelecimento] = useState('');
    const [estabelecimentos, setEstabelecimentos] = useState([]);

    const handleUnidadeChange = (e) => {
        const unidadeSelecionada = e.target.value;
        setUnidade(unidadeSelecionada);

        // Substituir backend
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
        
        console.log('Consultando:', { mes, ano, agrupamento, unidade, codigoEstabelecimento });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">Movimento Sintético - TASY</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o movimento sintético no sistema TASY.</p>
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
                            <label htmlFor="agrupamento" className="etiqueta-formulario">Agrupamento</label><br />
                            <select
                                className="selecao-formulario"
                                id="agrupamento"
                                name="agrupamento"
                                value={agrupamento}
                                onChange={(e) => setAgrupamento(e.target.value)}
                            >
                                <option value="geral">Geral</option>
                                <option value="grupo">Grupo</option>
                                <option value="subgrupo">Subgrupo</option>
                                <option value="classe">Classe</option>
                            </select>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="unidade" className="etiqueta-formulario">Escolha a unidade</label><br />
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

                        <div className="mb-3">
                            <label htmlFor="codigo_estabelecimento" className="etiqueta-formulario">Escolha o estabelecimento</label><br />
                            <select
                                className="selecao-formulario"
                                name="codigo_estabelecimento"
                                id="codigo_estabelecimento"
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

export default MovimentoSinteticoTASY;
