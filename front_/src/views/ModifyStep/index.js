import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { BlueButton, Container } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import { GetModule, getStep, updateStep } from '../../API/modules';
import { Input, TextArea, SubButton, Form, Label } from '../CreateModule';
import { DivTitle } from '../QuizzPage';
import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import { ErrorMessage } from '../CreateModule';

const ModifyStep = () => {
  const navigate = useNavigate();
  const { id, stepId } = useParams();
  const [isStepNumberExists, setIsStepNumberExists] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    congrat_img: '',
    title: '',
    icon: '',
    subtitle: '',
    movie_link: '',
    movie_quote: '',
    movie_text: '',
    important: [],
    doc_link: '',
    doc_text: '',
    doc_list: [],
    quizz_text: '',
    questions: [],
  });

  useEffect(() => {
    const fetchStepData = async () => {
      const stepData = await getStep(id, stepId);
      setFormData(stepData);
    };

    fetchStepData();
  }, [id, stepId]);

  // console.log(stepId);
  // console.log(formData);
  // console.log(id)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e, index) => {
    const { name, value } = e.target;
    const questions = [...formData.questions];
    questions[index][name] = value;
    setFormData({ ...formData, questions });
  };

  const handleAnswerChange = (e, questionIndex, answerIndex) => {
    const { name, value, type, checked } = e.target;
    const questions = [...formData.questions];
    const answers = [...questions[questionIndex].answers];

    if (type === 'checkbox') {
      answers[answerIndex][name] = checked;
    } else {
      answers[answerIndex][name] = value;
    }

    setFormData({ ...formData, questions });
  };

  const handleAddQuestion = () => {
    const questions = [...formData.questions];
    questions.push({ id: questions.length + 1, question: '', answers: [] });
    setFormData({ ...formData, questions });
  };

  const handleAddAnswer = (questionIndex) => {
    const questions = [...formData.questions];
    const answers = questions[questionIndex].answers;
    answers.push({ id: answers.length + 1, text: '', correct: false });
    setFormData({ ...formData, questions });
  };

  const handleRemoveQuestion = (questionIndex) => {
    const questions = [...formData.questions];
    questions.splice(questionIndex, 1);
    setFormData({ ...formData, questions });
  };

  const handleRemoveAnswer = (questionIndex, answerIndex) => {
    const questions = [...formData.questions];
    const answers = questions[questionIndex].answers;
    answers.splice(answerIndex, 1);
    setFormData({ ...formData, questions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const moduleData = await GetModule(id);
    const existingStep = moduleData.steps.find((step) => step.id === formData.id);
    if (existingStep && existingStep.id !== stepId) {
      console.log("Le numéro de l'étape existe déjà. Veuillez choisir un autre numéro.");
      setIsStepNumberExists(true);
      return; // Arrêter la soumission du formulaire
    }
console.log(id, stepId, formData)
    try {
      await updateStep(id, stepId, formData);

      navigate(`/singleStart/${moduleData.id}`);
      scrollToTop();

      console.log('Étape modifiée avec succès !');
    } catch (error) {
      console.error("Erreur lors de la modification de l'étape :", error);
    }
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="App">
      <Header />
      <Hero stepTitle="MODIFICATION D'ÉTAPE" stepText="" />
      <BackgroundContent>
        <Container style={{ paddingTop: '180px' }}>
          <DivTitle>
            {isStepNumberExists && (
              <ErrorMessage>
                Le numéro de l'étape existe déjà. Veuillez choisir un autre numéro. {}
              </ErrorMessage>
            )}
            <Form onSubmit={handleSubmit}>
              <Label style={{ display: 'none' }} >
                Numéro de l'étape:
                <Input  
                  type="text"
                  name="id"
                  value={formData.id}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Titre de l'étape:
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Icône de l'étape:
                <Input
                  type="text"
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Sous-titre de l'étape:
                <Input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Lien vidéo de l'étape:
                <Input
                  type="text"
                  name="movie_link"
                  value={formData.movie_link}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Citation vidéo de l'étape:
                <Input
                  type="text"
                  name="movie_quote"
                  value={formData.movie_quote}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Texte vidéo de l'étape:
                <TextArea
                  name="movie_text"
                  value={formData.movie_text}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Points importants de l'étape:
                <TextArea
                  name="important"
                  value={formData.important.join('\n')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      important: e.target.value.split('\n'),
                    })
                  }
                />
              </Label>
              <Label>
                Lien du document de l'étape:
                <Input
                  type="text"
                  name="doc_link"
                  value={formData.doc_link}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Texte du document de l'étape:
                <TextArea
                  name="doc_text"
                  value={formData.doc_text}
                  onChange={handleChange}
                />
              </Label>
              <Label>
                Liste du document de l'étape:
                <TextArea
                  name="doc_list"
                  value={formData.doc_list.join('\n')}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      doc_list: e.target.value.split('\n'),
                    })
                  }
                />
              </Label>

              <Label style={{ display: 'unset', fontSize: '24px' }}>
                Questions de l'étape:
                {formData.questions.map((question, questionIndex) => (
                  <div key={question.id}>
                    <Label style={{ fontSize: '20px', marginTop: '20px' }}>
                      Question {questionIndex + 1}:
                      <TextArea
                        name="question"
                        value={question.question}
                        onChange={(e) => handleQuestionChange(e, questionIndex)}
                      />
                    </Label>
                    <div style={{ fontSize: '20px' }}>
                      Réponses :
                      {question.answers.map((answer, answerIndex) => (
                        <div key={answer.id}>
                          <Label style={{ fontSize: '20px', marginTop: '20px' }}>
                            Réponse {answerIndex + 1}:
                            <Input
                              type="text"
                              name="text"
                              value={answer.text}
                              onChange={(e) =>
                                handleAnswerChange(e, questionIndex, answerIndex)
                              }
                            />
                          </Label>
                          <Label style={{ fontSize: '20px' }}>
                            Correct :
                            <input
                              type="checkbox"
                              name="correct"
                              checked={answer.correct}
                              onChange={(e) =>
                                handleAnswerChange(e, questionIndex, answerIndex)
                              }
                            />
                          </Label>
                          <SubButton
                            type="button"
                            onClick={() =>
                              handleRemoveAnswer(questionIndex, answerIndex)
                            }
                            style={{ fontSize: '14px' }}
                          >
                            Supprimer la réponse
                          </SubButton>
                        </div>
                      ))}
                      <SubButton
                        type="button"
                        onClick={() => handleAddAnswer(questionIndex)}
                        style={{ fontSize: '14px' }}
                      >
                        Ajouter une réponse
                      </SubButton>
                    </div>
                    <SubButton
                      type="button"
                      onClick={() => handleRemoveQuestion(questionIndex)}
                      style={{ fontSize: '14px' }}
                    >
                      Supprimer la question
                    </SubButton>
                  </div>
                ))}
                <SubButton
                  type="button"
                  style={{ fontSize: '20px' }}
                  onClick={handleAddQuestion}
                >
                  Ajouter une question
                </SubButton>
              </Label>
              <Label>
                Lien de l'image de félicitations:
                <Input
                  type="text"
                  name="congrat_img"
                  value={formData.congrat_img}
                  onChange={handleChange}
                />
              </Label>

              <SubButton type="submit">VALIDER</SubButton>
            </Form>
          </DivTitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              style={{ textDecoration: 'none' }}
              onClick={handleGoBack}
            >
              <BlueButton>PRÉCÉDENT</BlueButton>
            </Link>
          </div>
        </Container>
      </BackgroundContent>
      <Footer />
    </div>
  );
};

export default ModifyStep;
