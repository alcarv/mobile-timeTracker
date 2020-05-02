import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';

class CardComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            busca: '',
            arrTipos: []
        };
    }

    render(){
        return(
            <View style={styles.container}>
                <Image source={{uri: this.props.imgUrl}} style={styles.img}></Image>
                <Text style={styles.txt}>{this.props.nome}</Text>
            </View>
        ) 
    }
}

const styles = StyleSheet.create({ 
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: '46%',
        height: 150
    },
    img: {
        width: '100%',
        height: '80%',
        borderRadius: 10
    },
    txt: {
        color: '#FF473A'
    }
});

export default CardComponent;