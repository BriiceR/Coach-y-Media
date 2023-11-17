import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { BlueButton, Container } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import { colors, radius, fontSize, mediaMax } from '../../utils/utils';
import React, { useState, useEffect } from 'react';
import { createModule, GetModules } from '../../API/modules';
import { DivTitle } from '../QuizzPage';


export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${colors.text_light};
`

export const Label = styled.label`
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: ${fontSize.button};
    margin-bottom: 20px;
`

export const Input = styled.input`
    width: 500px;
    height: 40px;
    font-size: 16px;
`

export const TextArea = styled.textarea`
    width: 500px;
    height: 200px;
    font-size: 16px;
    font-family: 'Poppins', sans-serif;
` 

export const SubButton = styled.button`
    background-color: ${colors.primary};
    color: ${colors.text_blue};
    font-weight: 700;
    font-size: ${fontSize.button};
    padding: 12px 26px;
    border-radius: ${radius.large};
    cursor: pointer;
    text-align: center;
    border: 1px solid ${colors.secondary};
    margin-top: 20px;
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
`

export const ErrorMessage = styled.p`
color: red;
font-size: ${fontSize.button};
margin-bottom: 20px;
`

const CreateModule = () => {
    const currentUserID = localStorage.getItem('currentUserID');
    const navigate = useNavigate();
    const [moduleNumbers, setModuleNumbers] = useState([]);
    const [isModuleNumberExists, setIsModuleNumberExists] = useState(false);

    const [formData, setFormData] = useState({
      id: '',
      module_img: '',
      title: '',
      description: '',
      welcome: '',
      subtitle: '',
      presentation_gen: '',
      presentation_spe: '',
    });
    
  
    useEffect(() => {
      const fetchModuleNumbers = async () => {
        try {
          const modules = await GetModules();
          // console.log('All modules:', modules);
          const numbers = modules.map((module) => module.id);
          setModuleNumbers(numbers);
        } catch (error) {
          console.error('Erreur lors de la récupération des numéros de module :', error);
        }
      };
  
      fetchModuleNumbers();
    }, []);

    const handleChange = async (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    
      if (name === 'title') {
        if (value === "reset") {
          setFormData({
            id: '',
            module_img: '',
            title: '',
            description: '',
            welcome: '',
            subtitle: '',
            presentation_gen: '',
            presentation_spe: '',
      });
    } else {
      const selectedModule = modules.find((module) => module.id === value);
        if (selectedModule) {
          setFormData({
            id: selectedModule.id,
            module_img: selectedModule.module_img,
            title: selectedModule.title,
            description: selectedModule.description,
            welcome: selectedModule.welcome,
            subtitle: selectedModule.subtitle,
            presentation_gen: selectedModule.presentation_gen,
            presentation_spe: selectedModule.presentation_spe,
          });
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();  
      const existingModule = moduleNumbers.includes(formData.id);
      if (existingModule) {
        console.log('Le numéro de module existe déjà. Veuillez choisir un autre numéro.');
        setIsModuleNumberExists(true);
        return;
      }    
      try {
        // Appeler votre fonction API pour créer un module avec les données du formulaire
        await createModule(formData);   
        // Réinitialiser les champs du formulaire après la soumission
        setFormData({
          id: '',
          module_img: '',
          title: '',
          description: '',
          welcome: '',
          subtitle: '',
          presentation_gen: '',
          presentation_spe: '',
        });
      navigate(`/user/${currentUserID}`);
      scrollToTop();
      } catch (error) {
          console.error('Error updating results:', error);
        }
      };
      

const [modules, setModules] = useState([]);

const fetchModules = () => {
  GetModules()
    .then((modulesData) => {
      setModules(modulesData);
    })
    .catch((error) => {
      console.error('Erreur lors de la récupération des modules:', error);
    });
};

useEffect(() => {
  fetchModules();
}, []);


  
    return (
      <div className="App">
        <Header />
        <Hero stepTitle="CRÉATION DE MODULE" stepText="" />
        <BackgroundContent>
          <Container style={{ paddingTop: '180px' }}>
            <DivTitle>
            {isModuleNumberExists && (
        <ErrorMessage>Le numéro du module existe déjà. Veuillez choisir un autre numéro.</ErrorMessage>
              )} 
              <Label style={{ color: `${colors.text_light}`}}>
                Dupliquer un module:
                <select style={{ width: '500px'}} name="title" value={formData.title} onChange={handleChange}>
                  <option value="">Sélectionnez un module</option>
                  <option value="reset">Reset</option>
                    {modules.map((module) => (
                  <option key={module.id} value={module.id}>
                    {module.title}
                  </option>
                  ))}
                </select>
              </Label>
              <Form onSubmit={handleSubmit}>
                <Label>
                  Numero du module:
                  <Input type="text" name="id" value={formData.id} onChange={handleChange} required/>
                </Label>
                <Label>
                  Image du module:
                  <Input type="text" name="module_img" value={formData.module_img} onChange={handleChange} required/>
                </Label>
                <Label>
                  Titre du module:
                  <Input type="text" name="title" value={formData.title} onChange={handleChange} required/>
                </Label>
                <Label>
                  Description du module:
                  <TextArea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                  />
                </Label>
                <Label>
                  Message de bienvenue:
                  <TextArea name="welcome" value={formData.welcome} onChange={handleChange} required/>
                </Label>
                <Label>
                  Sous-titre:
                  <Input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} required/>
                </Label>
                <Label>
                  Présentation générale:
                  <TextArea
                    name="presentation_gen"
                    value={formData.presentation_gen}
                    onChange={handleChange}
                    required
                  />
                </Label>
                <Label>
                  Présentation spécifique:
                  <TextArea
                    name="presentation_spe"
                    value={formData.presentation_spe}
                    onChange={handleChange}
                  />
                </Label>
                <SubButton type="submit">VALIDER</SubButton>
              </Form>
              {isModuleNumberExists && (
        <ErrorMessage style={{ marginTop: '20px'}}>Le numéro du module existe déjà. Veuillez choisir un autre numéro. {}</ErrorMessage>
      )}
            </DivTitle>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Link style={{ textDecoration: 'none' }} to={`/user/${currentUserID}`} onClick={scrollToTop}>
                <BlueButton>PRÉCÉDENT</BlueButton>
              </Link>
            </div>
          </Container>
        </BackgroundContent>
        <Footer />
      </div>
    );
  };
  
  export default CreateModule;