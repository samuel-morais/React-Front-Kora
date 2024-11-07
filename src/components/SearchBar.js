import React, { useState } from 'react';
import Autosuggest from 'react-autosuggest';
import { useNavigate } from 'react-router-dom';
import '../styles/SearchBar.css';

const paths = [{ name: 'Dados Consolidados (MV)', category: 'MV', path: '/MV/DadosConsolidadosMV' },
  { name: 'Consumo Diário (MV)', category: 'MV', path: '/MV/ConsumoDiarioMV' },
  { name: 'Estoque Consolidado (MV)', category: 'MV', path: '/MV/EstoqueConsolidadoMV' },
  { name: 'Estoque Simplificado (MV)', category: 'MV', path: '/MV/EstoqueSimplificadoMV' },
  { name: 'ABC de Consumo (MV)', category: 'MV', path: '/MV/AbcConsumoMV' },
  { name: 'Cadastro de Materiais (Tasy)', category: 'Tasy', path: '/Tasy/CadastroMateriaisTasy' },
  { name: 'Saldo de Estoque (Tasy)', category: 'Tasy', path: '/Tasy/SaldoEstoqueTasy' },
  { name: 'Movimento Sintético Operações (Tasy)', category: 'Tasy', path: '/Tasy/MovimentoSinteticoTasy' },
  { name: 'Consumo Diário por Material (Tasy)', category: 'Tasy', path: '/Tasy/ConsumoDiarioTasy' },
  { name: 'Ordem de Compra (Tasy)', category: 'Tasy', path: '/Tasy/OrdemCompraTasy' },
  { name: 'Solicitação de Compras não Atendidas - Sem baixa (Tasy)', category: 'Tasy', path: '/Tasy/SolicComprasNaoAtendidasTasy' },
  { name: 'Detalhe Nota Fiscal (Tasy)', category: 'Tasy', path: '/Tasy/DetalheNotaFiscalTasy' },
  { name: 'Requisições (SAP)', category: 'SAP', path: '/SAP/RequisicaoSAP' },
  { name: 'Estoques (SAP)', category: 'SAP', path: '/SAP/EstoqueSAP' },
  { name: 'Pedidos (SAP)', category: 'SAP', path: '/SAP/PedidoSAP' },
];

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const getSuggestions = (value) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : paths.filter(path =>
      path.name.toLowerCase().includes(inputValue) ||
      path.category.toLowerCase().includes(inputValue)
    );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      {suggestion.name}
    </div>
  );

  const onSuggestionSelected = (event, { suggestion }) => {
    if (onSearch) {
      onSearch(); 
    }
    navigate(suggestion.path);
  };

  const inputProps = {
    placeholder: 'Pesquisar...',
    value,
    onChange,
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      onSuggestionSelected={onSuggestionSelected}
      inputProps={inputProps}
    />
  );
};

export default SearchBar;
