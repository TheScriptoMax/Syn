
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus  } from '@fortawesome/free-solid-svg-icons';
import { useNavigate,NavigateFunction} from "react-router-dom";


const Button = styled.button`
    background-color:transparent;
    color:#FF8CF7;
    border:2px solid #FF8CF7;
    border-radius: 0.4rem;;
`

const AddScripts:React.FC = () => {
    let navigate:NavigateFunction = useNavigate()
    return (
        <Button onClick={()=>navigate("/new")}>
            <FontAwesomeIcon icon={faPlus} />
        </Button>
    )
}

export default AddScripts
