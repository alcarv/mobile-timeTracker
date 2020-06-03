import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableHighlight, Image, TouchableOpacity } from "react-native";
import Stepper from "./Steppercadastro";
import { connect } from 'react-redux';

class CadastroComponent extends Component{

    constructor(props) {
        super(props);
        this.state = {
            pagina: 0,
            finaliza: ''
        }
    }

    mudarDePagina = () => {
        if(this.props.selectedTypeCadastro == 'Estabelecimento'){
            if(this.state.pagina != 5){
                this.setState({
                    pagina: this.state.pagina + 1
                })
            }else{
                //acabaram as páginas
            }
        }else{
            if(this.state.pagina == 0){
                this.setState({
                    pagina: 6
                })
            }else {
                //acabaram as páginas
            }
        }
    }

    back = () => {
        if(this.state.pagina == 6){
            this.setState({
                pagina: 0
            })
            return
        }
        if(this.state.pagina != 0){
            this.setState({
                pagina: this.state.pagina - 1
            })
        }else{
            this.props.navigation.navigate('Login')
        }
    }

    finalizarCadastro = () => {
        if(this.props.selectedTypeCadastro == 'Estabelecimento'){
            this.setState({
                finaliza: 'Estabelecimento'
            })
        }else{
            this.setState({
                finaliza: 'Consumidor'
            })
        }
    }

    renderizarBotao = () => {
        if(this.state.pagina == 5 || this.state.pagina == 6){
            return(
                <TouchableHighlight onPress={this.finalizarCadastro} underlayColor="#fff" style={styles.botaoProx}>
                    <Text style={styles.botaoProxText}>Finalizar</Text>
                </TouchableHighlight>
            )
        }else{
            return(
                <TouchableHighlight onPress={this.mudarDePagina} underlayColor="#fff" style={styles.botaoProx}>
                    <Text style={styles.botaoProxText}>Próximo</Text>
                </TouchableHighlight>
            )
        }
    }

    render(){
        return (
             <View style={styles.container}>
                 <Text style={styles.textCad}>Cadastre-se</Text>
                    <TouchableOpacity style={styles.back} onPress={this.back}>
                        <Image source={require('../../assets/back.png')} style={{height: 30, width: 30}}></Image>
                    </TouchableOpacity>
                <Stepper finaliza={this.state.finaliza} ref={this.stepperRef} navigation={this.props.navigation} pagina={this.state.pagina}></Stepper>
                {
                    this.renderizarBotao()
                }
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
    },
    botaoProx:{
        backgroundColor: "#fff",
        borderRadius: 20,
        height: "10%",
        width: "80%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    botaoProxText:{
        color: "#ff5448",
        fontSize: 20
    },
    back: {
        alignSelf: 'flex-start',
        marginLeft: '5%'
    },
    textCad:{
        color: '#FFF', 
        fontSize: 20, 
        position: 'absolute'
    }
});

const mapStatetoProps = (state) => {
    return {
        selectedTypeCadastro: state.authReducer.selectedTypeCadastro
    }
}

export default connect(mapStatetoProps, null)(CadastroComponent);