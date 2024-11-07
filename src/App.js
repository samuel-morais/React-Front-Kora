import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import './App.css';
import Main from './components/Main';
import Home from './pages/Home';
import AbcConsumoMV from './pages/Sistemas/MV/AbcConsumoMV';
import ConsumoDiarioMV from './pages/Sistemas/MV/ConsumoDiarioMV';
import DadosConsolidadosMV from './pages/Sistemas/MV/DadosConsolidadosMV';
import EstoqueConsolidadoMV from './pages/Sistemas/MV/EstoqueConsolidadoMV';
import EstoqueSimplificadoMV from './pages/Sistemas/MV/EstoqueSimplificadoMV';
import EstoqueSAP from './pages/Sistemas/SAP/EstoqueSAP';
import PedidoSAP from './pages/Sistemas/SAP/PedidoSAP';
import RequisicaoSAP from './pages/Sistemas/SAP/RequisicaoSAP';
import AbcConsumoTASY from './pages/Sistemas/TASY/AbcConsumoTASY';
import CadastroMateriaisTASY from './pages/Sistemas/TASY/CadastroMateriaisTASY';
import ConsumoDiarioTASY from './pages/Sistemas/TASY/ConsumoDiarioTASY';
import DetalheNotaFiscalTASY from './pages/Sistemas/TASY/DetalheNotaFiscalTASY';
import MovimentoSinteticoTASY from './pages/Sistemas/TASY/MovimentoSinteticoTASY';
import OrdemCompraTASY from './pages/Sistemas/TASY/OrdemCompraTASY';
import SaldoEstoqueTASY from './pages/Sistemas/TASY/SaldoEstoqueTASY';
import SolicComprasNaoAtendidasTASY from './pages/Sistemas/TASY/SolicComprasNaoAtendidasTASY';
import SolicitacaoEmprestimo from './pages/Sistemas/Intercompany/SolicitacaoEmprestimo';
import EmprestimoDetalhes from './pages/Sistemas/Intercompany/EmprestimoDetalhes';
import ListaMateriais from './pages/Sistemas/Intercompany/ListaMateriais';


const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Intercompany/ListaMateriais" element={<Main title="ListaMateriais" description="Sistemas / Intercompany / "><ListaMateriais /></Main>} />
          <Route path="/Intercompany/EmprestimoDetalhes" element={<Main title="Cockpit Emprestimo" description="Sistemas / Intercompany / CockpitEmprestimo"><EmprestimoDetalhes /></Main>} />
          <Route path="/Intercompany/SolicitacaoEmprestimo" element={<Main title="Solicitação de Emprestimo" description="Sistemas / Intercompany / Solicitacao"><SolicitacaoEmprestimo /></Main>} />
          <Route path="/MV/AbcConsumoMV" element={<Main title="ABC de Consumo" description=" Sistemas / MV / ABC de Consumo"><AbcConsumoMV /></Main>} />
          <Route path="/MV/ConsumoDiarioMV" element={<Main title="Consumo Diário" description=" Sistemas / MV / Consumo Diário"><ConsumoDiarioMV /></Main>} />
          <Route path="/MV/DadosConsolidadosMV" element={<Main title="Dados Consolidados" description=" Sistemas / MV / Dados Consolidados"><DadosConsolidadosMV /></Main>} />
          <Route path="/MV/EstoqueConsolidadoMV" element={<Main title="Estoque Consolidado" description=" Sistemas / MV / Estoque Consolidado"><EstoqueConsolidadoMV /></Main>} />
          <Route path="/MV/EstoqueSimplificadoMV" element={<Main title="Estoque Simplificado" description=" Sistemas / MV / Estoque Simplificado"><EstoqueSimplificadoMV /></Main>} />
          <Route path="/SAP/EstoqueSAP" element={<Main title="Estoque" description=" Sistemas / SAP / Estoque"><EstoqueSAP /></Main>} />
          <Route path="/SAP/PedidoSAP" element={<Main title="Pedido" description=" Sistemas / SAP / Pedido"><PedidoSAP /></Main>} />
          <Route path="/SAP/RequisicaoSAP" element={<Main title="Requisição" description=" Sistemas / SAP / Requisição"><RequisicaoSAP /></Main>} />
          <Route path="/TASY/AbcConsumoTASY" element={<Main title="ABC de Consumo" description=" Sistemas / TASY / ABC de Consumo"><AbcConsumoTASY /></Main>} />
          <Route path="/TASY/CadastroMateriaisTASY" element={<Main title="Cadastro de Materiais" description=" Sistemas / TASY / Cadastro de Materiais"><CadastroMateriaisTASY /></Main>} />
          <Route path="/TASY/ConsumoDiarioTASY" element={<Main title="Consumo Diário" description=" Sistemas / TASY / Consumo Diário"><ConsumoDiarioTASY /></Main>} />
          <Route path="/TASY/DetalheNotaFiscalTASY" element={<Main title="Detalhe Nota Fiscal" description=" Sistemas / TASY / Detalhe Nota Fiscal"><DetalheNotaFiscalTASY /></Main>} />
          <Route path="/TASY/MovimentoSinteticoTASY" element={<Main title="Movimento Sintético" description=" Sistemas / TASY / Movimento Sintético"><MovimentoSinteticoTASY /></Main>} />
          <Route path="/TASY/OrdemCompraTASY" element={<Main title="Ordem de Compra" description=" Sistemas / TASY / Ordem de Compra"><OrdemCompraTASY /></Main>} />
          <Route path="/TASY/SaldoEstoqueTASY" element={<Main title="Saldo de Estoque" description=" Sistemas / TASY / Saldo de Estoque"><SaldoEstoqueTASY /></Main>} />
          <Route path="/TASY/SolicComprasNaoAtendidasTASY" element={<Main title="Solicitação de Compras Não Atendidas" description=" Sistemas / TASY / Solicitação de Compras Não Atendidas"><SolicComprasNaoAtendidasTASY /></Main>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
