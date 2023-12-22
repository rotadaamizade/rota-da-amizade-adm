import './datasDiv.css';

function DatasDiv({ formData, setFormData }) {
    const adicionarData = () => {
        const newDates = [
            ...formData.data,
            {
                data: '',
                horaInicio: '',
                horaFim: ''
            }
        ];
        setFormData({
            ...formData,
            data: newDates
        });
    }

    const removerData = (index) => {
        const novoFormData = { ...formData };
        novoFormData.data.splice(index, 1);
        setFormData(novoFormData);
    }

    const handleDataChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.data[index].data = value;
        setFormData(novoFormData);
    }

    const handleHoraInicioChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.data[index].horaInicio = value;
        setFormData(novoFormData);
    }

    const handleHoraFimChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.data[index].horaFim = value;
        setFormData(novoFormData);
    }

    return (
        
        <div>
            <div className='datas-title'>
                <p>Datas</p>
                <button onClick={() => adicionarData()} type="button">
                    +
                </button>
            </div>
            {formData.data.map((data, index) => (
                <div className='date-div' key={index}>
                    <div>
                        <label htmlFor="">Data do Evento:</label>
                        <input
                            onChange={(e) => handleDataChange(index, e.target.value)}
                            type="date"
                            name=""
                            id=""
                            value={data.data}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Horário de Início:</label>
                        <input
                            onChange={(e) => handleHoraInicioChange(index, e.target.value)}
                            type="time"
                            name=""
                            id=""
                            value={data.horaInicio}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Horário de Término:</label>
                        <input
                            onChange={(e) => handleHoraFimChange(index, e.target.value)}
                            type="time"
                            name=""
                            id=""
                            value={data.horaFim}
                        />
                    </div>
                    <button type='button' onClick={() => removerData(index)} className='removerData-button'>
                        Remover
                    </button>
                </div>
            ))}
        </div>
    )
}

export default DatasDiv;
