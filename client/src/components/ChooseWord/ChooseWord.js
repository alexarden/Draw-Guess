import randomWords from 'random-words';

export default function ChooseWord(){

const handleEasyClick = () => {
     console.log('easy');
     let easyWord = ['']; 
     while(easyWord[0].length !== 3){
        easyWord = randomWords({exactly:1, maxLength:3})
     }
     console.log(easyWord[0].length, easyWord[0]);   
     return 
     
}
const handleMedClick = () => {
     console.log('medium');
     let mediumWord = [''];  
     while(mediumWord[0].length !== 4){
        mediumWord = randomWords({exactly:1, maxLength:4})
     }
     console.log(mediumWord[0].length, mediumWord[0]);   
     return 
     
}
const handleHardClick = () => {
     console.log('hard');
     let hardWord = ['']; 
     while(hardWord[0].length < 5){
        hardWord = randomWords({exactly:1, maxLength:12})
     }
     console.log(hardWord[0].length, hardWord[0]);   
     return 
}

return (
    <>
        <h2>Choose Difficulty</h2> 

        <button onClick={handleEasyClick}>EASY</button>  
        <button onClick={handleMedClick}>MEDIUM</button> 
        <button onClick={handleHardClick}>HARD</button>
    </>
)

}