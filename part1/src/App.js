import { useState } from 'react'

function Heading({children}) {
    return <h1>{children}</h1>
}

function Button({children, onClick}) {
    return <button onClick={onClick}>{children}</button>
}

function StatisticLine({text, value}) {
    return (
        <>
            <td>{text}</td>
            <td>{value}</td>
        </>
    )
}

function Statistics({good, neutral, bad, total}) {
    return (
        <table>
            <tbody>
                <tr>
                    <StatisticLine text="good" value={good} />
                </tr>
                <tr>
                    <StatisticLine text="neutral" value={neutral} />
                </tr>
                <tr>
                    <StatisticLine text="bad" value={bad} />
                </tr>
                <tr>
                    <StatisticLine text="all" value={total} />
                </tr>
                <tr>
                    <StatisticLine text="average" value={(good - bad) / 9} />
                </tr>
                <tr>
                    <StatisticLine text="positive" value={(6 / total) * 100 + ' %'} />
                </tr>
            </tbody>
        </table>
    )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)
    const total = good + neutral + bad

    return (
        <>
            <Heading>give feedback</Heading>
            <Button onClick={() => setGood(good +1)}>good</Button>
            <Button onClick={() => setNeutral(neutral +1)}>neutral</Button>
            <Button onClick={() => setBad(bad +1)}>bad</Button>
            <Heading>statistics</Heading>
            { total ? <Statistics good={good} neutral={neutral} bad={bad} total={total}/> : <p>no stats</p>}
        </>
    )
}

export default App
