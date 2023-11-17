import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { BlueButton, Container, SingleSubtitle, SinglePres } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import { DivTitle } from '../QuizzPage';
import { HeroTitle } from '../../components/hero';
import { colors, radius, fontSize, mediaMax } from '../../utils/utils';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import { WitheButton } from '../../components/header/index';
import { ScoreUnit, Scores } from '../../components/card';
import { GetModules } from '../../API/modules';
import { getResults, getPaid } from '../../API/users';


const Line = styled.div`
    width: 2px;
    height: auto;
    background-color: ${colors.primary};
    margin: 0 auto;
    ${mediaMax[2]} {
        height: 2px;
        width: auto;
        margin-top: 20px;
    }
`

const Module = styled.div`
width: 100%;
height: auto;
background-color: ${colors.primary};
border-radius: ${radius.small};
text-align: start;
padding: 8px;
margin-top: 20px;
transition: all 0.3s ease-in-out;
&:hover {
    scale: 1.03;
    transition: all 0.3s ease-in-out;
}
`

const UserDiv = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 2fr;
    ${mediaMax[2]} {
        display: inherit;
    }
`

const UserPage = () => {
    const { id } = useParams();
  const { setCurrentUser, currentUserName, currentUserEmail, currentUserID, moduleResults } = useContext(UserContext);
    const [paid, setPaid] = useState([]);
    const [modules, setModules] = useState([]);

    // console.log(currentUserID)
    // console.log( moduleResults[0].isValidModule);

    const handleLogout = () => {
        // Réinitialiser les informations de l'utilisateur en appelant setCurrentUser avec des valeurs null ou vides
        setCurrentUser(null, null, null, null, null);
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserID'); // Supprimez l'ID de l'utilisateur du localStorage
    
        // Rediriger l'utilisateur vers la page de connexion ou une autre page appropriée
        // Remplacez `/login` par l'URL de la page de connexion
        window.location.href = '/';
    };

    

    useEffect(() => {
      const fetchModules = async () => {
        try {
          const data = await GetModules();
          console.log(data);
          setModules(data);
    
          const results = await getResults(currentUserID);
          console.log(results[0].results);
          setPaid(results[0].results);
    
          const userId = currentUserID;
            const paidModulesResponse = await getPaid(userId);
            if (paidModulesResponse?.modules && Array.isArray(paidModulesResponse.modules)) {
                const moduleIds = paidModulesResponse.modules.map(item => item.module_id);
                setPaid(moduleIds);
            } else {
                console.error('Invalid or missing paid modules data:', paidModulesResponse);
            }
            
            // ...
        } catch (error) {
            console.log('Error fetching modules:', error);
        }
    };
    
      fetchModules();
    }, [currentUserID]);
  


    return (
        <div className="App">
        <Header />
        <Hero />
        <BackgroundContent>
            <Container>
            <DivTitle>
                <HeroTitle style={{ color: colors.text_light, paddingTop: '20px' }}>VOTRE ESPACE</HeroTitle>
                <UserDiv>
                <div>
                <HeroTitle style={{ color: colors.text_light, paddingTop: '20px' }}>VOUS</HeroTitle>
                <SingleSubtitle style={{ color: colors.text_light, marginTop: '40px' }}>Adresse e-mail : </SingleSubtitle>
                <SinglePres style={{ color: colors.text_light, marginTop: '10px' }}>{currentUserEmail}</SinglePres>
                <SingleSubtitle style={{ color: colors.text_light, marginTop: '40px'  }}>Nom d'utilisateur : </SingleSubtitle>
                <SinglePres style={{ color: colors.text_light, marginTop: '10px' }}>{currentUserName}</SinglePres>
                </div>
                <Line />
                <div>
                <HeroTitle style={{ color: colors.text_light, paddingTop: '20px' }}>VOS MODULES</HeroTitle>
                
                {modules.map((module, index) => {
  const moduleResult = moduleResults[0].results.find((result) => result.id === module.id);
  const isValidModule = moduleResult ? moduleResult.isValidModule : [];
                  // console.log(moduleResults);
                  const isPaid = paid.includes(module.id);

  if (isPaid) {
    return (
      <Link
        style={{ textDecoration: 'none' }}
        key={module.id}
        to={`/singleStart/${module.id}`}
        onClick={scrollToTop}
      >
        <Module key={module.id}>
          <SingleSubtitle style={{ marginTop: '0px', fontSize: `${fontSize.subTitle}` }}>
            {module.title}
          </SingleSubtitle>
          <Scores style={{ marginLeft: '0', justifyContent: 'flex-start'  }}>
            {isValidModule.map((isTrue, index) => (
              <ScoreUnit style={{ marginRight: '10px'}} key={index} isTrue={isTrue} />
            ))}
          </Scores>
        </Module>
      </Link>
    );
  }

  return null;
})}

                
                
                </div>
                </UserDiv>
                <WitheButton style={{ display: 'inline-block', marginTop: '40px'}} onClick={handleLogout}>Déconnexion</WitheButton>
            </DivTitle>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link style={{ textDecoration: 'none', marginRight: '0px' }} to={`/user/${id}`} onClick={scrollToTop}>
            <BlueButton>PRÉCÉDENT</BlueButton>
            </Link>
            </div>
            </Container>
            
        </BackgroundContent>
        <Footer />
        </div>
    );
}

export default UserPage;
