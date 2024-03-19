import { doc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../config/firebase";
import RedesDiv from "../../../components/Adm/redesDiv/redesDiv";
import Loading from "../../../components/Adm/loading/loading";
import ImgsEdit from "../../../components/Adm/imgsEdit/imgsEdit";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CategoriesDiv from "../../../components/Adm/categoriesDiv/categoriesDiv";
import { UserContext } from "../../../UserContext";

function AssociadosEditar() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [imgsCopy, setImgsCopy] = useState([])
    const [imgsExclude, setImgsExclude] = useState([])
    const [image, setImage] = useState(null)
    const [logo, setLogo] = useState(null)
    const [images, setImages] = useState([])
    const [progressLogo, setProgressLogo] = useState(0)
    const [progressCard, setProgressCard] = useState(0)
    const [progressImages, setProgressImages] = useState(0)
    const [cities, setCities] = useState([])
    const { planos } = useContext(UserContext);
    const [eventosId, setEventosId] = useState([])
    const [isOtherCity, setIsOtherCity] = useState(null);

    const maxImgs = 5
    const minImgs = 2

    useEffect(() => {
        getAssociado()
    }, [])

    const getAssociado = async () => {

        try {
            const docRef = doc(db, "associados", id)
            const docSnap = await getDoc(docRef)
            setFormData(docSnap.data())
            setImgsCopy(docSnap.data().imgs)
            getEventos(docSnap.data().nome)
            getMunicipios(docSnap.data().municipio)

            if (!docSnap.exists()) {
                navigate(`/`)
            }
        } catch (error) {
            navigate(`/`)
            console.log(error)
        }
    }

    const getMunicipios = async (associadoCity) => {
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
            if (citiesData.some(city => city.nome === associadoCity)) {
                setIsOtherCity(true)
            } else {
                setIsOtherCity(false)
            }

        } catch (error) {
            console.error("Erro ao recuperar documentos:", error);
        }
    }

    const getEventos = async (nome) => {
        let eventosId = []
        const q = query(collection(db, "eventos"), where("realizador", "==", nome));
        const data = await getDocs(q)
        data.forEach((doc) => {
            eventosId.push(doc.id);
        });
        setEventosId(eventosId)
    }

    const verification = () => {
        let errors = []

        if (!formData.municipio || !formData.descricao || !formData.sobre || formData.contatos.length == 0) {
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

    const imagesUpload = (cardUrl, cardDirectory, logoUrl, logoDirectory) => {
        if (images.length === 0) {
            editAssociados([], cardUrl, cardDirectory, logoUrl, logoDirectory)
            return
        }

        let totalProgress = 0;
        let imagesProcessed = 0;
        let imagesUrl = []

        for (let index = 0; index < images.length; index++) {
            const id = generateRandomId(6)

            const storageRef = ref(storage, `associados/images${formData.nome}/${formData.nome}-image-${id}`)
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
                            directory: `associados/images${formData.nome}/${formData.nome}-image-${id}`
                        })
                        imagesProcessed++;

                        if (imagesProcessed === images.length) {
                            editAssociados(imagesUrl, cardUrl, cardDirectory, logoUrl, logoDirectory);
                        }
                    })
                }
            )
        }
    }

    const logoUpload = (urlCard, directoryCard) => {


        if (logo == null || logo.length === 0) {
            imagesUpload(urlCard, directoryCard, formData.imgLogo.url, formData.imgLogo.directory)
            return
        }

        const storageRef = ref(storage, `associados/images${formData.nome}/${formData.nome}-logo`)
        const uploadTask = uploadBytesResumable(storageRef, logo)

        uploadTask.on(
            'state_changed',
            snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                setProgressLogo(progress)
            },
            error => {
                alert('error')
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    imagesUpload(urlCard, directoryCard, url, `associados/images${formData.nome}/${formData.nome}-logo`)
                })
            }
        )
    }

    const cardImageUpload = (event) => {
        event.preventDefault()

        if (verification() === 0) {
            return
        }

        if (image == null || image.length === 0) {
            logoUpload(formData.imgCard.url, formData.imgCard.directory)
            return
        }

        const storageRef = ref(storage, `associados/images${formData.nome}/${formData.nome}-card`)
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
                    logoUpload(url, `associados/images${formData.nome}/${formData.nome}-card`)
                })
            }
        )
    }

    const editAssociados = async (imgsUrl, cardUrl, cardDirectory, logoUrl, logoDirectory) => {
        imgsExclude.forEach(element => {
            const desertRef = ref(storage, element)

            deleteObject(desertRef).then(() => {
            }).catch((error) => {
                console.log(error)
            });
        });

        try {
            const docRef = doc(db, "associados", id);
            await updateDoc(docRef, {
                ...formData,
                imgCard: { url: cardUrl, directory: cardDirectory },
                imgLogo: { url: logoUrl, directory: logoDirectory },
                imgs: [...formData.imgs, ...imgsUrl],

            })
            navigate('/associados')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    const deleteAssociado = async () => {
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

                const logoRef = ref(storage, formData.imgLogo.directory)

                deleteObject(logoRef).then(() => {
                }).catch((error) => {
                    console.log(error);
                })

            }).catch((error) => {
                console.log(error);
            })

            await deleteDoc(doc(db, "associados", id))

            const eventosCollection = collection(db, "eventos");

            for (const element of eventosId) {
                await deleteDoc(doc(eventosCollection, element));
            }

            navigate('/associados')
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }

    const activeDesactive = async (bool) => {
        try {
            for (const element of eventosId) {
                const eventRef = doc(db, "eventos", element)
                await updateDoc(eventRef, {
                    ativo: bool
                })
            }

            const associadoRef = doc(db, "associados", id)
            await updateDoc(associadoRef, {
                ativo: bool
            })

            navigate('/associados')
        } catch (error) {
            navigate(`/`)
            console.log(error)
        }
    }

    const handlePlanoChange = (e) => {
        const selectedValue = e.target.value

        setFormData({
            ...formData,
            plano: selectedValue,
        });
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

    return (
        <>
            {Object.keys(formData).length === 0 ? (
                <Loading />
            ) : (
                <>
                    <div className='title-div'>
                        <div onClick={() => navigate('/associados')} className='voltar-button'>
                            <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                                <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className='title'>Editar Associado: {formData.nome}</h1>
                    </div>
                    <form onSubmit={cardImageUpload} action="">
                        <p className='label'>Nome do associado:</p>
                        <input
                            className='input-default input-disabled'
                            type="text"
                            name="nome"
                            placeholder="Digite o nome do Associado:"
                            value={formData.nome}
                            disabled={true}
                            onChange={handleChange}
                        />

                        {isOtherCity != null && (
                            <>
                                <div className='p-other-div'>
                                    <p className='label'>Faz parte de um município associado:</p>
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
                                <p className='label'>De que município é o associado:</p>
                                {isOtherCity ?
                                    <select
                                        className='select-category'
                                        name="municipio"
                                        value={formData.municipio}
                                        onChange={handleChange}
                                    >
                                        <option value="">Selecione de que município é o associado</option>
                                        {cities.map((city, index) => (
                                            <option key={index} value={city.nome}>
                                                {city.nome}
                                            </option>
                                        ))}
                                    </select>
                                    :
                                    <input
                                        type="text"
                                        className='input-default'
                                        placeholder='Digite de que município é o associado'
                                        value={formData.municipio}
                                        name='municipio'
                                        onChange={handleChange}
                                    />
                                }
                            </>
                        )}
                        <p className='label'>Descrição:</p>
                        <input
                            className='input-default'
                            type="text"
                            name="descricao"
                            placeholder="Digite a descrição:"
                            value={formData.descricao}
                            onChange={handleChange}
                        />
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
                            className='textarea-input'
                            name="sobre"
                            placeholder="Digite sobre:"
                            value={formData.sobre}
                            onChange={handleChange}
                        />
                        <p className='label'>Plano:</p>
                        <select
                            className='select-category'
                            name="plano"
                            onChange={handlePlanoChange}
                            value={formData.plano}
                        >
                            <option value={''}>Selecione o plano</option>
                            {planos.map((plano, index) => (
                                <option key={index} value={plano}>{plano}</option>
                            ))}
                        </select>

                        {Object.keys(formData).length !== 0 && (
                            <>
                                <CategoriesDiv formData={formData} setFormData={setFormData} type='associados' />
                                <RedesDiv formData={formData} setFormData={setFormData} />

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


                                <h1 className='title-removeImgs'>Logo do Associado</h1>
                                <div className='file-input'>
                                    <input onChange={(e) => setLogo(e.target.files[0])} type='file' />
                                    <span className='button'>Selecione a nova logo do associado</span>
                                    <p className='label' data-js-label>
                                        {logo != null
                                            ? logo.name
                                            : 'Nenhuma imagem selecionada'}
                                    </p>
                                </div>

                                <progress value={progressLogo} max={100} />

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
                        <button className='submit-button' type="submit">Editar Associado</button>
                    </form>
                    <button className='delete-button' onClick={deleteAssociado}>Remover Associado</button>
                    <button className={formData.ativo ? "desactive-button" : "active-button"} onClick={() => {
                        activeDesactive(!formData.ativo)
                    }}>
                        {formData.ativo ? "Desativar Associado" : "Ativar Associado"}</button>
                </>
            )}
        </>
    )
}

export default AssociadosEditar;
