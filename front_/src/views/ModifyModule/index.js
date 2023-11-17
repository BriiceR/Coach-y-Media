import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BlueButton, Container } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import React, { useState, useEffect } from 'react';
import { GetModule, updateModule } from '../../API/modules';
import { Input, TextArea, SubButton, Form, Label } from '../CreateModule';
import { DivTitle } from '../QuizzPage';




const ModifyModule = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
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
    // Récupérer le module existant à partir de l'API
    const fetchModule = async () => {
      try {
        const module = await GetModule(id);
        setFormData({
          id: module.id,
          module_img: module.module_img,
          title: module.title,
          description: module.description,
          welcome: module.welcome,
          subtitle: module.subtitle,
          presentation_gen: module.presentation_gen,
          presentation_spe: module.presentation_spe,
        });
      } catch (error) {
        console.error('Erreur lors de la récupération du module:', error);
      }
    };
    fetchModule();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appeler votre fonction API pour mettre à jour le module avec les données du formulaire
      await updateModule(id, formData);
      navigate(`/user/${currentUserID}`);
        scrollToTop();

      // Afficher un message de succès ou effectuer une autre action souhaitée
      console.log('Le module a été mis à jour avec succès!');
    } catch (error) {
      // Gérer les erreurs de mise à jour du module
      console.error('Erreur lors de la mise à jour du module:', error);
    }
  };
  const currentUserID = localStorage.getItem('currentUserID');

  return (
    <div className="App">
      <Header />
      <Hero stepTitle="MODIFICATION DE MODULE" stepText="" />
      <BackgroundContent>
        <Container style={{ paddingTop: '180px' }}>
          <DivTitle>
          <Form onSubmit={handleSubmit}>
            <Label>
              Titre du module:
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Description du module:
              <TextArea
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Image du module:
              <Input
                type="text"
                name="module_img"
                value={formData.module_img}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Message de bienvenue:
              <TextArea
                name="welcome"
                value={formData.welcome}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Sous-titre:
              <Input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleChange}
              />
            </Label>
            <Label>
              Présentation générale:
              <TextArea
                name="presentation_gen"
                value={formData.presentation_gen}
                onChange={handleChange}
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
        </DivTitle>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link style={{ textDecoration: 'none' }} to={`/singleStart/${formData.id}`} onClick={scrollToTop}>
            <BlueButton>PRÉCÉDENT</BlueButton>
          </Link>
          </div>
        </Container>
      </BackgroundContent>
      <Footer />
    </div>
  );
};

export default ModifyModule;