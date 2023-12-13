import { doc, getDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import RedesDiv from "../../components/redesDiv/redesDiv";
import Loading from "../../components/loading/loading";
import ImgsEdit from "../../components/imgsEdit/imgsEdit";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CategoriesDiv from "../../components/categoriesDiv/categoriesDiv";

function AtrativosEditar() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({});
    const [imgsCopy, setImgsCopy] = useState([])
    const [imgsExclude, setImgsExclude] = useState([])
    const [image, setImage] = useState(null)
    const [images, setImages] = useState([])
    const [progressCard, setProgressCard] = useState(0)
    const [progressImages, setProgressImages] = useState(0)
    const [cities, setCities] = useState([])
    const [cityId, setCityId] = useState('')

    const maxImgs = 5
    const minImgs = 2

    useEffect(() => {
        getAtrativo()
        getMunicipios()
    }, [])

    const getMunicipios = async () => {
        try {
            const data = await getDocs(collection(db, "municipios"));
            const citiesData = [];

            data.forEach((doc) => {
                const cityData = {
                    id: doc.id,
                    nome: doc.data().municipio
                };

                citiesData.push(cityData);
            });

            setCities(citiesData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    const getAtrativo = async () => {

        try {
            const docRef = doc(db, "atrativos", id)
            const docSnap = await getDoc(docRef)
            setFormData(docSnap.data())
            setImgsCopy(docSnap.data().imgs)
            setCityId(docSnap.data().plano)

            if (!docSnap.exists()) {
                navigate(`/`)
            }
        } catch (error) {
            navigate(`/`)
            console.log(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    console.log(cityId)

    const handleCityChange = (event) => {
        const { name, value } = event.target

        const selectedOption = event.target.options[event.target.selectedIndex];
        const id = selectedOption.getAttribute('city-id');
        setCityId(id);

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const verification = () => {
        let errors = []

        if (!formData.municipio || !formData.localizacao || !formData.sobre || formData.categorias == []) {
            errors.push('Preencha todos os campos principais')
        }

        for (let i = 0; i < formData.categorias.length; i++) {
            const element = formData.categorias[i];
            if (element == '') {
                errors.push('Preencha todos os campos de categorias')
            }
        }

        if (formData.contatos.length > 0) {
            for (let i = 0; i < formData.contatos.length; i++) {
                const element = formData.contatos[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errors.push('Preencha todos os campos de contatos')
                }
            }
        }

        if (formData.redesSociais.length > 0) {
            for (let i = 0; i < formData.redesSociais.length; i++) {
                const element = formData.redesSociais[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errors.push('Preencha todos os campos de redes sociais')
                }
            }
        }

        if (images.length + formData.imgs.length > maxImgs) {
            errors.push('Limite de imagens gerais excedido')
        } else if (images.length + formData.imgs.length < minImgs) {
            errors.push('Adicione o mínimo de imagens gerais')
        }

        if (errors.length === 0) {
            return 1
        } else {
            errors.forEach(element => {
                alert(element)
            });
            return 0
        }
    }

    function generateRandomId(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomId = '';

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomId += characters.charAt(randomIndex);
        }

        return randomId;
    }

    const imagesUpload = (cardUrl, cardDirectory) => {
        if (images.length === 0) {
            editCity([], cardUrl, cardDirectory)
            return
        }

        let totalProgress = 0;
        let imagesProcessed = 0;
        let imagesUrl = []

        for (let index = 0; index < images.length; index++) {
            const id = generateRandomId(6)

            const storageRef = ref(storage, `atrativos/images${formData.nome}/${formData.nome}-image-${id}`)
            const uploadTask = uploadBytesResumable(storageRef, images[index])

            uploadTask.on(
                'state_changed',
                snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * (100 / images.length);
                    totalProgress += progress;
                    setProgressImages(totalProgress);
                },
                error => {
                    alert(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(url => {
                        imagesUrl.push({
                            url: url,
                            directory: `atrativos/images${formData.nome}/${formData.nome}-image-${id}`
                        })
                        imagesProcessed++;

                        if (imagesProcessed === images.length) {
                            editCity(imagesUrl, cardUrl, cardDirectory);
                        }
                    })
                }
            )
        }
    }

    const cardImageUpload = (event) => {
        event.preventDefault()

        if (verification() === 0) {
            return
        }

        if (image == null || image.length === 0) {
            imagesUpload(formData.imgCard.url, formData.imgCard.directory)
            return
        }

        const storageRef = ref(storage, `atrativos/images${formData.nome}/${formData.nome}-card`)
        const uploadTask = uploadBytesResumable(storageRef, image)

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgressCard(progress)
            },
            error => {
                alert(error)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    imagesUpload(url, `atrativos/images${formData.nome}/${formData.nome}-card`)
                })
            }
        )
    }

    console.log(cityId)

    const editCity = async (imgsUrl, cardUrl, cardDirectory) => {
        imgsExclude.forEach(element => {
            const desertRef = ref(storage, element)

            deleteObject(desertRef).then(() => {
                console.log('sucesso')
            }).catch((error) => {
                console.log('erro')
            });
        });

        try {
            const docRef = doc(db, "atrativos", id)

            let planRef = cityId

            if (typeof cityId === 'string'){
                planRef = doc(db, "municipios", cityId);
            }

            await updateDoc(docRef, {
                ...formData,
                imgCard: { url: cardUrl, directory: cardDirectory },
                imgs: [...formData.imgs, ...imgsUrl],
                plano: planRef
            })
            navigate('/atrativos')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    console.log(formData)

    const deleteCity = async () => {
        try {
            imgsCopy.forEach(element => {
                const imagesRef = ref(storage, element.directory)

                deleteObject(imagesRef).then(() => {
                }).catch((error) => {
                    console.log(error);
                });
            });

            const cardRef = ref(storage, formData.imgCard.directory)

            deleteObject(cardRef).then(() => {
            }).catch((error) => {
                console.log(error);
            })

            await deleteDoc(doc(db, "atrativos", id))
            navigate('/atrativos')
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }

    return (
        <>
            {Object.keys(formData).length === 0 ? (
                <Loading />
            ) : (
                <>
                    <div className='title-div'>
                        <div onClick={() => navigate('/atrativos')} className='voltar-button'>
                            <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                                <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className='title'>Editar Atrativo: {formData.nome}</h1>
                    </div>
                    <form onSubmit={cardImageUpload} action="">
                        <input
                            disabled
                            className='input-default input-disabled'
                            type="text"
                            name="nome"
                            placeholder="Nome do atrativo:"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        <select
                            className='select-category'
                            name="municipio"
                            value={formData.municipio}
                            onChange={handleCityChange}
                        >
                            <option value="">De que município é o atrativo</option>
                            {cities.map((city, index) => (
                                <option key={index} city-id={city.id} value={city.nome}>
                                    {city.nome}
                                </option>
                            ))}

                        </select>
                        <input
                            className='input-default'
                            type="text"
                            name="localizacao"
                            placeholder="URL da localização: (Google Maps)"
                            value={formData.localizacao}
                            onChange={handleChange}
                        />
                        <textarea
                            type='text'
                            className='textarea-input'
                            name="sobre"
                            placeholder="Sobre:"
                            value={formData.sobre}
                            onChange={handleChange}
                        />

                        {Object.keys(formData).length !== 0 && (
                            <>
                                <CategoriesDiv formData={formData} setFormData={setFormData} type='atrativos' />
                                <RedesDiv formData={formData} setFormData={setFormData} />
                                <h1 className='title-removeImgs'>Editar Imagem Principal</h1>
                                <div className='file-input'>
                                    <input onChange={(e) => setImage(e.target.files[0])} type='file' />
                                    <span className='button'>Selecione a nova imagem principal</span>
                                    <p className='label' data-js-label>
                                        {image != null
                                            ? image.name
                                            : 'Nenhuma imagem selecionada'}
                                    </p>
                                </div>

                                <progress value={progressCard} max={100} />

                                <ImgsEdit
                                    formData={formData}
                                    setFormData={setFormData}
                                    imgsCopy={imgsCopy}
                                    setImgsExclude={setImgsExclude}
                                    imgsExclude={imgsExclude}
                                />

                                <div className='file-input file-input-2'>
                                    <h1 className='title-removeImgs'>Adicionar Imagens</h1>
                                    <input multiple onChange={(e) => setImages(e.target.files)} type='file' />
                                    <span className="button">
                                        Selecione novas imagens{formData.imgs.length + images.length < maxImgs && ` - Máximo: ${maxImgs - (formData.imgs.length + images.length)}`}
                                        {formData.imgs.length + images.length < minImgs && ` - Mínimo: ${minImgs - (formData.imgs.length + images.length)}`}
                                        {formData.imgs.length + images.length > maxImgs && ` - Limite excedido`}
                                    </span>
                                    <p className='label'>
                                        {images && images.length > 0
                                            ? Array.from(images).map((image) => image.name).join(', ')
                                            : 'Nenhuma imagem selecionada'}
                                    </p>
                                </div>

                                <progress value={progressImages} max={100} />
                            </>
                        )}
                        <button className='submit-button' type="submit">Editar Atrativo</button>
                    </form>
                    <button className='delete-button' onClick={deleteCity}>Remover Atrativo</button>
                </>
            )}
        </>
    )
}

export default AtrativosEditar;
