import React, { useState } from 'react';
import 'styles/Sistemas/TASY/DetalheNotaFiscalTASY.css';

const DetalheNotaFiscalTASY = () => {
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');
  const [unidade, setUnidade] = useState('');
  const [tipoNota, setTipoNota] = useState('Ambos');
  const [notasCalculadas, setNotasCalculadas] = useState('S');
  const [contaContabil, setContaContabil] = useState('');
  const [multiSelectResultado, setMultiSelectResultado] = useState([]);
  const [buscarNota, setBuscarNota] = useState(false);
  const [inputNota, setInputNota] = useState('');
  const [buscarCnpj, setBuscarCnpj] = useState(false);
  const [inputCnpj, setInputCnpj] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      tipo_consulta: 'detalheNF',
      dtInicial,
      dtFinal,
      unidade,
      tipoNota,
      notasCalculadas,
      contaContabil,
      multiSelectResultado,
      buscarNota: buscarNota ? inputNota : null,
      buscarCnpj: buscarCnpj ? inputCnpj : null,
    };
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="container mt-5">
      <div className="cartao sombra">
        <div className="corpo-cartao">
          <h5 className="titulo-cartao">Detalhe da Nota Fiscal</h5>
          <p className="subtitulo-cartao mb-4 text-muted">Preencha as informações abaixo para consultar o detalhe da nota fiscal.</p>
          <form onSubmit={handleSubmit} id="consultaForm">
            <input type="hidden" name="tipo_consulta" value="detalheNF" />

            <div className="mb-3">
              <label htmlFor="database" className="etiqueta-formulario">Escolha a unidade</label>
              <select
                className="selecao-formulario"
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

            <div className="mb-3">
              <label htmlFor="dt_inicial" className="etiqueta-formulario">Período de Entrada - De</label>
              <input
                type="date"
                className="controle-formulario"
                id="dt_inicial"
                value={dtInicial}
                onChange={(e) => setDtInicial(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="dt_final" className="etiqueta-formulario">Até</label><br></br>
              <input
                type="date"
                className="controle-formulario"
                id="dt_final"
                value={dtFinal}
                onChange={(e) => setDtFinal(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="tipoNota" className="etiqueta-formulario">Tipo de Nota</label>
              <select
                className="selecao-formulario"
                id="tipoNota"
                value={tipoNota}
                onChange={(e) => setTipoNota(e.target.value)}
                required
              >
                <option value="Ambos">Ambos</option>
                <option value="Entrada">Entrada</option>
                <option value="Saida">Saída</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="etiqueta-formulario">Notas Calculadas</label>
              <div className="toggle-container">
                <div className="toggle-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notasCalculadas === 'S'}
                      onChange={(e) => setNotasCalculadas(e.target.checked ? 'S' : 'N')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="opcao-formulario">Sim</label>
                </div>
                <div className="toggle-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notasCalculadas === 'N'}
                      onChange={(e) => setNotasCalculadas(e.target.checked ? 'N' : 'S')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="opcao-formulario">Não</label>
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label className="etiqueta-formulario">Conta Contábil</label>
              <div className="toggle-container">
                <div className="toggle-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={contaContabil === 'gasoterapia'}
                      onChange={(e) => setContaContabil(e.target.checked ? 'gasoterapia' : '')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="opcao-formulario">Gasoterapia</label>
                </div>
                <div className="toggle-item">
                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={contaContabil === 'opme'}
                      onChange={(e) => setContaContabil(e.target.checked ? 'opme' : '')}
                    />
                    <span className="slider round"></span>
                  </label>
                  <label className="opcao-formulario">OPME</label>
                </div>
              </div>
            </div>

            {contaContabil && (
              <div className="mb-3" id="resultado_conta_contabil">
                <label htmlFor="multi_select_resultado" className="etiqueta-formulario">Selecione os Resultados:</label>
                <div id="multi_select_resultado">
                  {multiSelectResultado.map((resultado, index) => (
                    <div key={index}>
                      <input
                        type="checkbox"
                        id={`resultado_${index}`}
                        value={resultado}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setMultiSelectResultado([...multiSelectResultado, e.target.value]);
                          } else {
                            setMultiSelectResultado(multiSelectResultado.filter(item => item !== e.target.value));
                          }
                        }}
                      />
                      <label htmlFor={`resultado_${index}`}>{resultado}</label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-3">
              <input
                type="checkbox"
                id="buscar_nota"
                checked={buscarNota}
                onChange={() => setBuscarNota(!buscarNota)}
              />
              <label htmlFor="buscar_nota" className="etiqueta-formulario"> Nota</label><br></br>
              {buscarNota && (
                <input
                  type="text"
                  id="input_nota"
                  name="input_nota"
                  className="controle-formulario"
                  value={inputNota}
                  onChange={(e) => setInputNota(e.target.value)}
                  placeholder="Digite o número da nota"
                  style={{ marginTop: '10px' }}
                />
              )}
            </div>

            <div className="mb-3">
              <input
                type="checkbox"
                id="buscar_cnpj"
                checked={buscarCnpj}
                onChange={() => setBuscarCnpj(!buscarCnpj)}
              />
              <label htmlFor="buscar_cnpj" className="etiqueta-formulario"> CNPJ</label><br></br>
              {buscarCnpj && (
                <input
                  type="text"
                  id="input_cnpj"
                  name="input_cnpj"
                  className="controle-formulario"
                  value={inputCnpj}
                  onChange={(e) => setInputCnpj(e.target.value)}
                  placeholder="Digite o CNPJ"
                  style={{ marginTop: '10px' }}
                />
              )}
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

export default DetalheNotaFiscalTASY;
