import { StyleSheet, ScrollView, Text, Dimensions, useColorScheme, View } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import ToggleSwitch from 'toggle-switch-react-native';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message';

import Navbar from '../components/Navbar';
import useNetInfoListener from '../hook/useNetInfoListener';
import fetchSchoolData from '../utils/schoolService';

const { width } = Dimensions.get('window');

const AcademicCalendar = ({ navigation }: any) => {
    const styles = createStyles(useColorScheme() === 'dark');

    useNetInfoListener(navigation, 'Home');

    useEffect(() => {
        const fetchSchoolInfo = async () => {
            const searchResults = await fetchSchoolData();
            if (!searchResults) {
                Toast.show({ type: 'error', text1: '학교가 등록되지 않았어요.', position: 'bottom' });
                setTimeout(() => {
                    navigation.replace('Home');
                }, 100);
            }
        };
        fetchSchoolInfo();
    }, [navigation]);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
            <Navbar navigation={navigation} name="left" title="학사 일정" NavigatePath="Home" />
            <View style={styles.active}>
                <Icon name="calendar" style={styles.activeIcon} />
                <Text style={styles.activeTitle}>학사일정</Text>
                <ToggleSwitch
                    isOn={true}
                    onColor="gray"
                    offColor="black"
                    labelStyle={styles.test}
                    size="medium"
                    onToggle={isOn => console.log('changed to : ', isOn)}
                />
            </View>
        </ScrollView>
    );
};

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    test : {
        color: 'black',
        fontWeight: '900',
    },
    scrollContainer: {
        padding: 40,
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        backgroundColor: isDarkMode ? '#000000' : '#F8F8F8',
    },
    active: {
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
    activeTitle: {
        fontSize: 22,
        fontFamily: 'Roboto',
        fontWeight: '600',
        color: isDarkMode ? '#FFFFFF' : '#000000',
        lineHeight: 30,
    },
    activeIcon: {
        color: isDarkMode ? '#f8f6fa' : '#000000',
        marginRight: 8,
        fontSize: 30,
        lineHeight: 30,
    },
});

export default AcademicCalendar;
