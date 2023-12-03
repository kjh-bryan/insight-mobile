import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text, View } from './Themed';
import { StyleSheet, Dimensions } from 'react-native';
import { NoteType } from '../constants/Data';
import { useEffect, useState } from 'react';
import { AntDesign } from '@expo/vector-icons';

type CardViewItemProp = {
  item: NoteType;
};

export function CardViewItem({ item }: CardViewItemProp) {
  const onLayout = (event: any) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    console.log('x :', x);
    console.log('y :', y);
    console.log('h :', height);
    console.log('w :', width);
  };
  const [fileName, setFilename] = useState('');
  useEffect(() => {
    if (item.note_url) {
      const noteUrlArr = item.note_url.split('/');
      const finalFileName = noteUrlArr[noteUrlArr.length - 1].replace(
        /[0-9-]/g,
        ''
      );
      setFilename(finalFileName);
    }
  }, []);

  return (
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.itemId} weight="semibold">
        {/* {item.note_id} */}
      </Text>
      <Text style={styles.itemTitle} weight="medium">
        {item.note_title}
      </Text>
      <Text style={styles.noteUrl} weight="light">
        {fileName}
      </Text>
      {item.note_url && (
        <AntDesign
          name="pdffile1"
          style={{ alignSelf: 'flex-end' }}
          size={24}
          color={Colors.default.slate100}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SIZES.base,
    marginVertical: SIZES.base,
    backgroundColor: Colors.default.primary,
    borderRadius: 10,
    padding: SIZES.base,
    paddingHorizontal: 15,
    width: 150,
    justifyContent: 'center',
  },
  itemId: {
    color: Colors.default.slate500,
    fontSize: SIZES.h6,
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
  noteUrl: {
    color: Colors.default.slate100,
    fontSize: SIZES.h6 + 2,
    marginBottom: SIZES.base,
  },
});
