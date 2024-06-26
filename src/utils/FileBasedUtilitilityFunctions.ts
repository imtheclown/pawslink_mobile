
import ReactNativeBlobUtil from 'react-native-blob-util'
import { Alert } from 'react-native';
const saveImageToLocalStorage = async (imgSource: string, imgFolder: string, imgFilename: string) =>{
    const {fs} = ReactNativeBlobUtil;
    // check if target directory exists
    const internalDir = fs.dirs.DocumentDir;
    await fs.isDir(`${internalDir}/${imgFolder}`)
    .then(res =>{
        // if directory does not exist, create a new directory
        if(!res){
            fs.mkdir(`${internalDir}/${imgFolder}`);
            console.log("created")
        }else{
            console.log("exists")
        }
    }).catch(err =>{
        console.log(err);
    });

    await ReactNativeBlobUtil
    .config({
        fileCache: true,
        path: `${internalDir}/${imgFolder}/${imgFilename}`
    })
    .fetch("GET", imgSource)
    .then(res =>{
        const resInfo = res.info();
        if(resInfo.status === 200){
            Alert.alert("Image Downloaded Successfully.");
        }else{
            console.log("failed to download the image")
        }
    }).catch(err =>{
        console.log(err)
    });
    return
}

export {saveImageToLocalStorage}