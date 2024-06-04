# Fronius Power Monitor for Android

An Android app for the realtime monitoring of Fronius Power Inverters.

Works directly from an Android device to the solar inverter via your local network / Wifi.

## Requirements
- a Fronius inverter (tested so far on the Gen24 model)
- an Android device

## How to Install
_Note - this app is in early release and not available in the Google Play Store yet_
1. on your Android device download the file named **Fronius3_1.apk** from [Releases](https://github.com/seanhaydongriffin/Fronius-Power-Monitor-Android/releases/latest)
2. side-load the APK file to your device.
3. open the **Fronius** app.

## How to Use
When you run the app it presents you with a main screen of charts.

On first use the charts will likely be blank because the app cannot locate your inverter.

Tap the **Configuration** button to open the Configuration screen, and in the **Inverter IP Address** field enter the IP address of your inverter.

Click the button to return to the main screen, and if successful the charts should now be updating in realtime.

Next time you run the app the same configuration should apply.

## Why an Android app?

Most browser based web apps that monitor a Fronius inverter will fail due to the underlying Solar Web API including cross-origin resource sharing (CORS).

Popular workarounds are to extend the browser to ignore CORS, or setup a local CORS proxy on another device, to allow communication between the inverter and web app.

An Android app does not require such workarounds.  It can communicate directly with the inverter by doing so outside a browser (avoiding CORS), and then render the output in a browser view (WebView).
