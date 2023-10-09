import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../../config/firebase";
import RedesDiv from "../../components/redesDiv/redesDiv";
import Loading from "../../components/loading/loading";
import ImgsEdit from "../../components/imgsEdit/imgsEdit";

function MunicipiosEditar() {

    const { id } = useParams();
    const navigate = useNavigate()

    const [city, setCity] = useState({});

    const [imgsCopy, setImgsCopy] = useState([])

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
                navigate(`/`)
            }
        } catch (error) {
            navigate(`/`)
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

    async function editCity(e) {
        e.preventDefault()

        if (!city.municipio || !city.descricao || !city.localizacao || !city.sobre ) {
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

        try {
            const docRef = doc(db, "municipios", id);
            await updateDoc(docRef, city)
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
                            <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <h1 className='title'>Editar Município: {city.municipio}</h1>
                    </div>
                    <form onSubmit={editCity} action="">
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
                                    city = {city}
                                    setCity = {setCity}
                                    imgsCopy = {imgsCopy}
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

                <progress value={progressCard} max={100} />

                <div className='file-input file-input-2'>
                    <input multiple onChange={(e) => setImages(e.target.files)} type='file' />
                    <span className='button'>Selecione as Imagens Secundárias</span>
                    <p className='label'>
                        {images && images.length > 0
                            ? Array.from(images).map((image) => image.name).join(', ')
                            : 'Nenhuma imagem selecionada'}
                    </p>
                </div>

                <progress value={progressImages} max={100} /> */}

                        <button className='submit-button' type="submit">Editar</button>
                    </form>
                </>
            )}

        </>
    )
}

export default MunicipiosEditar