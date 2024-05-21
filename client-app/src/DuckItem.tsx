import { duck } from "./demo"

interface Prop
{
    duck : duck;
}
export default function DuckItem  ({duck}:Prop)
{
return(
    <div key={duck.name}>
        <span>{duck.name}</span>
        <span>{duck.legs}</span>
        <button onClick={()=>duck.makeSound(duck.name + ' quak')}>Make Sound</button>
    </div>
);
}

