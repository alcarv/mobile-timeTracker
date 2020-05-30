import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView } from 'react-native';
import Headercomponent from '../shared/header';
import Calendarcomponent from '../shared/Calendarcomponent';
import { connect } from 'react-redux';
import { createCalendarArray } from '../shared/CalendarProcessor';
import HorarioCard from '../shared/horarioCard';


class HorariosComponent extends Component{

    constructor(props) {
        super(props);
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Headercomponent navigation={this.props.navigation} init={false} cor="branco" titulo="Escolha um horário" />
                </View>
                <Calendarcomponent/>
                <SafeAreaView style={styles.safeView}>
                    <FlatList
                        numColumns={2}
                        columnWrapperStyle={styles.list}
                        ItemSeparatorComponent={() => <Text></Text>}
                        data={this.props.tiles}
                        renderItem={({ item }) => <HorarioCard estab={false} navigation={this.props.navigation} item={item}></HorarioCard>}
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
        selectedEstab: state.authReducer.selectedEstab,
        calendar: state.authReducer.calendar,
        tiles: state.authReducer.tiles
    }
}

export default connect(mapStatetoProps, null)(HorariosComponent);