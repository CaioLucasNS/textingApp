import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import colors from '../../styles/global';

export const Container = ({ children, style }) => (
    <SafeAreaView style={[styles.container, style]}>
        {children}
    </SafeAreaView>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.containerPrimary,
        justifyContent: 'center'
    }
})