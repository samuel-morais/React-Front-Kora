import React, { useState } from 'react';
import 'styles/Sistemas/MV/DadosConsolidados.css';

const DadosConsolidadosMV = () => {
    const [codigoProduto, setCodigoProduto] = useState('');
    const [tipoConsulta, setTipoConsulta] = useState('toda_base');
    const [unidade, setUnidade] = useState('');

    const handleCodigoProdutoChange = (e) => {
        setCodigoProduto(e.target.value);
        setTipoConsulta(e.target.value.trim() === '' ? 'toda_base' : 'dados_especificos');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Consultando:', { codigoProduto, tipoConsulta, unidade });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">Dados Consolidados</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar os dados consolidados.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="codigo_produto" className="etiqueta-formulario">
                                Código do Produto
                            </label>
                            <input
                                type="text"
                                className="controle-formulario"
                                name="codigo_produto"
                                id="codigo_produto"
                                value={codigoProduto}
                                onChange={handleCodigoProdutoChange}
                                placeholder="Se o campo estiver vazio, retornaremos toda a base de dados."
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

export default DadosConsolidadosMV;
