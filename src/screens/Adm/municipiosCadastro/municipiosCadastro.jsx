import React, { useState, useEffect, useContext } from 'react'
import './municipiosCadastro.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import RedesDiv from '../../../components/Adm/redesDiv/redesDiv'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../../UserContext'

function MunicipiosCasdastro() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    municipio: '',
    descricao: '',
    localizacao: '',
    sobre: '',
    contatos: [],
    redesSociais: [],
    plano: ''
  })
  const [progressCard, setProgressCard] = useState(0)
  const [progressImages, setProgressImages] = useState(0)
  const [image, setImage] = useState(null)
  const [images, setImages] = useState([])
  const { planos } = useContext(UserContext);

  const maxImgs = 5
  const minImgs = 2

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
    if (images == []) return

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
              directory: `municipios/images${formData.municipio}/${formData.municipio}-image-${id}`
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

    if (!formData.municipio || !formData.descricao || !formData.localizacao || !formData.sobre || !image || images == [] || !formData.plano){
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

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (imageCardUrl, imageCardDirectory, imagesUrl) => {
    const docRef = await addDoc(collection(db, 'municipios'), {
      ...formData,
      imgCard: { url: imageCardUrl, directory: imageCardDirectory },
      imgs: imagesUrl,
      ativo: true
    }).then(() => {
      navigate('/municipios')
    })
  }

  const handlePlanoChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);
    console.log(selectedValue)

    setFormData({
      ...formData,
      plano: selectedValue,
    });
  }

  console.log(formData)

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
        <p className='label'>Nome do município:</p>
        <input
          className='input-default'
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
        <p className='label'>Sobre:</p>
        <select
          className='select-category'
          name="plano"
          onChange={handlePlanoChange}
        >
          <option value={JSON.stringify('')}>Selecione o plano</option>
          {planos.map((plano, index) => (
            <option key={index} value={JSON.stringify(plano)}>{plano}</option>
          ))}
        </select>

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

export default MunicipiosCasdastro