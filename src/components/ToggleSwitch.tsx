import React, { useEffect, useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,
    Platform,
    I18nManager,
    ViewStyle,
} from 'react-native';

const ToggleSwitch: React.FC<any> = ({
    isOn,
    label,
    labelPosition = 'left',
    onColor = '#4cd137',
    offColor = '#ecf0f1',
    labelStyle = {},
    thumbOnStyle = {},
    thumbOffStyle = {},
    trackOnStyle = {},
    trackOffStyle = {},
    onToggle = () => { },
    icon = null,
    disabled = false,
    animationSpeed = 300,
    useNativeDriver = true,
    circleColor = 'white',
    hitSlop,
    ...rest
}) => {
    const [offsetX] = useState(new Animated.Value(0));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const dimensions = { width: 46, padding: 12, circleWidth: 18, translateX: 26 };

    // getToValue 함수는 useCallback 훅으로 메모이제이션
    const getToValue = useCallback(() => {
        if (I18nManager.isRTL) {
            return isOn ? -dimensions.width + dimensions.translateX : -1;
        } else {
            return isOn ? dimensions.width - dimensions.translateX : -1;
        }
    }, [isOn, dimensions]);

    useEffect(() => {
        const toValue = getToValue();
        Animated.timing(offsetX, {
            toValue,
            duration: animationSpeed,
            useNativeDriver,
        }).start();
    }, [animationSpeed, getToValue, offsetX, useNativeDriver]);


    const toggleSwitchStyle: ViewStyle = {
        justifyContent: 'center',
        width: dimensions.width,
        borderRadius: Platform.OS === 'windows' || Platform.OS === 'macos' ? 10 : 20,
        padding: dimensions.padding,
        backgroundColor: isOn ? onColor : offColor,
        paddingBottom: Platform.OS === 'windows' || Platform.OS === 'macos'
            ? dimensions.padding + 2
            : dimensions.padding,
        ... (isOn ? trackOnStyle : trackOffStyle),
    };

    const insideCircleStyle: ViewStyle = {
        alignItems: 'center',
        justifyContent: 'center',
        margin: Platform.OS === 'web' ? 0 : 4,
        left: Platform.OS === 'web' ? 4 : 0,
        position: 'absolute',
        backgroundColor: circleColor,
        transform: [{ translateX: offsetX }],
        width: dimensions.circleWidth,
        height: dimensions.circleWidth,
        borderRadius: dimensions.circleWidth / 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2.5,
        elevation: 1.5,
        ... (isOn ? thumbOnStyle : thumbOffStyle),
    };

    return (
        <View style={styles.container}>
            {label && labelPosition === 'left' && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
            <TouchableOpacity
                style={toggleSwitchStyle}
                activeOpacity={0.8}
                hitSlop={hitSlop}
                onPress={() => !disabled && onToggle(!isOn)}
                {...rest}
            >
                <Animated.View style={insideCircleStyle}>
                    {icon}
                </Animated.View>
            </TouchableOpacity>
            {label && labelPosition === 'right' && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    labelStyle: {
        marginHorizontal: 10,
    },
});

export default ToggleSwitch;
