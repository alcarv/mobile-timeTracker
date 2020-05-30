import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { SelectType, SelectEstab } from '../../redux/actions/auth';

class CardComponent extends Component {

    constructor(props) {
        super(props);
    }

    navegar = () => {
        if(this.props.parent == "home"){
            this.props.selecionarTipo({
                nome: this.props.nome.charAt(0).toUpperCase() + this.props.nome.slice(1),
                url: this.props.imgUrl
            });
            this.props.navigation.navigate('PorTipo');
        }else if(this.props.parent == "porTipo"){
            this.props.selecionarEstab(this.props.estab);
            this.props.navigation.navigate('infosEstab');
        }
    }

    render(){
        return(
            <View style={styles.container}>
                <TouchableHighlight underlayColor="#fff" style={styles.imgTouch} onPress={this.navegar}>
                    <Image source={{uri: this.props.imgUrl}} style={styles.img}></Image>
                </TouchableHighlight>
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
        width: '46%',
        height: 150
    },
    img: {
        width: '100%',
        height: '100%',
        borderRadius: 10
    },
    imgTouch: {
        width: '100%',
        height: '80%',
        display:"flex",
        flexDirection: "row",
        alignItems: "center"
    },
    txt: {
        color: '#FF473A'
    }
});

const mapDispatchtoProps = (dispatch) => {
    return {
        selecionarTipo: (selectedType) => {
            dispatch(SelectType(selectedType))
        },
        selecionarEstab: (estab) => {
            dispatch(SelectEstab(estab))
        }
    }
}

export default connect(null, mapDispatchtoProps)(CardComponent);