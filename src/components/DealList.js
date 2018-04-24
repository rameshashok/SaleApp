import React from 'react';
import {
  StyleSheet,
  FlatList,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import DealItem from './DealItem';

export default class DeadList extends React.Component {
    static propTypes = {
        deals : PropTypes.array.isRequired,
        onItemPress : PropTypes.func.isRequired,
    };    
    render() {
        return (
          <View style={styles.list} >
            
            <FlatList
                data={this.props.deals}
                renderItem={({item}) => <DealItem deals = {item} onPress={this.props.onItemPress} />}
            />   
          </View>
        );
      }
    }

    const styles = StyleSheet.create({
        list:{
            backgroundColor:'#eee',
            //flex:1,
            //paddingTop:50,
            width:'100%',
            
        },
    });