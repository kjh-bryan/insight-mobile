import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet, Dimensions } from 'react-native';
import { QuizType } from '../constants/Data';

type QuestionViewItemProp = {
  item: QuizType;
};

const deviceHeight = Dimensions.get('window').width;
export function QuizViewItem({ item }: QuestionViewItemProp) {
  return (
    <View style={{ height: 100 }}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle} weight="semibold">
            {item.quiz_title}
          </Text>
          <Text style={styles.itemScore} weight="medium">
            {item.quiz_score == -1 || item.questions === undefined
              ? 'Unattempted'
              : 'Score : ' + item.quiz_score + '/' + item.questions.length}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 4,
    backgroundColor: Colors.default.primary,
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: SIZES.padding,
    overflow: 'hidden',
  },
  itemContainer: {
    backgroundColor: Colors.default.primary,
    flex: 1,
    justifyContent: 'center',
  },
  itemTitle: {
    color: Colors.default.slate500,
    marginBottom: 8,
  },
  itemScore: {
    color: Colors.default.white,
    textAlign: 'right',
  },
});
