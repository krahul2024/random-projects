//converting the image in base64

const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
            resolve(fileReader.result);
        } //this is in case of the promise is resolved then file or image is returned
        fileReader.onerror = (error) => {
            reject(error);
        } //this is in case if there is any error 
    });
}


export default convertToBase64;