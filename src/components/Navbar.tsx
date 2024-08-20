import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const { width } = Dimensions.get('window');

const createStyles = (isDarkMode: boolean) => StyleSheet.create({
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

function Navbar(props: any) {
    const isDarkMode = useColorScheme() === 'dark';

    const styles = createStyles(isDarkMode);

    return (
        <>
            <TouchableOpacity style={styles.titleContainer} onPress={() => props.navigation.navigate(props.NavigatePath)}>
                <Icon name={props.name} style={styles.backIcon} />
                <Text style={styles.title}>{props.title}</Text>
            </TouchableOpacity>
        </>
    );
}

export default Navbar;
