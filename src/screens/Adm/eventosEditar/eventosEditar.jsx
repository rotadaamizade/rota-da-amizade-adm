import { doc, getDoc, updateDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { json, useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../config/firebase";
import RedesDiv from "../../../components/Adm/redesDiv/redesDiv";
import Loading from "../../../components/Adm/loading/loading";
import ImgsEdit from "../../../components/Adm/imgsEdit/imgsEdit";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CategoriesDiv from '../../../components/Adm/categoriesDiv/categoriesDiv'
import DatasDiv from '../../../components/Adm/datasDiv/datasDiv'

function EventosEditar() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [imgsCopy, setImgsCopy] = useState([])
    const [imgsExclude, setImgsExclude] = useState([])
    const [image, setImage] = useState(null)
    const [images, setImages] = useState([])
    const [progressCard, setProgressCard] = useState(0)
    const [progressImages, setProgressImages] = useState(0)
    const [cities, setCities] = useState([])
    const [associados, setAssociados] = useState([])
    const [tipoRealizador, setTipoRealizador] = useState('');
    const [loaded, setLoaded] = useState(false)
    const [realizadorValue, setRealizadorValue] = useState('')
    const [municipioValue, setMunicipioValue] = useState('')
    const [title, setTitle] = useState('')
    const [isOtherCity, setIsOtherCity] = useState(null);
    const [realizador, setRealizador] = useState({})

    const maxImgs = 5
    const minImgs = 2

    useEffect(() => {
        getEvent()
        getAssociados()
    }, [])

    const getMunicipios = async (eventCity) => {

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

            if (citiesData.some(city => city.nome === eventCity)) {
                setIsOtherCity(true)
            } else {
                setIsOtherCity(false)
            }

        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    const getAssociados = async () => {

        try {
            const data = await getDocs(collection(db, "associados"));
            const associadosData = [];

            data.forEach((doc) => {
                const associadoData = {
                    id: doc.id,
                    nome: doc.data().nome
                };

                associadosData.push(associadoData);
            });

            setAssociados(associadosData);
        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    const getEvent = async () => {

        try {
            const docRef = doc(db, "eventos", id)
            const docSnap = await getDoc(docRef)
            setFormData(docSnap.data())
            setImgsCopy(docSnap.data().imgs)
            setLoaded(true)
            setTipoRealizador(docSnap.data().tipo)
            setRealizadorValue(docSnap.data().realizador)
            setMunicipioValue(docSnap.data().municipio)
            setTitle(docSnap.data().nome)
            getMunicipios(docSnap.data().municipio)

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

    const handleRadioChange = (value) => {
        setIsOtherCity(value);

        setFormData({
            ...formData,
            municipio: '',
        })
    }

    const verification = () => {

        let errors = []

        if (!formData.municipio || !formData.realizador || !formData.nome || !formData.localizacao || !formData.sobre || !formData.tipo || !formData.id_terceiro || formData.categorias.length == 0 || formData.data.length == 0 || formData.contatos.length == 0) {
            errors.push('Preencha todos os campos principais')
        }

        if (formData.contatos.length > 0) {
            for (let i = 0; i < formData.contatos.length; i++) {
                const element = formData.contatos[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errors.push('Preencha todos os campos de contatos')
                }
            }
        }

        for (let i = 0; i < formData.categorias.length; i++) {
            const element = formData.categorias[i];
            if (element == '') {
                errors.push('Preencha as categorias')
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
            errors.push('Limite de imagens gerais excedito')
        } else if (images.length + formData.imgs.length < minImgs) {
            errors.push('Adicione o mínimo de imagens gerais')
        }

        for (let i = 0; i < formData.data.length; i++) {
            const element = formData.data[i];
            if (element.data === '' || element.horaInicio === '' || element.horaFim === '') {
                errors.push('Preencha todos os campos de Datas')
            }
        }

        if (errors.length == 0) {
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


        if (images.length == 0) {
            editformData([], cardUrl, cardDirectory)
            return
        }

        let totalProgress = 0;
        let imagesProcessed = 0;
        let imagesUrl = []


        for (let index = 0; index < images.length; index++) {

            const id = generateRandomId(6)

            const storageRef = ref(storage, `eventos/images${formData.nome}/${formData.nome}-image-${id}`)
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
                            directory: `eventos/images${formData.nome}/${formData.nome}-image-${id}`
                        })
                        imagesProcessed++;

                        if (imagesProcessed === images.length) {
                            editformData(imagesUrl, cardUrl, cardDirectory);
                        }
                    })
                }
            )
        }
    }

    const cardImageUpload = (event) => {
        event.preventDefault()

        if (verification() == 0) {
            return
        }

        if (image == null || image.length == 0) {
            imagesUpload(formData.imgCard.url, formData.imgCard.directory)
            return
        }

        const storageRef = ref(storage, `eventos/images${formData.nome}/${formData.nome}-card`)
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
                    imagesUpload(url, `eventos/images${formData.nome}/${formData.nome}-card`)
                })
            }
        )
    }

    async function editformData(imgsUrl, cardUrl, cardDirectory) {

        imgsExclude.forEach(element => {
            const desertRef = ref(storage, element)

            deleteObject(desertRef).then(() => {
            }).catch((error) => {
                console.log(error)
            });
        });


        try {
            const docRef = doc(db, "eventos", id);
            await updateDoc(docRef, {
                ...formData,
                imgCard: { url: cardUrl, directory: cardDirectory },
                imgs: [...formData.imgs, ...imgsUrl]
            })
            navigate('/eventos')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    const deleteEvent = async () => {
        try {

            imgsCopy.forEach(element => {
                const imagesRef = ref(storage, element.directory)

                deleteObject(imagesRef).then(() => {
                }).catch((error) => {
                    console.log(error)
                });
            });

            const cardRef = ref(storage, formData.imgCard.directory)

            deleteObject(cardRef).then(() => {
            }).catch((error) => {
                console.log(error)
            })

            await deleteDoc(doc(db, "eventos", id))
            navigate('/eventos')

        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }

    const handleTipoRealizadorChange = (e) => {
        setTipoRealizador(e.target.value)
        setFormData({
            ...formData,
            realizador: '',
            municipio: '',
            id_terceiro: '',
            tipo: e.target.value
        })
        setRealizadorValue('')
        setMunicipioValue('')
    }

    const handleRealizadorChange = (e, tipo) => {
        const selectedOption = e.target.selectedOptions[0]
        const nome = selectedOption.value;
        const id = selectedOption.getAttribute('data-id');

        if (tipo == 'realizador') {
            setRealizadorValue(nome)
            setFormData({
                ...formData,
                realizador: nome,
                id_terceiro: id
            })
            setRealizador({ id: id, type: 'associado' })
        } else if (tipo == 'municipio') {
            setMunicipioValue(nome)
            setFormData({
                ...formData,
                municipio: nome
            })
        } else if (tipo == 'ambos') {
            setMunicipioValue(nome)
            setRealizadorValue(nome)
            setFormData({
                ...formData,
                municipio: nome,
                realizador: nome,
                id_terceiro: id
            })
            setRealizador({ id: id, type: 'municipio' })
        }
    }

    console.log(formData)

    return (
        <>

            {!loaded ? (
                <Loading />
            ) : (
                <>
                    <div className='title-div'>
                        <div onClick={() => navigate('/eventos')} className='voltar-button'>
                            <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                                <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className='title'>Editar Evento: {title}</h1>
                    </div>
                    <form onSubmit={cardImageUpload} action="">
                        <p className='label'>Nome do Evento:</p>
                        <input
                            className='input-default'
                            type="text"
                            name="nome"
                            placeholder="Digite o nome do Evento:"
                            value={formData.nome}
                            onChange={handleChange}
                        />
                        <p className='label'>Tipo do realizador:</p>
                        <select
                            className='select-category'
                            name="category"
                            value={tipoRealizador}
                            onChange={handleTipoRealizadorChange}
                        >
                            <option value="">Selecione o tipo de Realizador</option>
                            <option value="associado">Associado</option>
                            <option value="municipio">Município</option>
                        </select>

                        {tipoRealizador === 'associado' ? (
                            <>
                                <p className='label'>Associado realizador:</p>
                                <select
                                    className='select-category'
                                    name="realizador"
                                    onChange={(e) => handleRealizadorChange(e, 'realizador')}
                                    value={realizadorValue}
                                >
                                    <option data-id={''} value="">Selecione o Associado Realizador</option>
                                    {associados.map((associado, index) => (
                                        <option data-id={associado.id} key={index} value={associado.nome}>{associado.nome}</option>
                                    ))}
                                </select>
                                {isOtherCity != null && (
                                    <>
                                        <div className='p-other-div'>
                                            <p className='label'>Vai acontecer em um município associado:</p>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={true}
                                                    checked={isOtherCity === true}
                                                    onChange={() => handleRadioChange(true)}
                                                />
                                                Sim
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value={false}
                                                    checked={isOtherCity === false}
                                                    onChange={() => handleRadioChange(false)}
                                                />
                                                Não
                                            </label>
                                        </div>
                                        <p className='label'>Local do evento:</p>
                                        {isOtherCity ?
                                            <select
                                                className='select-category'
                                                name="municipio2"
                                                onChange={(e) => handleRealizadorChange(e, 'municipio')}
                                                value={municipioValue}
                                            >
                                                <option value="">Selecione o local do evento</option>
                                                {cities.map((city, index) => (
                                                    <option key={index} value={city.nome}>{city.nome}</option>
                                                ))}
                                            </select> :
                                            <input
                                                type="text"
                                                className='input-default'
                                                placeholder='Digite em que município vai acontecer'
                                                value={formData.municipio}
                                                name='municipio'
                                                onChange={handleChange}
                                            />
                                        }
                                    </>
                                )}
                            </>

                        ) : tipoRealizador === 'municipio' ? (
                            <>
                                <p className='label'>Municipio realizador:</p>
                                <select
                                    className='select-category'
                                    name="municipio"
                                    onChange={(e) => handleRealizadorChange(e, 'ambos')}
                                    value={municipioValue}
                                >
                                    <option data-id={''} value={''}>Selecione o Município Realizador</option>
                                    {cities.map((city, index) => (
                                        <option key={index} data-id={city.id} value={city.nome}>{city.nome}</option>
                                    ))}
                                </select>
                            </>
                        ) : (
                            null
                        )}
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
                            maxLength={1500}
                        />

                        <DatasDiv formData={formData} setFormData={setFormData} />
                        <CategoriesDiv formData={formData} setFormData={setFormData} type='eventos' />
                        <RedesDiv formData={formData} setFormData={setFormData} />

                        {Object.keys(formData).length !== 0 && (
                            <>

                                <h1 className='title-removeImgs'>Imagem Principal</h1>
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
                                    <h1 className='title-removeImgs'>Imagens Secundárias</h1>
                                    <input multiple onChange={(e) => setImages(e.target.files)} type='file' />
                                    <span className="button">
                                        Selecione as novas imagens secundárias{formData.imgs.length + images.length < maxImgs && ` - Máximo: ${maxImgs - (formData.imgs.length + images.length)}`}
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
                        <button className='submit-button' type="submit">Editar Evento</button>
                    </form>
                    <button className='delete-button' onClick={deleteEvent}>Remover Evento</button>
                </>
            )}

        </>
    )
}

export default EventosEditar