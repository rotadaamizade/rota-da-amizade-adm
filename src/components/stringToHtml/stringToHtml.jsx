import DangerousHTML from 'react-dangerous-html';

function StringToHtml({ htmlString }) {
    // Certifique-se de que a string seja segura antes de usar esta abordagem
; // Substitua sanitizeHTML com sua própria função de sanitização
  
    return (
      <DangerousHTML html={htmlString}/>
    );
  }
  
  export default StringToHtml;