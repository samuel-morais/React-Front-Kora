import React, { useState } from 'react';
import 'styles/Sistemas/TASY/OrdemCompraTASY.css';

const filters = [
  { id: 'material', label: 'Buscar Materiais', type: 'text', placeholder: 'Digite o Material' },
  { id: 'classe_material', label: 'Buscar Classe de Material', type: 'text', placeholder: 'Digite a Classe de Material' },
  { id: 'subgrupo_material', label: 'Buscar Subgrupo de Material', type: 'text', placeholder: 'Digite o Subgrupo de Material' },
  { id: 'grupo_material', label: 'Buscar Grupo de Material', type: 'text', placeholder: 'Digite o Grupo de Material' },
  { id: 'centro_custo', label: 'Buscar Centro de Custo', type: 'text', placeholder: 'Digite o Centro de Custo' },
  { id: 'convenio', label: 'Buscar Convênio', type: 'text', placeholder: 'Digite o Convênio' },
  { id: 'solicitacao_compra', label: 'Buscar Solicitação de Compra', type: 'text', placeholder: 'Digite a Solicitação de Compra' },
  { id: 'setor_atendimento', label: 'Buscar Setor Atendimento', type: 'text', placeholder: 'Digite o Setor Atendimento' },
  { id: 'conta_contabil', label: 'Incluir Conta Contábil', type: 'text', placeholder: 'Digite a Conta Contábil' },
  { id: 'fornecedor', label: 'Fornecedor', type: 'text', placeholder: 'Digite o Fornecedor' },
  { id: 'condicoes_pagamento', label: 'Buscar Condições de Pagamento', type: 'text', placeholder: 'Digite as Condições de Pagamento' },
  { id: 'tipo_compra', label: 'Buscar Tipo de Compra', type: 'text', placeholder: 'Digite o Tipo de Compra' },
  { id: 'local_estoque', label: 'Buscar Local de Estoque', type: 'text', placeholder: 'Digite o Local de Estoque' },
  { id: 'comprador', label: 'Buscar Comprador', type: 'text', placeholder: 'Digite o Comprador' },
  { id: 'projeto_recurso', label: 'Buscar Projeto Recurso', type: 'text', placeholder: 'Digite o Projeto Recurso' }
];

const OrdemCompraTASY = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterValues, setFilterValues] = useState({});
  const [dtInicial, setDtInicial] = useState('');
  const [dtFinal, setDtFinal] = useState('');
  const [unidade, setUnidade] = useState('');

  const handleFilterChange = (filterId) => {
    if (selectedFilters.includes(filterId)) {
      setSelectedFilters(selectedFilters.filter(id => id !== filterId));
      setFilterValues({ ...filterValues, [filterId]: '' });
    } else {
      setSelectedFilters([...selectedFilters, filterId]);
    }
  };

  const handleInputChange = (filterId, value) => {
    setFilterValues({ ...filterValues, [filterId]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = {
      dtInicial,
      dtFinal,
      unidade,
      filters: filterValues,
    };
    console.log('Submitted form data:', formData);
  };

  return (
    <div className="ordem-compra-container">
      {}
      <div className="top-section">
        <div className="mb-3">
          <label htmlFor="dt_inicial" className="form-label">Data Inicial:</label>
          <input
            type="date"
            className="form-control"
            id="dt_inicial"
            value={dtInicial}
            onChange={(e) => setDtInicial(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dt_final" className="form-label">Data Final:</label>
          <input
            type="date"
            className="form-control"
            id="dt_final"
            value={dtFinal}
            onChange={(e) => setDtFinal(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="unidade" className="form-label">Escolha a Unidade:</label>
          <select
            className="form-select"
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
      </div>

      <div className="bottom-section">
        {}
        <div className="filters-box">
          <h5>Filtros</h5>
          {filters.map(filter => (
            <div key={filter.id} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={filter.id}
                onChange={() => handleFilterChange(filter.id)}
                checked={selectedFilters.includes(filter.id)}
              />
              <label className="form-check-label" htmlFor={filter.id}>{filter.label}</label>
            </div>
          ))}
        </div>

        {}
        <div className="selected-filters-box">
          <h5>Campos Selecionados</h5>
          <form onSubmit={handleSubmit}>
            {selectedFilters.map(filterId => {
              const filter = filters.find(f => f.id === filterId);
              return (
                <div key={filterId} className="mb-3">
                  <label htmlFor={filterId} className="form-label">{filter.label}</label>
                  <input
                    type={filter.type}
                    className="form-control"
                    id={filterId}
                    placeholder={filter.placeholder}
                    value={filterValues[filterId]}
                    onChange={(e) => handleInputChange(filterId, e.target.value)}
                  />
                </div>
              );
            })}
            {selectedFilters.length > 0 && (
              <button type="submit" className="btn btn-primary">Consultar</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrdemCompraTASY;
