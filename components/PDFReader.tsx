import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from './Themed';
import { SIZES } from '../constants/Theme';
import Pdf from 'react-native-pdf';

export function PDFReader({ src, title }: { src: string; title: string }) {
  const pdfResource = { uri: src, cache: true };
  return (
    <View style={styles.container}>
      <Text style={styles.container}>{title}</Text>
      <Pdf trustAllCerts={true} source={pdfResource} style={styles.pdf} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: SIZES.h2,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
