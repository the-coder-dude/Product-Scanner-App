import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  TouchableHighlight,
} from "react-native";

import Header from "./Header";
import * as Google from "expo-google-app-auth";
import SecondScreen from "./SecondScreen";
import { KeyboardAvoidingView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { AsyncStorage } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import Scanner from "./Scanner";
import BlankScreen from "./BlankScreen";
import * as firebase from "firebase";

const userInfo = { username: "admin", password: "A" };

class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  render() {
    return (
      <>
        {/* <StatusBar barStyle="dark-content" /> */}
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}
          >
            <Header />
          </ScrollView>
        </SafeAreaView>

        <View style={styles.viewStyleForLine}></View>

        <Image style={styles.arrow} source={require("./arrow.png")} />

        <KeyboardAwareScrollView
          style={{ backgroundColor: "#fff" }}
          resetScrollToCoords={{ x: 0, y: 0 }}
          contentContainerStyle={styles.container}
          scrollEnabled={false}
        >
          <View style={styles.imcontainer}>
            <Image style={styles.logo} source={require("./logo-unga.jpg")} />
          </View>

          <Text style={styles.ur_text1}>USERNAME</Text>

          <View style={styles.ur_input1}>
            <Image style={styles.ur_img1} source={require("./12.png")} />
            <TextInput
              style={styles.input}
              //  placeholder="USERNAME"
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              autoCapitalize="none"
            />
          </View>

          <Text style={styles.ur_text2}>PASSWORD</Text>

          <View style={styles.ur_input2}>
            <Image style={styles.ur_img2} source={require("./13.png")} />

            <TextInput
              style={styles.input2}
              //  placeholder="PASSWORD"
              secureTextEntry
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
            />
          </View>

          <View>
            <TouchableOpacity style={styles.userBtn} onPress={this._login}>
              <Text style={styles.btnTxt}>LOGIN</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.login_icons}>
            <TouchableHighlight onPress={this._login_google}>
              <Image
                style={styles.icons_google}
                source={require("./google.png")}
              />
            </TouchableHighlight>

            <Image
              style={styles.icons_facebook}
              source={require("./facebook.png")}
            />
          </View>

          <View style={styles.container_text}>
            <Text style={styles.text}>FORGOT PASSWORD?</Text>
            <Text style={styles.text}>REMEMBER ME</Text>
          </View>

          <View style={styles.footer}>
            <Text>Copyright 2019 UNGASoft Chile.All Right Reserved</Text>
          </View>
        </KeyboardAwareScrollView>
      </>
    );
  }

  _login_google = async () => {
    try {
      const result = await Google.logInAsync({
        //949582116880-0f19o6rkgf09e84tevjsljfc63h43igr.apps.googleusercontent.com
        androidClientId:
          "949582116880-mn2p527vqdo6cih7los79d3ocrg1hh6t.apps.googleusercontent.com",

        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        this.props.navigation.navigate("Second");
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  _login = async () => {
    if (
      userInfo.username === this.state.username &&
      userInfo.password === this.state.password
    ) {
      this.props.navigation.navigate("Second");
    } else {
      alert("Username or Password is incorrect");
    }
  };
}

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Second: SecondScreen,
    Scan: Scanner,
    Details: BlankScreen,
  },
  {
    initialRouteName: "Login",
  }
);

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#000",
    borderBottomColor: "#22abb6",
  },
  engine: {
    position: "absolute",
    right: 0,
  },
  body: {
    backgroundColor: "#fff",
    borderTopColor: "#22abb6",
  },

  // BigContainer:{
  // height:1000,

  // },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  highlight: {
    fontWeight: "700",
  },

  viewStyleForLine: {
    borderBottomColor: "#22abb6",
    borderBottomWidth: 1,
    alignSelf: "stretch",
    width: "100%",
  },

  arrow: {
    width: 17,
    height: 13,
    transform: [{ rotate: "180deg" }],
    marginLeft: 25,
  },

  imcontainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 176,
    height: 66,
  },
  ur_input1: {
    flex: 1,
    top: 0,
    marginLeft: 20,
    width: DEVICE_WIDTH,
    flexDirection: "row",
    // marginBottom: 20
  },
  ur_input2: {
    // flex: 1,
    top: 20,
    marginLeft: 20,
    width: DEVICE_WIDTH,
    flexDirection: "row",
  },

  ur_text1: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 40,
    color: "#22abb6",
    fontWeight: "900",
    position: "relative",
  },

  ur_text2: {
    justifyContent: "center",
    textAlign: "center",
    // marginTop: 10,
    top: 40,
    color: "#22abb6",
    fontWeight: "900",
    // position: 'relative'
  },

  ur_img1: {
    width: 40,
    height: 30,
    marginLeft: -5,
  },

  ur_img2: {
    marginTop: 20,
    width: 35,
    height: 35,
  },

  input: {
    width: "65%",
    backgroundColor: "#fff",
    height: 36,

    marginLeft: 20,

    marginTop: 0,
    borderWidth: 2,

    borderColor: "transparent",
    borderBottomColor: "#22abb6",
  },

  input2: {
    width: "65%",
    height: 36,
    backgroundColor: "#fff",
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 2,

    borderColor: "transparent",
    borderBottomColor: "#22abb6",
  },

  userBtn: {
    backgroundColor: "#22abb6",
    paddingLeft: 25,
    paddingRight: 15,
    paddingBottom: 5,
    paddingTop: 5,
    marginTop: 30,
    width: "55%",
    // marginTop:-30,
    marginLeft: 80,
    position: "relative",

    borderRadius: 100,
  },

  btnTxt: {
    textAlign: "center",
    paddingLeft: 0,
    color: "#fff",
    fontSize: 13,
  },

  login_icons: {
    flex: 1,
    top: 50,
    width: DEVICE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  icons_google: {
    width: 50,
    height: 50,
    // marginRight:35
  },
  icons_facebook: {
    width: 50,
    height: 50,
    marginLeft: -13,
  },

  container_text: {
    flex: 1,
    top: 105,
    width: DEVICE_WIDTH,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  text: {
    color: "#22abb6",
    backgroundColor: "transparent",
    fontWeight: "800",
  },

  footer: {
    color: "#000",
    textAlign: "center",
    marginLeft: 33,
    paddingBottom: 18,
    fontWeight: "600",

    top: 10,
    marginTop: 130,
    bottom: 25,
  },
});

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
