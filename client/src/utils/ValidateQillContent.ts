const isQuillContentEmpty = (content: string): boolean => {

    const div = document.createElement('div');
    div.innerHTML = content;
  
    return div.textContent?.trim() === '';
  };

  export default isQuillContentEmpty;