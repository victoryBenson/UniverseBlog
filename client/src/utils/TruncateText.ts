const truncateText = (text: string, maxLength:number) => {
    if(text.length <= maxLength){
        return text
    }

    const SliceText = text.substring(0, maxLength) + "..."
    return SliceText
}

export default truncateText;