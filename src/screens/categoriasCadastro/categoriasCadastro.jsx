import { useEffect, useState } from 'react'
import './categoriasCadastro.css'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useNavigate } from 'react-router-dom'

function CategoriasCadastro() {
    const navigate = useNavigate()

    const [category, setCategory] = useState(null); // Inicialize com null
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        nome: '',
        cor1: '',
        cor2: '',
        svg: ''
    })

    useEffect(() => {
        getCategories()
    }, [])

    console.log(category)

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
                    className='input-default'
                    name="category"
                    value={category ? category.nome : ''} // Exiba o nome da categoria selecionada
                    onChange={handleSelectChange}
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat.nome}>{cat.nome}</option>
                    ))}
                </select>
                <input
                    className='input-default'
                    type="text"
                    name="nome"
                    placeholder="Nome:"
                    value={formData.nome}
                    onChange={handleChange}
                />
                <input
                    className='input-default'
                    type="text"
                    name="cor1"
                    placeholder="Cor 1:"
                    value={formData.cor1}
                    onChange={handleChange}
                />
                <input
                    className='input-default'
                    type="text"
                    name="cor2"
                    placeholder="Cor 2:"
                    value={formData.cor2}
                    onChange={handleChange}
                />
                <textarea
                    type='text'
                    className='textarea-input'
                    name="svg"
                    placeholder="SVG:"
                    value={formData.svg}
                    onChange={handleChange}
                />

                <button className='submit-button' type="submit">Cadastrar</button>
            </form>
        </>
    )
}

export default CategoriasCadastro;
