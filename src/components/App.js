import React from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

export default class App extends React.Component {
  state = {
    deals : [],
    dealsFromSearch : [],
    currentDealId : null,
  }  
    async componentDidMount() {
        const deals = await ajax.fetchInitialDeals();
        this.setState({ deals });
    }

    searchedDeals = async (searchTerm) => {
      let dealsFromSearch = []
      if(searchTerm) {
        dealsFromSearch = await ajax.fetchSearchDeals(searchTerm);
      }
      this.setState({ dealsFromSearch });
    }

    setCurrentDealId = (dealId) => {
      this.setState({ currentDealId : dealId,  });
    };
    
    unSetCurrentDealId = () => {
      this.setState({ currentDealId : null,  });
    };
    
    currentDeal = () => {
      return this.state.deals.find((deal) => deal.key === this.state.currentDealId );
    };
    
    render() {
      if( this.state.currentDealId) {
        return (
        <View style={styles.main}> 
        <DealDetail initialDealData={this.currentDeal()} onBack={this.unSetCurrentDealId} />
        </View>
        );
      }

      const dealsDisplay = this.state.dealsFromSearch.length > 0 ? this.state.dealsFromSearch : this.state.deals;
      if( dealsDisplay.length > 0) {   
      return (
      <View style={styles.main}>
      <SearchBar searchedDeals={this.searchedDeals}/>
      <DealList deals= {dealsDisplay}  onItemPress={this.setCurrentDealId}  />
      </View>
      );
      }
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native
          </Text> 
        </View>
      );
    }
  }
  

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#ddd',
        flex:1,
    },
    main:{
      marginTop:30,
    },
    target:{
        fontSize:40,
        marginHorizontal:50,
        textAlign:'center',
    },
    welcome:{
        flex:6,
        flexDirection:'row',
        flexWrap:'wrap',
        justifyContent:'space-around',
    },
  });