import React, { useState } from 'react';
import 'styles/Sistemas/SAP/EstoqueSAP.css';

const filters = [
  { id: 'material', label: 'Material', type: 'text', placeholder: 'Digite o Material' },
  { id: 'descricao_material', label: 'Descrição do Material', type: 'text', placeholder: 'Digite a Descrição do Material' },
  { id: 'centro', label: 'Centro', type: 'text', placeholder: 'Digite o Centro' },
  { id: 'nome_centro', label: 'Nome do Centro', type: 'text', placeholder: 'Digite o Nome do Centro' },
  { id: 'grupo_mercadoria', label: 'Grupo de mercadoria', type: 'text', placeholder: 'Digite o Grupo de mercadoria' },
  { id: 'nome_grupo_mercadorias', label: 'Nome do grupo de mercadorias', type: 'text', placeholder: 'Digite o Nome do grupo de mercadorias' },
  { id: 'deposito', label: 'Depósito', type: 'text', placeholder: 'Digite o Depósito' },
  { id: 'descricao_deposito', label: 'Descrição do depósito', type: 'text', placeholder: 'Digite a Descrição do depósito' },
  { id: 'descricao_tipo_estoque_especial', label: 'Descrição de tipo de estoque especial', type: 'text', placeholder: 'Digite a Descrição de tipo de estoque especial' },
  { id: 'estoque_utilizacao_livre', label: 'Estoque de utilização livre', type: 'text', placeholder: 'Digite o Estoque de utilização livre' },
  { id: 'estoque_bloqueado', label: 'Estoque Bloqueado', type: 'text', placeholder: 'Digite o Estoque Bloqueado' },
  { id: 'estoque_controle_qualidade', label: 'Estoque em controle de qualidade', type: 'text', placeholder: 'Digite o Estoque em controle de qualidade' },
];

const EstoqueSAP = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterValues, setFilterValues] = useState({});

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
    console.log('Submitted filter values:', filterValues);
  };

  return (
    <div className="container">
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

      {/* Seção para exibir os campos de entrada para os filtros selecionados */}
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
  );
};

export default EstoqueSAP;
