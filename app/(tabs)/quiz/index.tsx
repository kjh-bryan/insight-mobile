import { Dimensions, StyleSheet } from 'react-native';

import { Text, View } from '../../../components/Themed';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { QuizSubjectViewItem } from '../../../components/QuizSubjectViewItem';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { getQuizzesByUserId } from '../../../services/quiz';
import { useIsFocused } from '@react-navigation/native';
import { MainScreenLoader } from '../../../components/MainScreenLoader';

const width = Dimensions.get('window').width - SIZES.padding * 2;
export default function QuizScreen() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  const { themeTextStyle, themeBackgroundStyle } = ThemeUtils();
  const isFocused = useIsFocused();
  useEffect(() => {
    (async () => {
      const quizzes = await getQuizzesByUserId(1);
      setQuizzes(quizzes.subjects);
      setTimeout(() => setLoading(false), 1000);
    })();
  }, [isFocused]);

  return (
    <View style={styles.container}>
      <View style={[styles.titleHeader, themeBackgroundStyle]}>
        <Text style={[styles.title, themeTextStyle]}>
          Quiz yourself to retrain{' '}
          <Text style={styles.titleColor}>knowledge</Text>
        </Text>
      </View>
      {/* <View style={styles.recentQuizContainer}>
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
      </View> */}
      <View style={{ flex: 2.3 }}>
        <Text style={{ marginVertical: 10 }}>Continue Studying</Text>
        {/* Quizes */}
        {loading ? (
          <MainScreenLoader />
        ) : (
          <ScrollView style={{ flex: 1 }}>
            {quizzes &&
              quizzes.map((item: any) => {
                return (
                  <TouchableOpacity
                    key={item.subject_id}
                    onPress={() => {
                      router.push({
                        pathname: '/(tabs)/quiz/subjectquiz',
                        params: {
                          subject_id: item.subject_id,
                          subject_title: item.subject_title,
                        },
                      });
                    }}
                  >
                    <QuizSubjectViewItem item={item} />
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        )}
      </View>
      {/* Import Quizes */}
      <View style={{ flex: 1 }}>
        {/* Generate from Flashcard */}
        {/* <TouchableOpacity
          style={[styles.button, themeSecondaryBackgroundStyle]}
        >
          <MaterialCommunityIcons
            name="card-multiple-outline"
            style={styles.buttonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.buttonLabel}>Generate from Flashcard</Text>
        </TouchableOpacity> */}
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
