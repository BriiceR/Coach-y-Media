import styled from '@emotion/styled';
import '../../index.css';
import { colors, radius, fontSize, mediaMax, bounce } from '../../utils/utils';
import arrow from '../../assets/arrow.svg';
import img from '../../assets/img-floue.jpg';


const BackgroundHero = styled.div`
    background-image: url(${img});
    height: 300px;
    background-size: cover;
    background-position: center;
    ${mediaMax[1]} {
        height: 200px;
        background-position: 50%;
    }
    ${mediaMax[0]} {
        margin-top: -41px;
        height: 150px;
        background-position: 50%;
    }
`

export const HeroTitle = styled.h1`
    font-weight: 400;
    font-size: ${fontSize.title};
    color: ${colors.text_dark};
    text-align: center;
    padding-top: 80px;
    margin-bottom: 30px;
    ${mediaMax[1]} {
        font-size: ${fontSize.mobileTitle};
    }
    ${mediaMax[0]} {
        padding-top: 60px;
        margin-bottom: 20px;
    }
`

const Info = styled.div`
    background-color: ${colors.secondary};
    border-radius: ${radius.small};
    margin: 0 20%; 
    min-width: 60%;
    padding: 10px 10px 0px 10px;
    text-align: center;
    box-shadow: 0px 8px 30px 4px rgba(117, 142, 254, 0.40), 20px -20px 0px 5px rgba(255, 255, 255, 0.80);
    position: absolute;
    top: 300px;
    color: ${colors.text_light};
    ${mediaMax[2]} {
        margin: 0 10%;
        min-width: 80%;
    }
    ${mediaMax[1]} {
        top: 200px;
    }
    ${mediaMax[0]} {
        top: 150px;
    }
`

const InfoTitle = styled.h2`
    font-weight: 400;
    font-size: ${fontSize.title};
    margin: 35px 0;
    ${mediaMax[1]} {
        font-size: ${fontSize.mobileTitle};
        margin: 20px 0;
    }
    ${mediaMax[0]} {
        margin: 10px 0;
    }
`

const InfoText = styled.p`
    font-weight: 400;
    font-size: ${fontSize.subTitle};
    margin-bottom: 25px;
    ${mediaMax[1]} {
        font-size: ${fontSize.mobileSubTitle};
        margin-bottom: 10px;
        
    }
`

// Utilise l'animation de rebond dans le style du composant
const AnimatedContainer = styled.div`
    animation: ${bounce} 2s ease infinite;
    margin-top: 30px;
`;

const Arrow = styled.img`
    width: 30px;
    height: auto;
    ${mediaMax[1]} {
        width: 30px;
    }
`

const Hero = ({ title, stepTitle, text, stepText }) => {
    return (
        <BackgroundHero>
            <Info>
                <InfoTitle>{stepTitle ? stepTitle : title && title ? title : "PASSEZ À L'ACTION !"}</InfoTitle>
                <InfoText>{stepText ? stepText : text && text ? text : "Libérez votre potentiel"}
                </InfoText>
                <AnimatedContainer>
                    <Arrow src={arrow} alt="arrow" />
                </AnimatedContainer>
            </Info>
        </BackgroundHero>
    )
}

export default Hero