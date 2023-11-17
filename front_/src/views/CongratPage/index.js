import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { BlueButton, Container } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import { colors, radius, fontSize, mediaMax} from '../../utils/utils';
import React, { useState, useEffect } from 'react';
import { GetModules } from '../../API/modules';


const DivCongrat = styled.div`
    
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    width: 80%;
    height: 600px;
    margin-left: auto;
    margin-right: auto;
    border-radius: ${radius.small};
    box-shadow: 40px -40px 0px 5px ${colors.secondary}, 0px 8px 30px 4px rgba(117, 142, 254, 0.40);
`
const TextCongrat = styled.p`
    color: ${colors.primary};
    font-size: ${fontSize.title};
    margin-left: 100px;
    padding-top: 100px;
    ${mediaMax[2]} {
        font-size: ${fontSize.mobileTitle};
        margin-left: 60px;
    }
    ${mediaMax[1]} {
        margin-left: 20px;
    }
`

const CongratPage = () => {
    const { id, stepId } = useParams();
    const [modules, setModules] = useState([]);
    

    useEffect(() => {
    const fetchModules = async () => {
        try {
        const data = await GetModules();
        setModules(data);
        } catch (error) {
        console.log('Error fetching modules:', error);
        }
    };

    fetchModules();
    }, []);

    const module = modules.find((module) => module.id === id);

    const step = module?.steps.find((step) => step.id === stepId);

    const stepIds = module?.steps.map((step) => parseInt(step.id));
    const currentIndex = stepIds?.indexOf(parseInt(stepId));

    const isLastStep = currentIndex === stepIds?.length - 1;

    // console.log(currentIndex);

    return (
        <div className="App">
        <Header />
        <Hero stepTitle={step?.title} stepText={step?.subtitle}/>
        <BackgroundContent>
            <Container style={{ paddingTop: '180px' }}>
            
            <DivCongrat style={{ backgroundImage: `url(${step?.congrat_img})`}}>
                <TextCongrat>FÉLICITATIONS !</TextCongrat>
            </DivCongrat>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link style={{ textDecoration: 'none', marginRight: '20px' }} to={`/quizzPage/${module?.id}/${step?.id}`} onClick={scrollToTop}>
            <BlueButton>PRÉCÉDENT</BlueButton>
            </Link>
            {isLastStep ? (
    <Link onClick={scrollToTop} style={{ textDecoration: 'none' }} to={`/singleStart/${module?.id}`}><BlueButton>MODULE</BlueButton></Link>
    ) : (
        <Link onClick={scrollToTop} style={{ textDecoration: 'none' }} to={stepIds && stepIds[currentIndex + 1] ? `/moviePage/${module?.id}/${stepIds[currentIndex + 1]}` : '#'}><BlueButton>SUIVANT</BlueButton></Link>
    )}
            </div>
            </Container>
        </BackgroundContent>
        <Footer />
        </div>
    );
}

export default CongratPage;
