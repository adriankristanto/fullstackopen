import Part from "./Part";

const Content = ({parts}) => {
    return (
        <>
            {parts.map(({name, exercises}) => {
                return <Part key={name} part={name} exercises={exercises} />
            })}
        </>
    );
}
 
export default Content;