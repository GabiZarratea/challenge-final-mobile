import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { View, Text, Image, ScrollView, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importa AsyncStorage
import AntDesign from "react-native-vector-icons/AntDesign";
import logo from '../../assets/logo2.png'
import NavbarSearch from '../components/navbarSearch';
export default function ResultProducts(props) {
  const read_products = useSelector((store) => store.products.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchSearchData = async () => {
      try {
        const savedSearch = await AsyncStorage.getItem('search');
        const savedSearchTerm = await AsyncStorage.getItem('searchTerm');

        if (savedSearch) {
          const parsedMatchingProductIds = JSON.parse(savedSearch);
          setSearchQuery(savedSearchTerm);

          const productsToShow = read_products.filter(product => parsedMatchingProductIds.includes(product._id));
          setFilteredProducts(productsToShow);
        }
      } catch (error) {
        console.error('Error fetching search data:', error);
      }
    };

    fetchSearchData();
  }, [read_products, filteredProducts]);

  const navigateToProduct = (productId) => {
    navigation.navigate('ProductDetails', { productId });
  };

  const navigateToCarritoPage = () => {
    navigation.navigate('carritoPage');
  };
  return (
    <View style={styles.container}>
        <NavbarSearch/>
        <View style={{ flex: 1, paddingTop: 20, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{ fontSize: 22, color:'gray', marginBottom: 20 }}>Search Results for: {searchQuery}</Text>
          <ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap:'wrap', gap:10}}>
              {filteredProducts.map((product) => (
                <TouchableOpacity key={product._id} style={styles.cardItem} onPress={() => navigateToProduct(product._id)} >
                  <Image source={{ uri: product.cover_photo[0] }} style={styles.cardImage} />
                  <Text style={{ color: 'gray', fontSize: 12, fontWeight: 'bold', marginHorizontal: 10 }}>{product.title}</Text>
                  <Text style={{ fontSize: 15, fontWeight: 'bold', margin: 10 }}>USD$ {product.price}</Text>
                  </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  imageBackground: {
      flex: 1,
      resizeMode: "cover", 
  },
  navbar: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#007BFF',
      padding:10
  },
  nav1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
  },
  logo: {
      width: 55,
      height: 55,
      fontSize: 40,
      color: 'white'
  },
  menu: {
      width: 55,
      height: 55,
      fontSize: 40,
      color: 'white'
  },
  searchInput: {
      backgroundColor: 'white',
      padding: 10,
      margin: 20,
      borderRadius: 8,
      width: '80%'
  },
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      backgroundColor: '#FFFBEB',
  },
  button: {
      padding: 10,
      alignItems: 'center',
  },
  buttonIcon: {
      height: 40,
      width: 40,
      resizeMode: 'contain',
  },
  cardItem: {
    flexDirection:'column',
    justifyContent:'center',
    textAlign:'center',
    padding:8,
    alignItems:'center',
    backgroundColor:'#F2F6FD',
    height:230,
    borderRadius:10,
    borderColor:'gray',
    borderStyle:'solid',
    borderWidth:1,
    width:180,
    gap:5
  },
  cardImage: {
    width:110,
    height:80,
    objectFit:'contain'
  },
  logotipo:{
    width:100,
    height:80
  }
})