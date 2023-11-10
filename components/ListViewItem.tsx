import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet } from 'react-native';
type ListViewItemProp = {
  item: any;
};

export function ListViewItem({ item }: ListViewItemProp) {
  return (
    <View style={styles.container}>
      <Text style={styles.itemCategory} weight="semibold">
        {item.category}
      </Text>
      <Text style={styles.itemTitle} weight="medium">
        {item.title}
      </Text>
      <Text style={styles.itemSubtitle} weight="semibold">
        {item.notes?.length === 0
          ? `${item.notes?.length} note`
          : `${item.notes?.length} notes`}
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
    color: Colors.default.slate500,
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
