import styled from '@emotion/styled';
import '../../index.css';
import logo from '../../assets/logoBlanc.png';
import userIcon from '../../assets/user.svg';
import { colors, radius, fontSize, mediaMax, mediaMin } from '../../utils/utils';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import React, { useContext } from 'react';
import { scrollToTop } from '../../utils/utils';

const Head = styled.header`
    background-color: ${colors.dark};
    with: auto;
    padding: 20px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: sticky;
    top: 0;
    z-index: 1;
    &:scrolled {
        display: none;
    }
    
    ${mediaMax[2]} {
        padding:  16px 16px 10px 16px;
    }
`

const Logo = styled.img`
        max-width: 262px;
        height: 50px;
        cursor: pointer;
        transition: all 0.3s ease-in-out;
    &:hover {
        scale: 1.1;
        transition: all 0.3s ease-in-out;
    }
    ${mediaMax[2]} {
        max-width: 180px;
        height: auto;
    }
`

const RightPart = styled.div({
    display: 'flex',
    alignItems: 'center',
})

const BottomPart = styled.div({
    display: 'flex',
})

export const WitheButton = styled.a`
    background-color: ${colors.primary};
    color: ${colors.text_blue};
    font-weight: 700;
    font-size: ${fontSize.button};
    padding: 12px 26px;
    border-radius: ${radius.large};
    cursor: pointer;
    text-align: center;
    border: 1px solid ${colors.secondary};
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${colors.secondary};
        color: ${colors.text_light};
        border: 1px solid ${colors.primary};
        transition: all 0.3s ease-in-out;
    }
    
    ${mediaMax[2]} {
        font-size: ${fontSize.mobileButton};
        width: 121px;
        height: autopx;
        padding: 10px 8px;
        text-align: center;
    }
    ${mediaMax[0]} {
        display: none;
    }
`

export const WitheButtonMobile = styled.a`
    ${mediaMin[0]} {
        display: none;
    }
    ${mediaMax[0]} {
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
    }
`

const UserIcon = styled.img`
    max-width: 45px;
    height: auto;
    cursor: pointer;
    margin-left: 50px;
    transition: all 0.3s ease-in-out;
    &:hover {
        scale: 1.2;
        transition: all 0.3s ease-in-out;
    }
    ${mediaMax[2]} {
        max-width: 30px;
        margin-left: 30px;
    }
    ${mediaMax[0]} {
        max-width: 30px;
        margin-left: 0px;
    }
`

const WelcomeText = styled.h2`
font-size: ${fontSize.mobileTitle};
font-weight: 700;
color: ${colors.tertiary};
margin-top: 100px;
${mediaMax[2]} {
    font-size: ${fontSize.mobileSubTitle};
    margin-top: 60px;
}
`

const Header = () => {
    const { currentUserName } = useContext(UserContext);
    const { id } = useParams();
    const { currentUserID } = useContext(UserContext);
    const { currentUserRole } = useContext(UserContext);


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
            <Head>
                <Link style={{ textDecoration: 'none' }} to={currentUserName && id ? `/user/${currentUserID}` : '/'} onClick={handleClick}>
                    <Logo src={logo} />
                </Link>
                <WelcomeText style={{ color: colors.text_light, margin: 0, backgroundColor: colors.dark, textAlign: 'center' }}>{currentUserName ? `Bienvenue ${currentUserName}` : ""} { currentUserRole === 1 ? "(ADMIN)" : ""}</WelcomeText>
                <RightPart>
                    <WitheButton style={{ marginTop: '10px', textDecoration: 'none'}} href='https://coachymedia.fr/prendre-rdv/' target= '_blank'>PRENDRE RDV</WitheButton>
                    <Link style={{ textDecoration: 'none' }} to={currentUserName && id ? `/userPage/${currentUserID}` : '/'} onClick={handleClick}>
                        <UserIcon src={userIcon} />
                    </Link>
                </RightPart>
            </Head>

            <BottomPart>
                <WitheButtonMobile style={{ marginTop: '0px', textDecoration: 'none'}} href='https://coachymedia.fr/prendre-rdv/' target= '_blank'>PRENDRE RDV</WitheButtonMobile>
            </BottomPart>
        </>
    );
}

export default Header;
