import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import Headercomponent from '../shared/header';
import HorarioCard from '../shared/horarioCard';
import Calendarcomponent from '../shared/Calendarcomponent';

class EstabelecimentoHomeComponent extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Headercomponent init={true} navigation={this.props.navigation} cor="branco" titulo="Seus Horários" />
                </View>
                <Calendarcomponent/>
                <SafeAreaView style={styles.safeView}>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.list}
                        ItemSeparatorComponent={() => <Text></Text>}
                        data={this.props.tiles}
                        renderItem={({ item }) => <HorarioCard navigation={this.props.navigation} estab={true} item={item}></HorarioCard>}
                        keyExtractor={item => item._id}
                    />
                </SafeAreaView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'space-around',
        height: '100%',
        backgroundColor: '#FF473A'
    },
    header:{
        marginTop: '5%'
    },  
    list:{
        justifyContent: "space-around"
    },
    safeView: {
        height: '65%',
        width: '100%',
        marginLeft: '2%'
    }
})

const mapStatetoProps = (state) => {
    return {
      loggedEstab: state.authReducer.loggedEstab,
      calendar: state.authReducer.calendar,
      tiles: state.authReducer.tiles
    }
  }

export default connect(mapStatetoProps, null)(EstabelecimentoHomeComponent);