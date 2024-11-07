import React, { useState } from 'react';
import 'styles/Sistemas/TASY/SolicComprasNaoAtendidasTASY.css';

const SolicComprasNaoAtendidasTASY = () => {
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');
  const [unidade, setUnidade] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      tipo_consulta: 'comprasNaoAtendidas',
      dtInicial,
      dtFinal,
      unidade
    };
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="cartao sombra">
        <div className="corpo-cartao">
          <h5 className="titulo-cartao">Solicitações de Compras Não Atendidas</h5>
          <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar as solicitações de compras não atendidas.</p>
          <form onSubmit={handleSubmit}>
            <input type="hidden" name="tipo_consulta" value="comprasNaoAtendidas" />

            <div className="mb-3">
              <label htmlFor="dt_inicial" className="etiqueta-formulario">Data Inicial</label>
              <input 
                type="date" 
                className="controle-formulario" 
                id="dt_inicial" 
                name="dt_inicial" 
                value={dtInicial} 
                onChange={(e) => setDtInicial(e.target.value)} 
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dt_final" className="etiqueta-formulario">Data Final</label>
              <input 
                type="date" 
                className="controle-formulario" 
                id="dt_final" 
                name="dt_final" 
                value={dtFinal} 
                onChange={(e) => setDtFinal(e.target.value)} 
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="database" className="etiqueta-formulario">Escolha a unidade</label>
              <select 
                className="selecao-formulario" 
                name="database" 
                id="database" 
                value={unidade} 
                onChange={(e) => setUnidade(e.target.value)}
                required
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

export default SolicComprasNaoAtendidasTASY;
