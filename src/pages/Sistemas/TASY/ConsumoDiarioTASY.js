import React, { useState } from 'react';
import 'styles/Sistemas/TASY/ConsumoDiarioTASY.css';

const ConsumoDiarioTASY = () => {
  const [seteDias, setSeteDias] = useState(false);
  const [mes, setMes] = useState('');
  const [ano, setAno] = useState('');
  const [unidade, setUnidade] = useState('');

  const handleToggleChange = () => {
    setSeteDias(!seteDias);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataSeteDiasAtras = new Date();
    dataSeteDiasAtras.setDate(dataSeteDiasAtras.getDate() - 7);
    const dia = dataSeteDiasAtras.getDate().toString().padStart(2, '0');
    const mesCalc = (dataSeteDiasAtras.getMonth() + 1).toString().padStart(2, '0');
    const anoCalc = dataSeteDiasAtras.getFullYear();
    const dataFormatada = `${dia}/${mesCalc}/${anoCalc}`;

    const formData = {
      tipo_consulta: 'consumoDiarioMaterial',
      sete_dias: seteDias,
      mes: seteDias ? '' : mes,
      ano: seteDias ? '' : ano,
      unidade,
      sete_dias_input: seteDias ? dataFormatada : ''
    };

    console.log('Consultando:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="cartao sombra">
        <div className="corpo-cartao">
          <h5 className="titulo-cartao">Consumo Diário - TASY</h5>
          <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o consumo diário no sistema TASY.</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3 d-flex align-items-center">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={seteDias}
                  onChange={handleToggleChange}
                />
                <span className="slider round"></span>
              </label>
              <span className="ms-2"> Consultar últimos sete dias</span>
            </div>

            {!seteDias && (
              <>
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
                  <label htmlFor="ano" className="etiqueta-formulario">Ano</label><br />
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
              </>
            )}

            <div className="mb-3">
              <label htmlFor="unidade" className="etiqueta-formulario">Escolha a unidade</label><br />
              <select
                className="selecao-formulario"
                name="unidade"
                id="unidade"
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

export default ConsumoDiarioTASY;
