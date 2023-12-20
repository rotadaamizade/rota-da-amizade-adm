import { doc, getDoc, updateDoc, deleteDoc, query, collection, where, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import RedesDiv from "../../components/redesDiv/redesDiv";
import Loading from "../../components/loading/loading";
import ImgsEdit from "../../components/imgsEdit/imgsEdit";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { UserContext } from "../../UserContext";

function MunicipiosEditar() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({})
    const [imgsCopy, setImgsCopy] = useState([])
    const [imgsExclude, setImgsExclude] = useState([])
    const [image, setImage] = useState(null)
    const [images, setImages] = useState([])
    const [progressCard, setProgressCard] = useState(0)
    const [progressImages, setProgressImages] = useState(0)
    const { planos } = useContext(UserContext)
    const [eventosId, setEventosId] = useState([])
    const [atrativosId, setAtrativosId] = useState([])

    const maxImgs = 5
    const minImgs = 2

    useEffect(() => {
        getCity()
    }, [])

    const getCity = async () => {

        try {
            const docRef = doc(db, "municipios", id)
            const docSnap = await getDoc(docRef)
            setFormData(docSnap.data())
            setImgsCopy(docSnap.data().imgs)
            getAtrativos(docSnap.data().municipio)
            getEventos(docSnap.data().municipio)

            if (!docSnap.exists()) {
                navigate(`/`)
            }
        } catch (error) {
            navigate(`/`)
            console.log(error)
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
        console.log(eventosId)
    }

    const getAtrativos = async (nome) => {
        let atrativosId = []
        const q = query(collection(db, "atrativos"), where("municipio", "==", nome));
        const data = await getDocs(q)
        data.forEach((doc) => {
            atrativosId.push(doc.id);
        });
        setAtrativosId(atrativosId)
        console.log(atrativosId)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    const verification = () => {
        let errors = []

        if (!formData.municipio || !formData.descricao || !formData.localizacao || !formData.plano || !formData.sobre) {
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

            const storageRef = ref(storage, `municipios/images${formData.municipio}/${formData.municipio}-image-${id}`)
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
                            directory: `municipios/images${formData.municipio}/${formData.municipio}-image-${id}`
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

        const storageRef = ref(storage, `municipios/images${formData.municipio}/${formData.municipio}-card`)
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
                    imagesUpload(url, `municipios/images${formData.municipio}/${formData.municipio}-card`)
                })
            }
        )
    }

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
            const docRef = doc(db, "municipios", id);
            await updateDoc(docRef, {
                ...formData,
                imgCard: { url: cardUrl, directory: cardDirectory },
                imgs: [...formData.imgs, ...imgsUrl]
            })
            navigate('/municipios')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

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

            await deleteDoc(doc(db, "municipios", id))

            const atrativosCollection = collection(db, "atrativos");
            
            for (const element of atrativosId) {
                await deleteDoc(doc(atrativosCollection, element));
                console.log(element)
            }

            const eventosCollection = collection(db, "eventos");
            
            for (const element of eventosId) {
                await deleteDoc(doc(eventosCollection, element));
                console.log(element)
            }
            
            navigate('/municipios')
        } catch (error) {
            console.error('Erro ao excluir:', error);
        }
    }

    const activeDesactive = async (bool) => {
        try{
            for (const element of eventosId) {
                const eventRef = doc(db, "eventos", element)
                await updateDoc(eventRef, {
                    ativo: bool
                })
            }

            for (const element of atrativosId) {
                const atrativoRef = doc(db, "atrativos", element)
                await updateDoc(atrativoRef, {
                    ativo: bool
                })
            }

            const cityRef = doc(db, "municipios", id)
            await updateDoc(cityRef, {
                ativo: bool
            })

            navigate('/municipios')
        } catch (error){
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

    return (
        <>
            {Object.keys(formData).length === 0 ? (
                <Loading />
            ) : (
                <>
                    <div className='title-div'>
                        <div onClick={() => navigate('/municipios')} className='voltar-button'>
                            <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http:www.w3.org/2000/svg">
                                <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className='title'>Editar Município: {formData.municipio}</h1>
                    </div>
                    <form onSubmit={cardImageUpload} action="">
                        <p className='label'>Nome do município:</p>
                        <input
                            disabled
                            className='input-default input-disabled'
                            type="text"
                            name="municipio"
                            placeholder="Digite o nome do município:"
                            value={formData.municipio}
                            onChange={handleChange}
                        />
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
                            type='text'
                            className='textarea-input'
                            name="sobre"
                            placeholder="Digite sobre:"
                            value={formData.sobre}
                            onChange={handleChange}
                            maxLength={1500}
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
                                        Selecione novas imagens secundárias {formData.imgs.length + images.length < maxImgs && ` - Máximo: ${maxImgs - (formData.imgs.length + images.length)}`}
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
                        <button className='submit-button' type="submit">Editar Município</button>
                    </form>
                    <button className='delete-button' onClick={deleteCity}>Remover Município</button>
                    <button className={formData.ativo ? "desactive-button" : "active-button"} onClick={() => {
                        activeDesactive(!formData.ativo)
                    }}>{formData.ativo ? "Desativar Município" : "Ativar Município"}</button>
                </>
            )}
        </>
    )
}

export default MunicipiosEditar;
