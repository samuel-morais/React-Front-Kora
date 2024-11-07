import React, { useState } from 'react';
import 'styles/Sistemas/SAP/PedidoSAP.css';

const filters = [
  { id: 'pedido_compra', label: 'Buscar Pedido da Compra', type: 'text', placeholder: 'Digite o número do Pedido da compra' },
  { id: 'data_criacao', label: 'Data de criação', type: 'date' },
  { id: 'data_remessa', label: 'Data da remessa', type: 'date' },
  { id: 'grupo_mercadoria', label: 'Buscar Grupo Mercadoria', type: 'text', placeholder: 'Digite o nome código do grupo de mercadoria' },
  { id: 'moeda', label: 'Buscar Moeda', type: 'text', placeholder: 'Digite a moeda' },
  { id: 'fornecedor', label: 'Buscar Fornecedor', type: 'text', placeholder: 'Digite o fornecedor' },
  { id: 'material', label: 'Buscar Material', type: 'text', placeholder: 'Digite o nome do material' },
  { id: 'centro', label: 'Buscar Centro', type: 'text', placeholder: 'Digite o centro' },
  { id: 'quantidade_divisao', label: 'Buscar Quantidade Divisão', type: 'text' },
  { id: 'quantidade_fornecida', label: 'Buscar Quantidade Fornecida', type: 'text' },
];

const PedidoSAP = () => {
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
  );
};

export default PedidoSAP;
