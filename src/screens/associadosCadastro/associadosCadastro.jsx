import React, { useState, useEffect } from 'react'
import './associadosCadastro.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../config/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import RedesDiv from '../../components/redesDiv/redesDiv'
import { useNavigate } from 'react-router-dom'
import CategoriesDiv from '../../components/categoriesDiv/categoriesDiv'

function AssociadosCadastro() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: '',
    municipio: '', // Updated field name
    descricao: '',
    localizacao: '',
    sobre: '',
    contatos: [],
    redesSociais: [],
    categorias: [],
  })
  const [progressCard, setProgressCard] = useState(0)
  const [progressImages, setProgressImages] = useState(0)
  const [image, setImage] = useState(null)
  const [images, setImages] = useState([])
  const [cities, setCities] = useState([]) // Updated field name

  const maxImgs = 5
  const minImgs = 2

  useEffect(() => {
    getMunicipios()
  }, [])

  console.log(formData)

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

  const errorAlert = () => {
    alert('Por favor, preencha todos os campos');
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
    if (images.length === 0) return; // Updated condition

    let totalProgress = 0;
    let imagesProcessed = 0;
    let imagesUrl = []

    for (let index = 0; index < images.length; index++) {
      const id = generateRandomId(6)

      const storageRef = ref(storage, `associados/images/${formData.nome}/${formData.nome}-image-${id}`) // Updated storage path
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
              directory: `associados/images/${formData.nome}/${formData.nome}-image-${id}` // Updated directory path
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

    if (
      !formData.municipio ||
      !formData.descricao ||
      !formData.nome ||
      !formData.localizacao ||
      !formData.sobre ||
      !image ||
      images.length === 0 || // Updated condition
      formData.categorias.length === 0 // Updated condition
    ) {
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

    if (image == null) {
      errorAlert()
      return
    }

    if (images.length < minImgs || images.length > maxImgs) {
      errorAlert()
      return
    }

    const storageRef = ref(storage, `associados/images/${formData.nome}/${formData.nome}-card`) // Updated storage path
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
          imagesUpload(url, `municipios/associados/${formData.nome}/${formData.nome}-card`) // Updated directory path
        })
      }
    )
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (imageCardUrl, imageCardDirectory, imagesUrl) => {
    const docRef = await addDoc(collection(db, 'associados'), {
      ...formData,
      imgCard: { url: imageCardUrl, directory: imageCardDirectory },
      imgs: imagesUrl
    }).then(() => {
      navigate('/associados')
    })
  }

  return (
    <>
      <div className='title-div'>
        <div onClick={() => navigate('/associados')} className='voltar-button'>
          <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className='title'>Cadastro de Associados</h1>
      </div>

      <form onSubmit={cardImageUpload} action="">
        <input
          className='input-default'
          type="text"
          name="nome"
          placeholder="Nome do Associado:"
          value={formData.nome}
          onChange={handleChange}
        />
        <select
          className='select-category'
          name="municipio"
          value={formData.municipio} // Updated value attribute
          onChange={handleChange}
        >
          <option value="">Em que município vai acontecer</option>
          {cities.map((city, index) => (
            <option key={index} value={city.nome}>
              {city.nome}
            </option>
          ))}
        </select>
        <input
          className='input-default'
          type="text"
          name="descricao"
          placeholder="Descrição:"
          value={formData.descricao}
          onChange={handleChange}
        />
        <input
          className='input-default'
          type="text"
          name="localizacao"
          placeholder="URL da localização: (Google Maps)"
          value={formData.localizacao}
          onChange={handleChange}
        />
        <textarea
          className='textarea-input'
          name="sobre"
          placeholder="Sobre:"
          value={formData.sobre}
          onChange={handleChange}
        />

        <CategoriesDiv formData={formData} setFormData={setFormData} type='associados' />
        <RedesDiv formData={formData} setFormData={setFormData} />

        <div className='file-input'>
          <input onChange={(e) => setImage(e.target.files[0])} type='file' />
          <span className='button'>Selecione a Imagem Principal</span>
          <p className='label' data-js-label>
            {image != null ? image.name : 'Nenhuma imagem selecionada'}
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

        <progress value={progressImages} max={100} />

        <button className='submit-button' type="submit">Cadastrar</button>
      </form>
    </>
  )
}

export default AssociadosCadastro;
