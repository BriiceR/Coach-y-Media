import styled from '@emotion/styled';
import '../../index.css';
import { colors, fontSize, mediaMax, radius } from '../../utils/utils';
import logo from '../../assets/logoBlanc.png';
import linkedin from '../../assets/linkedin.svg';
import instagram from '../../assets/instagram.svg';
import facebook from '../../assets/facebook.svg';
import { Link,useParams } from 'react-router-dom';
import { scrollToTop } from '../../utils/utils';
import { UserContext } from '../../App';
import React, { useContext } from 'react';


const Flex = styled.div`
    display: flex;
    justify-content: space-around;
    background-color: ${colors.secondary};
    padding-top: 20px;
    height: auto;
    ${mediaMax[2]} {
        display: inherit;
        text-align: center;
    }
`
const FooterTitle = styled.h2`
    color: ${colors.text_light};
    font-size: ${fontSize.subTitle};
    text-align: center;
    ${mediaMax[0]} {
        font-size: ${fontSize.mobileTitle};
    }
`
const Logo = styled.img`
        max-width: 350px;
        height: 60px;
        cursor: pointer;
        margin-top: 40px;
        transition: all 0.3s ease-in-out;
    &:hover {
        scale: 1.1;
        transition: all 0.3s ease-in-out;
    }
        ${mediaMax[2]} {
            margin-bottom: 40px; 
        }
        ${mediaMax[1]} {
            max-width: 360px;
            height: 60px;
        }
`

const FooterIcon = styled.img`
    width: 40px;
    height: auto; 
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    &:hover {
        scale: 1.2;
        transition: all 0.3s ease-in-out;
    }
`

const Copyright = styled.p`
    color: ${colors.text_light};
    font-size: ${fontSize.mobileSubTitle};
    text-align: center;
    background-color: ${colors.secondary};
    padding: 20px;
`

const FlexLinks = styled.div`
        margin-left: auto;
        margin-right: auto; 
        ${mediaMax[2]} {
            width: 171px;
        }
        ${mediaMax[1]} {
            width: 121px;
        }
`

const ExternalLink = styled.a`
    color: ${colors.text_light};
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`

const FooterButton = styled.a`
background-color: ${colors.primary};
color: ${colors.text_blue};
font-weight: 700;
font-size: ${fontSize.mobileButton};
width: 121px;
height: 41px;
padding: 10px 8px;
text-align: center;
border-radius: ${radius.medium};
margin-left: auto;
margin-right: auto;
cursor: pointer;
transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${colors.secondary};
        color: ${colors.text_light};
        border: 1px solid ${colors.primary};
        transition: all 0.3s ease-in-out;
    }
`


const Footer = () => {
    const { id } = useParams();
    const { currentUserName } = useContext(UserContext);
    const { currentUserID } = useContext(UserContext);

    const handleClick = (e) => {
        if (!currentUserName || !id) {
            e.preventDefault(); 
            window.location.href = '/';
        } else {
            scrollToTop();
        }
    };

    return (
        <>
        <Flex>
            <div>
            <FooterTitle>NOUS SUIVRE</FooterTitle>
            <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', gap: '20px'}}>
            <a href='https://www.linkedin.com/company/com-y-media/' target='blank'>   
            <FooterIcon src={linkedin} />
            </a>
            <a href='https://www.instagram.com/coachymedia/' target='blank'> 
            <FooterIcon src={instagram} />
            </a>
            <a href='https://www.facebook.com/coachymedia/' target='blank'> 
            <FooterIcon src={facebook} />
            </a>
            </div>
            </div>
            <Link style={{ textDecoration: 'none' }} to={currentUserName && id ? `/user/${currentUserID}` : '/'} onClick={handleClick}>
            <Logo src={logo} />
        </Link>
            <div>
            <FooterTitle>LIENS UTILES</FooterTitle>
            <FlexLinks>
            <FooterButton style={{display: 'block', marginTop: '10px', textDecoration: 'none'}} href='https://coachymedia.fr/prendre-rdv/' target= '_blank'>PRENDRE RDV</FooterButton>
            <Link style={{ textDecoration: 'none' }} to={currentUserName && id ? `/userPage/${currentUserID}` : '/'} onClick={handleClick}>
            <FooterButton style={{display: 'block', marginTop: '10px'}}>ESPACE PERSO</FooterButton>
            </Link>
            </FlexLinks>
            </div>
        </Flex>
        <Copyright>Coach y Média © 2023 - Tous droits réservés - 
            <ExternalLink href="https://coachymedia.fr/mention-legales/" target= '_blank'>Mentions légales</ExternalLink> - 
            <ExternalLink href="https://coachymedia.fr/politique-de-confidentialite/" target= '_blank'> Politique de confidentialité</ExternalLink> - 
            <ExternalLink href="https://coachymedia.fr/cgv/" target= '_blank'> Conditions Générales de Vente</ExternalLink>
        </Copyright>
        </>
    );
}

export default Footer