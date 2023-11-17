import styled from '@emotion/styled';
import '../../index.css';
import { colors, radius, fontSize, mediaMax, mediaMin } from '../../utils/utils';
import backgrounImg from '../../assets/ybackground.png';
import React from 'react';


const CardUnit = styled.div`
    background-color: ${colors.primary};
    width: 60em;
    height: 37em;
    border-radius: ${radius.small};
    padding: 30px;
    box-shadow: 40px -40px 0px 5px ${colors.secondary}, 0px 8px 30px 4px rgba(117, 142, 254, 0.40);
    transition: all 0.3s ease-in-out;
    &:hover {
        scale: 1.02;
        transition: all 0.3s ease-in-out;
    }
    ${mediaMax[3]} {
        width: 47em;
        height: 30em;
        box-shadow: 20px -20px 0px 5px ${colors.secondary}, 0px 8px 30px 4px rgba(117, 142, 254, 0.40);
    }
    ${mediaMax[0]} {
        padding: 10px;
        width: 28em;
        height: 18em;
    }
`

const CardTitle = styled.h2`
    color: ${colors.text_blue};
    font-size: ${fontSize.title};
    text-align: center;
    ${mediaMax[0]} {
        font-size: ${fontSize.mobileTitle};
    }
`

const CardImg = styled.img`
    width: 20%;
    margin-right: 40px;
`

const CardText = styled.p`
    color: ${colors.text_light_blue};
    font-size: ${fontSize.subTitle};
    ${mediaMax[0]} {
        font-size: ${fontSize.mobileSubTitle};
    }
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    ${mediaMax[0]} {
        margin-top: 0px;
    }
`

export const ScoreUnit = styled.div`
    width: 40px;
    height: 20px;
    background-color: ${({ isTrue }) => (isTrue ? 'green' : 'gray')};
    border-radius: ${radius.small};
    ${mediaMin[3]} {
        width: 60px;
    }
    ${mediaMax[0]} {
        width: 20px;
        height: 10px;
    }
`
export const Scores = styled.div`
    display: flex;
    margin-top: 20px;
    margin-left: 100px;
    justify-content: space-around;
    ${mediaMax[0]} {
        margin-top: 20px;
        margin-left: 60px;
    }
`
export const FlexContent = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 200px;
    justify-content: center;
    padding: 160px 40px 100px 40px;
    ${mediaMax[2]} {
        gap: 140px;
    }
    ${mediaMax[0]} {
        gap: 100px;
    }
`

const Card = ({ title, text }) => {
    return (
            <CardUnit style={{ position: 'relative' }} >
                <CardTitle>{title}</CardTitle>
                <Flex>
                <CardImg src={backgrounImg}/>
                <CardText>{text}</CardText>              
                </Flex>
            </CardUnit>
    );
}

export default Card