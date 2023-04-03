import { Camera, CameraResultType } from "@capacitor/camera";
import { useState } from "react";
import FileService from "../services/FilesServices";
import { showToast } from "../utils/common-functions";
import { typeImage } from "../utils/enums";

export const useLoadImage = () => {
  const [image, setImage] = useState<any>("");
  const [photoPath, setPhotoPath] = useState<any | null>(null);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);

  const clearImages = () => {
    setIsLoadingAvatar(false);
    setPhotoPath("");
    setImage("");
  };

  const uploadImage = async (type: typeImage) => {
      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: true,
        resultType: CameraResultType.Uri,
        promptLabelPhoto: "Выбрать фото из галерии",
        promptLabelPicture: "Сделать фотографию",
        promptLabelHeader: "Фото",
      });

      let imageUrl = image.webPath || "";
      let blob = await fetch(imageUrl).then((r) => r.blob());
      setIsLoadingAvatar(true);

      if (blob) { 
        try {
          const response = await FileService.uploadImage(blob,type);
          if (response?.data?.data?.avatar) {
            setPhotoPath(imageUrl);
            setImage(response.data.data.avatar);
          } else {
            await showToast("Максимальный вес изображения 3 мб");
          }
          setIsLoadingAvatar(false);
        } catch (error) {
          clearImages();
          await showToast("Максимальный вес изображения 3 мб");
        }
      } else {
        await showToast("Изображения нет");
      }
  };

  return [image, photoPath, isLoadingAvatar, clearImages, uploadImage] as const;
};
