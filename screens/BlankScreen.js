import React, { Component } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  TouchableHighlight,
  Button,
  TouchableOpacity,
} from "react-native";
//import SecondScreen from "./SecondScreen";
import firebase from "./dbConfig";
import Modal from "react-native-modal";

const DEVICE_HEIGHT = Dimensions.get("window").height;
const DEVICE_WIDTH = Dimensions.get("window").width;

export default class ListItem extends Component {
  componentWillMount() {
    var that = this;

    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

    that.setState({
      //Setting the value of the date time
      date: " " + date + "/" + month + "/" + year,
    });

    var ref = firebase.database().ref("/");

    ref.child(this.props.navigation.state.params.JSON_ListView_Clicked_Item).on(
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
  }

  static navigationOptions = {
    header: null,
  };

  state = {
    //For modal
    visibleModal: 4,
  };

  constructor(props) {
    super(props);

    this.state = {
      date: "",
      items: "",

      product: "",
      price: "",
    };
  }

  _renderModalContent = () => (
    <View>
      <View
        style={{
          height: DEVICE_HEIGHT - 200,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          Order Placed!
        </Text>
        <Text
          style={{
            fontSize: 20,
            marginTop: 16,
          }}
        >
          Date:
          {this.state.date}
        </Text>
      </View>

      <TouchableOpacity onPress={() => this.setState({ visibleModal: null })}>
        <Text style={{ fontSize: 15, color: "#22abb6" }}> Close </Text>
      </TouchableOpacity>
    </View>
  );

  render() {
    return (
      <>
        <View style={{ justifyContent: "center", paddingTop: 100 }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              position: "absolute",
              top: 100,
              left: 0,
              right: 0,
            }}
          >
            <View style={styles.navBar_scan_l}>
              {/* <Text>{this.props.navigation.state.params.JSON_ListView_Clicked_Item}</Text> */}
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 20,
                  paddingTop: 10,
                }}
              >
                SCAN RESULT
              </Text>
            </View>

            <View style={styles.navBar_scan_r}>
              {/* <Text>{this.props.navigation.state.params.JSON_ListView_Clicked_Item}</Text> */}
              <Text
                style={{
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 20,
                  paddingTop: 10,
                }}
              >
                {this.state.items}
              </Text>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              borderRadius: 100,
              position: "absolute",
              top: 200,
              left: 0,
              right: 0,
            }}
          >
            <View style={styles.navBar_left}>
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#fff",
                  fontSize: 18,
                  paddingTop: 5,
                }}
              >
                {this.state.product}
              </Text>
            </View>

            <View style={styles.navBar_right}>
              <Text
                style={{
                  justifyContent: "center",
                  textAlign: "center",
                  color: "#22abb6",
                  fontSize: 18,
                  paddingTop: 5,
                }}
              >
                {this.state.price}
              </Text>
            </View>
          </View>

          <View
            style={{
              justifyContent: "center",
              borderRadius: 100,
              position: "absolute",
              top: 300,
              left: 0,
              right: 0,
              width: "90%",
              color: "#ffaaaa",
            }}
          >
            <Text style={{ paddingLeft: 30, fontWeight: "bold" }}>
              Request Details
            </Text>

            <Text style={{ paddingLeft: 40, fontWeight: "bold" }}>
              Description
            </Text>

            <Text style={{ paddingLeft: 40, fontWeight: "500" }}>
              Estimate Value: {this.state.price}
            </Text>
          </View>
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
              onPress={() => this.setState({ visibleModal: 4 })}
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
            {/* </View> */}

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

        <Modal
          isVisible={this.state.visibleModal}
          backdropColor={"#000"}
          backdropOpacity={0.8}
          animationIn={"zoomInDown"}
          animationOut={"zoomOutUp"}
          animationInTiming={1000}
          animationOutTiming={1000}
          backdropTransitionInTiming={1000}
          backdropTransitionOutTiming={1000}
        >
          {this._renderModalContent()}
        </Modal>
      </>
    );
  }
}

const styles = StyleSheet.create({
  navBar_scan_l: {
    width: "50%",
    height: 55,
    backgroundColor: "#22abb6",
  },

  navBar_scan_r: {
    width: "50%",
    height: 55,
    backgroundColor: "#22abb6",
  },

  navBar_left: {
    width: "43%",
    height: 40,
    backgroundColor: "#22abb6",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  navBar_right: {
    width: "43%",
    height: 40,
    backgroundColor: "#ebf1f1",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },

  navBar_out_l: {
    width: "17%",
    height: 60,
    backgroundColor: "#176f75",
    //  opacity: 0.3,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },

  navBar_out_r: {
    width: "24%",
    height: 60,
    backgroundColor: "#176f75",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  navBar_in: {
    width: "18%",
    height: 60,
    backgroundColor: "#176f75",
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
  navText: {
    justifyContent: "center",
    textAlign: "center",
    marginTop: 0,
    fontSize: 12,
    color: "#fff",
    fontWeight: "900",
  },
});
