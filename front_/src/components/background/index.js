import styled from '@emotion/styled';
import '../../index.css';
import { mediaMax } from '../../utils/utils';
import backgrounImg from '../../assets/ybackground.png';


const Background = styled.div`
    background-image: url(${backgrounImg});
    height: auto;
    background-size: 70%;
    background-position: center;
    background-repeat: no-repeat;
    margin-top: 100px;
${mediaMax[2]} {
    background-size: 80%;
}
${mediaMax[1]} {
    background-size: 90%;
}
${mediaMax[0]} {
    min-height: 1000px;
    background-size: 100%;
}
`

const BackgroundContent = ({ children }) => {
    return (
        <Background>{children}</Background>
    );
}

export default BackgroundContent