import React from "react";
import { ThemeProvider } from "react-native-elements";
import Login from "./pages/Login";

import { View, Text, StyleSheet } from "react-native";

import auth from "@react-native-firebase/auth";
import { FirebaseAuthTypes } from "@react-native-firebase/auth";

import colors from "./config/colors";
import { Button } from "react-native-elements";

export default function App() {
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState<FirebaseAuthTypes.User | null>(null);

  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <ThemeProvider
        theme={{ colors: { primary: colors[3], secondary: colors[1] } }}
      >
        <Login />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider
      theme={{ colors: { primary: colors[3], secondary: colors[1] } }}
    >
      <View style={styles.container}>
        <Text>Hello {user.email}</Text>
        <Button
          title="Sign Out"
          onPress={() => {
            auth().signOut();
          }}
        />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
