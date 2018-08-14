import { defaultPath, imageNotFound } from '../images/image-source';
/* 
  - handle image error 
  get an image path as a parameter. If there is no image, replace with image not found.

 i. check if there is a image property
 ii. check if the image path is null
 iii. check if the image path is empty string
 
*/
export const handleImageError = (imageSrc) => {
  return (typeof imageSrc === 'undefined' || imageSrc === null || imageSrc == '') ? 
    `${imageNotFound.imagePath}${imageNotFound.imageName}` : `${defaultPath}${imageSrc}` 
}

/* read the url and return with valid query parameter */
export const getParam = (paramName) => {
  let searchString = window.location.search.substring(1);
  let i, value; 
  let params = searchString.split('&');
  
  for(i = 0; i < params.length; i++){
    value = params[i].split('=');
    if(value[0] == paramName){
      return decodeURI(value[1]);
    }
  }
};

/* check if the object has any property */
export const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}