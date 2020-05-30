import React, { Component } from "react";
import { StyleSheet, View } from "react-native";

class CadastroComponent extends Component{

    constructor(props) {
        super(props);
    }


    render(){
        return (
             <View style={styles.container}>
                
            </View>
        )
    }

}


const styles = StyleSheet.create({ 
    container:{
        display: "flex",
        flexDirection: "column",
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#FF473A'
    }
});


export default CadastroComponent;