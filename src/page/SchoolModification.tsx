import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, useColorScheme, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import axios from 'axios';

const { width } = Dimensions.get('window');

const fetchSchoolData = async (setIsSchoolSaved: React.Dispatch<React.SetStateAction<boolean>>) => {
    try {
        const jsonValue = await AsyncStorage.getItem('@School_Code');
        setIsSchoolSaved(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch {
        setIsSchoolSaved(false);
    }
};

const onSchoolSelection = async (navigation: any, searchResults: any, schulCode: any) => {
    const find = searchResults.find((data: { SD_SCHUL_CODE: string }) => { return data.SD_SCHUL_CODE === schulCode; });
    try {
        Toast.show({ type: 'success', text1: '학교 설정 완료!', position: 'bottom' });
        const jsonValue = JSON.stringify({ name: find.SCHUL_NM, region: find.ORG_RDNMA });
        await AsyncStorage.setItem('@School_Code', jsonValue);
        setTimeout(() => {
            navigation.navigate('Home');
        }, 300);
    } catch (_) {
        Toast.show({ type: 'success', text1: '학교 등록을 실패했어요, 다시 시도해 주세요', position: 'bottom' });
    }
};

function SchoolModification({ navigation }: any) {
    const [isSchoolSave, setIsSchoolSaved] = useState<any | null>(false);
    const [searchResults, setSearchResults] = useState([]); // API 응답 결과
    const [input, setInput] = useState('');

    const textInputRef: any = useRef(null);

    const isDarkMode = useColorScheme() === 'dark';
    const styles = createStyles(isDarkMode);

    useEffect(() => {
        fetchSchoolData(setIsSchoolSaved);
    }, [isSchoolSave]);

    useEffect(() => {
        if (input.length === 0) {
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
                <Icon name="left" style={styles.backIcon} />
                <Text style={styles.title}>학교 설정</Text>
            </TouchableOpacity>

            {isSchoolSave ? (
                <View style={styles.school}>
                    <Text style={styles.schoolTitle}>🏫 {isSchoolSave?.name}</Text>
                    <Text style={styles.schoolAddress}>{isSchoolSave?.region}</Text>
                </View>
            ) : (
                <View style={styles.school}>
                    <Text style={styles.noSchoolTitle}>🏫 학교가 설정되지 않았어요!</Text>
                    <Text style={styles.noSchoolAddress}>아래서 학교를 검색해보세요!</Text>
                </View>
            )}

            <Text style={styles.schoolContainerTitle}>학교 등록</Text>

            <TouchableWithoutFeedback onPress={() => {
                if (textInputRef.current) {
                    textInputRef.current.focus();
                }
            }}>
                <View style={styles.inputContainer}>
                    <Icon name="search1" style={styles.inputIcon} />
                    <TextInput ref={textInputRef} style={styles.inputValue} placeholder="학교명을 입력해주세요." value={input} onChangeText={setInput} placeholderTextColor="#B0B0B0" />
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.listSchool}>
                {searchResults.map((message: any) => (
                    <TouchableOpacity key={message.SD_SCHUL_CODE} onPress={() => onSchoolSelection(navigation, searchResults, message.SD_SCHUL_CODE)} >
                        <Text style={styles.listSchoolTitle}>{message.SCHUL_NM}</Text>
                        <Text style={styles.listSchoolAddress}>{message.ORG_RDNMA}</Text>
                    </TouchableOpacity >
                ))}
            </View>
        </ScrollView>
    );
}

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
    schoolContainerTitle: {
        color: '#B0B0B0',
        marginBottom: 0,
        marginTop: 5,
        fontSize: 14,
        width: width - 25,
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
    school: {
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
    inputContainer: {
        marginTop: 5,
        marginBottom: 8,
        borderColor: '#ccc',
        flexDirection: 'row',
        alignItems: 'center',
        width: width - 10,
        padding: 10,
        borderRadius: 15,
        backgroundColor: isDarkMode ? '#18161a' : '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    inputIcon: {
        marginLeft: 5,
        color: isDarkMode ? '#FFFFFF' : '#18161a',
        width: '10%',
        fontSize: 30,
    },
    inputValue: {
        color: isDarkMode ? '#FFFFFF' : '#18161a',
        fontSize: 18,
        fontWeight: '400',
        flex: 1,
    },
    listSchool: {
        width: width - 10,
        borderRadius: 15,
        backgroundColor: isDarkMode ? '#18161a' : '#FFFFFF',
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        marginBottom: -6,
    },
    listSchoolTitle: {
        fontSize: 18.5,
        marginLeft: 10,
        marginTop: 5,
        marginBottom: 5,
        fontFamily: 'Roboto',
        fontWeight: '400',
        color: isDarkMode ? '#FFFFFF' : '#000000',
    },
    listSchoolAddress: {
        marginLeft: 10,
        marginTop: 0,
        marginBottom: 10,
        fontSize: 13,
        color: '#B0B0B0',
    },
    separator: {
        height: 1,
        width: width,
        backgroundColor: isDarkMode ? '#333333' : '#DDDDDD',
        marginVertical: 15,
    },
});

export default SchoolModification;
