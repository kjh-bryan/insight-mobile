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
  const pdfResource = {
    uri: 'https://insightpdfstorage.blob.core.windows.net/pdf/6049526822544522-Brighton-Connection-.pdf',
    cache: true,
  };
  return (
    <View style={styles.container}>
      <Text weight="bold" style={styles.title}>
        {title}
      </Text>
      <Pdf
        trustAllCerts={false}
        source={pdfResource}
        style={styles.pdf}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onError={(error) => {
          console.log('error :', error);
        }}
      />
    </View>
  );
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
    fontSize: SIZES.h3,
    textAlign: 'center',
    borderWidth: 1,
    marginVertical: 5,
    paddingVertical: 10,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
