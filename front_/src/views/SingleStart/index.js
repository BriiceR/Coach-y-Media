import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors, radius, fontSize, mediaMax } from '../../utils/utils';
import { UserContext } from '../../App';
import React, { useContext, useState, useEffect } from 'react';
import { scrollToTop } from '../../utils/utils';
import { ScoreUnit, Scores } from '../../components/card';
import { GetModules, deleteModule, deleteStep } from '../../API/modules';
import { getUsersWithValidModule } from '../../API/users';
import Modal from 'react-modal';
import { Input } from '../CreateModule/index';


export const Container = styled.div`
padding: 120px 120px 100px;
${mediaMax[3]} {
  padding: 120px 220px 100px;
}
${mediaMax[1]} {
  padding: 70px 80px 100px;
}
${mediaMax[0]} {
  padding: 70px 40px 100px;
}
`

const SingleImg = styled.img`
max-width: 400px;
height: auto;
box-shadow: 20px -20px 0px 5px ${colors.secondary}, 0px 8px 30px 4px rgba(117, 142, 254, 0.40);
border-radius: ${radius.small};
${mediaMax[3]} {
  max-width: 350px;
  max-height: 800px;
  margin: 0 auto;
}
${mediaMax[1]} {
  max-width: 200px;
  box-shadow: 20px -20px 0px 5px ${colors.secondary}
}
`

const SingleText = styled.div`
  margin-left: 120px;
${mediaMax[2]} {
  margin-left: 0;
}
`

const SingleFlex = styled.div`
display: flex;
margin-top: 80px;
${mediaMax[2]} {
  flex-direction: column;
}
`

const SingleTitle = styled.h1`
font-size: ${fontSize.title};
font-weight: 700;
color: ${colors.tertiary};
margin-top: 0px;
${mediaMax[1]} {
  font-size: ${fontSize.mobileTitle};
  margin-top: 60px;
}
`

export const SingleSubtitle = styled.h2`
font-size: ${fontSize.mobileTitle};
font-weight: 700;
color: ${colors.tertiary};
margin-top: 60px;
${mediaMax[1]} {
  font-size: ${fontSize.mobileSubTitle};
  margin-top: 60px;
}
`

export const SinglePres = styled.p`
font-size: ${fontSize.button};
color: ${colors.text_dark};
font-weight: 400;
margin-top: 60px;
${mediaMax[1]} {
  font-size: ${fontSize.mobileButton};
  margin-top: 60px;
}
`

export const BlueButton = styled.a`
    background-color: ${colors.secondary};
    color: ${colors.text_light};
    font-weight: 700;
    font-size: ${fontSize.button};
    padding: 12px 26px;
    border-radius: ${radius.large};
    cursor: pointer;
    text-align: center;
    display: block;
    margin: 0 auto;
    margin-top: 100px;
    width: 171px;
    height: auto;
    border: 1px solid ${colors.secondary};
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${colors.primary};
        color: ${colors.text_blue};
        transition: all 0.3s ease-in-out;
        border: 1px solid ${colors.secondary};
    }
    ${mediaMax[2]} {
        width: 171px;
        height: auto;
        padding: 10px 8px;
        text-align: center;
    }
    ${mediaMax[1]} {
        font-size: ${fontSize.mobileButton};
        width: 121px;
        height: auto;
        padding: 10px 8px;
        text-align: center;
        margin-top: 60px;
    }
`

const AdminButton = styled.a`
background-color: ${colors.secondary};
color: ${colors.text_light};
font-weight: 700;
font-size: ${fontSize.mobileButton};
padding: 0px;
border-radius: ${radius.large};
cursor: pointer;
text-align: center;
display: block;
margin: 0 auto;
margin-top: 0px;
width: 81px;
height: auto;
border: 1px solid ${colors.secondary};
transition: all 0.3s ease-in-out;
&:hover {
    background-color: ${colors.primary};
    color: ${colors.text_blue};
    transition: all 0.3s ease-in-out;
    border: 1px solid ${colors.secondary};
}
`

