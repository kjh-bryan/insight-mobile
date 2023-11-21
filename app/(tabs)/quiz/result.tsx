import React from 'react';
import { Text, View } from '../../../components/Themed';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/Theme';
import { router, useLocalSearchParams } from 'expo-router';
import { Image } from 'expo-image';
import Colors from '../../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ResultScreen() {
  const { quizTitle, score, totalQuestion } = useLocalSearchParams<{
    quizTitle: string;
    score: string;
    totalQuestion: string;
  }>();
  const image = require('../../../assets/images/trophy.png');
  return (
    <View style={styles.container}>
      <View style={styles.quizHeaderContainer}>
        <Text style={styles.quizHeaderTitle} weight="medium">
          Quiz Result
        </Text>
      </View>
      <View style={styles.quizImageContainer}>
        <Image source={image} style={styles.quizImage} />
      </View>
      <View style={styles.quizCongratsContainer}>
        <Text style={styles.quizCongratsTitle} weight="bold">
          Congratulations!
        </Text>
        <Text style={styles.quizCongratsSubtitle} weight="medium">
          Good job on completing the quiz!
        </Text>
      </View>
      <View style={styles.quizDetailContainer}>
        <Text style={styles.quizDetailTitle} weight="semibold">
          {quizTitle}
        </Text>
      </View>
      <View style={styles.quizScoreContainer}>
        <Text style={styles.quizYourScore}>YOUR SCORE</Text>
        <Text style={styles.quizScore}>
          <Text
            style={
              Number(score) / Number(totalQuestion) >= 0.5
                ? styles.greenScore
                : styles.redScore
            }
          >
            {score}
          </Text>
          {` / ${totalQuestion}`}
        </Text>
      </View>
      <View style={styles.quizBackContainer}>
        <TouchableOpacity
          style={styles.quizBack}
          onPress={() => {
            router.back();
          }}
        >
          <Text style={styles.quizBackLabel} weight="medium">
            Back to Quiz
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
  quizHeaderContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  quizHeaderTitle: {
    fontSize: SIZES.h2 + 4,
    textAlign: 'center',
  },
  quizImageContainer: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizImage: {
    height: 250,
    width: 250,
  },
  quizCongratsContainer: {
    flex: 0.15,
    alignItems: 'center',
  },
  quizCongratsTitle: {
    fontSize: SIZES.h1,
    marginTop: SIZES.base,
  },
  quizCongratsSubtitle: {
    fontSize: SIZES.h2,
  },
  quizDetailContainer: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quizDetailTitle: {
    fontSize: SIZES.h3 + 4,
  },
  quizScoreContainer: {
    flex: 0.1,
    alignItems: 'center',
  },
  quizYourScore: {
    fontSize: SIZES.h3,
    letterSpacing: 3,
  },
  quizScore: {
    fontSize: SIZES.h1,
  },
  greenScore: {
    color: Colors.default.complementGreen,
  },
  redScore: {
    color: Colors.default.complementRed,
  },
  quizBackContainer: {
    flex: 0.1,
    justifyContent: 'center',
  },
  quizBack: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.default.primary,
    marginHorizontal: 20,
  },
  quizBackLabel: {
    textAlign: 'center',
    fontSize: SIZES.h3,
    color: Colors.default.white,
  },
});
