import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'styles/Sistemas/Intercompany/ListaMateriais.css';

const ListaMateriais = () => {
  const [pesquisa, setPesquisa] = useState('');
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [hospitais, setHospitais] = useState([]);
  const [selectedHospital, setSelectedHospital] = useState('');
  const [quantidades, setQuantidades] = useState({});
  const [descricoes, setDescricoes] = useState({});
  const [error, setError] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHospitaisMateriais = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/hospitais-materiais');
        const hospitaisMap = response.data.reduce((acc, item) => {
          const { hospital_nome, material_id, material_nome, saldo, valor, unidade, medida } = item;
          if (!acc[hospital_nome]) {
            acc[hospital_nome] = { nome: hospital_nome, materiais: [] };
          }
          acc[hospital_nome].materiais.push({
            id: material_id,
            nome: material_nome,
            saldo,
            valor: parseFloat(valor),
            unidade,
            medida,
          });
          return acc;
        }, {});
        setHospitais(Object.values(hospitaisMap));
      } catch (error) {
        console.error('Erro ao buscar dados dos hospitais e materiais:', error);
      }
    };
    fetchHospitaisMateriais();
  }, []);

  const handlePesquisaChange = (e) => {
    setPesquisa(e.target.value);
    setSelectedHospital(''); 
  };

  // const handleHospitalSelect = (e) => {
  //   const hospital = e.target.value;
  //   setSelectedHospital(hospital);
  //   setPesquisa('');
  // };

  const filtrarMateriais = (hospital) => {
    const pesquisaLowerCase = pesquisa.toLowerCase();
    return hospital.materiais.filter(
      (material) =>
        material.nome.toLowerCase().includes(pesquisaLowerCase) ||
        hospital.nome.toLowerCase().includes(pesquisaLowerCase)
    );
  };

  const handleMaterialCheck = (material, hospital) => {
    const materialId = `${hospital.nome}-${material.id}`;
    setSelectedMaterials((prevSelectedMaterials) => {
      const isMaterialSelected = prevSelectedMaterials.some((item) => item.id === materialId);
      const updatedMaterials = isMaterialSelected
        ? prevSelectedMaterials.filter((item) => item.id !== materialId)
        : [
            ...prevSelectedMaterials,
            {
              ...material,
              hospital: hospital.nome,
              id: materialId,
            },
          ];

      if (!isMaterialSelected) {
        setQuantidades((prevQuantidades) => ({ ...prevQuantidades, [materialId]: '' }));
        setDescricoes((prevDescricoes) => ({ ...prevDescricoes, [materialId]: '' }));
      } else {
        setQuantidades((prevQuantidades) => {
          const newQuantidades = { ...prevQuantidades };
          delete newQuantidades[materialId];
          return newQuantidades;
        });
        setDescricoes((prevDescricoes) => {
          const newDescricoes = { ...prevDescricoes };
          delete newDescricoes[materialId];
          return newDescricoes;
        });
      }

      return updatedMaterials;
    });
  };

  const handleQuantityChange = (materialId, quantity) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [materialId]: quantity,
    }));
  };

  const handleDescriptionChange = (materialId, description) => {
    setDescricoes((prevDescricoes) => ({
      ...prevDescricoes,
      [materialId]: description.substring(0, 255),
    }));
  };

  const validateFields = () => {
    const newErrors = {};
    selectedMaterials.forEach((material) => {
      if (!quantidades[material.id] || quantidades[material.id] <= 0) {
        newErrors[material.id] = 'Quantidade é obrigatória e deve ser maior que zero.';
      }
      if (!descricoes[material.id] || descricoes[material.id].length === 0) {
        newErrors[material.id] = 'Descrição é obrigatória.';
      }
    });

    setError(Object.keys(newErrors).length > 0 ? 'Existem campos obrigatórios não preenchidos.' : '');
    return Object.keys(newErrors).length === 0;
  };

  const handleSolicitarEmprestimo = () => {
    if (validateFields()) {
      const materiaisComQuantidades = selectedMaterials.map((material) => ({
        ...material,
        quantidade: parseInt(quantidades[material.id]) || 0,
        descricao: descricoes[material.id] || '',
        total_valor: (parseInt(quantidades[material.id]) || 0) * material.valor,
        medida: material.medida,
      }));

      const hospitalParaEnviar = selectedMaterials.length > 0 ? selectedMaterials[0].hospital : selectedHospital;

      navigate('/Intercompany/SolicitacaoEmprestimo', {
        state: {
          materials: materiaisComQuantidades,
          hospital: hospitalParaEnviar,
        },
      });
    }
  };

  const hospitaisFiltrados = hospitais
    .filter((hospital) => !selectedHospital || hospital.nome === selectedHospital)
    .map((hospital) => ({
      ...hospital,
      materiais: filtrarMateriais(hospital),
    }))
    .filter((hospital) => hospital.materiais.length > 0);

  const ordenarMateriais = (materiais) => {
    return materiais.sort((a, b) => {
      const isSelectedA = selectedMaterials.some((item) => item.id === a.id);
      const isSelectedB = selectedMaterials.some((item) => item.id === b.id);
      return isSelectedB - isSelectedA;
    });
  };

  return (
    <div className="container mt-4">
      <div className="cartao sombra">
        <div className="cartao-body">
          <form>
            <div className="mb-3">
              <label htmlFor="pesquisa" className="form-label">
                Pesquisar Material ou Hospital
              </label>
              <input
                type="text"
                className="form-control"
                id="pesquisa"
                name="pesquisa"
                value={pesquisa}
                onChange={handlePesquisaChange}
                placeholder="Digite o nome do material ou hospital..."
              />
            </div>

            {/* <div className="mb-3">
              <label htmlFor="hospital" className="form-label">
                Selecionar Hospital
              </label>
              <select
                id="hospital"
                className="form-select"
                value={selectedHospital}
                onChange={handleHospitalSelect}
              >
                <option value="">Todos os Hospitais</option>
                {hospitais.map((hospital) => (
                  <option key={hospital.nome} value={hospital.nome}>
                    {hospital.nome}
                  </option>
                ))}
              </select>
            </div> */}
          </form>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th></th>
                <th>Empresa Origem</th>
                <th>Material</th>
                <th>Descrição Material</th>
                <th>Medida</th>
                <th>Quantidade</th>
                <th>Vl Unitário</th>
                <th>Saldo Unidade</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {hospitaisFiltrados.map((hospital) =>
                ordenarMateriais(hospital.materiais).map((material) => (
                  <tr key={`${hospital.nome}-${material.id}`}>
                    <td>
                      <input
                        type="checkbox"
                        onChange={() => handleMaterialCheck(material, hospital)}
                        checked={selectedMaterials.some(
                          (item) => item.id === `${hospital.nome}-${material.id}`
                        )}
                      />
                    </td>
                    <td>{hospital.nome}</td>
                    <td>{material.nome}</td>
                    <td>
                      {selectedMaterials.some((item) => item.id === `${hospital.nome}-${material.id}`) && (
                        <input
                          type="text"
                          className="form-control"
                          value={descricoes[`${hospital.nome}-${material.id}`] || ''}
                          onChange={(e) =>
                            handleDescriptionChange(`${hospital.nome}-${material.id}`, e.target.value)
                          }
                        />
                      )}
                    </td>
                    <td>{material.medida}</td>
                    <td>
                      {selectedMaterials.some((item) => item.id === `${hospital.nome}-${material.id}`) && (
                        <input
                          type="number"
                          className="form-control"
                          min="0"
                          value={quantidades[`${hospital.nome}-${material.id}`] || ''}
                          onChange={(e) =>
                            handleQuantityChange(`${hospital.nome}-${material.id}`, e.target.value)
                          }
                        />
                      )}
                    </td>
                    <td>{material.valor.toFixed(2)}</td>
                    <td>{material.saldo}</td>
                    <td>
                      {selectedMaterials.some((item) => item.id === `${hospital.nome}-${material.id}`)
                        ? (
                            parseInt(quantidades[`${hospital.nome}-${material.id}`]) || 0
                          ) * material.valor
                        : 0}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div>
            <button
              className="btn btn-primary"
              onClick={handleSolicitarEmprestimo}
              disabled={selectedMaterials.length === 0}
            >
              Avancar
            </button>
          </div>
          {error && <div className="alert alert-danger mt-2">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default ListaMateriais;
