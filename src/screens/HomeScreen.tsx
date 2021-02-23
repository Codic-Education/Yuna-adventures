import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const LoadingScreen = () => {
    return (
        <View>
            <Text>HomeScreen</Text>
        </View>
    )
}

export default LoadingScreen

const styles = StyleSheet.create({
    loadingScreen: {
        flex:1, 
        justifyContent:"center",
        alignItems:"center"
        
    }
})
