import './Revision.css'
import {useState, useEffect, useRef} from 'react'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import Die from './Die';



export default function Revision() {
    const Ref = useRef(null)
    const [dice, setDice] = useState(() => allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const [rolls, setRolls] = useState(0)
    const [now, setNow] = useState(null)
    const [startTime, setStartTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(null)

    function startTimer() {
        setStartTime(Date.now())
        clearInterval(Ref.current)
        Ref.current = setInterval(() => {
            setNow(Date.now())
        }, 1000)
    }

    function stopTimer() {
        clearInterval(Ref.current)
    }

    function generateDice() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateDice())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            if (rolls === 0) {
                startTimer()  // Start the timer on the first roll
            }

            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateDice()
            }))
            setRolls(oldRolls => oldRolls + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setElapsedTime(null)
            setNow(null)
            setStartTime(null)
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die, isHeld: !die.isHeld } : die
        }))
    }

    function formatTime(totalSeconds) {
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const secs = totalSeconds % 60
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)

        let time = 0
        if (startTime != null && now != null) {
            time = Math.floor((now - startTime) / 1000)
            setElapsedTime(formatTime(time))
        }

        if (allHeld && allSameValue) {
            setTenzies(true)
            stopTimer()  // Stop the timer when the game is won
        }
    }, [dice, now])

    const dieElement = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} toggle={() => holdDice(die.id)} />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <div className='die--container'>
                {dieElement}
            </div>
            <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
            <h5 className="num--rolls">Number of rolls: {rolls}</h5>
            <h2>Time Elapsed: {elapsedTime ? elapsedTime : "00:00"}</h2>
            {tenzies && <h2>Time to Win: {elapsedTime}</h2>}
        </main>
    )
}





/*
export default function Revision() {
    const Ref = useRef(null)
    const [dice, setDice] = useState(() => allNewDice())

    const [tenzies, setTenzies] = useState(false)

    const [rolls, setRolls] = useState(0)

    const [now, setNow] = useState(null)
    const [startTime, setStartTime] = useState(null)
    //const [endTime, setEndTime] = useState(null)
    const [elapsedTime, setElapsedTime] = useState(null)

    function startGame() {
        setNow(Date.now())
        setStartTime(Date.now())

        clearInterval(Ref.current)
        Ref.current = setInterval(() => {
            setNow(Date.now())
        }, 1000)
    
    }
    function generateDice() {
       return {value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    function allNewDice() {
        const newDice = []
        for(let i = 0; i < 10; i++) {
            newDice.push(generateDice())
        }
        return newDice
    }
    function rollDice() {
        if(!tenzies) {

            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateDice()
            }))
            setRolls(oldRolls => oldRolls + 1)
        }else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            startGame()
        }
        
    }
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    const formatTime = (totalSeconds) => {
        //const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const secs = totalSeconds % 60;
        return ${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}
      }

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        let time = 0
        if(startTime != null && now != null) {
            time = now - startTime
        }
        if(allHeld && allSameValue) {
            setTenzies(true)
            //const endTime = Date.now()
            //setGameEnded(true)
            //setEndTime(endTime)
            clearInterval(Ref.current)
            formatTime(setElapsedTime(time))
            // setElapsedTime(((endTime - startTime) / 1000).toFixed(2))
            console.log("You won")
        }
    },[dice])
    const dieElement = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} toggle={() => holdDice(die.id)} />
    ))
    return (
        <main>
            {tenzies && <Confetti /> }
        <div className='die--container'> 
            {dieElement}
        </div>
        <button onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        <h5 className="num--rolls">Number of rolls: {rolls}</h5>
        {elapsedTime && <h2>Time to Win: {elapsedTime} seconds</h2>}
        </main>
    )
}
*/












//     const [formData, setFormData] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         comment: "",
//         isFriendly: true
//     })
    
//     function handleChange(event) {
//         const {name, value, type, checked} = event.target
//         setFormData(preForm => ({
//             ...preForm,
//             [name]: type === 'checkbox' ? checked : value
//         }))

        
//     }
//     return(
//         <form>
//             <input 
//                 type='text'
//                 placeholder='firstName'
//                 onChange={handleChange}
//                 name='firstName'
//                 value={formData.firstName}
//             />

//             <input
//                 type='text'
//                 placeholder='lastName'
//                 onChange={handleChange}
//                 name='lastName'
//                 value={formData.lastName}
//             />

//             <input
//                 type='email'
//                 placeholder='email'
//                 onChange={handleChange}
//                 name='email'
//                 value={formData.email}
//             />

//             <textarea 
//                 value={formData.comment}
//                 placeholder='comment'
//                 onChange={handleChange}
//                 name='comment'
//             />

//             <input 
//                 type='checkbox'
//                 id='isFriendly'
//                 checked={formData.isFriendly}
//                 onChange={handleChange}
//                 name='isFriendly'
//             />
//             <label htmlFor='isFriendly'>Are you friendly?</label>
//         </form>
//     )
// }







// function Box(props) {

//     const styles = {
//         backgroundColor: props.on ? "#222222" : "transparent"
//     }

//     return(
//         <div
//              style={styles} 
//              onClick={props.handleClick}
//              className='box'> 
//              </div>
//     )
// }

// export default function Revision  (props) {
//     const [squares, setBoxes] = useState(boxes)
    
//     function toggle() {
//         console.log("clicked")
//     }
//     const newBoxes = squares.map(square => (
//             <Box on={square.on}  
//                 key={square.id}
//                 handleClick={toggle}
//                 />
//     ))
//     return(
//         <div>
//             {newBoxes}
//         </div>
//     )
// }