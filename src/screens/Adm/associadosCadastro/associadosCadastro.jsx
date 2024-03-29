import React, { useState, useEffect, useContext } from 'react'
import './associadosCadastro.css'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { db, storage } from '../../../config/firebase'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import RedesDiv from '../../../components/Adm/redesDiv/redesDiv'
import { useNavigate } from 'react-router-dom'
import CategoriesDiv from '../../../components/Adm/categoriesDiv/categoriesDiv'
import { UserContext } from '../../../UserContext'

function AssociadosCadastro() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nome: '',
    municipio: '',
    descricao: '',
    localizacao: '',
    sobre: '',
    contatos: [],
    redesSociais: [],
    categorias: [],
    plano: '',
  })
  const [progressCard, setProgressCard] = useState(0)
  const [progressImages, setProgressImages] = useState(0)
  const [progressLogo, setProgressLogo] = useState(0)
  const [image, setImage] = useState(null)
  const [imageLogo, setImageLogo] = useState(null)
  const [images, setImages] = useState([])
  const [cities, setCities] = useState([])
  const [isOtherCity, setIsOtherCity] = useState(true);
  const { planos } = useContext(UserContext);

  const maxImgs = 5
  const minImgs = 2

  useEffect(() => {
    getMunicipios()
  }, [])

  useEffect(() => {
    setFormData({
      ...formData,
      municipio: '',
    })
  }, [isOtherCity])

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

  const imagesUpload = (imageCardUrl, imageCardDirectory, logoUrl, logoDirectory) => {
    if (images.length === 0) return;
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
              handleSubmit(imageCardUrl, imageCardDirectory, imagesUrl, logoUrl, logoDirectory);
            }
          })
        }
      )
    }
  }

  const logoUpload = (imageCardUrl, imageCardDirectory) => {

    const storageRef = ref(storage, `associados/images${formData.nome}/${formData.nome}-logo`)
    const uploadTask = uploadBytesResumable(storageRef, imageLogo)

    uploadTask.on(
      'state_changed',
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgressLogo(progress)
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(url => {
          imagesUpload(imageCardUrl, imageCardDirectory, url, `associados/images${formData.nome}/${formData.nome}-logo`)
        })
      }
    )
  }

  const cardImageUpload = (event) => {
    event.preventDefault()

    if (
      !formData.municipio ||
      !formData.descricao ||
      !formData.nome ||
      !formData.sobre ||
      !image ||
      images.length === 0 ||
      formData.categorias.length === 0 ||
      !formData.plano ||
      formData.contatos.length == 0
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

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (imageCardUrl, imageCardDirectory, imagesUrl, logoUrl, logoDirectory) => {
    const docRef = await addDoc(collection(db, 'associados'), {
      ...formData,
      imgCard: { url: imageCardUrl, directory: imageCardDirectory },
      imgLogo: { url: logoUrl, directory: logoDirectory },
      imgs: imagesUrl,
      ativo: true
    }).then(() => {
      navigate('/associados')
    })
  }

  const handlePlanoChange = (e) => {
    const selectedValue = JSON.parse(e.target.value);

    setFormData({
      ...formData,
      plano: selectedValue,
    });
  }

  const handleRadioChange = (value) => {
    setIsOtherCity(value);
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
        <p className='label'>Nome do associado:</p>
        <input
          className='input-default'
          type="text"
          name="nome"
          placeholder="Digite o nome do Associado:"
          value={formData.nome}
          onChange={handleChange}
        />
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
        >
          <option value={JSON.stringify('')}>Selecione o plano</option>
          {planos.map((plano, index) => (
            <option key={index} value={JSON.stringify(plano)}>{plano}</option>
          ))}
        </select>

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
          <input onChange={(e) => setImageLogo(e.target.files[0])} type='file' />
          <span className='button'>Selecione a Logotipo do Associado</span>
          <p className='label' data-js-label>
            {imageLogo != null ? imageLogo.name : 'Nenhuma imagem selecionada'}
          </p>
        </div>

        <progress value={progressLogo} max={100} />

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
