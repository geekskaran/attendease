import {PermissionsAndroid} from 'react-native';
import RNFS from 'react-native-fs';

export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'This app needs access to your storage to display images.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const fetchImagesFromDirectory = async (path, setError) => {
  try {
    const result = await RNFS.readDir(path);
    const images = result.filter(file =>
      /\.(jpg|jpeg|png|gif|mp4|avi|mov)$/.test(file.name),
    );

    const folderImages = images.map((file, index) => ({
      id: index, // Use file.ino as a unique identifier
      imageUrl: file.path,
      folderName: path,
    }));

    // Recursively fetch images from nested folders
    const directories = result.filter(file => file.isDirectory());
    for (const directory of directories) {
      const nestedImages = await fetchImagesFromDirectory(directory.path);
      folderImages.push(...nestedImages);
    }
    return folderImages;
  } catch (error) {
    console.error('Error reading directory:', error);
    setError('Failed to read images.');
    return [];
  }
};

export const fetchFoldersFromDirectory = async path => {
  try {
    const result = await RNFS.readDir(path);
    return result.filter(file => file.isDirectory()).map(file => file.path);
  } catch (error) {
    console.error('Error reading directory:', error);
    throw new Error('Failed to read directories.');
  }
};

export const fetchImages = async ({setGroupedImages, setError}) => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    return;
  }
  const rootPath = RNFS.ExternalStorageDirectoryPath; // External storage root path

  try {
    const folders = await fetchFoldersFromDirectory(rootPath); // Get folder paths
    let grouped = {}; // Object to store grouped images by folder

    for (const folder of folders) {
      const folderName = folder.split('/').pop(); // Extract folder name
      if (folderName !== 'Android') {
        // Skip Android system folder
        const allImages = await fetchImagesFromDirectory(folder); // Fetch images from the folder
        if (allImages.length > 0) {
          grouped[folderName] = allImages; // Add folder and its images
        }
      }
    }

    setGroupedImages(grouped); // Set the grouped images in state
  } catch (error) {
    console.error('Error reading images:', error);
    setError('Failed to read images.');
  }
};
