import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet, Dimensions } from 'react-native';
import { Flashcard, FlashcardItem, NoteType } from '../constants/Data';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type FlashCardItemProp = {
  item: Flashcard;
};

export function FlashCardItem({ item }: FlashCardItemProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemTitle} weight="medium">
        {item.flashcard_title}
      </Text>
      <MaterialCommunityIcons
        name="card-multiple"
        size={24}
        color={Colors.default.slate200}
        style={{ alignSelf: 'flex-end' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    backgroundColor: Colors.default.primary,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 15,
    width: 140,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  itemId: {
    color: Colors.default.slate500,
    fontSize: SIZES.h6,
  },
  itemTitle: {
    color: Colors.default.white,
    fontSize: SIZES.h5,
    marginBottom: SIZES.base,
  },
  itemSubtitle: {
    color: Colors.default.white,
    fontSize: SIZES.h5,
    marginBottom: SIZES.base,
  },
});
