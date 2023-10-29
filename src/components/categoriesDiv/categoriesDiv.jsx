import { getDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import './categoriesDiv.css';

function CategoriesDiv({ formData, setFormData, type }) {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, []);

    const getCategories = async () => {
        try {
            const docRef = doc(db, "categorias", type);
            const docSnap = await getDoc(docRef);
            setCategories(docSnap.data().tipos)
            if (!docSnap.exists()) {
                navigate(`/`);
            }
        } catch (error) {
            navigate(`/`);
            console.log(error);
        }
    }

    const adicionarCategoria = () => {
        if (selectedCategories.length < categories.length) {
            const categoriasDisponiveis = categories.filter(
                (category) => !selectedCategories.includes(category.nome)
            );
            if (categoriasDisponiveis.length > 0) {
                const novaCategoria = '';
                setSelectedCategories([...selectedCategories, novaCategoria]);
                const novoFormData = { ...formData };
                novoFormData.categorias.push(novaCategoria);
                setFormData(novoFormData);
            }
        }
    }

    const removerCategoria = (index) => {
        const novoFormData = { ...formData };
        const categoriaRemovida = novoFormData.categorias[index];
        novoFormData.categorias.splice(index, 1);
        setFormData(novoFormData);
        setSelectedCategories(selectedCategories.filter((category) => category !== categoriaRemovida));
    }

    const handleCategoriaChange = (index, selectedValue) => {
        const novoFormData = { ...formData };
        const categoriaAntiga = novoFormData.categorias[index];
        novoFormData.categorias[index] = selectedValue;
        setFormData(novoFormData);

        setSelectedCategories((selectedCategories) => [
            ...selectedCategories.filter((category) => category !== categoriaAntiga),
            selectedValue,
        ]);
    }

    return (
        <div>
            <div className='categorias-title'>
                <p>Categorias</p>
                <button
                    onClick={() => adicionarCategoria()}
                    type="button"
                >
                    +
                </button>

            </div>

            {formData.categorias.map((categoria, index) => (
                <div className="selectCategoria-div" key={index}>
                    <select
                        className='select-category'
                        name="categoria"
                        value={categoria}
                        onChange={(e) => handleCategoriaChange(index, e.target.value)}
                    >
                        <option value=''>Selecione uma categoria</option>
                        {categories.map((category, indexCategory) => (
                            <option
                                key={indexCategory}
                                value={category.nome}
                                disabled={selectedCategories.includes(category.nome)}
                            >
                                {category.nome}
                            </option>
                        ))}
                    </select>
                    <button type="button" className='close-remove' onClick={() => removerCategoria(index)}>
                        <p>+</p>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default CategoriesDiv;
