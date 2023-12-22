import DangerousHTML from 'react-dangerous-html';
import DOMPurify from 'dompurify';

function StringToHtml({ htmlString }) {
  const sanitizedHtml = DOMPurify.sanitize(htmlString);

  return (
    <DangerousHTML html={sanitizedHtml} />
  );
}

export default StringToHtml;
