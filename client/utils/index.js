export function completePet(pet) {
  return {
    ...pet,
    images: Array(pet.images_length).map((_, i) => `/api/pet/${pet.id}/img/${i}`)
  };
}

export function getPetPicture(pet, i) {
  //return "https://placekitten.com/g/200/300";
  if(!i)
    i = 0;
  return pet.images[i] || `/api/pet/${pet.id}/img/${i}`;
}
