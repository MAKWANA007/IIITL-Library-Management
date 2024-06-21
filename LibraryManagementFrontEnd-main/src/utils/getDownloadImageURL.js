import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase.config";

const getDownloadImageURL = async (file, directory, filename) => {
  const storageRef = ref(storage, directory + filename);
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  return downloadURL;
};

export default getDownloadImageURL;
