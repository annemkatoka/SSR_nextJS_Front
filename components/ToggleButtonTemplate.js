import { useState } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import nuevaPerona from "../pages/nuevaPersona";


//Componente que es un Toggle Button
const ToggleButtonTemplate = (props) => {
  const [option, setOption] = useState();



  const handleOption = (event, newObtion) => {
    setOption(newObtion);
    console.log(newObtion);

  };


  return (
    
    <>
      <ToggleButtonGroup
        value={option}
        exclusive
        onChange={handleOption}
      >
        <ToggleButton value={props.option1}>
        {props.option1}
        </ToggleButton>
        <ToggleButton value={props.option2}>
        {props.option2}
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default ToggleButtonTemplate;
