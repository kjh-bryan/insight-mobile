import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Text, View } from '../../components/Themed';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import { SIZES } from '../../constants/Theme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import { CustomModal } from '../../components/Modal';

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <Text style={styles.title}>
          Select an <Text style={styles.titleColor}>Option</Text>
        </Text>
      </View>
      <CustomModal
        showModal={showModal}
        setShowModal={setShowModal}
        scaleValue={scaleValue}
      >
        <FontAwesome name="volume-up" color={Colors.light.primary} size={50} />
      </CustomModal>
      <View style={styles.hugeButtonContainer}>
        <TouchableOpacity
          style={styles.hugeButton}
          onPress={() => {
            setShowModal(true);
            Animated.timing(scaleValue, {
              toValue: 1,
              useNativeDriver: true,
              duration: 300,
            }).start();
          }}
        >
          <>
            <FontAwesome
              name="microphone"
              style={styles.hugeButtonIcon}
              color={Colors.light.primary}
            />
            <Text style={styles.hugeButtonLabel}>Listen to Lecture</Text>
          </>
        </TouchableOpacity>
      </View>
      <View style={styles.hugeButtonContainer}>
        <TouchableOpacity style={styles.hugeButton}>
          <MaterialIcons
            name="file-download"
            style={styles.hugeButtonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.hugeButtonLabel}>Import Lecture Notes</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.uploadFileContainer}>
        <View style={styles.uploadFile}>
          <View style={styles.uploadFileIcon}>
            <Ionicons name="document-text" style={styles.fileIcon} />
          </View>
          <View style={styles.uploadFileDescription}>
            <Text style={styles.fileDescriptionTitle}>
              Database System Lecture 1
            </Text>
            <Text style={styles.fileDescriptionSubtitle}>402kb</Text>
          </View>
          <View style={styles.uploadFileGenerateButton}>
            <TouchableOpacity style={styles.generateButton}>
              <Text style={styles.generateButtonText}>Generate Flashcard</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.uploadFileCancel}>
            <TouchableOpacity>
              <Entypo name="cross" style={styles.fileCancel} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.tint,
  },
  titleHeader: {
    marginTop: SIZES.marginTop,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontSize: SIZES.h1,
  },
  titleColor: {
    fontSize: SIZES.h1,
    color: Colors.light.primary,
  },
  hugeButtonContainer: {
    marginTop: SIZES.marginTop,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hugeButton: {
    height: SIZES.height / 4,
    width: SIZES.width - SIZES.sidePadding * 2,
    padding: SIZES.padding,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    backgroundColor: Colors.light.tint,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  hugeButtonIcon: {
    fontSize: 50,
    flex: 0.5,
    alignSelf: 'center',
    textAlignVertical: 'center',
  },
  hugeButtonLabel: {
    fontSize: SIZES.h1 - 2,
    color: Colors.light.primary,
    alignSelf: 'center',
    textAlignVertical: 'center',
    flex: 0.5,
  },
  uploadFileContainer: {
    marginTop: SIZES.marginTop,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  uploadFile: {
    height: SIZES.height / 7,
    width: SIZES.width - SIZES.sidePadding * 2,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding / 2,
    borderColor: Colors.light.primary,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
  },
  uploadFileIcon: {
    justifyContent: 'center',
  },
  fileIcon: {
    fontSize: 50,
    color: Colors.light.primary,
    alignSelf: 'center',
  },
  uploadFileDescription: {
    flex: 0.8,
    marginTop: SIZES.padding / 2,
    marginLeft: SIZES.padding / 2,
  },
  fileDescriptionTitle: {
    color: Colors.light.slate600,
  },
  fileDescriptionSubtitle: {
    marginTop: SIZES.padding / 4,
    color: Colors.light.slate500,
  },
  uploadFileGenerateButton: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  generateButton: {
    backgroundColor: Colors.light.primary,
    padding: SIZES.base,
    borderRadius: 4,
  },
  generateButtonText: {
    color: Colors.light.tint,
  },
  uploadFileCancel: {
    position: 'absolute',
    top: 5,
    right: 20,
  },
  fileCancel: {
    fontSize: 20,
    color: Colors.light.slate500,
  },
});
