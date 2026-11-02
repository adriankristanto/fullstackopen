import Part from './Part'

const Content = ({parts}) => (
  <div>
    {
        parts.map(part => {
            return (
                <Part key={part.name} part={part} />
            )
        })
    }
  </div>
)

export default Content