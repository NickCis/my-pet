

export function getPetPicture(pet, i) {
  //return "https://placekitten.com/g/200/300";
  return (pet.images && pet.images[i||0]) || `/api/pet/${pet.id}/img/${i||0}`;
}

export function niceDate(d) {
  const date = new Date(d);
  return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

export function completePet(pet) {
  return {
    ...pet,
    images: Array(pet.images_length).map((_, i) => getPetPicture(pet, i)),
    niceBirthdate: niceDate(pet.birthdate)
  };
}
