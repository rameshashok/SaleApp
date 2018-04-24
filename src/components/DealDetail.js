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
import ajax from '../ajax';

export default class DeadDetail extends React.Component {
    static propTypes = {
        initialDealData : PropTypes.object.isRequired,
        onBack : PropTypes.func.isRequired,
    };    
    state = {
        deals : this.props.initialDealData,
    }
    async componentDidMount() {
        const fullDeal = await ajax.fetchDealDetail(this.state.deals.key);
      //  console.log(fullDeal);
        this.setState({ deals : fullDeal });
    }
    render() {
        const { deals } = this.state;
        return (  
        <View style={styles.deals}>
        <TouchableOpacity onPress={ this.props.onBack }>
        <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
            <Image source = {{ uri : deals.media[0] }} style={styles.image}  />
            <Text style={styles.title}>{deals.title}</Text>
          <View style={styles.footer}>
          <View style={styles.Detail}>
          <Text style={styles.price}>{priceDisplay(deals.price)}</Text>
          <Text style={styles.cause}>{deals.cause.name}</Text>    
          </View>
          {deals.user  && 
          (<View style={styles.Detail}>
              <Image source={{ uri : deals.user.avatar }} style={styles.avatar} />
              <Text style={{ paddingTop:5, }}>{deals.user.name}</Text>

          </View> )}
          </View>
          <View style={styles.info}>
              <Text>{deals.description}</Text>
          </View>
        </View>
        );
      }
    }

    const styles = StyleSheet.create({
        deals : {
            marginHorizontal:17,
          //  borderColor:'#bbb',
          //  borderWidth:1,
        },
        backLink : {
            marginBottom: 5,
            color:'blue',
        },
        image:{
            width:'100%',
            height:150,
            backgroundColor:'#ccc',
        },
        Detail:{
            padding:10,
        },
        info:{
            backgroundColor:'#fff',
            borderColor:'#ccc',
            borderWidth:1,
            padding:10,
        },
        title: {
            fontSize:18,
            fontWeight:'bold', 
            padding:10,
            backgroundColor:'rgba(300, 149,45,0.8)',
        },
        footer: {
            flexDirection : 'row',
            justifyContent : 'space-around',
           // alignItems : 'center',
            marginTop : 15,
        },
        cause: {
            //flex : 2,
            marginTop : 10,
        },
        price: {
            marginTop : 15,
            fontWeight:'bold',
            //flex: 1,
            //textAlign: 'right',
        },
        avatar: {
            width: 60,
            height: 60,
        },
    });