const SingleFlexIcon = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 100px;
  ${mediaMax[1]} {
    flex-direction: column;
  }
  
`

const SingleIcon = styled.img`
    margin-top: 20px;
    width: 100px;
    height: auto;
`

const SingleDiv = styled.div`
    text-align: center;
    transition: all 0.3s ease-in-out;
&:hover {
    scale: 1.1;
    transition: all 0.3s ease-in-out;
}
`

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 252, 255, 0.5)',
  },
  content: {
    backgroundColor: `${colors.secondary}`,
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: 'white',
    height: '400px',
    marginTop: '100px',
    width: '900px',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontFamily: 'Poppins'
  },
};

const ModalButton = styled.button`
background-color: ${colors.primary};
color: ${colors.text_blue};
font-weight: 700;
font-size: ${fontSize.mobileSubTitle};
width: 121px;
height: 41px;
padding: 10px 8px;
text-align: center;
border-radius: ${radius.medium};
margin-left: auto;
margin-right: auto;
cursor: pointer;
border: 1px solid ${colors.secondary};
transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${colors.secondary};
        color: ${colors.text_light};
        border: 1px solid ${colors.primary};
        transition: all 0.3s ease-in-out;
    }
`

const BlueButtonAdmin = styled.button`
    background-color: ${colors.secondary};
    color: ${colors.text_light};
    font-weight: 700;
    font-size: ${fontSize.button};
    padding: 12px 26px;
    border-radius: ${radius.large};
    cursor: pointer;
    text-align: center;
    display: block;
    
    margin-top: 100px;
    width: 171px;
    height: 53px;
    border: 1px solid ${colors.secondary};
    transition: all 0.3s ease-in-out;
    &:hover {
        background-color: ${colors.primary};
        color: ${colors.text_blue};
        transition: all 0.3s ease-in-out;
        border: 1px solid ${colors.secondary};
    }
