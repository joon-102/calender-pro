import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchSchoolData = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem('@School_Code');
        return (jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch {
        return (false);
    }
};

export default fetchSchoolData;
