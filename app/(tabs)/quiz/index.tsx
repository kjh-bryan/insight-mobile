import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../../components/EditScreenInfo';
import { Text, View } from '../../../components/Themed';
import { SIZES } from '../../../constants/Theme';
import Colors from '../../../constants/Colors';
import { ThemeUtils } from '../../../utils/ThemeUtils';

export default function QuizScreen() {
  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();
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
        <Text>Recent Quiz</Text>
      </View>
      <View>{/* Quizes */}</View>
      <View>{/* Import Quizes */}</View>
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
  },
});
