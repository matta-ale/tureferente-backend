import  fs from 'fs';
import path from 'path'


type ErrorCallback = (error: Error | null, data: any) => void; // CAMBIAR EL ANY POR LA DATA

export function jsonReader(callback:ErrorCallback) {
  const folderPath = '../tureferente-server/storage/datasets/default'; 

  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading directory:', err);
      return callback(err, null);
    }

    files.sort();
    const lastFileName = files[files.length - 1];
    const filePath = path.join(folderPath, lastFileName);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading file:', err);
        return callback(err, null);
      }
      const jsonData = JSON.parse(data);
      callback(null, jsonData);
    });
  });
}


