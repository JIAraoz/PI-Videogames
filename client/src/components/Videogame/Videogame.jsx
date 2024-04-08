export default function Videogame({image,name,genders}){
    return(
        <>
        <div>
            <img src={image} alt={name} />
            <h3>{name}</h3>
            <span>{genders}</span>
        </div>
        </>
    )
}