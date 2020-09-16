//SecondScreen

"use strict";
// import React from 'react';
import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TextInput,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  Icon,
  TouchableHighlight,
} from "react-native";

import firebase from "./dbConfig";

// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';

//import Scanner from "./Scanner";

const DEVICE_HEIGHT = Dimensions.get("window").height;

class SecondScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: "",
      data: "",
      product: "",
      price: "",
    };
  }

  render() {
    return (
      <>
        <View style={styles.BackGround}>
          <View style={styles.SectionStyle}>
            <Image
              source={require("../assets/mic.png")} //Change your icon image here
              style={styles.ImageStyle}
            />

            <TextInput
              style={{
                flex: 1,
                justifyContent: "center",
                textAlign: "center",
                fontSize: 12,
              }}
              placeholder="Search for Product"
              underlineColorAndroid="transparent"
              //onChangeText={(text) => this.setState({data: text})}
              onChangeText={(text) => this.setState({ data: text })}
              value={this.state.data}
              onSubmitEditing={this.componentWillMount}
              // onSubmitEditing={()=>this._search}
              //onSubmitEditing={()=>this.componentWillMount}
            />
            <Image
              source={require("../assets/usr.png")} //Change your icon image here
              style={styles.ImageStyle2}
            />
          </View>

          <View>
            <ScrollView
              style={styles.scrollview}
              contentContainerStyle={styles.innerview}
            >
              {/* <TouchableHighlight > */}
              <Text
                style={{ textAlign: "center", color: "#fff", fontSize: 20 }}
                onPress={() =>
                  this.props.navigation.navigate("Details", {
                    JSON_ListView_Clicked_Item: this.state.data,
                  })
                }
              >
                {this.state.items}
              </Text>
              <View
                style={{
                  width: DEVICE_WIDTH,
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: 18 }}
                  onPress={() =>
                    this.props.navigation.navigate("Details", {
                      JSON_ListView_Clicked_Item: this.state.data,
                    })
                  }
                >
                  {this.state.product}
                </Text>
                <Text
                  style={{ color: "#fff", fontSize: 18 }}
                  onPress={() =>
                    this.props.navigation.navigate("Details", {
                      JSON_ListView_Clicked_Item: this.state.data,
                    })
                  }
                >
                  {this.state.price}
                </Text>
              </View>

              {/* {DATA} */}
            </ScrollView>
            {/* </TouchableHighlight> */}
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 50,
              position: "absolute",
              top: DEVICE_HEIGHT - 50,
              left: 0,
              right: 0,
            }}
          >
            <View style={styles.navBar_out_l}>
              <Image
                source={require("../assets/cross.png")} //Change your icon image here
                style={styles.icon_bottom_1_2_4}
              />
              <Text
                style={styles.navText}
                onPress={() => this.props.navigation.navigate("Second")}
              >
                Cancel
              </Text>
            </View>

            <View style={styles.navBar_in}>
              <Image
                source={require("../assets/tick.png")} //Change your icon image here
                style={styles.icon_bottom_1_2_4}
              />
              <Text
                style={styles.navText}
                onPress={() => alert("Please Search/Scan a Product")}
              >
                Order
              </Text>
            </View>

            <View style={styles.navBar_in}>
              <TouchableHighlight
                onPress={() => this.props.navigation.navigate("Scan")}
              >
                <Image
                  source={require("../assets/bar_c1.png")} //Change your icon image here
                  style={styles.icon_bottom_3}
                />
              </TouchableHighlight>
              <Text
                style={styles.navText}
                onPress={() => this.props.navigation.navigate("Scan")}
              >
                Scanner
              </Text>
            </View>

            <View style={styles.navBar_in}>
              <Image
                source={require("../assets/calci.png")} //Change your icon image here
                style={styles.icon_bottom_1_2_4}
              />

              <Text style={styles.navText}>Edit</Text>
            </View>

            <View style={styles.navBar_out_r}>
              <Image
                source={require("../assets/user_nav.png")} //Change your icon image here
                style={styles.icon_bottom_5}
              />
              <Text style={styles.navText}>Photo Update</Text>
            </View>
          </View>
        </View>
      </>
    );
  }

  componentWillMount = async () => {
    var ref = firebase.database().ref("/");

    ref.child(this.state.data).on(
      "value",
      (snapshot) => {
        this.setState({ product: snapshot.val().info.Product });
        this.setState({ price: snapshot.val().info.Price });
        this.setState({ items: snapshot.val().UPC });
      },
      function (error) {
        console.log("Error: " + error.code);
      }
    );
  };
}

const DEVICE_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
  BackGround: {
    backgroundColor: "#22abb6",
    height: "100%",
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    shadowColor: "#176f75",

    marginTop: 50,
    height: 40,
    borderRadius: 10,
    margin: 10,
  },
  ImageStyle: {
    padding: 10,
    marginLeft: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  ImageStyle2: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },

  icon_bottom_1_2_4: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 10,

    height: 18,
    width: 18,
    resizeMode: "stretch",
    alignItems: "center",
  },
  icon_bottom_3: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 8,

    height: 20,
    width: 35,
    resizeMode: "stretch",
    alignItems: "center",
  },

  icon_bottom_5: {
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 10,
    marginBottom: 8,

    height: 20,
    width: 20,
    resizeMode: "stretch",
    alignItems: "center",
  },
  navBar_out_l: {
    width: "17%",
    height: 60,
    backgroundColor: "#176f75",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  navBar_out_r: {
    width: "24%",
    height: 60,
    backgroundColor: "#176f75",
    // opacity: 0.3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  navBar_in: {
    width: "18%",
    height: 60,
    backgroundColor: "#176f75",
  },

  navText: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 0,
    fontSize: 12,
    color: "#fff",
    fontWeight: "900",
  },
});

export default SecondScreen;
