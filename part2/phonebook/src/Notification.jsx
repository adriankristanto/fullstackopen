import { useEffect } from "react";

const Notification = ({message, type, onClose}) => {
    const styleChoices = {
        success: {
            color: 'green',
        },
        error: {
            color: 'red'
        }
    }

    const style = {
        backgroundColor: 'lightgrey',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: '5px',
        padding: '10px',
        marginBottom: '10px',
        ...styleChoices[type]
    }

    useEffect(() => {
        const handle = setTimeout(onClose, 3000)
        return () => clearTimeout(handle)
    }, [])

    return ( 
        <div style={style}>
            {message}
        </div>
     );
}
 
export default Notification;