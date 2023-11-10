import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet, Dimensions } from 'react-native';
import { NoteType } from '../constants/Data';

type CardViewItemProp = {
  item: NoteType;
};

const deviceHeight = Dimensions.get('window').width;
export function CardViewItem({ item }: CardViewItemProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemId} weight="semibold">
        {item.id}
      </Text>
      <Text style={styles.itemTitle} weight="medium">
        {item.noteTitle}
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
