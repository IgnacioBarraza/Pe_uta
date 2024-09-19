import { ReactNode, createContext } from "react"
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
import { useProps } from "../hooks/useProps";

type FirebaseContextType = {
  uploadProjectImage: (image, onProgress, onError, onComplete) => void;
  deleteProjectImage: (image_name: string) => Promise<void>;
}

type FirebaseProviderProps = {
  children: ReactNode;
};

export const FirebaseContext = createContext<FirebaseContextType>({
  uploadProjectImage: () => {},
  deleteProjectImage: async () => {},
})

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const { userToken, userRole} = useProps()

  const uploadProjectImage = (image, onProgress, onError, onComplete) => {
    if (image) {

      if (!userToken && userRole === 'admin') return alert('Permisos insuficientes para subir imagenes.')

      const storageRef = ref(storage, `projects/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (onProgress) onProgress(progress);
        },
        (error) => {
          if (onError) onError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (onComplete) onComplete(downloadURL);
          });
        }
      );
    } else {
      alert('Debe cargar una imagen para continuar...');
    }
  };

  const deleteProjectImage = async (image_name: string): Promise<void> => {
    const imageRef = ref(storage, `projects/${image_name}`)
    await deleteObject(imageRef)
  }
  return (
    <FirebaseContext.Provider value={{ uploadProjectImage, deleteProjectImage }}>{children}</FirebaseContext.Provider>
  )
}