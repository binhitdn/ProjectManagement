import {StyleSheet, Text, View, Modal} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '@constants/styles';

const ModalComponent = ({
  children,
  textHeader,
  isVisible,
  setModalVisible,
  ...props
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>{textHeader}</Text>
            <Icon
              name="close"
              size={20}
              color={COLORS.ICON}
              onPress={() => setModalVisible(false)}
              style={styles.modalClose}
            />
          </View>
          <View style={styles.modalBody}>
            {children ? children : <Text>Modal Body</Text>}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: COLORS.MODAL_BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  modalView: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    margin: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: COLORS.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: COLORS.SHADOW,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
  },
  modalHeaderText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.TEXT,
  },
  modalClose: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.TEXT,
  },
  modalBody: {
    minHeight: 100,
    padding: 10,
    width: '100%',
  },
});
