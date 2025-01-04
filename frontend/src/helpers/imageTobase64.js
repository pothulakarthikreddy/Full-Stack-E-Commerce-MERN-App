const imageTobase64 = async(image)=>{
    const reader = new FileReader()
    reader.readAsDataURL(image)

    const data = await new Promise((reslove,reject)=>{
        reader.onload =() => reslove(reader.result)
        reader.onerror = error => reject(error)
    })

    return data;
}
export default imageTobase64