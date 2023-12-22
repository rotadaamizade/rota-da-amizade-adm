import { useEffect, useState } from 'react'
import './categoriasCadastro.css'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useNavigate } from 'react-router-dom'

function CategoriasCadastro() {
    const navigate = useNavigate()

    const [category, setCategory] = useState(null)
    const [categories, setCategories] = useState([])
    const [formData, setFormData] = useState({
        nome: '',
        corFundo: '',
        corPrincipal: '',
        svg: ''
    })

    useEffect(() => {
        getCategories()
    }, [])

    const errorAlert = () => {
        alert('Preencha todos os campos corretamente')
    }

    const getCategories = async () => {
        try {
            const data = await getDocs(collection(db, "categorias"));
            const categoriesData = [];

            data.forEach((doc) => {
                categoriesData.push(doc.data());
            });

            setCategories(categoriesData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (category == null || category == undefined || formData.corFundo == '' || formData.corPrincipal == '' || formData.nome == '' || formData.svg == '') {
            errorAlert()
            return
        }
        try {
            if (category) {
                const docRef = doc(db, "categorias", category.nome.toLowerCase());
                await updateDoc(docRef, {
                    nome: category.nome,
                    tipos: [...category.tipos, formData],
                })
                navigate('/categorias')
            } else {
                console.error("Categoria não selecionada.");
            }
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    const handleSelectChange = (event) => {
        const selectedCategoryName = event.target.value;
        const selectedCategory = categories.find(cat => cat.nome === selectedCategoryName);
        setCategory(selectedCategory);
    }

    return (
        <>
            <div className='title-div'>
                <div onClick={() => navigate('/categorias')} className='voltar-button'>
                    <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                        <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className='title'>Cadastrar Categoria</h1>
            </div>
            <form onSubmit={handleSubmit} action="">
                <select
                    className='select-category'
                    name="category"
                    value={category ? category.nome : ''}
                    onChange={handleSelectChange}
                >
                    <option value="">Selecione o tipo de categoria</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.nome}>{cat.nome}</option>
                    ))}
                </select>

                <p className='label'>Nome:</p>
                <input
                    className='input-default'
                    type="text"
                    name="nome"
                    placeholder="Digite o nome:"
                    value={formData.nome}
                    onChange={handleChange}
                />

                <div className='input-color-div'>
                    <div>
                        <p className='label'>Cor Secundária:</p>
                        <input
                            className='input-default'
                            type="text"
                            name="corFundo"
                            placeholder='Digite a cor secundária: (Hexadecimal sem o "#")'
                            value={formData.corFundo}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <p className='label'>Cor Principal:</p>
                        <input
                            className='input-default'
                            type="text"
                            name="corPrincipal"
                            placeholder='Digite a cor primária: (Hexadecimal sem o "#")'
                            value={formData.corPrincipal}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <p className='label'>Ícone em SVG:</p>
                <textarea
                    type='text'
                    className='textarea-input'
                    name="svg"
                    placeholder="Dígite o ícone em SVG:"
                    value={formData.svg}
                    onChange={handleChange}
                />


                <button className='submit-button' type="submit">Cadastrar</button>
            </form>
        </>
    )
}

export default CategoriasCadastro;
