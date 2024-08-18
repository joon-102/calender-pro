import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, useColorScheme, TextInput, TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const { width } = Dimensions.get('window');

function SchoolModification({ navigation }: any) {
    const [isSchoolSave, _setIsSchoolSave] = useState(true);
    const [searchResults, setSearchResults] = useState([]); // API 응답 결과
    const [input, setInput] = useState('');

    const textInputRef: any = useRef(null);

    const isDarkMode = useColorScheme() === 'dark';
    const styles = createStyles(isDarkMode);

    useEffect(() => {
        if (input.length === 0  ) {
            setSearchResults([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get('https://open.neis.go.kr/hub/schoolInfo', {
                    params: { Type: 'json', SCHUL_NM: input },
                });
                setSearchResults(response.data.schoolInfo[1].row);
            } catch (error: any) {
                // Nothing
            }
        };

        fetchSearchResults();
    }, [input]);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            if (!state.isConnected) {
                Toast.show({ type: 'error', text1: '인터넷이 연결되어 있지 않아요.', position: 'bottom' });
                setTimeout(() => {
                    navigation.navigate('Home');
                }, 500);
            }
        });
        return () => {
            unsubscribe();
        };
    }, [navigation]);


    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
            <TouchableOpacity style={styles.titleContainer} onPress={() => navigation.navigate('Home')} >
                <Text style={styles.title}>학교 설정</Text>
                <Icon name="close" style={styles.backIcon} />
            </TouchableOpacity>

            <View style={styles.separator} />

            {isSchoolSave ? (
                <View style={styles.school} >
                    <Text style={styles.schoolTitle}>🏫 서울대학교사범대학부설고등학교</Text>
                    <Text style={styles.schoolAddress}>서울특별시 성북구 월곡로 6 (종암동)</Text>
                </View>
            ) : (
                <View style={styles.school}>
                    <Text style={styles.noSchoolTitle}>🏫 학교가 설정되지 않았어요!</Text>
                    <Text style={styles.noSchoolAddress}>학교를 검색해 선택해주세요!</Text>
                </View>
            )}
            <View style={styles.separator} />

            <TouchableWithoutFeedback onPress={() => {
                if (textInputRef.current) {
                    textInputRef.current.focus();
                }
            }}>
                <View style={styles.inputContainer}>
                    <Icon name="search1" style={styles.inputIcon} />
                    <TextInput ref={textInputRef} style={styles.inputValue} placeholder="학교명을 입력해주세요." value={input} onChangeText={setInput} placeholderTextColor="#B0B0B0" />
                </View >
            </TouchableWithoutFeedback>

            <View >
                {searchResults.map((message: any) => (
                    <View style={styles.listSchool} key={message.SD_SCHUL_CODE} >
                        <Text style={styles.listSchoolTitle}>{message.SCHUL_NM}</Text>
                        <Text style={styles.listSchoolAddress}>{message.ORG_RDNMA}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

function createStyles(isDarkMode: boolean) {
    return StyleSheet.create({
        listSchool : {
            width: width - 10,
            padding: 10,
            borderRadius: 15,
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            marginBottom : 8,
        },
        listSchoolTitle: {
            fontSize: 18.5,
            fontFamily: 'Roboto',
            fontWeight: '400',
            color: isDarkMode ? '#FFFFFF' : '#000000',
        },
        listSchoolAddress : {
            marginTop: 5,
            fontSize: 13,
            color: '#B0B0B0',
        },
        backIcon: {
            width: '10%',
            fontSize: 30,
        },
        inputIcon: {
            marginLeft: 5,
            color: isDarkMode ? '#FFFFFF' : '#1E1E1E',
            width: '10%',
            fontSize: 30,
        },
        inputValue: {
            color: isDarkMode ? '#FFFFFF' : '#1E1E1E',
            fontSize: 18,
            fontWeight: '400',
        },
        titleContainer: {
            marginTop: -20,
            flexDirection: 'row',
            alignItems: 'center',
        },
        inputContainer: {
            marginTop : -5,
            marginBottom : 8,
            borderColor: '#ccc',
            flexDirection: 'row',
            alignItems: 'center',
            width: width - 10,
            padding: 10,
            borderRadius: 15,
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
        },
        input: {
            width: width - 10,
            padding: 15,
            borderRadius: 15,
            backgroundColor: isDarkMode ? '#1E1E1E' : '#FFFFFF',
            shadowColor: '#000000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 4,
            fontFamily: 'Roboto',
            fontSize: 20,
        },
        scrollView: {
            flex: 1,
            backgroundColor: isDarkMode ? '#000000' : '#F8F8F8',
        },
        scrollContainer: {
            padding: 40,
            alignItems: 'center',
        },
        title: {
            width: '102%',
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
}

export default SchoolModification;
