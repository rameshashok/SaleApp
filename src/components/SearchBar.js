import React from 'react';
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';

export default class SearchBar extends React.Component {
    static propTypes = {
        searchedDeals : PropTypes.func.isRequired,
    }; 

    state = {
        searchTerm :'',
    }

    debouncedSearchDeals = debounce(this.props.searchedDeals, 300);
    handleChange = (searchTerm) => {
        this.setState({ searchTerm }, () => {
            this.debouncedSearchDeals(this.state.searchTerm);
        });
    }
    render() {
     return(
            <TextInput placeholder="Search All Deals" style={styles.input} onChangeText={this.handleChange}></TextInput>
     );
    }
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        marginHorizontal:12,
    },
})