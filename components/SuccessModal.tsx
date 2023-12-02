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
import { AntDesign } from '@expo/vector-icons';

type SuccessModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  displayText: string;
  children?: React.ReactElement;
  scaleValue?: any;
  stopFunction?: (status: boolean) => Promise<void>;
  animationRef: any;
};

export function SuccessModal({
  scaleValue,
  showModal,
  setShowModal,
  displayText,
  children,
  animationRef,
}: SuccessModalProps) {
  const {
    themeBackgroundStyle,
    themeSecondaryBackgroundStyle,
    themeTextStyle,
  } = ThemeUtils();

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
            <View style={{ alignItems: 'center' }}>
              <AntDesign
                name="checkcircleo"
                size={40}
                color={Colors.default.primary}
              />
            </View>
            <Text style={[styles.modalSubtitle, themeTextStyle]}>
              {displayText}
            </Text>
          </View>
          <View style={styles.modalBottomContainer}>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  marginTop: 10,
                  paddingVertical: SIZES.base,
                  paddingHorizontal: SIZES.base,
                  backgroundColor: Colors.default.primary,
                  borderRadius: SIZES.base,
                  width: '80%',
                  alignItems: 'center',
                }}
                onPress={() => {
                  // handleCreateSubject();
                  setTimeout(() => {
                    Animated.timing(scaleValue, {
                      toValue: 0,
                      duration: 300,
                      useNativeDriver: true,
                    }).start(() => {
                      setShowModal(false);
                    });
                  }, 2000);
                }}
              >
                <Text
                  style={{ fontSize: SIZES.h3, color: Colors.default.white }}
                >
                  Confirm
                </Text>
              </TouchableOpacity>
            </View>
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
