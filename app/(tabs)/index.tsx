import React from 'react';
import { Animated, StyleSheet, useColorScheme } from 'react-native';
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
import { ThemeUtils } from '../../utils/ThemeUtils';

export default function HomeScreen() {
  const [showModal, setShowModal] = useState(false);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const {
    themeTextStyle,
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
  } = ThemeUtils();

  return (
    <View style={[styles.container, themeBackgroundStyle]}>
      <View style={[styles.titleHeader, themeBackgroundStyle]}>
        <Text style={[styles.title, themeTextStyle]}>
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
      <View style={[styles.hugeButtonContainer, themeBackgroundStyle]}>
        <TouchableOpacity
          style={[styles.hugeButton, themeSecondaryBackgroundStyle]}
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
      <View style={[styles.hugeButtonContainer, themeBackgroundStyle]}>
        <TouchableOpacity
          style={[styles.hugeButton, themeSecondaryBackgroundStyle]}
        >
          <MaterialIcons
            name="file-download"
            style={styles.hugeButtonIcon}
            color={Colors.light.primary}
          />
          <Text style={styles.hugeButtonLabel}>Import Lecture Notes</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.uploadFileContainer, themeBackgroundStyle]}>
        <View style={[styles.uploadFile, themeBackgroundStyle]}>
          <View style={[styles.uploadFileIcon, themeBackgroundStyle]}>
            <Ionicons name="document-text" style={styles.fileIcon} />
          </View>
          <View style={[styles.uploadFileDescription, themeBackgroundStyle]}>
            <Text style={[themeTextStyle]}>Database System Lecture 1</Text>
            <Text style={[styles.fileDescriptionSubtitle, themeTextStyle]}>
              402kb
            </Text>
          </View>
          <View style={[styles.uploadFileGenerateButton, themeBackgroundStyle]}>
            <TouchableOpacity style={styles.generateButton}>
              <Text style={[styles.generateButtonText]} weight="bold">
                Generate Flashcard
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.uploadFileCancel, themeBackgroundStyle]}>
            <TouchableOpacity>
              <Entypo name="cross" style={styles.fileCancel} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  titleHeader: {
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
  fileDescriptionSubtitle: {
    marginTop: SIZES.padding / 4,
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
    color: Colors.dark.text,
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
