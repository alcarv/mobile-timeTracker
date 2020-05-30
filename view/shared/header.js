import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {connect} from 'react-redux'
import { Logout } from '../../redux/actions/auth';

class Headercomponent extends Component{

    constructor(props) {
        super(props);
    }

    back = () =>{
        this.props.navigation.goBack()
    }

    logout = () => {
        this.props.logout(this.props.navigation);
    }

    createLogo = () => {
        if(this.props.init){
            return (
                <TouchableOpacity onPress={this.logout}>
                    <Text style={styles.logo}>Logout</Text>
                </TouchableOpacity>
            )
        }else{
            return (
                <TouchableOpacity style={styles.imgTouch} onPress={this.back}>
                    <Image source={require('../../assets/back.png')} style={{height: 20, width: 20}}></Image>
                </TouchableOpacity>
            )
        }
    }

    createTitle = () => {
        if(this.props.cor == 'branco'){
            return <Text style={styles.titulo2}>{this.props.titulo}</Text>
        }else{
            return <Text style={styles.titulo}>{this.props.titulo}</Text>
        }
    }

    render(){
        return (
            <View style={styles.header}>
                {
                   this.createLogo()
                }
                {
                   this.createTitle()
                }
                <Image source={require('../../assets/profile.png')} style={styles.icone}></Image>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    icone:{
        width: 50,
        height: 50,
        borderRadius: 100
    },
    titulo: {
        color: '#FF473A',
        fontSize: 20
    },
    titulo2: {
        color: '#FFF',
        fontSize: 20
    },
    logo: {
        fontSize: 8,
        textAlign: "left"
    }
});

const mapDispatchtoProps = (dispatch) => {
    return {
        logout: (nav) => dispatch(Logout(nav))
    }
}

export default connect(null, mapDispatchtoProps)(Headercomponent);