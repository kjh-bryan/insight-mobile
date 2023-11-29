import React, { useState } from 'react';
import { StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { Text, View } from '../../../components/Themed';
import { SIZES } from '../../../constants/Theme';
import { router, useLocalSearchParams } from 'expo-router';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import { QuestionType } from '../../../constants/Data';
import { ScrollView } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';
import Colors from '../../../constants/Colors';
import { ToggleButton, RadioButton } from 'react-native-paper';

export default function QuestionScreen() {
  const { quiz_title, quiz_questions, quiz_score } = useLocalSearchParams<{
    quiz_title: string;
    quiz_questions: string;
    quiz_score: string;
  }>();
  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();
  const [quizQuestion, setQuizQuestions] = useState<QuestionType[]>(
    JSON.parse(quiz_questions)
  );
  console.log(quizQuestion);
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const totalQuestion = quizQuestion.length;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  console.log((100 / totalQuestion / 100) * (currentQuestionIndex + 1));
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType>(
    quizQuestion[currentQuestionIndex]
  );
  return (
    <View style={styles.container}>
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
            <Text style={styles.questionTitle}>{currentQuestion.question}</Text>
          </View>
          <View style={styles.questionChoicesContainer}>
            <RadioButton.Group
              value={answer}
              onValueChange={(answer) => setAnswer(answer)}
            >
              {currentQuestion.choice &&
                currentQuestion.choice.map((choice) => {
                  return (
                    <RadioButton.Item
                      color={Colors.default.primary}
                      uncheckedColor={Colors.default.slate500}
                      label={choice.choice}
                      style={styles.choiceContainer}
                      value={choice.choice}
                      key={choice.choice}
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
              if (answer.match(currentQuestion.answer?.choice)) {
                setScore(score + 1);
              }
              setCurrentQuestionIndex(currentQuestionIndex + 1);
              setCurrentQuestion(quizQuestion[currentQuestionIndex + 1]);
              setAnswer('');
            } else {
              //TODO: Show result page
              console.log(
                'Congrats you scored :' + score + '/' + totalQuestion
              );

              router.replace({
                pathname: '/(tabs)/quiz/result',
                params: {
                  quiz_title: quiz_title,
                  score: score,
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
