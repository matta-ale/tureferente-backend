import * as fs from 'fs';
import * as path from 'path';

export const deleteLastFile = async () => {
  const folderPath: string | undefined = process.env.JSON_RELATIVE_PATH; // Replace with the actual path to your folder

  if (typeof folderPath === 'string') {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        console.error('Error reading directory:', err);
        return;
      }

      const jsonFiles = files
        .filter((file) => path.extname(file) === '.json')
        .sort((a, b) => b.localeCompare(a));

      if (jsonFiles.length === 0) {
        console.log('No JSON files found in the folder.');
        return;
      }

      const fileToDelete = path.join(folderPath, jsonFiles[0]);

      fs.unlink(fileToDelete, (err) => {
        if (err) {
          console.error('Error deleting file:', err);
        } else {
          console.log(`Deleted file: ${fileToDelete}`);
        }
      });
    });
  }
};
