import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';
type DeckListViewItemProp = {
  item: any;
};

export function DeckListViewItem({ item }: DeckListViewItemProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemCategory} weight="semibold">
        {item.subject_category}
      </Text>
      <Text style={styles.itemTitle} weight="medium">
        {item.subject_title}
      </Text>
      <Text style={styles.itemSubtitle} weight="semibold">
        {item.flashcards?.length === 0
          ? `${item.flashcards?.length} flashcard`
          : `${item.flashcards?.length} flashcards`}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    backgroundColor: Colors.default.primary,
    marginVertical: SIZES.base,
    borderRadius: SIZES.base,
  },
  itemCategory: {
    color: Colors.default.slate200,
    fontSize: SIZES.h5,
    marginBottom: SIZES.base,
  },
  itemTitle: {
    color: Colors.default.white,
    fontSize: SIZES.h3,
    marginBottom: SIZES.base / 2,
  },
  itemSubtitle: {
    color: Colors.default.white,
    fontSize: SIZES.h5,
    marginBottom: SIZES.base,
  },
});
