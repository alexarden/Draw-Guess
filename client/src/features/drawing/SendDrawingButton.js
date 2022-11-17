import style from '../../styles/Button.module.scss'; 

const SendDrawingButton = (props) => {
  
  return (
    <div>
      <button 
        className={style.button} 
        onClick={props.handleSendClick} 
        disabled={props.drawingSent}>Send Drawing</button> 
    </div> 
  ); 
};
 
export default SendDrawingButton; 
