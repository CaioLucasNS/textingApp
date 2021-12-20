import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../styles/global';

export const Container = ({ children, style }) => (
    <View style={[styles.container, style]}>
        {children}
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.containerPrimary,
        justifyContent: 'center'
    }
})