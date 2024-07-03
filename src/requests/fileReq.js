import {axios} from "../services/axios";

// import { saveAs } from 'file-saver';
// import { Buffer } from 'buffer';

// function saveFile(buffer, fileName){
//     console.log('fileName', fileName)
//     const url = window.URL.createObjectURL(new Blob([buffer]));
//     saveAs(url, fileName ? fileName : "document.odt");      
// }



export async function getFileById(entity_id){
  try {
      const response = await axios.get(`/api/files/${entity_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
  }
} 

// ищет файл по айди сущности, в ответе содержится file_storage_link и _id
export async function getFilesByEntityID(entity_id){
  try {
      const response = await axios.get(`/api/files/${entity_id}`);
      return response.data;
    } catch (error) {
      console.log(error);
  }
} 

// удаляет !!!ВСЕ!!! файлы по айди сущности
export async function removeFilesByEntityID(entity_id){
  try {
      const response = await axios.delete(`/api/files/${entity_id}`);
      return response;
    } catch (error) {
      console.log(error);
  }
}

export async function deleteFileByID(entityID, fileID) {
  try {
    const response = await axios.delete(`/api/files/${entityID}/${fileID}`)
    return response
  } catch (error) {
    console.log(error);
  }
}

// принимает айди сущности, к которой относится файл, экземпляр File из инпута 
// и объект options, содержащий информацию о сущности, создаёт экземпляр FormData и отправляет на сервер
export async function uploadFiles(entity_id, {files, options}){
  try {
    console.log(files);
    for (const file of files) {
      console.log('uploadFiles', entity_id, file, options) 
      let formData = new FormData();
      formData.append('entity_id', options.entity_id)
      formData.append('entity_type', options.entity_type)
      formData.append('entity_propertyName', options.entity_propertyName )
      formData.append('file', file);
      const response = await axios.post(`/api/files/${entity_id}/upload`, formData, {headers: {
          'Content-Type': 'multipart/form-data',
      }})
    }
  } catch (error) {
    console.log(error);
  }
}

// не используется
export async function addFile(file){
		try {
      loadingStore.setLoading(true);
      loadingStore.setLoadingMessage('addFile');
      const response = await axios().post("/files", file);
      loadingStore.setLoading(false);           
      return response;
    } catch (error) {
      console.log(error);
    }
  }

// не используется
export async function downloadFile(fileId, fileName){
        try {
            console.log('fileName', fileName)
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('downloadFile');
            

            const response = await axios().get(/files/`${fileId}`/download, { responseType: 'arraybuffer' });
            let data = Buffer.from(response.data, 'base64') 
            saveFile(data, fileName ? fileName : null);

            loadingStore.setLoading(false);           
            
            return response;
          } catch (error) {
            
        }
    }


// не используется
export async function updateFile(fileId, file){
        try{
            loadingStore.setLoading(true);
            loadingStore.setLoadingMessage('updateFile');            

            const response = await axios().put(/files/`${fileId}`, file);

            loadingStore.setLoading(false);           
            
        }
        catch(error){
            
        }
    }

// не используется
export async function getAllFiles(){
  try {
    loadingStore.setLoading(true);
    loadingStore.setLoadingMessage('getAllFiles');
    const response = await axios().get("/files");
    loadingStore.setLoading(false);
    return response;
  } catch (error) {
    console.log(error);  
  }
}
