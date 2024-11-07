import React, { useState } from 'react';
import 'styles/Sistemas/TASY/CadastroMateriais.css';

const CadastroMateriais = () => {
    const [codigoMaterial, setCodigoMaterial] = useState('');
    const [unidade, setUnidade] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('Consultando:', { codigoMaterial, unidade });
    };

    return (
        <div className="container mt-5">
            <div className="cartao sombra">
                <div className="corpo-cartao">
                    <h5 className="titulo-cartao">Cadastro de Materiais</h5>
                    <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o cadastro de materiais.</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="codigo_material" className="etiqueta-formulario">Código do Material</label>
                            <input
                                type="text"
                                className="controle-formulario"
                                id="codigo_material"
                                name="codigo_material"
                                value={codigoMaterial}
                                onChange={(e) => setCodigoMaterial(e.target.value)}
                                placeholder="Se o campo estiver vazio, busca em toda a base."
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="unidade" className="etiqueta-formulario">Escolha a unidade</label>
                            <select
                                className="selecao-formulario"
                                id="unidade"
                                name="unidade"
                                value={unidade}
                                onChange={(e) => setUnidade(e.target.value)}
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

                        <div className="d-grid">
                            <button type="submit" className="botao botao-primario">Consultar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CadastroMateriais;
