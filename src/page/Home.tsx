import React, { useState , useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async (setIsSchoolSave : any) => {
    try {
      const value = await AsyncStorage.getItem('@School_Code');

      if (value !== null) {
        setIsSchoolSave(true);
      } else {
        setIsSchoolSave(false);
      }
    } catch (e) {
        setIsSchoolSave(false);
    }
};

const { width } = Dimensions.get('window');

const Home = ({ navigation }: any) => {
  const [isSchoolSave, setIsSchoolSave] = useState(true);
  const isDarkMode = useColorScheme() === 'dark';

  const styles = createStyles(isDarkMode);
  const schoolStyles = createSchoolStyles(isDarkMode);

  const handleSchoolPress = () => {
    navigation.navigate('SchoolModification');
  };

  useEffect(() => {
    getData(setIsSchoolSave);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <Text style={styles.title}>캘린더 프로 설정</Text>

      <View style={styles.separator} />

      <TouchableOpacity style={schoolStyles.school} onPress={handleSchoolPress}>
        {isSchoolSave ? (
          <>
            <Text style={schoolStyles.schoolTitle}>🏫 서울대학교사범대학부설고등학교</Text>
            <Text style={schoolStyles.schoolAddress}>서울특별시 성북구 월곡로 6 (종암동)</Text>
          </>
        ) : (
          <>
            <Text style={schoolStyles.noSchoolTitle}>🏫 학교가 설정되지 않았어요!</Text>
            <Text style={schoolStyles.noSchoolAddress}>여기를 눌러 학교를 등록해주세요.</Text>
          </>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000000' : '#F8F8F8',
  },
  scrollContainer: {
    padding: 40,
    alignItems: 'center',
  },
  title: {
    marginTop: -20,
    width: width - width / 10,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '700',
    color: isDarkMode ? '#FFFFFF' : '#000000',
    marginBottom: 5,
  },
  separator: {
    height: 1,
    width: width,
    backgroundColor: isDarkMode ? '#333333' : '#DDDDDD',
    marginVertical: 15,
  },
});

const createSchoolStyles = (isDarkMode: boolean) => StyleSheet.create({
  school: {
    width: width - 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop : 0,
    marginBottom: 20,
  },
  schoolTitle: {
    fontSize: 19,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  noSchoolTitle: {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '500',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  schoolAddress: {
    marginTop: 5,
    fontSize: 15,
    color: '#B0B0B0',
  },
  noSchoolAddress: {
    marginTop: 5,
    fontSize: 15,
    color: '#B0B0B0',
  },
});

export default Home;
