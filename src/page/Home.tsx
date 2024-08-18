import { StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState, useCallback } from 'react';

const { width } = Dimensions.get('window');

const fetchSchoolData = async (setIsSchoolSaved: React.Dispatch<React.SetStateAction<boolean>>) => {
  try {
    const jsonValue = await AsyncStorage.getItem('@School_Code');
    setIsSchoolSaved(jsonValue != null ? JSON.parse(jsonValue) : null);
  } catch {
    setIsSchoolSaved(false);
  }
};

const Home = ({ navigation }: { navigation: any }) => {
  const [isSchoolSaved, setIsSchoolSaved] = useState<any | null>(true);
  const isDarkMode = useColorScheme() === 'dark';

  useFocusEffect(
    useCallback(() => {
      fetchSchoolData(setIsSchoolSaved);
    }, [])
  );

  const handleSchoolPress = () => {
    navigation.navigate('SchoolModification');
  };

  const styles = createStyles(isDarkMode);
  const schoolStyles = createSchoolStyles(isDarkMode);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" style={styles.backIcon} />
        <Text style={styles.title}>캘린더 프로 설정</Text>
      </TouchableOpacity>

      <TouchableOpacity style={schoolStyles.container} onPress={handleSchoolPress}>
        {isSchoolSaved ? (
          <>
            <Text style={schoolStyles.schoolTitle}>🏫 {isSchoolSaved?.name}</Text>
            <Text style={schoolStyles.schoolAddress}>{isSchoolSaved?.region}</Text>
          </>
        ) : (
          <>
            <Text style={schoolStyles.noSchoolTitle}>🏫 학교가 설정되지 않았어요!</Text>
            <Text style={schoolStyles.noSchoolAddress}>여기를 눌러 학교를 등록해주세요.</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.AcademicContainer} onPress={handleSchoolPress}>
        <Icon name="calendar" style={styles.AcademicIcon} />
        <Text style={styles.AcademicTitle}>학사 일정</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  AcademicIcon : {
    color: isDarkMode ? '#f8f6fa' : '#000000',
    marginRight: 10,
    fontSize: 30,
  },
  AcademicContainer : {
    width: width - 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    marginTop : 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
  },
  AcademicTitle : {
    fontSize: 20,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  scrollView: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000000' : '#F8F8F8',
  },
  scrollContainer: {
    padding: 40,
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: -10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backIcon: {
    color: isDarkMode ? '#f8f6fa' : '#000000',
    marginLeft: 30,
    marginRight: 8,
    fontSize: 28,
  },
  title: {
    width: width * 0.9,
    fontFamily: 'Roboto',
    fontSize: 24,
    fontWeight: '700',
    color: isDarkMode ? '#FFFFFF' : '#000000',
    marginBottom: 5,
  },
});

const createSchoolStyles = (isDarkMode: boolean) => StyleSheet.create({
  container: {
    width: width - 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: isDarkMode ? '#2e2c30' : '#efeef2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 0,
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
