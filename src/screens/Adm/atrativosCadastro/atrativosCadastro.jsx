import React, { useState, useEffect } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../../config/firebase'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import RedesDiv from '../../../components/Adm/redesDiv/redesDiv'
import { useNavigate } from 'react-router-dom'
import CategoriesDiv from '../../../components/Adm/categoriesDiv/categoriesDiv'

function AtrativosCadastro() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        municipio: '',
        nome: '',
        localizacao: '',
        sobre: '',
        contatos: [],
        redesSociais: [],
        categorias: []
    })
    const [progressCard, setProgressCard] = useState(0)
    const [progressImages, setProgressImages] = useState(0)
    const [image, setImage] = useState(null)
    const [images, setImages] = useState([])
    const [cities, setCities] = useState([])
    const [cityId, setCityId] = useState('')

    const maxImgs = 5
    const minImgs = 2

    const errorAlert = () => {
        alert('Por favor, preencha todos os campos');
    }

    useEffect(() => {
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

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const handleCityChange = (event) => {
        const { name, value } = event.target
        const selectedIndex = event.target.selectedIndex;
        const id = event.target.options[selectedIndex].getAttribute('data-id');
    
        
        setCityId(id)

        setFormData({
            ...formData,
            [name]: value,
        })
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

    const imagesUpload = (imageCardUrl, imageCardDirectory) => {
        if (images == []) return

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
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * (100 / images.length);
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
                            handleSubmit(imageCardUrl, imageCardDirectory, imagesUrl);
                        }
                    })
                }
            )
        }
    }

    const cardImageUpload = (event) => {
        event.preventDefault()

        if (!formData.municipio || !formData.nome || !formData.localizacao || !formData.sobre || !image || images == [] || formData.categorias == []) {
            errorAlert()
            return
        }

        if (formData.contatos.length > 0) {
            for (let i = 0; i < formData.contatos.length; i++) {
                const element = formData.contatos[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errorAlert()
                    return
                }
            }
        }

        if (formData.redesSociais.length > 0) {
            for (let i = 0; i < formData.redesSociais.length; i++) {
                const element = formData.redesSociais[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errorAlert()
                    return
                }
            }
        }

        for (let i = 0; i < formData.categorias.length; i++) {
            const element = formData.categorias[i];
            if (element == '') {
                errorAlert()
                return
            }
        }

        if (image == null) {
            errorAlert()
            return

        }

        if (images.length < minImgs || images.length > maxImgs) {
            errorAlert()
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

    const handleSubmit = async (imageCardUrl, imageCardDirectory, imagesUrl) => {
        const planoDocRef = doc(db, 'municipios', cityId);
        const docRef = await addDoc(collection(db, 'atrativos'), {
            ...formData,
            imgCard: { url: imageCardUrl, directory: imageCardDirectory },
            imgs: imagesUrl,
            ativo: true
        }).then(() => {
            navigate('/atrativos')
        })
    }

    return (
        <>
            <div className='title-div'>
                <div onClick={() => navigate('/atrativos')} className='voltar-button'>
                    <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h1 className='title'>Cadastro de Atrativos</h1>
            </div>

            <form onSubmit={cardImageUpload} action="">
            <p className='label'>Nome do atrativo:</p>
                <input
                    className='input-default'
                    type="text"
                    name="nome"
                    placeholder="Digite o nome do atrativo:"
                    value={formData.nome}
                    onChange={handleChange}
                />
                <p className='label'>De que município é o atrativo:</p>
                <select
                    className='select-category'
                    name="municipio"
                    value={formData.municipio}
                    onChange={handleCityChange}
                >
                    <option value="">Selecione de que município é o atrativo</option>
                    {cities.map((city, index) => (
                        <option key={index} data-id={city.id} value={city.nome}>
                            {city.nome}
                        </option>
                    ))}

                </select>
                <p className='label'>Localização (URL do Google Maps):</p>
                <input
                    className='input-default'
                    type="text"
                    name="localizacao"
                    placeholder="Digite a URL:"
                    value={formData.localizacao}
                    onChange={handleChange}
                />
                <p className='label'>Sobre:</p>
                <textarea
                    type='text'
                    className='textarea-input'
                    name="sobre"
                    placeholder="Digite sobre:"
                    value={formData.sobre}
                    onChange={handleChange}
                />

                <CategoriesDiv formData={formData} setFormData={setFormData} type='atrativos' />
                <RedesDiv formData={formData} setFormData={setFormData} />

                <div className='file-input'>
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' />
                    <span className='button'>Selecione a Imagem Principal</span>
                    <p className='label' data-js-label>
                        {image != null
                            ? image.name
                            : 'Nenhuma imagem selecionada'}
                    </p>
                </div>

                <progress value={progressCard} max={100} />

                <div className='file-input file-input-2'>
                    <input multiple onChange={(e) => setImages(e.target.files)} type='file' />
                    <span className='button'>Selecione as Imagens Secundárias
                        {images.length < maxImgs && ` - maximo: ${maxImgs - images.length} `}
                        {minImgs - images.length > 0 && ` - Mínimo: ${minImgs - images.length} `}
                        {images.length > maxImgs && ` - Limite excedido`}</span>
                    <p className='label'>
                        {images && images.length > 0
                            ? Array.from(images).map((image) => image.name).join(', ')
                            : 'Nenhuma imagem selecionada'}
                    </p>
                </div>

                <progress value={progressImages} max={100} />

                <button className='submit-button' type="submit">Cadastrar</button>
            </form>
        </>
    )
}

export default AtrativosCadastro