import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class EstabelecimentoHomeComponent extends Component{

    constructor(props) {
        super(props);
        this.state = { user: 'Consumidor' };
    }
    render(){
        return(
            <View>
                <Text>Funcionou estabelecimento</Text>
                <Text>Bem-vindo - {this.props.loggedUser.nome}</Text>
                <Text>Seu email é - {this.props.loggedUser.email}</Text>
            </View>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
      loggedUser: state.authReducer.loggedUser
    }
  }

export default connect(mapStatetoProps, null)(EstabelecimentoHomeComponent);