export const MinHrConverter=(data:number)=>{
const hours = Math.floor(data / 60);
const minutes = data % 60;
return `${hours}hr ${minutes}min`;
}