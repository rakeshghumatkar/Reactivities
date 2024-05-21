export interface duck {
    name : string,
    legs : number,
    makeSound : (sound:string)=>void
}

const duck1 :duck =
{
    name : "duck1",
    legs : 2,
    makeSound : (sound:string) =>{
        console.log(sound);
    } 
}

const duck2 :duck=
{
    name : "duck2",
    legs : 2,
    makeSound : (sound:string) =>{
        console.log(sound);
    } 
}

duck1.makeSound("duck1 duck1")
duck2.makeSound("duck2 duck2")

export const ducks = [duck1, duck2];