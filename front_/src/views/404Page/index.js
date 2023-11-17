import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { colors } from '../../utils/utils';
import { Container } from '../SingleStart';
import { DivTitle } from '../QuizzPage';
import { WitheButton } from '../../components/header/index';
import { HeroTitle } from '../../components/hero';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate('/')
  };

  return (
    <div className="App">
      <Header />
      <Hero />
      <BackgroundContent>
        <Container>
          <DivTitle>
            <HeroTitle style={{ color: colors.primary }}>Oups ! La page que vous recherchez est introuvable.</HeroTitle>
            <WitheButton style={{ marginTop: '20px', display: 'inline-block', }} onClick={handleGoBack}>Retour</WitheButton>
          </DivTitle>
        </Container>
      </BackgroundContent>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
