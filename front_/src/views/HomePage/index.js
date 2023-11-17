import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/utils';
import { UserContext } from '../../App';

import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Card from '../../components/card';
import Footer from '../../components/footer';
import '../../App.css';
import { FlexContent } from '../../components/card';
import { GetModules } from '../../API/modules';
import { BlueButton} from '../SingleStart';
import { getResults, getPaid } from '../../API/users';
import { useNavigate } from 'react-router-dom';



const HomePage = () => {
  const navigate = useNavigate();
  const currentUserID = localStorage.getItem('currentUserID');
  const { currentUserRole, isLoggedIn } = useContext(UserContext);
  const [modules, setModules] = useState([]);
  const [paid, setPaid] = useState([]);

// console.log(isLoggedIn)

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
        {isLoggedIn ? (
        <FlexContent>
          {modules?.map((module) => {
            // Trouver l'objet correspondant dans le tableau paid en utilisant l'id
            const isPaid = paid.includes(module.id);

            if (isPaid) {
              // Module payé : afficher la carte normalement
              return (
                <Link
                  style={{ textDecoration: 'none' }}
                  key={module.id}
                  to={`/singleStart/${module.id}`}
                  onClick={scrollToTop}
                >
                  <Card title={module.title} text={module.description} isPaid={isPaid} />
                </Link>
              );
            } else {
              // Module non payé : afficher la carte avec le style désactivé
              return (
                <div key={module.id} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                  <Card title={module.title} text={module.description} isPaid={isPaid} />
                </div>
              );
            }
          })}
        </FlexContent>
        ) : (
          navigate('/')
        )}
      </BackgroundContent>
      {currentUserRole === 1 && 
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <Link style={{ textDecoration: 'none'}} to={`/createModule/${currentUserID}`} onClick={scrollToTop}>
            <BlueButton style={{ marginTop: '0px'}}>AJOUTER</BlueButton>
          </Link>
        </div>
      }
      <Footer />
    </div>
  );
};

export default HomePage;
