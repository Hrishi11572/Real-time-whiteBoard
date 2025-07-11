import './Button.css'

export default function Button ({ children ,style , setTool}) {
    function handleClick(){
        if(children === 'Clear'){
            setTool('eraser'); 
        }else{
            setTool('pencil'); 
        }
    }
    return (
        <button style={style} onClick={handleClick}>{children}</button>
    )
}