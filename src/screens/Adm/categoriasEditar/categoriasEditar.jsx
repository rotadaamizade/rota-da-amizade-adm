import { useEffect, useState } from 'react'
import './categoriasEditar.css'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useNavigate, useParams } from 'react-router-dom'
import Loading from '../../../components/Adm/loading/loading'


function CategoriasEditar() {

    const { id } = useParams()
    const navigate = useNavigate()

    const categoryId = id.split('&')[0]
    const indexCategory = id.split('&')[1]

    const [formData, setFormData] = useState({})

    const [category, setCategory] = useState({})

    useEffect(() => {
        getCategory()
    }, [])

    console.log(formData)

    const getCategory = async () => {

        try {
            const docRef = doc(db, "categorias", categoryId)
            const docSnap = await getDoc(docRef)
            setFormData(docSnap.data().tipos[indexCategory])
            setCategory(docSnap.data())

            if (!docSnap.exists() || indexCategory > docSnap.data().tipos.length - 1) {
                navigate(`/`)
            }
        } catch (error) {
            navigate(`/`)
            console.log(error)
        }
    }

    const errorAlert = () => {
        alert('Preencha todos os campos corretamente')
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
        if (formData.corPrincipal == '' || formData.corFundo == '' || formData.nome == '' || formData.svg == '') {
            errorAlert()
            return
        }
        try {
            const docRef = doc(db, "categorias", categoryId);

            let categoryTypes = category.tipos
            categoryTypes[indexCategory] = formData

            await updateDoc(docRef, {
                nome: category.nome,
                tipos: categoryTypes
            })
            navigate('/categorias')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    const deleteCategory = async () => {
        try {
            const docRef = doc(db, "categorias", categoryId);

            let categoryTypes = category.tipos
            categoryTypes.splice(indexCategory, 1);

            await updateDoc(docRef, {
                nome: category.nome,
                tipos: categoryTypes
            })
            navigate('/categorias')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    console.log(category)

    return (
        Object.keys(formData).length === 0 ? (
            <Loading />
        ) : (
            <>
                <div className='title-div'>
                    <div onClick={() => navigate('/categorias')} className='voltar-button'>
                        <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                            <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h1 className='title'>Editar Categoria | {category.nome} </h1>
                </div>
                <form onSubmit={handleSubmit} action="">
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

                    <p className='label'>SVG:</p>
                    <textarea
                        type='text'
                        className='textarea-input'
                        name="svg"
                        placeholder="Dígite o ícone em SVG:"
                        value={formData.svg}
                        onChange={handleChange}
                    />

                    <button className='submit-button' type="submit">Editar Categoria</button>
                </form>
                <button className='delete-button' onClick={deleteCategory}>Remover Categoria</button>
            </>
        )
    )
}

export default CategoriasEditar;
