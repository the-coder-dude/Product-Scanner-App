import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";

import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class BarcodeScannerExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Alert_Visibility: false,
    };
  }

  Show_Custom_Alert(visible) {
    this.setState({ Alert_Visibility: visible });
  }

  ok_Button = () => {
    // Alert.alert(this.state.bar);

    this.props.navigation.navigate("Details", {
      JSON_ListView_Clicked_Item: this.state.bar,
    });
    this.Show_Custom_Alert(!this.state.Alert_Visibility);
  };

  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
    this.getPermissionsAsync();
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  };

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />

        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}

        {/* </View>
      <View style={styles.MainContainer}> */}

        <Modal
          visible={this.state.Alert_Visibility}
          transparent={false}
          animationType={"fade"}
          onRequestClose={() => {
            this.Show_Custom_Alert(!this.state.Alert_Visibility);
          }}
        >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <View style={styles.Alert_Main_View}>
              <Text style={styles.Alert_Title}>Item has been Scanned!</Text>

              <View
                style={{ width: "100%", height: 2, backgroundColor: "#fff" }}
              />

              <Text style={styles.Alert_Message}> Code: {this.state.bar} </Text>

              <View
                style={{ width: "100%", height: 1, backgroundColor: "#fff" }}
              />

              <View style={{ flexDirection: "row", height: "30%" }}>
                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={this.ok_Button}
                  activeOpacity={0.7}
                >
                  <Text style={styles.TextStyle}> OK </Text>
                </TouchableOpacity>

                <View
                  style={{ width: 1, height: "100%", backgroundColor: "#fff" }}
                />

                <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => {
                    this.Show_Custom_Alert(!this.state.Alert_Visibility);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.TextStyle}> CANCEL </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });

    this.Show_Custom_Alert(true);

    const bar_code = data;
    this.setState({ bar: bar_code });
  };
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: Platform.OS == "ios" ? 20 : 0,
  },

  Alert_Main_View: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#009688",
    height: 200,
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 7,
  },

  Alert_Title: {
    fontSize: 25,
    color: "#fff",
    textAlign: "center",
    padding: 10,
    height: "28%",
  },

  Alert_Message: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    padding: 10,
    height: "42%",
  },

  buttonStyle: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  TextStyle: {
    color: "#fff",
    textAlign: "center",
    fontSize: 22,
    marginTop: -5,
  },
});
