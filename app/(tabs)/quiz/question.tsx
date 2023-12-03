import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { SIZES } from '../../../constants/Theme';
import { router, useLocalSearchParams } from 'expo-router';
import { QuestionType } from '../../../constants/Data';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import Colors from '../../../constants/Colors';
import { RadioButton } from 'react-native-paper';
import { getQuestionByQuizId } from '../../../services/quiz';
import { QuestionLoader } from '../../../components/QuestionLoader';

export default function QuestionScreen() {
  const { quiz_id, quiz_title, quiz_score } = useLocalSearchParams<{
    quiz_id: string;
    quiz_title: string;
    quiz_score: string;
  }>();
  const [loading, setLoading] = useState(true);
  const [quizQuestion, setQuizQuestions] = useState<QuestionType[]>();
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(-1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  console.log((100 / totalQuestion / 100) * (currentQuestionIndex + 1));
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>();

  const [currentQuestionAnswer, setCurrentQuestionAnswer] = useState('');
  useEffect(() => {
    (async () => {
      console.log('quiz_id in question.tsx : ', quiz_id);
      const result = await getQuestionByQuizId(Number(quiz_id));

      console.log(result);
      setQuizQuestions(result.questions);
      setTotalQuestion(result.questions.length);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, []);

  useEffect(() => {
    if (quizQuestion) setCurrentQuestion(quizQuestion[currentQuestionIndex]);

    console.log(quizQuestion);
  }, [quizQuestion]);
  useEffect(() => {
    if (currentQuestion) {
      for (const c of currentQuestion.choice) {
        if (c.correct) {
          setCurrentQuestionAnswer(c.choice_id.toString());
          break;
        }
      }
    }
  }, [currentQuestion]);

  return (
    <View style={styles.container}>
      {loading ? (
        <QuestionLoader />
      ) : (
        <>
          <View style={styles.questionHeaderContainer}>
            {/* Question Title Header */}
            <Text style={styles.questionHeaderTitle} weight="medium">
              {quiz_title}
            </Text>
            <Progress.Bar
              // prettier-ignore
              progress={((100 / totalQuestion) / 100) * (currentQuestionIndex + 1)}
              width={null}
              color={Colors.default.primary}
              style={styles.questionProgressBar}
            />
            <Text style={styles.questionProgress} weight="medium">
              {currentQuestionIndex + 1} {'/'} {totalQuestion}
            </Text>
          </View>
          <View style={styles.questionContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View style={styles.questionsContainer}>
                {/* Question */}
                <Text style={styles.questionTitle}>
                  {currentQuestion?.question}
                </Text>
              </View>
              <View style={styles.questionChoicesContainer}>
                <RadioButton.Group
                  value={answer}
                  onValueChange={(answer) => setAnswer(answer)}
                >
                  {currentQuestion &&
                    currentQuestion.choice &&
                    currentQuestion.choice.map((choice) => {
                      return (
                        <RadioButton.Item
                          color={Colors.default.primary}
                          uncheckedColor={Colors.default.slate500}
                          label={choice.choice}
                          style={styles.choiceContainer}
                          value={choice.choice_id.toString()}
                          key={choice.choice_id}
                        />
                      );
                    })}
                </RadioButton.Group>
              </View>
            </ScrollView>
          </View>
          <View style={styles.nextQuestionContainer}>
            {/* Next Question Button */}
            <TouchableOpacity
              disabled={answer === '' ? true : false}
              style={
                answer === ''
                  ? styles.nextQuestionDisabledButton
                  : styles.nextQuestionButton
              }
              onPress={() => {
                if (currentQuestionIndex + 1 != totalQuestion) {
                  if (currentQuestionAnswer.match(answer)) {
                    setScore(score + 1);
                  }
                  console.log('On press : currentChoiceId :', answer);
                  console.log(
                    'On press : correctAnwerChoice :',
                    currentQuestionAnswer
                  );
                  setCurrentQuestionIndex(currentQuestionIndex + 1);
                  if (quizQuestion)
                    setCurrentQuestion(quizQuestion[currentQuestionIndex + 1]);
                  setAnswer('');
                } else {
                  //TODO: Show result page
                  let finalScore = score;
                  if (currentQuestionAnswer.match(answer)) {
                    finalScore = score + 1;
                  }
                  console.log('On press : currentChoiceId :', answer);
                  console.log(
                    'On press : correctAnwerChoice :',
                    currentQuestionAnswer
                  );
                  console.log(
                    'Congrats you scored :' + finalScore + '/' + totalQuestion
                  );

                  router.replace({
                    pathname: '/(tabs)/quiz/result',
                    params: {
                      quiz_id: quiz_id,
                      quiz_title: quiz_title,
                      score: finalScore,
                      totalQuestion: totalQuestion,
                    },
                  });
                }
              }}
            >
              <Text style={[styles.nextQuestionButtonLabel]} weight="semibold">
                {currentQuestionIndex + 1 == totalQuestion
                  ? 'Finish'
                  : 'Next Question'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.base * 2,
    paddingBottom: SIZES.base * 2,
  },
  questionHeaderContainer: {
    flex: 0.1,
  },
  questionProgressBar: {
    marginVertical: 4,
  },
  questionHeaderTitle: {
    fontSize: SIZES.h3,
  },
  questionProgress: {
    fontSize: SIZES.h5,
  },
  questionContainer: {
    flex: 0.8,
  },
  questionsContainer: {
    flex: 0.5,
    paddingVertical: 20,
    justifyContent: 'center',
  },
  questionTitle: {
    fontSize: SIZES.h2,
  },
  questionChoicesContainer: {
    flex: 0.5,
    paddingVertical: 10,
    justifyContent: 'center',
  },
  choiceContainer: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    borderColor: Colors.default.primary,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
  choiceLabel: {
    fontSize: SIZES.h3,
  },
  nextQuestionContainer: {
    flex: 0.2,
    justifyContent: 'center',
  },
  nextQuestionButton: {
    backgroundColor: Colors.default.primary,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: '20%',
  },
  nextQuestionDisabledButton: {
    backgroundColor: Colors.default.primary,
    opacity: 0.5,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: '20%',
  },
  nextQuestionButtonLabel: {
    fontSize: SIZES.h3,
    textAlign: 'center',
    color: Colors.default.white,
  },
});
