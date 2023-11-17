import Header from '../../components/header';
import Hero from '../../components/hero';
import BackgroundContent from '../../components/background';
import Footer from '../../components/footer';
import '../../App.css';
import { Link, useParams, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { BlueButton, Container, SingleSubtitle, SinglePres } from '../SingleStart';
import { scrollToTop } from '../../utils/utils';
import { colors, radius, fontSize, mediaMax} from '../../utils/utils';
import logo from '../../assets/logoBlanc.png';
import { HeroTitle } from '../../components/hero';
import React, { useState, useEffect, useContext} from 'react';
import { GetModules } from '../../API/modules';
import { UserContext } from '../../App';

const apiUrl = 'http://localhost:8000';

export const DivTitle = styled.div`
  width: 100%;
  height: auto;
  background-color: ${colors.secondary};
  border-radius: ${radius.small};
  box-shadow: 0px 8px 30px 4px rgba(117, 142, 254, 0.4);
  text-align: center;
  padding: 60px;
  ${mediaMax[1]} {
    padding: 20px;
  }
`;

const Logo = styled.img`
  max-width: 262px;
  height: 50px;
  cursor: pointer;
`;

const AnswerOption = styled.div`
  label {
    color: ${({ isChecked, isCorrect, showIncorrectAnswers }) =>
      isChecked && !isCorrect && showIncorrectAnswers
        ? 'red'
        : isCorrect && isChecked && showIncorrectAnswers
        ? 'green'
        : 'inherit'};
  }
`;

const Label = styled.label`
  font-size: ${fontSize.button};
  ${mediaMax[1]} {
    font-size: ${fontSize.mobileButton};
  }
`

const QuizzPage = () => {
  const navigate = useNavigate();
  const { id, stepId } = useParams();
  const [showIncorrectAnswers, setShowIncorrectAnswers] = useState(false);
  const [error, setError] = useState("");
  const [modules, setModules] = useState([]);
  const { moduleResults } = useContext(UserContext);
  // console.log(moduleResults);

  const module = modules.find((module) => module.id === id);
  
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

  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isQuizValidated, setIsQuizValidated] = useState(false);

  const handleAnswerSelect = (questionId, answerId) => {
    if (!isQuizValidated) {
      setSelectedAnswers((prevAnswers) => {
        // Vérifier si la réponse est déjà sélectionnée
        const isAnswerSelected = prevAnswers.some(
          (selectedAnswer) =>
            selectedAnswer.questionId === questionId &&
            selectedAnswer.answerId === answerId
        );

        if (!isAnswerSelected) {
          // Ajouter la réponse sélectionnée et supprimer les autres réponses de la même question
          return prevAnswers
            .filter(
              (selectedAnswer) => selectedAnswer.questionId !== questionId
            )
            .concat({ questionId, answerId });
        } else {
          // Désélectionner la réponse si elle est déjà sélectionnée
          return prevAnswers.filter(
            (selectedAnswer) =>
              selectedAnswer.questionId !== questionId ||
              selectedAnswer.answerId !== answerId
          );
        }
      });
      setIsQuizValidated(false);
    }
  };

  const handleResetClick = () => {
    setSelectedAnswers([]);
    setShowIncorrectAnswers(false);
    setIsQuizValidated(false);
    setError("");
  };

  const handleNextClick = async () => {
    setIsQuizValidated(true);
    const selectedAnswerIds = selectedAnswers.map((answer) => answer.answerId);
  
    const isAllQuestionsAnswered = step.questions.every((question) =>
      selectedAnswerIds.some((id) =>
        question.answers.map((answer) => answer.id).includes(id)
      )
    );
  
    if (isAllQuestionsAnswered) {
      const isAllQuestionsCorrect = step.questions.every((question) =>
        question.answers.every((answer) => {
          const isSelected = selectedAnswerIds.includes(answer.id);
          return isSelected === answer.correct;
        })
      );
  
      if (isAllQuestionsCorrect) {
        console.log('Toutes les réponses sont correctes');
        setShowIncorrectAnswers(false);
  
        try {
          const currentUserID = localStorage.getItem('currentUserID');
          const moduleId = module.id; // Remplacez par l'ID du module correspondant
          const resultIndex = moduleResults[0].results.findIndex((module) => module.id === moduleId);
          // console.log(resultIndex);
          const isValidModuleIndex = (step.id -1); // Remplacez par l'index correct de votre isValidModule
  
          const response = await fetch(`${apiUrl}/quizzPage/${currentUserID}/${resultIndex}/isValidModule/${isValidModuleIndex}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              resultIndex: resultIndex,
              isValidModuleIndex: isValidModuleIndex,
            }),
          });
  
          if (response.ok) {
            navigate(`/congratPage/${id}/${stepId}`);
            scrollToTop();
          } else {
            console.log('Error updating user:', response.statusText);
            setError('Une erreur est survenue lors de la mise à jour de l\'utilisateur.');
          }
        } catch (error) {
          console.log('Error updating user:', error);
          setError('Une erreur est survenue lors de la mise à jour de l\'utilisateur.');
        }
      } else {
        console.log('Au moins une réponse est incorrecte');
        setError('Au moins une réponse est incorrecte');
        setShowIncorrectAnswers(true);
      }
    } else {
      console.log('Veuillez répondre à toutes les questions');
      setError('Veuillez répondre à toutes les questions');
    }
  };
  
  
  
  // console.log(isQuizValidated);

  return (
    <div className="App">
      <Header />
      <Hero stepTitle={step?.title} stepText={step?.subtitle} />
      <BackgroundContent>
        <Container>
        <SingleSubtitle style={{ textAlign: 'center', marginTop: '-10px', marginBottom: '40px' }}>ÉTAPE {stepId} sur {module?.steps?.length}</SingleSubtitle>
          <DivTitle>
            <Logo src={logo} />
            <HeroTitle style={{ color: colors.text_light }}>TESTEZ VOS CONNAISSANCES!</HeroTitle>
          </DivTitle>
          {/* <SinglePres style={{ marginBottom: '40px' }}>{step?.quizz_text.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                    {line}
                    <br />
                </React.Fragment>))}
          </SinglePres> */}

          <div>
            {step?.questions.map((question) => (
              <div key={question.id}>
                <SingleSubtitle style={{ marginTop: '60px' }}>{question.question}</SingleSubtitle>
                {question.answers.map((answer) => (
                  <AnswerOption
                    key={answer.id}
                    isChecked={selectedAnswers.some(
                      (selectedAnswer) =>
                        selectedAnswer.questionId === question.id &&
                        selectedAnswer.answerId === answer.id
                    )}
                    isCorrect={answer.correct}
                    showIncorrectAnswers={showIncorrectAnswers}
                  >
                    <Label>
                      <input
                        style={{ marginRight: '20px' }}
                        type="radio"
                        name={`question_${question.id}`}
                        value={answer.id}
                        disabled={isQuizValidated}
                        checked={selectedAnswers.some(
                          (selectedAnswer) =>
                            selectedAnswer.questionId === question.id &&
                            selectedAnswer.answerId === answer.id
                        )}
                        onChange={(e) =>
                          handleAnswerSelect(
                            question.id,
                            answer.id,
                            e.target.checked
                          )
                        }
                      />
                      {answer.text}
                    </Label>
                  </AnswerOption>
                ))}
              </div>
            ))}
          </div>
          <SinglePres style={{ marginTop: '20px', color: 'red', textAlign: 'center' }}>{error}</SinglePres>
            <BlueButton style={{ fontSize:` ${fontSize.mobileButton}`}} onClick={handleResetClick}>RECOMMENCER</BlueButton>
          
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              style={{ textDecoration: 'none', marginRight: '20px' }}
              to={`/docPage/${id}/${stepId}`}
              onClick={scrollToTop}
            >
              <BlueButton style={{ marginTop: '20px' }}>PRÉCÉDENT</BlueButton>
            </Link>
            <div>
              <BlueButton style={{ marginTop: '20px' }} onClick={handleNextClick}>VALIDER</BlueButton>
            </div>
          </div>
        </Container>
      </BackgroundContent>
      <Footer />
    </div>
  );
};

export default QuizzPage;