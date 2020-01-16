
'use strict';
//import Colors from './Colors';
// import type {Node} from 'react';
import {Text, StyleSheet,View,Image,Dimensions} from 'react-native';
import React from 'react';

const Header = ()=> (

	<View style={styles.hcontainer}>
 
     
    <View style={styles.ur_login}>
    <Text style={styles.text}>Login</Text>

        <Image
            style={styles.img_lang}
            source={require('./15s.png')}
        /> 
      
    </View>


   


    <Text style={styles.text2}>Please login to your account.</Text>
    

    </View>
 
);

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({

	hcontainer: {
   
   borderBottomColor: '#22abb6',
   backgroundColor: '#fff',
    // height: 100,
  marginTop: 28,
  },

  background: {
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: '#fff',
    borderColor: '#fff',
   borderBottomColor: '#22abb6',
  },
  
  text: {
    fontSize: 32,
    fontWeight: '200',
    textAlign: 'left',
    paddingTop: 20,
    marginLeft: 21,

    color: '#22abb6',
  },


  ur_login:{
    flex: 1,
      top: 0,
      
      width: DEVICE_WIDTH,
  flexDirection: 'row',
  justifyContent: 'space-around',
    },

    img_lang:{
  
      width:85,
      marginTop: 23,
      height:32,
      marginLeft: 150     
     
     },
  text2: {
    fontSize: 14,
    fontWeight: '300',
    textAlign: 'left',
    paddingTop: 30,
    marginLeft: 21,
    paddingBottom: 25,	

    color: '#22abb6',
  },

  // text3: {
  //   fontSize: 16,
  //   fontWeight: '200',
  //   textAlign: 'left',
  //   paddingTop: 10,
  //   marginLeft: 0,
  //   width: '100%',
   	

  //   color: '#22abb6',
  // },
});

export default Header;
