import './redesDiv.css';

function RedesDiv({ formData, setFormData }) {
    const contatosTemplate = [
        {
            color: '25D366',
            name: 'Whatsapp',
        },
        {
            color: 'FF0000',
            name: 'Email',
        },
        {
            color: '128C7E',
            name: 'Telefone',
        }
    ];

    const redesSociaisTemplate = [
        {
            color: '4267B2',
            name: 'Facebook',
        },
        {
            color: '1DA1F2',
            name: 'Twitter',
        },
        {
            color: 'FD1D1D',
            name: 'Instagram',
        },
    ];

    const adicionarContato = () => {
        const novoContato = { name: '', url: '', color: '' };
        const novoFormData = { ...formData };
        novoFormData.contatos.push(novoContato);
        setFormData(novoFormData);
    }

    const removerContato = (index) => {
        const novoFormData = { ...formData };
        novoFormData.contatos.splice(index, 1);
        setFormData(novoFormData);
    }

    const handleContatoNameChange = (index, selectedValue) => {
        const novoFormData = { ...formData };
        novoFormData.contatos[index].name = selectedValue;

        const contatoTemplate = contatosTemplate.find((template) => template.name === selectedValue);
        if (contatoTemplate) {
            novoFormData.contatos[index].color = contatoTemplate.color;
        }

        setFormData(novoFormData);
    }

    const handleContatoUrlChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.contatos[index].url = value;
        setFormData(novoFormData);
    }

    const adicionarRedeSocial = () => {
        const novaRedeSocial = { name: '', url: '', color: '' };
        const novoFormData = { ...formData };
        novoFormData.redesSociais.push(novaRedeSocial);
        setFormData(novoFormData);
    }

    const removerRedeSocial = (index) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais.splice(index, 1);
        setFormData(novoFormData);
    }

    const handleRedeSocialNameChange = (index, selectedValue) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais[index].name = selectedValue;

        const redeSocialTemplate = redesSociaisTemplate.find((template) => template.name === selectedValue);
        if (redeSocialTemplate) {
            novoFormData.redesSociais[index].color = redeSocialTemplate.color;
        }

        setFormData(novoFormData);
    }

    const handleRedeSocialUrlChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais[index].url = value;
        setFormData(novoFormData);
    }

    // Verifica se todas as opções de contatos já foram selecionadas
    const todasOpcoesContatosSelecionadas = () => {
        return contatosTemplate.every((contato) =>
            formData.contatos.some((item) => item.name === contato.name)
        );
    }

    // Verifica se todas as opções de redes sociais já foram selecionadas
    const todasOpcoesRedesSociaisSelecionadas = () => {
        return redesSociaisTemplate.every((redeSocial) =>
            formData.redesSociais.some((item) => item.name === redeSocial.name)
        );
    }

    return (
        <div>
            <div className='redes-title'>
                <p>Contatos (opcional)</p>
                <button
                    onClick={() => adicionarContato()}
                    type="button"
                    disabled={formData.contatos.length === contatosTemplate.length || todasOpcoesContatosSelecionadas()}
                >
                    +
                </button>
            </div>

            {formData.contatos.map((contato, index) => (
                <div className='redes-content' key={index}>
                    <select
                        className='input-default'
                        name="name"
                        value={contato.name}
                        onChange={(e) => handleContatoNameChange(index, e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {contatosTemplate.map((contato2, index2) => (
                            <option
                                key={index2}
                                value={contato2.name}
                                disabled={formData.contatos.some((item) => item.name === contato2.name)}
                            >
                                {contato2.name}
                            </option>
                        ))}
                    </select>

                    <input
                        className='input-default'
                        type="text"
                        value={contato.url}
                        placeholder='Digite a URL:'
                        onChange={(e) => handleContatoUrlChange(index, e.target.value)}
                    />

                    <div className='close-remove' onClick={() => removerContato(index)}>
                        <p>+</p>
                    </div>
                </div>
            ))}

            <div className='redes-title'>
                <p>Redes Sociais (opcional)</p>
                <button
                    onClick={() => adicionarRedeSocial()}
                    type="button"
                    disabled={formData.redesSociais.length === redesSociaisTemplate.length || todasOpcoesRedesSociaisSelecionadas()}
                >
                    +
                </button>
            </div>

            {formData.redesSociais.map((redeSocial, index) => (
                <div className='redes-content' key={index}>
                    <select
                        className='input-default'
                        name="name"
                        value={redeSocial.name}
                        onChange={(e) => handleRedeSocialNameChange(index, e.target.value)}
                    >
                        <option value="">Selecione</option>
                        {redesSociaisTemplate.map((redeSocial2, index2) => (
                            <option
                                key={index2}
                                value={redeSocial2.name}
                                disabled={formData.redesSociais.some((item) => item.name === redeSocial2.name)}
                            >
                                {redeSocial2.name}
                            </option>
                        ))}
                    </select>

                    <input
                        type="text"
                        placeholder='Digite a URL:'
                        value={redeSocial.url}
                        className='input-default'
                        onChange={(e) => handleRedeSocialUrlChange(index, e.target.value)}
                    />

                    <div className='close-remove' onClick={() => removerRedeSocial(index)}>
                        <p>+</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RedesDiv;
