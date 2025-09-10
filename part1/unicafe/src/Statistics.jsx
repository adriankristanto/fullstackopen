import StatisticLine from "./StatisticLine"

const Statistics = ({good, neutral, bad}) => {
    const sum = good + neutral + bad 
    const average = (good - bad) / sum 
    const positive = (good / sum) * 100

    return ( 
        <>
            <h2>statistics</h2>
            {sum ? (
                <table>
                    <tbody>
                        <StatisticLine text="good" value={good} />
                        <StatisticLine text="neutral" value={neutral} />
                        <StatisticLine text="bad" value={bad} />
                        <StatisticLine text="average" value={average} />
                        <StatisticLine text="positive" value={positive + "%"} />
                    </tbody>
                </table>
            ) : <p>No feedback given</p>}
        </>
     )
}
 
export default Statistics;