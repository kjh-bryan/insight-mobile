import React, { Ref, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text } from './Themed';
import { ThemeUtils } from '../utils/ThemeUtils';
import * as Progress from 'react-native-progress';
import Lottie from 'lottie-react-native';
import { Easing } from 'react-native-reanimated';

type LoadingModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  displayText: string;
  progress: number;
  children?: React.ReactElement;
  scaleValue?: any;
  stopFunction?: (status: boolean) => Promise<void>;
  animationRef: any;
};

export function LoadingModal({
  scaleValue,
  showModal,
  displayText,
  progress,
  children,
  animationRef,
}: LoadingModalProps) {
  const {
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
    themeTextStyle,
  } = ThemeUtils();

  console.log('progress :', progress);
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContainer,
            themeBackgroundStyle,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View style={styles.modalTopContainer}>
            <View style={{ alignItems: 'center' }}></View>
            <View style={{ alignItems: 'center' }}></View>
            <Text style={[styles.modalSubtitle, themeTextStyle]}>
              {displayText}
            </Text>
          </View>
          <View style={styles.modalBottomContainer}>
            <Progress.Bar
              progress={progress}
              color={Colors.default.primary}
              width={null}
              style={styles.progressBar}
            />
            <Text style={styles.progressDesc}>{`${Math.floor(
              progress * 100
            )}% / 100%`}</Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 10,
  },
  modalTopContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  modalBottomContainer: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: Colors.light.slate500,
    paddingHorizontal: SIZES.base,
    paddingBottom: SIZES.padding - 4,
  },
  closeModal: {
    fontSize: 20,
    color: Colors.light.slate500,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  modalSubtitle: {
    fontSize: SIZES.h2 - 4,
    marginVertical: 20,
    textAlign: 'center',
    color: Colors.light.slate600,
  },
  modalButton: {
    flex: 0.5,
    alignItems: 'center',
    paddingVertical: 20,
  },
  modalButtonRightSeparator: {
    borderRightColor: Colors.light.slate500,
    borderRightWidth: 0.5,
  },
  modalButtonLeftSeparator: {
    borderLeftColor: Colors.light.slate500,
    borderLeftWidth: 0.5,
  },
  buttonLabel: {
    fontSize: SIZES.h2 - 2,
  },
  buttonLabelLeftColor: {
    color: Colors.light.slate600,
  },
  buttonLabelRightColor: {
    color: Colors.light.primary,
  },
  progressBar: {
    marginVertical: 4,
  },
  progressDesc: {
    textAlign: 'center',
    marginTop: 4,
    fontSize: SIZES.h3 + 2,
  },
});
