import React from 'react';
import { View, StyleSheet } from 'react-native';

// import { Container } from './styles';

export const Container = ({ children, style }) => (
    <View style={[styles.container, style]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#121214'
    }
})