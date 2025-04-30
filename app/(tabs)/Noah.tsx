import React from "react";
import { ScrollView, View, Text,TextInput, StyleSheet, Image, } from "react-native";
import { useState } from "react";

export default function Noah() {
    const[text, setText] = useState("")
    // function that on submit of the text input changes text value to the value in the input
    const handleText = () => {
        if (verifyText(text)) {
            console.log("Text matches!");
        } else {
            console.log("Text does not match.");
        }
    };

    // function that verifys if the text entered mathces desired text
    const verifyText = (input: string) => {
        const trimmedInput = input.trim();
        return trimmedInput === "The cat in the hat."
    };

    return (
        <View style={styles.container}>
            <ScrollView>
            <Text style={styles.nameText}>Hello, my name is Noah!</Text>
            <Image source={require("../../assets/images/IMG_3287.jpg")} style={styles.image} />
            <Text style={styles.bioText}>I am currently a sophmore majoring in Computer Engineering. I love to play the guitar and piano, as well as video games.</Text>
            <Text style={styles.bioText}>The cat in the hat.</Text>    
            <TextInput
                style={styles.input}
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleText}
                placeholder="Start typing"
                />
            </ScrollView>
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
        paddingBottom: 100,
    },
    input: {
        height: 40,
        width: 300,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        marginBottom: 20,
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
    },
});