import React, { useEffect, useState } from 'react';
import 'styles/Sistemas/Intercompany/EmprestimoDetalhes.css';

const EmprestimoDetalhes = () => {
  const [emprestimos, setEmprestimos] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmprestimos = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/listarEmprestimos');
        if (!response.ok) {
          throw new Error('Network error');
        }
        const data = await response.json();
        setEmprestimos(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmprestimos();
  }, []);

  const handleSearchChange = (event) => {
    setPesquisa(event.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const filteredEmprestimos = emprestimos.filter((emprestimo) =>
    emprestimo.empresa_origem.toLowerCase().includes(pesquisa.toLowerCase()) ||
    emprestimo.empresa_destino.toLowerCase().includes(pesquisa.toLowerCase()) ||
    emprestimo.material.toLowerCase().includes(pesquisa.toLowerCase()) ||
    emprestimo.descricao_material.toLowerCase().includes(pesquisa.toLowerCase())
  );

  return (
    <div className="container">
      <div className="cartao">
        <div className="corpo-cartao">
          <h5 className="titulo-cartao">Movimentação Emprestimos</h5>
          <p className="subtitulo-cartao mb-4 text-muted">Preencha o campo abaixo para filtrar os empréstimos.</p>
          <form>
            <div className="mb-3">
              <input
                type="text"
                className="controle-formulario"
                placeholder="Pesquisar..."
                value={pesquisa}
                onChange={handleSearchChange}
              />
            </div>
          </form>

          {loading && <p className="loading">Carregando...</p>}
          {error && <p className="error">Erro: {error}</p>}

          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>Empresa Origem</th>
                  <th>Empresa Destino</th>
                  <th>Material</th>
                  <th>Descrição do Material</th>
                  <th>Quantidade</th>
                  <th>Medida</th>
                  <th>Data Criação</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmprestimos.length > 0 ? (
                  filteredEmprestimos.map((emprestimo) => {
                    const {
                      empresa_origem,
                      empresa_destino,
                      material,
                      descricao_material,
                      quantidade,
                      medida,
                      data_criacao,
                      total,
                      status
                    } = emprestimo;
                    return (
                      <tr key={`${empresa_origem}-${empresa_destino}-${material}`}>
                        <td>{empresa_origem}</td>
                        <td>{empresa_destino}</td>
                        <td>{material}</td>
                        <td>{descricao_material}</td>
                        <td>{quantidade}</td>
                        <td>{medida}</td>
                        <td>{formatDate(data_criacao)}</td>
                        <td>R$ {(Number(total) || 0).toFixed(2)}</td>
                        <td>{status}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">Nenhum empréstimo encontrado.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmprestimoDetalhes;
