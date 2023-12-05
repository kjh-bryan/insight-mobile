import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';
import { SIZES } from '../constants/Theme';
import Colors from '../constants/Colors';

const width = Dimensions.get('window').width - SIZES.padding * 2;
export const QuestionLoader = () => (
  <ContentLoader
    speed={2}
    width={width}
    height={700}
    viewBox='0 0 363 700'
    backgroundColor={Colors.default.loaderBackground}
    foregroundColor={Colors.default.loaderForeground}
  >
    <Rect x='0' y='24' rx='4' ry='4' width='363' height='8' />
    <Rect x='0' y='45' rx='4' ry='4' width='26' height='10' />
    <Rect x='0' y='100' rx='4' ry='4' width='363' height='50' />
    <Rect x='0' y='200' rx='8' ry='8' width='363' height='90' />
    <Rect x='0' y='300' rx='8' ry='8' width='363' height='90' />
    <Rect x='0' y='400' rx='8' ry='8' width='363' height='90' />
    <Rect x='0' y='500' rx='8' ry='8' width='363' height='90' />
    <Rect x='75' y='658' rx='8' ry='8' width='210' height='40' />
  </ContentLoader>
);
