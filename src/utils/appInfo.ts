import * as Application from 'expo-application';
import { Platform } from "react-native";

export function getAppInfo() {

    return {
        appVersion: Application.nativeApplicationVersion ?? "unknown",
        appBuild: Application.nativeBuildVersion ?? "unknown",
        platform: Platform.OS,
    };
}
