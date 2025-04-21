import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Noah() {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>Hello, my name is Noah!</Text>
            <Image source={require("../../assets/images/IMG_3287.jpg")} style={styles.image} />
            <Text style={styles.bioText}>I am currently a sophmore majoring in Computer Engineering. I love to play the guitar and piano, as well as video games.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#fff",
        paddingTop: 60,
    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        paddingBottom: 40,
    },
    image: {
        width: 300,
        height: 500,
        resizeMode: "cover",
    },
    bioText: {
        fontSize: 20,
        paddingTop: 50,
    }
});