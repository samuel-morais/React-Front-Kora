import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'styles/Sistemas/Intercompany/SolicitacaoEmprestimo.css';

const SolicitacaoEmprestimo = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { materials = [], hospital: initialHospital } = state || {};
  const [hospitais, setHospitais] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [confirm, setConfirm] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHospitais = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:3001/api/hospitais');
        setHospitais(data);
      } catch (error) {
        console.error('Erro ao buscar hospitais:', error);
        setErrorMessage('Erro ao buscar hospitais.');
      } finally {
        setLoading(false);
      }
    };
    fetchHospitais();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const total = materials.reduce((acc, material) => acc + (material.total_valor || 0), 0);
      setTotalValue(total);
    };
    calculateTotal();
  }, [materials]);

  const handleHospitalChange = (e) => {
    setSelectedHospital(e.target.value);
  };

  const handleConfirm = async () => {
    if (!selectedHospital) {
      setErrorMessage('Por favor, selecione um hospital de destino.');
      return;
    }

    const isConfirmed = window.confirm('Tem certeza de que deseja enviar a solicitação de empréstimo?');

    if (isConfirmed) {
      try {
        setLoading(true);

        const now = new Date();
        const brtOffset = -3 * 60;
        const localTime = new Date(now.getTime() + (brtOffset - now.getTimezoneOffset()) * 60000);
        const dataCriacao = localTime.toISOString().slice(0, 19).replace('T', ' ');

        const requestData = {
          empresaOrigem: initialHospital,
          empresaDestino: selectedHospital,
          dataCriacao,
          materiais: materials.map((material) => ({
            cod_item: material.cod_item,
            material: material.nome || 'Nome Padrão',
            descricao_material: material.descricao || 'Descrição Padrão',
            quantidade: material.quantidade || 0,
            medida: material.medida || 'Unidade Padrão',
            valor: material.valor || 0,
            quantidade_saldo: material.saldo || 0,
            sub_total: material.total_valor || 0,
          })),
          total: totalValue,
          status: 'Criado',
        };

        await axios.post('http://localhost:3001/api/solicitacao-emprestimo', requestData);
        setSuccessMessage('Solicitação enviada com sucesso!');
        setConfirm(true);
        setErrorMessage('');

        setTimeout(() => {
          navigate('/Intercompany/EmprestimoDetalhes');
        }, 3000);

      } catch (error) {
        console.error('Erro ao enviar a solicitação de empréstimo:', error);
        setErrorMessage('Erro ao enviar a solicitação.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="cartao sombra">
        <div className="cartao-body">
          <h5 className="card-title">Solicitação de Empréstimo</h5>

          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              {successMessage}
            </div>
          )}

          {loading && (
            <div className="alert alert-info">
              Carregando...
            </div>
          )}

          {confirm ? (
            <>
              <div className="alert alert-info">
                <h5>Resumo da Solicitação</h5>
                <p><strong>Origem:</strong> {initialHospital || 'Nenhum hospital selecionado'}</p>
                <p><strong>Destino:</strong> {selectedHospital || 'Nenhum hospital selecionado'}</p>

                <h6>Resumo dos Dados:</h6>
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Material</th>
                      <th>Descrição</th>
                      <th>Medida</th>
                      <th>Quantidade</th>
                      <th>Vl Unitário</th>
                      <th>Sub-total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.length > 0 ? (
                      materials.map((material) => (
                        <tr key={material.cod_item}>
                          <td>{material.nome}</td>
                          <td>{material.descricao}</td>
                          <td>{material.medida}</td>
                          <td>{material.quantidade}</td>
                          <td>R$ {material.valor.toFixed(2)}</td>
                          <td>R$ {material.total_valor.toFixed(2)}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">Nenhum material selecionado</td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th colSpan="5" className="text-end">Total</th>
                      <th>R$ {totalValue.toFixed(2)}</th>
                    </tr>
                  </tfoot>
                </table>

                <div className="material-details mt-4 text-center">
                  <button
                    type="button"
                    className="btn btn-success btn-lg"
                    onClick={handleConfirm}
                  >
                    Confirmar e Enviar
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="alert alert-info">
                <strong>Origem:</strong> {initialHospital || 'Nenhum hospital selecionado'}
              </div>

              <h6>RESUMO:</h6>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Material</th>
                    <th>Descrição</th>
                    <th>Medida</th>
                    <th>Quantidade</th>
                    <th>Vl Unitário</th>
                    <th>Sub-total</th>
                  </tr>
                </thead>
                <tbody>
                {materials.length > 0 ? (
                  materials.map((material, index) => (
                    <tr key={material.cod_item || index}>
                      <td>{material.nome}</td>
                      <td>{material.descricao}</td>
                      <td>{material.medida}</td>
                      <td>{material.quantidade}</td>
                      <td>R$ {material.valor.toFixed(2)}</td>
                      <td>R$ {material.total_valor.toFixed(2)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6">Nenhum material selecionado</td>
                  </tr>
                  )}
                </tbody>
              </table>

              <div className="mb-3">
                <label htmlFor="hospital-destino" className="form-label">
                  PARA:
                </label>
                <select
                  id="hospital-destino"
                  className="form-select"
                  value={selectedHospital}
                  onChange={handleHospitalChange}
                >
                  <option value="">Selecione um hospital de destino</option>
                  {hospitais.map((hospital) => (
                    <option key={hospital.id} value={hospital.nome}>
                      {hospital.nome}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (!selectedHospital) {
                    setErrorMessage('Por favor, selecione um hospital de destino.');
                  } else {
                    setConfirm(true);
                    setErrorMessage('');
                  }
                }}
              >
                Avançar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolicitacaoEmprestimo;
