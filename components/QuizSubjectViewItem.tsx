import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet, Dimensions } from 'react-native';
import { QuizSubjectType } from '../constants/Data';
import { AntDesign } from '@expo/vector-icons';

type QuizSubjectViewItemProp = {
  item: QuizSubjectType;
};

const deviceHeight = Dimensions.get('window').width;
export function QuizSubjectViewItem({ item }: QuizSubjectViewItemProp) {
  return (
    <View style={{ height: 100 }}>
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle} weight="semibold">
            {item.subject_title}
          </Text>
          <Text style={styles.itemLectures} weight="medium">
            {item.quizzes.length + ' Lectures Quiz'}
          </Text>
        </View>
        <View style={styles.itemIconContainer}>
          <AntDesign name="right" size={24} color="black" />
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
    flex: 0.9,
    justifyContent: 'center',
  },
  itemTitle: {
    color: Colors.default.slate500,
  },
  itemLectures: {
    color: Colors.default.white,
  },
  itemIconContainer: {
    backgroundColor: Colors.default.primary,
    flex: 0.1,
    justifyContent: 'center',
  },
});
