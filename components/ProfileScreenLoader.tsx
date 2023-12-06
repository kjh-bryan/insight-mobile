import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';
import { SIZES } from '../constants/Theme';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width - SIZES.padding * 2;
export const ProfileScreenLoader = () => {
  return (
    <ContentLoader
      speed={3}
      width={width}
      height={750}
      viewBox='0 0 363 750'
      backgroundColor={Colors.default.loaderBackground}
      foregroundColor={Colors.default.loaderForeground}
      style={{ marginTop: 8 }}
    >
      <Rect x='0' y='0' rx='3' ry='3' width='88' height='20' />
      <Rect x='0' y='28' rx='3' ry='3' width='161' height='30' />
      <Rect x='0' y='91' rx='3' ry='3' width='178' height='15' />
      <Rect x='20' y='121' rx='8' ry='8' width='315' height='220' />
      <Rect x='20' y='370' rx='8' ry='8' width='95' height='115' />
      <Rect x='130' y='370' rx='8' ry='8' width='95' height='115' />
      <Rect x='240' y='370' rx='8' ry='8' width='95' height='115' />
      <Rect x='0' y='505' rx='3' ry='3' width='178' height='10' />
      <Rect x='20' y='540' rx='5' ry='5' width='293' height='120' />
      <Rect x='20' y='680' rx='15' ry='15' width='290' height='50' />
    </ContentLoader>
  );
};
