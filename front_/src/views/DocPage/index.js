import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams } from 'react-router-dom';
import { BlueButton, Container, SinglePres, SingleSubtitle } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import { MoviePlayer } from '../../views/MoviePage';
import React, { useState, useEffect } from 'react';
import { GetModules } from '../../API/modules';

const DocPage = () => {
    const { id, stepId } = useParams();
    const [modules, setModules] = useState([]);
    
    const module = modules.find((module) => module.id === id);
    // console.log(module);
    const step = module?.steps.find((step) => step.id === stepId);

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
            <SinglePres>{step?.doc_text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>))}</SinglePres>
            <ul>
            {step?.doc_list.map((item) => (
                <SinglePres style={{ marginLeft: '50px', marginTop: '40px' }}>
                <li key={item}>{item.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>))}</li>
                </SinglePres>
            ))}
            </ul>
            <MoviePlayer src={step?.doc_link} style={{ marginTop: '60px' }}/>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link style={{ textDecoration: 'none', marginRight: '20px' }} to={`/moviePage/${module?.id}/${step?.id}`} onClick={scrollToTop}>
            <BlueButton>PRÉCÉDENT</BlueButton>
            </Link>
            <Link style={{ textDecoration: 'none' }} to={`/quizzPage/${id}/${stepId}`} onClick={scrollToTop}>
            <BlueButton>SUIVANT</BlueButton>
            </Link>
            </div>
            </Container>
        </BackgroundContent>
        <Footer />
        </div>
    );
}

export default DocPage;
