import React, { Ref } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import {
  FontAwesome,
  MaterialIcons,
  Ionicons,
  Entypo,
} from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { SIZES } from '../constants/Theme';
import { Text } from './Themed';

type CustomModalProps = {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactElement;
  scaleValue?: any;
};

export function CustomModal({
  scaleValue,
  showModal,
  setShowModal,
  children,
}: CustomModalProps) {
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackground}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <View style={styles.modalTopContainer}>
            <View style={{ alignItems: 'center' }}></View>
            <View style={{ alignItems: 'center' }}>{children}</View>
            <Text style={styles.modalSubtitle}>Listening..</Text>
          </View>
          <View style={styles.modalBottomContainer}>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonRightSeparator]}
              onPress={() => {
                setTimeout(() => setShowModal(false), 200);
                Animated.timing(scaleValue, {
                  toValue: 0,
                  duration: 200,
                  useNativeDriver: true,
                }).start();
              }}
            >
              <Text style={[styles.buttonLabelLeftColor, styles.buttonLabel]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalButtonLeftSeparator]}
            >
              <Text style={[styles.buttonLabelRightColor, styles.buttonLabel]}>
                Complete
              </Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderTopColor: Colors.light.slate500,
    borderTopWidth: 0.5,
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
    fontSize: SIZES.h2,
    marginVertical: 30,
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
});
