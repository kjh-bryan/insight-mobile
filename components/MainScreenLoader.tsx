import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';
import { SIZES } from '../constants/Theme';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width - SIZES.padding * 2;
export const MainScreenLoader = () => {
  return (
    <ContentLoader
      speed={3}
      width={width}
      height={700}
      viewBox='0 0 363 700'
      backgroundColor={Colors.default.loaderBackground}
      foregroundColor={Colors.default.loaderForeground}
      style={{ marginTop: 8 }}
    >
      <Rect x='0' y='0' rx='6' ry='6' width='363' height='100' />
      <Rect x='0' y='232' rx='6' ry='6' width='363' height='100' />
      <Rect x='0' y='348' rx='6' ry='6' width='363' height='100' />
      <Rect x='0' y='116' rx='6' ry='6' width='363' height='100' />
      <Rect x='0' y='464' rx='6' ry='6' width='363' height='100' />
      <Rect x='0' y='580' rx='6' ry='6' width='363' height='100' />
    </ContentLoader>
  );
};
