import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { UserContext } from '../../App';
import { scrollToTop, colors } from '../../utils/utils';
import { getUsers } from '../../API/users';
import { getResults, createResults, updateResult, deleteResult } from '../../API/users';
import { GetModules } from '../../API/modules';
import { Container } from '../SingleStart';
import { DivTitle } from '../QuizzPage';
import { HeroTitle } from '../../components/hero';
import { Label, Input, SubButton, ErrorMessage } from '../CreateModule';


const User = () => {
  const { setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const users = await getUsers();
  
    const authenticatedUser = users?.users?.find(user => user?.user_email === email);
  
    if (authenticatedUser) {
      // Utilisateur identifié avec succès
      setErrorMessage('');
  
      const userResults = await getResults(authenticatedUser.ID);
  
      if (userResults.length > 0) {
        // Des résultats existent pour l'utilisateur
        // Vérifier si tous les résultats des modules sont présents
  
        // Remplacez GetModules par votre appel à votre backend pour récupérer les données des modules
        const modulesData = await GetModules();
  
        // Extraire les id des modules
        const moduleIds = modulesData.map(module => module.id);
  
        const allModulesCompleted = moduleIds.every(moduleId =>
          userResults[0].results.some(result => result.id === moduleId)
        );
        // console.log(moduleIds);
        // console.log(userResults);
  
        if (allModulesCompleted) {
          console.log('Tous les résultats des modules sont présents');
          // Faites ce que vous devez faire lorsque tous les résultats des modules sont présents
        } else {
          console.log('Certains résultats des modules sont manquants');
          // Créer les résultats manquants
          const missingResults = moduleIds.filter(moduleId => !userResults[0].results.some(result => result.id === moduleId));
  
          if (missingResults.length > 0) {
            for (let i = 0; i < missingResults.length; i++) {
              const missingResultId = missingResults[i];
              const updatedResult = await updateResult(authenticatedUser.ID, missingResults);
              console.log(authenticatedUser.ID, missingResultId);
              console.log('Résultat manquant mis à jour pour le module', missingResultId, ':', updatedResult);
              // Faites ce que vous devez faire avec les résultats manquants mis à jour
            }
          } else {
            console.log('Tous les modules sont présents');
          }
        }
  
        // Supprimer les résultats qui ne correspondent pas aux modules actuels
        const resultsToDelete = userResults[0].results.filter(result => !moduleIds.includes(result.id));
        if (resultsToDelete.length > 0) {
          // Remplacez deleteResult par votre appel à votre backend pour supprimer les résultats
          await Promise.all(resultsToDelete.map(result => deleteResult(authenticatedUser.ID, result.id)));
          console.log('Résultats en trop supprimés:', resultsToDelete);
        }
      } else {
        // Pas de résultats pour l'utilisateur
        // Créer un nouveau résultat
        const newResult = await createResults(authenticatedUser.ID);
        console.log('Nouveau résultat créé:', newResult);
      }
  
      setCurrentUser(authenticatedUser.ID, authenticatedUser.display_name, authenticatedUser.user_email, authenticatedUser.user_status);
      localStorage.setItem('currentUserID', authenticatedUser.ID);
      navigate(`/user/${authenticatedUser.ID}`);
      scrollToTop();
  

    } else {
      // Identifiants invalides
      setErrorMessage('Adresse e-mail incorrect');
    }
  }; 


  return (
    <div className="App">
      <Header />
      <Hero />
      <BackgroundContent>
      <Container>
      <DivTitle>
      <HeroTitle style={{ color: colors.primary, paddingTop: '0px' }}>Connexion</HeroTitle>
      <h2 style={{ color: colors.primary, paddingTop: '0px' }}>Pour commencer connectez-vous sur le site Coach y Media</h2>
          <form onSubmit={handleFormSubmit}>
            <div>
              <Label style={{ color: `${colors.text_light}`, justifyContent: 'center'}} htmlFor="email">Adresse e-mail :</Label>
              <Input type="email" id="email" value={email} onChange={handleEmailChange} required/>
            </div>
            <SubButton style={{ marginTop: '40px', display: 'inline-block', }} type="submit">Se connecter</SubButton>
            {errorMessage && <ErrorMessage  style={{ color: 'red', marginTop: '20px'}}>{errorMessage}</ErrorMessage>}
          </form>       
        </DivTitle>
        </Container>
      </BackgroundContent>
      <Footer />
    </div>
  );
};

export default User;