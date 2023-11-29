import { StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { quiz3Data, quizSubjectsData } from '../../../constants/Data';
import { QuizViewItem } from '../../../components/QuizViewItem';
import { QuizSubjectViewItem } from '../../../components/QuizSubjectViewItem';
import { router } from 'expo-router';
import { useEffect } from 'react';

export default function QuizScreen() {
  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();

  useEffect(() => {
    console.log('in quiz');
  }, []);
  const recentQuiz = quiz3Data[0];
  const quizzes = quizSubjectsData;
  return (
    <View style={styles.container}>
      <View style={[styles.titleHeader, themeBackgroundStyle]}>
        <Text style={[styles.title, themeTextStyle]}>
          Quiz yourself to retrain{' '}
          <Text style={styles.titleColor}>knowledge</Text>
        </Text>
      </View>
      <View style={styles.recentQuizContainer}>
        {/* Recent quiz */}
        <Text style={styles.subtitle}>Recent Quiz</Text>
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: '/(tabs)/quiz/question',
              params: {
                quizTitle: recentQuiz.quizTitle,
                quizQuestions: JSON.stringify(recentQuiz.questions),
                recentScore: recentQuiz.recentScore,
              },
            });
          }}
        >
          <QuizViewItem item={recentQuiz} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 2.3 }}>
        <Text style={{ marginVertical: 10 }}>Continue Studying</Text>
        {/* Quizes */}
        <ScrollView style={{ flex: 1 }}>
          {quizzes &&
            quizzes.map((item) => {
              return (
                <TouchableOpacity
                  key={item.quizSubjectTitle}
                  onPress={() => {
                    router.push({
                      pathname: '/(tabs)/quiz/subjectquiz',
                      params: {
                        quizSubjectTitle: item.quizSubjectTitle,
                        quizSubjects: JSON.stringify(item.quizSubjects),
                      },
                    });
                  }}
                >
                  <QuizSubjectViewItem item={item} />
                </TouchableOpacity>
              );
            })}
        </ScrollView>
      </View>
      {/* Import Quizes */}
      <View style={{ flex: 1 }}>
        {/* Generate from Flashcard */}
        <TouchableOpacity
          style={[styles.button, themeSecondaryBackgroundStyle]}
        >
          <MaterialCommunityIcons
            name="card-multiple-outline"
            style={styles.buttonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.buttonLabel}>Generate from Flashcard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  titleHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.h1,
  },
  titleColor: {
    fontSize: SIZES.h1,
    color: Colors.light.primary,
  },
  recentQuizContainer: {
    marginTop: 20,
    flex: 1,
  },
  subtitle: {
    marginVertical: 20,
  },
  button: {
    height: SIZES.height / 8,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginTop: SIZES.marginTop / 2,
    marginBottom: SIZES.marginTop / 2,
    flexDirection: 'row',
  },
  buttonIcon: {
    fontSize: 40,
    alignSelf: 'center',
    textAlignVertical: 'center',
    marginLeft: SIZES.padding,
  },
  buttonLabel: {
    fontSize: SIZES.h3,
    color: Colors.light.primary,
    alignSelf: 'center',
    textAlignVertical: 'center',
    justifyContent: 'flex-start',
    marginLeft: SIZES.padding,
  },
});