`


const SingleStart = () => {
  
  const { currentUserID } = useContext(UserContext);
  const { moduleResults } = useContext(UserContext);
  // admin
  const { currentUserRole } = useContext(UserContext);
  const [modules, setModules] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalStep, setShowModalStep] = useState(false);
  const navigate = useNavigate();
  const [confirmationText, setConfirmationText] = useState('');

  const { id } = useParams();
  const module = modules?.find((module) => module.id === id);
  console.log(module);

  
  // console.log(moduleResults);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const data = await GetModules();
        setModules(data);
        console.log(data);
      } catch (error) {
        console.log('Error fetching modules:', error);
      }
    };
    fetchModules();
  }, []);


  const closeModal = () => {
    setShowModal(false);
    setShowModalStep(false);
  };
  
  const handleDelete = async () => {
    // console.log(module._id);
    // console.log(module.id)
    if (confirmationText === 'supprimer') {
    try {
      await deleteModule(module?._id);
      closeModal();
      navigate(`/user/${currentUserID}`);
      scrollToTop();
    } catch (error) {
      console.log('Error deleting module:', error);
    }
  }
};

  const handleDeleteStep = async (stepId) => {
    console.log(stepId);
    if (confirmationText === 'supprimer') {
    try {
      await deleteStep(module?._id, stepId); // ok

      const usersWithValidModule = await getUsersWithValidModule(); // Récupérer tous les utilisateurs avec isValidModule

      // Parcourir les utilisateurs et mettre à jour isValidModule pour supprimer l'index correspondant à stepId - 1
      usersWithValidModule.forEach((user) => {
        const updatedIsValidModule = user.results.filter((item, index) => index !== stepId - 1);

        console.log(`Updated isValidModule for user ${user._id}:`, updatedIsValidModule);
      });
      closeModal();
      navigate(`/user/${module?._id}`);
      scrollToTop();
    } catch (error) {
      console.log('Error deleting step:', error);
    }
  }
};


  return (
    <div className="App">
      <Header />
      <Hero title={module?.title} text={module?.description} />
      <BackgroundContent>
        <Container>
          <SingleFlex>
            <SingleImg src={module?.module_img} />
            <SingleText>
              <SingleTitle>{module?.welcome}</SingleTitle>
              <SingleSubtitle>{module?.subtitle}</SingleSubtitle>
              <SinglePres style={{ textAlign: 'justify'}}>{module?.presentation_gen.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
      ))}</SinglePres>
            </SingleText>
          </SingleFlex>
          <SinglePres>{module?.presentation_spe.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>))}
                </SinglePres>
          <SingleFlexIcon>
          <React.Fragment>
  {module?.steps ? (
    module?.steps.map((step, index) => {
      const stepResult = moduleResults[0]?.results?.find((resultItem) => resultItem.id === id);
      const isValidModule = stepResult ? stepResult.isValidModule : [];
      const isTrue = isValidModule[index] || false;

      if (isTrue) {
      return (  
      
        <React.Fragment key={step.id}>
          <div>
          <Link
            style={{ textDecoration: 'none' }}
            to={`/moviePage/${module?.id}/${step.id}`}
            onClick={scrollToTop}
          >
            <SingleDiv style={{ textAlign: 'center', width: '160px', position: 'relative' }}>
              <SingleIcon src={step?.icon} />
              <SingleSubtitle style={{ marginTop: '0', fontSize: `${fontSize.mobileButton}` }}>
                {step.title}
              </SingleSubtitle>
              <Scores style={{ marginLeft: '0' }}>
                <ScoreUnit key={index} isTrue={isTrue} style={{ position: 'absolute', bottom: '0px' }} />
              </Scores>
            </SingleDiv>
            
          </Link>
          {currentUserRole === 1 && (
            <>
              <div style={{ marginTop: '10px' }}>
                <Link style={{ textDecoration: 'none' }} to={`/modifyStep/${module?._id}/${step?.id}`} onClick={scrollToTop}>
                <AdminButton>modifier</AdminButton>
                </Link>
                {/* <AdminButton2 style={{ marginTop: '5px' }} onClick={() => setShowModalStep(true)}>supprimer</AdminButton2> */}
              </div>
              
              <Modal
  style={customModalStyles}
  isOpen={showModalStep}
  onRequestClose={closeModal}
  contentLabel="Confirmation de suppression"
  ariaHideApp={false}
>
  <SingleTitle style={{ color: `${colors.primary}` }}>CONFIRMATION DE SUPPRESSION</SingleTitle>
  <SingleSubtitle style={{ color: 'red' }}>Êtes-vous sûr de vouloir SUPPRIMER cette étape DÉFINITIVEMENT ?</SingleSubtitle>
  <Input type="text" value={confirmationText} onChange={e => setConfirmationText(e.target.value)} placeholder="Tapez 'supprimer' ici" style={{ marginTop: '40px', border: 'solid 2px red' }}/>
  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '60px' }}>
    
    <ModalButton onClick={() => handleDeleteStep(step.id)} data-step-id={step.id}>SUPPRIMER</ModalButton>
    <ModalButton onClick={closeModal}>ANNULER</ModalButton>
  </div>
</Modal>
    </>
            )}
          </div>
        </React.Fragment>

      );
      } else if (index === 0 || isValidModule[index - 1]) {
      // Première étape ou étape précédente validée : afficher normalement avec un lien cliquable
      return (
        <Link
          style={{ textDecoration: 'none' }}
          to={`/moviePage/${module?.id}/${step.id}`}
          onClick={scrollToTop}
          key={step.id}
    >
      <SingleDiv style={{ textAlign: 'center', width: '160px', position: 'relative' }}>
              <SingleIcon src={step?.icon} />
              <SingleSubtitle style={{ marginTop: '0', fontSize: `${fontSize.mobileButton}` }}>
                {step.title}
              </SingleSubtitle>
              <Scores style={{ marginLeft: '0' }}>
                <ScoreUnit key={index} isTrue={isTrue} style={{ position: 'absolute', bottom: '0px' }} />
              </Scores>
            </SingleDiv>
            {currentUserRole === 1 && (
              <div style={{ marginTop: '10px' }}>
                <Link style={{ textDecoration: 'none' }} to={`/modifyStep/${module?._id}/${step?.id}`} onClick={scrollToTop}>
                <AdminButton>modifier</AdminButton>
                </Link>
                {/* <AdminButton style={{ marginTop: '5px' }} >supprimer</AdminButton> */}
              </div>
            )}
    </Link>
  );

    } else {
      return (
        <div key={step.id} style={{ opacity: 0.5, cursor: 'not-allowed' }}>
          <SingleDiv style={{ textAlign: 'center', width: '160px', position: 'relative' }}>
              <SingleIcon src={step?.icon} />
              <SingleSubtitle style={{ marginTop: '0', fontSize: `${fontSize.mobileButton}` }}>
                {step.title}
              </SingleSubtitle>
              <Scores style={{ marginLeft: '0' }}>
                <ScoreUnit key={index} isTrue={isTrue} style={{ position: 'absolute', bottom: '0px' }} />
              </Scores>
            </SingleDiv>
            {currentUserRole === 1 && (
              <div style={{ marginTop: '10px' }}>
                <Link style={{ textDecoration: 'none' }} to={`/modifyStep/${module?._id}/${step?.id}`} onClick={scrollToTop}>
                <AdminButton>modifier</AdminButton>
                </Link>
                {/* <AdminButton style={{ marginTop: '5px' }} >supprimer</AdminButton> */}
              </div>
            )}
        </div>
      )
    };
    })
  ) : (
    ""
  )}
</React.Fragment>
          </SingleFlexIcon>

         
          {currentUserRole === 1 && (
          <Link style={{ textDecoration: 'none' }} to={`/createStep/${module?._id}`} onClick={scrollToTop}>
            <BlueButton style={{ width: '40%' }}>Ajouter une étape</BlueButton>
          </Link>
          )}

          {currentUserRole === 1 && (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0px', gap: '20px' }}>
          <Link style={{ textDecoration: 'none' }} to={`/modifyModule/${module?._id}`} onClick={scrollToTop}>
            <BlueButton style={{ marginTop: '20px' }}>MODIFIER</BlueButton>
          </Link>
          <BlueButtonAdmin style={{ marginTop: '20px' }} onClick={() => setShowModal(true)}>SUPPRIMER</BlueButtonAdmin>
        </div>
          <Modal
  style={customModalStyles}
  isOpen={showModal}
  onRequestClose={closeModal}
  contentLabel="Confirmation de suppression"
  ariaHideApp={false}
>
  <SingleTitle style={{ color: `${colors.primary}` }}>CONFIRMATION DE SUPPRESSION</SingleTitle>
  <SingleSubtitle style={{ color: 'red' }}>Êtes-vous sûr de vouloir SUPPRIMER ce module DÉFINITIVEMENT ?</SingleSubtitle>
  <Input type="text" value={confirmationText} onChange={e => setConfirmationText(e.target.value)} placeholder="Tapez 'supprimer' ici" style={{ marginTop: '40px', border: 'solid 2px red', }} />
  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '60px' }}>
    
    <ModalButton onClick={handleDelete}>SUPPRIMER</ModalButton>
    <ModalButton onClick={closeModal}>ANNULER</ModalButton>
  </div>
</Modal>

          </>
)}
          <Link style={{ textDecoration: 'none' }} to={`/user/${currentUserID}`} onClick={scrollToTop}>
            <BlueButton>PRÉCÉDENT</BlueButton>
          </Link>
        </Container>
      </BackgroundContent>
      <Footer />
    </div>
  );
  
}

export default SingleStart;
