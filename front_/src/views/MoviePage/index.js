import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { BlueButton, Container, SingleSubtitle, SinglePres } from '../SingleStart';
import { scrollToTop, mediaMax } from '../../utils/utils';
import React, { useState, useEffect } from 'react';
import { GetModules } from '../../API/modules';

export const MoviePlayer = styled.iframe`
    width: 100%;
    height: 600px;
    ${mediaMax[3]} {
        height: 500px;
    }
    ${mediaMax[2]} {
        height: 300px;
    }
    ${mediaMax[1]} {
        height: 200px;
    }
`

const MoviePage = () => {
    const { id, stepId } = useParams();
    const [modules, setModules] = useState([]);

    const module = modules.find((module) => module.id === id);
    // console.log(module);
    const step = module?.steps.find((step) => step.id === stepId);
    // console.log(module.steps)
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



    return (
        <div className="App">
        <Header />
        <Hero stepTitle={step?.title} stepText={step?.subtitle}/>
        <BackgroundContent>
            <Container>
            <SingleSubtitle style={{ textAlign: 'center', marginTop: '-10px', marginBottom: '40px' }}>ÉTAPE {stepId} sur {module?.steps?.length}</SingleSubtitle>
            <MoviePlayer src={step?.movie_link}/>
            <SingleSubtitle style={{ textAlign: 'center' }}>{step?.movie_quote}</SingleSubtitle>
            <SinglePres>{step?.movie_text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>))}</SinglePres>
            <ul>
            {step?.important.map((item) => (
                <SinglePres style={{ marginLeft: '50px', marginTop: '40px' }}>
                <li key={item}>{item}</li>
                </SinglePres>
            ))}
            </ul>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link style={{ textDecoration: 'none', marginRight: '20px' }} to={`/singleStart/${id}`} onClick={scrollToTop}>
            <BlueButton>PRÉCÉDENT</BlueButton>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={`/docPage/${id}/${stepId}`} onClick={scrollToTop}>
            <BlueButton>SUIVANT</BlueButton>
            </Link>
            </div>
            </Container>
        </BackgroundContent>
        <Footer />
        </div>
    );
}

export default MoviePage;
