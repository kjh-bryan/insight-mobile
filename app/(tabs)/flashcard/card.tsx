import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { FlashcardItem, getLearnCards } from '../../../constants/Data';
import { defaultStyleSheet } from '../../../constants/Styles';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LearnCard from '../../../components/LearnCard';
import * as Progress from 'react-native-progress';
import { ThemeUtils } from '../../../utils/ThemeUtils';
import Colors from '../../../constants/Colors';
import { SIZES } from '../../../constants/Theme';

const Page = () => {
  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();
  const {
    subject_id,
    subject_category,
    subject_title,
    flashcard_title,
    flashcard_item,
  } = useLocalSearchParams<{
    subject_id: string;
    subject_category: string;
    subject_title: string;
    flashcard_title: string;
    flashcard_item: string;
  }>();
  const [cards, setCards] = useState<FlashcardItem[]>(
    JSON.parse(flashcard_item)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showFront, setShowFront] = useState(true);
  const [textHidden, setTextHidden] = useState(false);
  const [endSession, setEndSession] = useState(false);
  const rotate = useSharedValue(0);
  const frontAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [0, 180]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
        },
      ],
    };
  });

  const backAnimatedStyles = useAnimatedStyle(() => {
    const rotateValue = interpolate(rotate.value, [0, 1], [180, 360]);
    return {
      transform: [
        {
          rotateY: withTiming(`${rotateValue}deg`, { duration: 600 }),
        },
      ],
    };
  });

  // Rotate the card
  const onShowAnswer = () => {
    rotate.value = 1;
    if (currentIndex >= cards.length - 1) {
      setEndSession(true);
    }
    setShowFront(false);
  };

  // Show next card
  const onNextCard = async () => {
    if (currentIndex < cards.length - 1) {
      rotate.value = 0;
      setTextHidden(true);
      setTimeout(() => {
        setCurrentIndex(currentIndex + 1);
        setTextHidden(false);
      }, 600);
    } else {
      setEndSession(true);
    }
    setShowFront(true);
  };

  return (
    <View style={[defaultStyleSheet.container, themeBackgroundStyle]}>
      {cards.length > 0 && (
        <>
          <View style={styles.container}>
            <View style={styles.questionHeaderTitle}>
              <Text style={[defaultStyleSheet.header, themeTextStyle]}>
                {flashcard_title}
              </Text>
            </View>
            <Animated.View style={[styles.frontcard, frontAnimatedStyles]}>
              <LearnCard
                card={cards[currentIndex]}
                isFront={true}
                textHidden={textHidden}
              />
            </Animated.View>
            <Animated.View style={[styles.backCard, backAnimatedStyles]}>
              <LearnCard card={cards[currentIndex]} isFront={false} />
            </Animated.View>
            <View style={styles.progressContainer}>
              <Progress.Bar
                // prettier-ignore
                progress={((100 / cards.length) / 100) * (currentIndex + 1)}
                width={300}
                height={15}
                color={Colors.default.primary}
                style={styles.questionProgressBar}
              />
              <Text style={[styles.questionProgress, themeTextStyle]}>
                {currentIndex + 1} / {cards.length}
              </Text>
            </View>
            {showFront && (
              <TouchableOpacity
                style={defaultStyleSheet.bottomButton}
                onPress={onShowAnswer}
              >
                <Text style={defaultStyleSheet.buttonText}>Reveal Answer</Text>
              </TouchableOpacity>
            )}

            {!showFront && !endSession && (
              <TouchableOpacity
                style={defaultStyleSheet.bottomButton}
                onPress={() => onNextCard()}
              >
                <Text style={defaultStyleSheet.buttonText}>Next Question</Text>
              </TouchableOpacity>
            )}

            {endSession && (
              <TouchableOpacity
                style={defaultStyleSheet.bottomButton}
                onPress={() => {
                  router.back();
                }}
              >
                <Text style={defaultStyleSheet.buttonText}>End session</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
  },
  frontcard: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    marginTop: 150,
  },
  backCard: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    marginTop: 150,
  },
  bottomView: {
    position: 'absolute',
    bottom: 40,
    width: 300,
    flex: 1,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  questionProgressBar: {
    marginVertical: 5,
  },
  progressContainer: {
    top: 335,
  },
  questionProgress: {
    fontSize: SIZES.h5,
  },
  questionHeaderTitle: {
    width: 300,
    alignItems: 'center',
    height: 200,
  },
});

export default Page;
