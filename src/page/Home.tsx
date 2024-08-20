import { StyleSheet, Text, ScrollView, TouchableOpacity, Dimensions, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar';
import fetchSchoolData from '../utils/schoolService';

const { width } = Dimensions.get('window');

const Home = ({ navigation }: any) => {
  const [schoolData, setSchoolData] = useState<any>(null);

  const styles = createStyles(useColorScheme() === 'dark');

  useEffect(() => {
    const fetchSchoolInfo = async () => {
      setSchoolData(await fetchSchoolData());
    };
    fetchSchoolInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <Navbar navigation={navigation} name="home" title="캘린더 프로 설정" NavigatePath="Home" />

      <TouchableOpacity style={styles.container} onPress={() => { navigation.navigate('SchoolModification'); }}>
        <Text style={styles.schoolTitle}>
          🏫 {schoolData ? schoolData.name : '학교가 설정되지 않았어요!'}
        </Text>
        <Text style={styles.schoolAddress}>
          {schoolData ? schoolData.region : '아래서 학교를 검색해보세요!'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.AcademicContainer} onPress={() => { navigation.navigate('AcademicCalendar'); }}>
        <Icon name="calendar" style={styles.AcademicIcon} />
        <Text style={styles.AcademicTitle}>학사 일정</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
  AcademicIcon: {
    color: isDarkMode ? '#f8f6fa' : '#000000',
    marginRight: 8,
    fontSize: 30,
    lineHeight: 30,
  },
  AcademicContainer: {
    width: width - 10,
    alignItems: 'center',
    padding: 15,
    borderRadius: 15,
    backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    marginTop: 15,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    flexDirection: 'row',
  },
  AcademicTitle: {
    fontSize: 22,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: isDarkMode ? '#FFFFFF' : '#000000',
    lineHeight: 30,
  },
  scrollView: {
    flex: 1,
    backgroundColor: isDarkMode ? '#000000' : '#F8F8F8',
  },
  scrollContainer: {
    padding: 40,
    alignItems: 'center',
  },
  container: {
    width: width - 10,
    padding: 15,
    borderRadius: 15,
    backgroundColor: isDarkMode ? '#2e2c30' : '#efeef2',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  schoolTitle: {
    fontSize: 19,
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: isDarkMode ? '#FFFFFF' : '#000000',
  },
  schoolAddress: {
    marginTop: 5,
    fontSize: 15,
    color: '#B0B0B0',
  },
});

export default Home;
