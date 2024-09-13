import './Revision.css'
import './dice.css'
export default function Die(props) {

   function renderDot(num) {
        const dotArray = []
        for(let i = 0; i < num; i++) {
            dotArray.push(<div key={i} className='dot'></div>)
        }
        return dotArray
   } 
   
   const styles = {backgroundColor: props.isHeld ? "green" : "white"}
   return(
        <div className="dice die--face" style={styles} onClick={props.toggle}>
            {renderDot(props.value)}
        </div>
   )
}
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
    // const dotPositions = [
    //     [], // 0 is not used
    //     ['center'],
    //     ['top-left', 'bottom-right'],
    //     ['top-left', 'center', 'bottom-right'],
    //     ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
    //     ['top-left', 'top-right', 'center', 'bottom-left', 'bottom-right'],
    //     ['top-left', 'top-right', 'middle-left', 'middle-right', 'bottom-left', 'bottom-right']
    //   ];
/*
function renderDot () {
    const diceDot = []
    dotPositions.map((position, index) => (
    //       <div key={index} className={`dot ${position}`}></div>
    //     ))
    diceDot.push
    return 
}
*/
    // return(
    //     <div  >
    //     {dotPositions.map((position, index) => (
    //       <div key={index} className={`dot ${position}`}></div>
    //     ))}
    //   </div>
    // )
// const styles = {backgroundColor: props.isHeld ? "green" : "white"}
// return(
//     <div className='die--face' style={styles} onClick={props.toggle}>
//         <h2 className='num--face'>{props.value}</h2>
//     </div>
// )