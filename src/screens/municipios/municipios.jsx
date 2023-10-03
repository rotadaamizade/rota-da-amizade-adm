import React, { useState, useEffect } from 'react'
import './municipios.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import RedesDiv from '../../components/redesDiv/redesDiv'

function Municipios() {
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
  const [images, setImages] = useState(null)

  const imagesUpload = (imageCardUrl) => {
    if (images == null) return

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

    if (!formData.municipio || !formData.descricao || !formData.localizacao || !formData.sobre || !image || !images) {
      alert('Por favor, preencha todos os campos e selecione as imagens antes de enviar.');
      return
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
    //fazer a verificação
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
      setFormData({
        municipio: '',
        descricao: '',
        localizacao: '',
        sobre: '',
        contatos: '',
        redesSociais: ''
      })
      setProgressCard(0)
      setProgressImages(0)
    })
  }

  return (
    <form onSubmit={cardImageUpload} className="municipios-form" action="">
      <input
        className='input-default'
        type="text"
        name="municipio"
        placeholder="Nome do município"
        value={formData.municipio}
        onChange={handleChange}
      />
      <input
        className='input-default'
        type="text"
        name="descricao"
        placeholder="Descrição"
        value={formData.descricao}
        onChange={handleChange}
      />
      <input
        className='input-default'
        type="text"
        name="localizacao"
        placeholder="Link de Localização"
        value={formData.localizacao}
        onChange={handleChange}
      />
      <input
        type='text'
        className='input-sobre'
        name="sobre"
        placeholder="Sobre"
        value={formData.sobre}
        onChange={handleChange}
      />

      <RedesDiv formData={formData} setFormData={setFormData} />

      <div class='file-input'>
        <input onChange={(e) => setImage(e.target.files[0])} type='file'/>
        <span class='button'>Selecione a Imagem Principal</span>
        <label class='label' data-js-label>Nenhuma imagem selecionada</label>
      </div>

      <progress value={progressCard} max={100} />

      <div class='file-input'>
        <input multiple onChange={(e) => setImages(e.target.files)} type='file'/>
        <span class='button'>Selecione as Imagens Secundárias</span>
        <label class='label' data-js-label>Nenhuma imagem selecionada</label>
      </div>

      <progress value={progressImages} max={100} />

      <button type="submit">Cadastrar</button>
    </form>
  )
}

export default Municipios
