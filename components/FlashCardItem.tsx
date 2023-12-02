import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet, Dimensions } from 'react-native';
import { Flashcard, FlashcardItem, NoteType } from '../constants/Data';

type FlashCardItemProp = {
  item: Flashcard;
};

export function FlashCardItem({ item }: FlashCardItemProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemId} weight="semibold">
        {/* {item.note_id} */}
      </Text>
      <Text style={styles.itemTitle} weight="medium">
        {item.flashcard_title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    height: 116,
    backgroundColor: Colors.default.primary,
    borderRadius: 10,
    padding: SIZES.base,
    width: 140,
  },
  itemId: {
    color: Colors.default.slate500,
    fontSize: SIZES.h6,
    marginBottom: SIZES.base,
  },
  itemTitle: {
    color: Colors.default.white,
    fontSize: SIZES.h5,
    marginBottom: SIZES.base / 2,
  },
  itemSubtitle: {
    color: Colors.default.white,
    fontSize: SIZES.h5,
    marginBottom: SIZES.base,
  },
});
