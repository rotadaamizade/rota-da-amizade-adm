import { doc, getDoc, updateDoc, addDoc, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../config/firebase";
import RedesDiv from "../../components/redesDiv/redesDiv";
import Loading from "../../components/loading/loading";
import ImgsEdit from "../../components/imgsEdit/imgsEdit";
import { deleteObject, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function MunicipiosEditar() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [city, setCity] = useState({});
    const [imgsCopy, setImgsCopy] = useState([])
    const [imgsExclude, setImgsExclude] = useState([])
    const [image, setImage] = useState(null)
    const [images, setImages] = useState([])
    const [progressImage, setProgressImage] = useState(0)
    const [progressImages, setProgressImages] = useState(0)

    const maxImgs = 5
    const minImgs = 2

    useEffect(() => {
        getCity()
    }, [])

    const errorAlert = () => {
        alert('Por favor, preencha todos os campos');
    }

    const getCity = async () => {

        try {
            const docRef = doc(db, "municipios", id)
            const docSnap = await getDoc(docRef)
            setCity(docSnap.data())
            setImgsCopy(docSnap.data().imgs)

            if (!docSnap.exists()) {
                navigate(`/municipios`)
            }
        } catch (error) {
            navigate(`/municipios`)
            console.log(error)
        }
    }


    const handleChange = (event) => {
        const { name, value } = event.target

        setCity({
            ...city,
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

    const imagesUpload = (e) => {

        e.preventDefault()

        if (images.length == 0){
            editCity([]);
        }

        let totalProgress = 0;
        let imagesProcessed = 0;
        let imagesUrl = []


        for (let index = 0; index < images.length; index++) {

            const id = generateRandomId(6)

            const storageRef = ref(storage, `municipios/images${city.municipio}/${city.municipio}-image-${id}`)
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
                            directory: `municipios/images${city.municipio}/${city.municipio}-image-${id}`
                        })
                        imagesProcessed++;

                        if (imagesProcessed === images.length) {
                            editCity(imagesUrl);
                        }
                    })
                }
            )
        }
    }

    console.log(city.imgs)

    async function editCity(imgsUrl) {

        if(city.imgs.length > maxImgs || city.imgs.length < minImgs){
            errorAlert()
            return
        }

        if (!city.municipio || !city.descricao || !city.localizacao || !city.sobre) {
            errorAlert()
            return
        }

        if (city.contatos.length > 0) {
            for (let i = 0; i < city.contatos.length; i++) {
                const element = city.contatos[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errorAlert()
                    return
                }
            }
        }

        if (city.redesSociais.length > 0) {
            for (let i = 0; i < city.redesSociais.length; i++) {
                const element = city.redesSociais[i];
                if (element.color === '' || element.name === '' || element.url === '') {
                    errorAlert()
                    return
                }
            }
        }

        
        imgsExclude.forEach(element => {
            console.log(element)
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
                contatos: city.contatos,
                descricao: city.descricao,
                imgCard: city.imgCard,
                imgs: [...city.imgs ,...imgsUrl],
                localizacao: city.localizacao,
                municipio: city.municipio,
                redesSociais: city.redesSociais,
                sobre: city.sobre
            })
            navigate('/municipios')
        } catch (error) {
            console.error("Erro ao editar o documento:", error);
        }
    }

    return (
        <>

            {Object.keys(city).length === 0 ? (
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
                        <h1 className='title'>Editar Município: {city.municipio}</h1>
                    </div>
                    <form onSubmit={imagesUpload} action="">
                        <input
                            disabled
                            className='input-default input-disabled'
                            type="text"
                            name="municipio"
                            placeholder="Nome do município:"
                            value={city.municipio}
                            onChange={handleChange}
                        />
                        <input
                            className='input-default'
                            type="text"
                            name="descricao"
                            placeholder="Descrição:"
                            value={city.descricao}
                            onChange={handleChange}
                        />
                        <input
                            className='input-default'
                            type="text"
                            name="localizacao"
                            placeholder="URL da localização: (Google Maps)"
                            value={city.localizacao}
                            onChange={handleChange}
                        />
                        <textarea
                            type='text'
                            className='textarea-input'
                            name="sobre"
                            placeholder="Sobre:"
                            value={city.sobre}
                            onChange={handleChange}
                        />

                        {Object.keys(city).length !== 0 && (
                            <>
                                <RedesDiv formData={city} setFormData={setCity} />

                                <ImgsEdit
                                    city={city}
                                    setCity={setCity}
                                    imgsCopy={imgsCopy}
                                    setImgsExclude={setImgsExclude}
                                    imgsExclude={imgsExclude}
                                />
                            </>
                        )}



                        {/* <div className='file-input'>
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' />
                    <span className='button'>Selecione a Imagem Principal</span>
                    <p className='label' data-js-label>
                        {image != null
                            ? image.name
                            : 'Nenhuma imagem selecionada'}
                    </p>
                </div>

                <progress value={progressCard} max={100} /> */}



                        <div className='file-input file-input-2'>
                            <input multiple onChange={(e) => setImages(e.target.files)} type='file' />
                            <span className='button'>Adicione mais imagens</span>
                            <p className='label'>
                                {images && images.length > 0
                                    ? Array.from(images).map((image) => image.name).join(', ')
                                    : 'Nenhuma imagem selecionada'}
                            </p>
                        </div>

                        <progress value={progressImages} max={100} />


                        <button className='submit-button' type="submit">Editar</button>
                    </form>
                </>
            )}

        </>
    )
}

export default MunicipiosEditar