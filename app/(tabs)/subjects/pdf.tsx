import { useLocalSearchParams } from 'expo-router';
import { PDFReader } from '../../../components/PDFReader';
import { Text, View } from '../../../components/Themed';
import Pdf from 'react-native-pdf';
import { StyleSheet, Dimensions } from 'react-native';
import { SIZES } from '../../../constants/Theme';

export default function NotesPdfScreen() {
  const { src, title } = useLocalSearchParams<{
    src: string;
    title: string;
  }>();

  console.log('src :', src);
  console.log('title :', title);
  // return <PDFReader src={src} title={title} />;
  const pdfResource = { uri: src, cache: true };
  //return (
  // <View style={styles.container}>
  //   <Text style={styles.container}>{title}</Text>
  //   <Pdf trustAllCerts={true} source={pdfResource} style={styles.pdf} />
  // </View>
  //);
  return (
    <View>
      <Text>Helllo</Text>
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
