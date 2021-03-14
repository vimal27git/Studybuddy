import React from 'react'
import {StyleSheet, Text,} from 'react-native'
import {Container, Spinner} from 'native-base'
import { ActivityIndicator } from "react-native-paper";

const EmptyContainer = () => {
    return(
        <Container style={styles.emptyContainer}>
          <ActivityIndicator animating={true} color={"#3498db"} />
        </Container>
    )
}

export default EmptyContainer

const styles = StyleSheet.create({
    emptyContainer: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: "center"
    }
})