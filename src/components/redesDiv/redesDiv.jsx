function RedesDiv({ formData, setFormData }) {
    const contatosTemplate = [
        {
            color: 'aaa',
            name: 'Whatsapp',
        },
        {
            color: 'bbb',
            name: 'Email',
        },
        {
            color: 'ccc',
            name: 'Telefone',
        }
    ];

    const redesSociaisTemplate = [
        {
            name: 'Facebook',
        },
        {
            name: 'Twitter',
        },
        {
            name: 'Instagram',
        }
    ];

    const adicionarContato = () => {
        const novoContato = { name: '', url: '', color: '', outroInput: '' };
        const novoFormData = { ...formData };
        novoFormData.contatos.push(novoContato);
        setFormData(novoFormData);
    }

    const adicionarRedeSocial = () => {
        const novaRedeSocial = { name: '', url: '' };
        const novoFormData = { ...formData };
        novoFormData.redesSociais.push(novaRedeSocial);
        setFormData(novoFormData);
    }

    const removerContato = (index) => {
        const novoFormData = { ...formData };
        novoFormData.contatos.splice(index, 1);
        setFormData(novoFormData);
    }

    const removerRedeSocial = (index) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais.splice(index, 1);
        setFormData(novoFormData);
    }

    const handleSelectChange = (index, selectedValue) => {
        const novoFormData = { ...formData };
        novoFormData.contatos[index].name = selectedValue;

        const contatoTemplate = contatosTemplate.find((template) => template.name === selectedValue);
        if (contatoTemplate) {
            novoFormData.contatos[index].color = contatoTemplate.color;
        }

        setFormData(novoFormData);
    }

    const handleOutroChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.contatos[index].outroInput = value;
        setFormData(novoFormData);
    }

    const handleUrlChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.contatos[index].url = value;
        setFormData(novoFormData);
    }

    const handleRedeSocialNameChange = (index, selectedValue) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais[index].name = selectedValue;
        setFormData(novoFormData);
    }

    const handleRedeSocialOutroChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais[index].outroInput = value;
        setFormData(novoFormData);
    }

    const handleRedeSocialUrlChange = (index, value) => {
        const novoFormData = { ...formData };
        novoFormData.redesSociais[index].url = value;
        setFormData(novoFormData);
    }

    console.log(formData)

    return (
        <div>
            <div className='redes-title'>
                <p>Contatos</p>
                <button onClick={() => adicionarContato()} type="button">
                    Adicionar Contato
                </button>
            </div>

            {formData.contatos.map((contato, index) => {
                const isOutro = contato.name === 'Outro'; // Verifica se o nome é 'Outro'
                return (
                    <div key={index}>
                        <select
                            name="name"
                            value={contato.name}
                            onChange={(e) => handleSelectChange(index, e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {contatosTemplate.map((contato2, index2) => (
                                <option key={index2} value={contato2.name}>
                                    {contato2.name}
                                </option>
                            ))}
                            <option value={'Outro'}>
                                Outro
                            </option>
                        </select>

                        {isOutro && (
                            <input
                                type="text" 
                                value={contato.outroInput}
                                onChange={(e) => handleOutroChange(index, e.target.value)}
                            />
                        )}

                        <input
                            type="text"
                            value={contato.url}
                            onChange={(e) => handleUrlChange(index, e.target.value)}
                        />

                        <br />
                        <br />
                        <button type="button" onClick={() => removerContato(index)}>
                            Remover Contato
                        </button>
                    </div>
                );
            })}

            <p>Redes Sociais</p>
            <button onClick={() => adicionarRedeSocial()} type="button">
                    Adicionar Rede Social
                </button>

            {formData.redesSociais.map((redeSocial, index) => {
                const isOutro = redeSocial.name === 'Outro'; // Verifica se o nome é 'Outro'
                return (
                    <div key={index}>
                        <select
                            name="name"
                            value={redeSocial.name}
                            onChange={(e) => handleRedeSocialNameChange(index, e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {redesSociaisTemplate.map((redeSocial2, index2) => (
                                <option key={index2} value={redeSocial2.name}>
                                    {redeSocial2.name}
                                </option>
                            ))}
                            <option value={'Outro'}>
                                Outro
                            </option>
                        </select>

                        {isOutro && (
                            <input
                                type="text" 
                                value={redeSocial.outroInput}
                                onChange={(e) => handleRedeSocialOutroChange(index, e.target.value)}
                            />
                        )}

                        <input
                            type="text"
                            value={redeSocial.url}
                            onChange={(e) => handleRedeSocialUrlChange(index, e.target.value)}
                        />

                        <br />
                        <br />
                        <button type="button" onClick={() => removerRedeSocial(index)}>
                            Remover Rede Social
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

export default RedesDiv;
