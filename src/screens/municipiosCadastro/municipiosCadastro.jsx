import React, { useState, useEffect } from 'react'
import './municipiosCadastro.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import RedesDiv from '../../components/redesDiv/redesDiv'
import { useNavigate } from 'react-router-dom'

function MunicipiosCasdastro() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    municipio: '',
    descricao: '',
    localizacao: '',
    sobre: '',
    contatos: [],
    redesSociais: []
  })
  const [progressCard, setProgressCard] = useState(0)
  const [progressImages, setProgressImages] = useState(0)
  const [image, setImage] = useState(null)
  const [images, setImages] = useState([])

  const errorAlert = () => {
    alert('Por favor, preencha todos os campos');
  }

  const imagesUpload = (imageCardUrl) => {
    if (images == []) return

    let totalProgress = 0;
    let imagesProcessed = 0;
    let imagesUrl = []

    for (let index = 0; index < images.length; index++) {

      const storageRef = ref(storage, `images/${formData.municipio}-image-${index + 1}`)
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
            imagesUrl.push(url)
            imagesProcessed++;

            if (imagesProcessed === images.length) {
              handleSubmit(imageCardUrl, imagesUrl);
            }
          })
        }
      )
    }
  }

  const cardImageUpload = (event) => {
    event.preventDefault()

    if (!formData.municipio || !formData.descricao || !formData.localizacao || !formData.sobre || !image || images == []) {
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

    if (image == null) return

    const storageRef = ref(storage, `cardImages/${formData.municipio}-card`)
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
          imagesUpload(url)
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

  const handleSubmit = async (imageCardUrl, imagesUrl) => {
    const docRef = await addDoc(collection(db, 'municipios'), {
      descricao: formData.descricao,
      imgCard: imageCardUrl,
      imgs: imagesUrl,
      localizacao: formData.localizacao,
      municipio: formData.municipio,
      sobre: formData.sobre,
      contatos: formData.contatos,
      redesSociais: formData.redesSociais
    }).then(() => {
      navigate('/municipios')
    })
  }

  return (
    <>
      <div className='title-div'>
        <div onClick={() => navigate('/municipios')} className='voltar-button'>
          <svg width="20px" height="20px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.9998 8L6 14L12.9998 21" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6 14H28.9938C35.8768 14 41.7221 19.6204 41.9904 26.5C42.2739 33.7696 36.2671 40 28.9938 40H11.9984" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className='title'>Cadastro de Municípios</h1>
      </div>

      <form onSubmit={cardImageUpload} action="">
        <input
          className='input-default'
          type="text"
          name="municipio"
          placeholder="Nome do município:"
          value={formData.municipio}
          onChange={handleChange}
        />
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
          type='text'
          className='textarea-input'
          name="sobre"
          placeholder="Sobre:"
          value={formData.sobre}
          onChange={handleChange}
        />

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

export default MunicipiosCasdastro
