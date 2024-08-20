import { useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';

const useNetInfoListener = (navigation : any  ,Path : string) => {
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                Toast.show({ type: 'error', text1: '인터넷이 연결되어 있지 않아요.', position: 'bottom' });
                setTimeout(() => {
                    navigation.navigate(Path);
                }, 500);
            }
        });

        return unsubscribe;
    }, [navigation , Path]);
};

export default useNetInfoListener;
