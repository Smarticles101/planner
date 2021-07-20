import React, { useState } from "react";
import { View, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { Input, Button, Text } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";

import auth from "@react-native-firebase/auth";

import colors from "../config/colors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [registering, setRegistering] = useState(false);

  const toggleRegistering = () => setRegistering(!registering);

  const submit = () => {
    if (registering) {
      auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log("User account created & signed in!");
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            console.log("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            console.log("That email address is invalid!");
          }

          console.error(error);
        });
    } else {
        auth().signInWithEmailAndPassword(email, password).then(() => {
            console.log("Signed in");
        }).catch((error) => {
            console.error(error);
        });
    }
  };

  return (
    <LinearGradient
      colors={[colors[1], colors[2], colors[3], colors[4], colors[5]]}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <Text h1 style={styles.title}>
          Depression Solver
        </Text>
        <View style={styles.form}>
          <Input
            containerStyle={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />
          <Input
            containerStyle={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {registering && (
            <Input
              containerStyle={styles.input}
              placeholder="Confirm password"
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              secureTextEntry
            />
          )}

          <Button
            title={!registering ? "Sign in" : "Register"}
            containerStyle={styles.input}
            onPress={submit}
          />
          <Button
            title={!registering ? "Or register" : "Or sign in"}
            type="clear"
            onPress={toggleRegistering}
            containerStyle={styles.input}
          />
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "stretch",
  },
  form: {
    backgroundColor: "#fff",
    borderRadius: 10,
    margin: 30,
    padding: 10,
    alignItems: "stretch",
  },
  input: {
    margin: 5,
  },
  title: {
    alignSelf: "center",
    color: "#fff",
  },
  error: {
    color: "red",
  },
});
