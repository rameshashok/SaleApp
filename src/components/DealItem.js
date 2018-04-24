import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,  
  StyleSheet,
  FlatList,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import { priceDisplay } from '../util';

export default class DeadItem extends React.Component {
    static propTypes = {
        deals : PropTypes.object.isRequired,
        onPress : PropTypes.func.isRequired, 
    };    
    handlePress = () => {
        this.props.onPress(this.props.deals.key);
    }
    render() {
        const { deals } = this.props;
        return (  
        <TouchableOpacity style={styles.deals} onPress= {this.handlePress}>
            <Image source = {{ uri : deals.media[0] }} style={styles.image}  />
          <View style={styles.info}>
          <Text style={styles.title}>{deals.title}</Text>
          <View style={styles.footer}>
          <Text style={styles.cause}>{deals.cause.name}</Text>    
          <Text style={styles.price}>{priceDisplay(deals.price)}</Text>
          </View>
          </View>
        </TouchableOpacity>
        );
      }
    }

    const styles = StyleSheet.create({
        deals : {
            marginHorizontal:15,
            marginTop:12,
        },
        image:{
            width:'100%',
            height:150,
            backgroundColor:'#ccc',
        },
        info:{
            backgroundColor:'#fff',
            borderColor:'#ccc',
            borderWidth:1,
            padding:10,
            borderTopWidth:0,
        },
        title: {
            fontSize:15,
            fontWeight:'bold', 
            marginBottom:5,
        },
        footer: {
            flexDirection : 'row',
        },
        cause: {
            flex : 2,
        },
        price: {
            flex: 1,
            textAlign: 'right',
        },
    });