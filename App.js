import { LogBox } from 'react-native';
import * as React from "react";
import {SafeAreaView, View} from 'react-native';
import RootNavigation from "./navigation";
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <RootNavigation></RootNavigation>
  );
}
