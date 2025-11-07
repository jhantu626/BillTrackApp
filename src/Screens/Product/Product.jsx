import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Layout} from '../Layout';
import {
  BottomSheetInput,
  ProductCard,
  ProductCardRow,
  SecondaryHeader,
  SimpleTextInput,
} from '../../Components';
import {font, gap, icon, isTabletDevice, margin, padding} from '../../utils/responsive';
import Lucide from '@react-native-vector-icons/lucide';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import Octicons from '@react-native-vector-icons/octicons';

const {width: screenWidth} = Dimensions.get('window');
const NUMBER_OF_COLUMNS = isTabletDevice ? 4 : 3;
const HORIZONTAL_PADDING = 16;
const GAP_BETWEEN_ITEMS = 10;
const ITEM_WIDTH =
  (screenWidth -
    HORIZONTAL_PADDING * 2 -
    GAP_BETWEEN_ITEMS * (NUMBER_OF_COLUMNS - 1)) /
  NUMBER_OF_COLUMNS;
const imageWidth = screenWidth - HORIZONTAL_PADDING * 2;
const imageHeight = imageWidth * 2;

const Product = () => {
  const [showModal, setShowModal] = useState(false);
  const [isColumn, setIsColumn] = useState(true);

  const [productName, setProductName] = useState('');

  const handleOpenCloseModal = () => {
    setShowModal(prev => !prev);
  };

  const renderItem = useCallback(
    ({item, index}) =>
      isColumn ? (
        <ProductCard
          width={ITEM_WIDTH}
          item={{
            id: index,
            title: `Product ${index}`,
            price: 1000,
            image: require('./../../../asset/images/emptyimg.jpg'),
          }}
          handleLongPress={handleOpenCloseModal}
          editFunction={handleOpenCloseModal}
        />
      ) : (
        <ProductCardRow onpressCard={handleOpenCloseModal} />
      ),
    [isColumn, handleOpenCloseModal],
  );

  return (
    <Layout>
      <SecondaryHeader
        title={'Product List'}
        isApps={true}
        handleAppClick={() => {
          setIsColumn(prev => !prev);
        }}
      />
      <FlatList
      key={isColumn?'d':'re'}
        style={{flex: 1}}
        contentContainerStyle={styles.container}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
        keyExtractor={(_, index) => index + '_items'}
        renderItem={renderItem}
        numColumns={isColumn ? NUMBER_OF_COLUMNS : 1}
        columnWrapperStyle={isColumn && styles.columnWrapperStyle}
      />
      <TouchableOpacity style={styles.addBtn} onPress={handleOpenCloseModal}>
        <Text style={styles.addBtnText}>Add New Item</Text>
        <Lucide name="plus" size={10} color={'#fff'} />
      </TouchableOpacity>
      <Modal
        visible={showModal}
        animationType="slide"
        backdropColor={'#00000005'}
        onRequestClose={handleOpenCloseModal}>
        <Pressable onPress={handleOpenCloseModal} style={styles.modelContainer}>
          <Pressable onPress={() => {}} style={styles.modelSubContainer}>
            <View style={styles.imageCOntainer}>
              <Image
                style={styles.image}
                source={require('./../../../asset/images/productimage.jpg')}
                resizeMode="cover"
              />
              <View style={styles.uploadBtnContainer}>
                <TouchableOpacity style={styles.uploadBtn}>
                  <Octicons name="upload" size={icon(14)} color={'#fff'} />
                  <Text style={styles.uploadBtnText}>Upload image</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputSubContainer}>
                <Text style={styles.labelText}>Product Name</Text>
                <SimpleTextInput
                  placeholder={''}
                  value={productName}
                  setValue={setProductName}
                />
              </View>
              <View style={[styles.inputDoubleContianer]}>
                <View style={[styles.inputSubContainer, {width: '45%'}]}>
                  <Text style={styles.labelText}>Unit</Text>
                  <BottomSheetInput label="" />
                </View>
                <View style={[styles.inputSubContainer, {width: '45%'}]}>
                  <Text style={styles.labelText}>Price</Text>
                  <SimpleTextInput placeholder={''} />
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.saveBtn, {backgroundColor: colors.error}]}>
                <Text style={styles.saveBtnText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Save</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: padding(16),
    marginTop: margin(16),
    paddingBottom: padding(80),
  },
  columnWrapperStyle: {
    gap: GAP_BETWEEN_ITEMS,
    paddingBottom: padding(16),
  },
  addBtn: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
    backgroundColor: colors.sucess,
    paddingHorizontal: padding(20),
    paddingVertical: padding(12),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    gap: gap(8),
  },
  addBtnText: {
    fontSize: font(12),
    fontFamily: fonts.inMedium,
    color: '#fff',
  },
  modelContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modelSubContainer: {
    backgroundColor: '#fff',
    marginHorizontal: margin(16),
    padding: padding(16),
    borderRadius: 5,
    width: screenWidth - HORIZONTAL_PADDING * 2,
  },
  imageCOntainer: {
    width: isTabletDevice?'40%':'100%',
    aspectRatio: 16 / 9,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  uploadBtnContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(5),
    paddingHorizontal: padding(isTabletDevice?18:24),
    paddingVertical: padding(isTabletDevice?8:10),
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  uploadBtnText: {
    fontSize: font(isTabletDevice?12:14),
    fontFamily: fonts.inBold,
    color: '#fff',
  },
  inputContainer: {
    marginVertical: 16,
  },
  inputSubContainer: {
    gap: gap(8),
  },
  inputDoubleContianer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: margin(10),
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: gap(16),
    marginBottom: 10,
  },
  saveBtn: {
    paddingVertical: padding(8),
    paddingHorizontal: margin(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sucess,
    borderRadius: 5,
  },
  saveBtnText: {
    fontSize: font(14),
    fontFamily: fonts.onSemiBold,
    color: '#fff',
  },
  labelText: {
    fontSize: font(12),
    fontFamily: fonts.onMedium,
    color: '#000',
  },
});

export default Product;
