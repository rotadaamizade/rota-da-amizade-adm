import './imgsEdit.css';

function ImgsEdit({ formData, setFormData, imgsCopy, setImgsExclude, imgsExclude }) {

    const handleRemoveImage = (index) => {
        const updatedCity = { ...formData }
        setImgsExclude([...imgsExclude, updatedCity.imgs[index].directory])
        updatedCity.imgs.splice(index, 1);
        setFormData(updatedCity);
    }

    const redefinir = () => {
        let updatedCity = { ...formData };
        updatedCity.imgs = [...imgsCopy]
        setFormData(updatedCity);
        setImgsExclude([])
    };
    

    return (
        <>
        <h1 className='title-removeImgs'>Remover imagens</h1>
        <div className='editImg-container'>
            {formData.imgs.length < imgsCopy.length && (
            <div onClick={redefinir} className='editImg-redefinir'>
                    <div>
                    <svg fill="#fff" width="80px" height="80px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                        <path d="M960 0v213.333c411.627 0 746.667 334.934 746.667 746.667S1371.627 1706.667 960 1706.667 213.333 1371.733 213.333 960c0-197.013 78.4-382.507 213.334-520.747v254.08H640V106.667H53.333V320h191.04C88.64 494.08 0 720.96 0 960c0 529.28 430.613 960 960 960s960-430.72 960-960S1489.387 0 960 0" fillRule="evenodd" />
                    </svg>
                    <p>Redefinir</p>
                </div>
            </div>
            )}
            {formData.imgs.map((img, index) => (
                <div className='editImg-div' key={index}>
                    <div className='editImg-close' onClick={() => handleRemoveImage(index)}>
                        <p>+</p>
                    </div>
                    <img src={img.url} alt='' />
                </div>
            ))}
        </div>
        </>
    )
}

export default ImgsEdit;
