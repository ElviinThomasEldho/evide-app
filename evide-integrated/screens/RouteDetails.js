import "react-native-gesture-handler";
import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Button } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from "react-native-maps";
import polyline from "@mapbox/polyline";

import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomModalContainer from "../components/BottomModalContainer";
import ExploreModal from "../components/ExploreModal";
import RoutesModal from "../components/RoutesModal";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import * as Location from "expo-location";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import axios from "axios";
import ProfileIcon from "../components/ProfileIcon";
import RouteModal from "../components/RouteModal";

const Home = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState();
  const [route, setRoute] = useState({
    bounds: {
      northeast: {
        lat: 9.996516100000001,
        lng: 76.35995919999999,
      },
      southwest: {
        lat: 9.942679699999999,
        lng: 76.3131341,
      },
    },
    copyrights: "Map data ©2024",
    fare: {
      currency: "INR",
      text: "₹20.00",
      value: 20,
    },
    legs: [
      {
        arrival_time: {
          text: "4:10 PM",
          time_zone: "Asia/Calcutta",
          value: 1713868831,
        },
        departure_time: {
          text: "3:02 PM",
          time_zone: "Asia/Calcutta",
          value: 1713864758,
        },
        distance: {
          text: "14.7 km",
          value: 14697,
        },
        duration: {
          text: "1 hour 8 mins",
          value: 4073,
        },
        end_address:
          "X867+X3G, Toc-H Rd, Toc-H Nagar, Vyttila, Ernakulam, Kochi, Kerala 682019, India",
        end_location: {
          lat: 9.9625988,
          lng: 76.31327659999999,
        },
        start_address:
          "Rajagiri Valley Rd, Rajagiri Valley, Chittethukara, Ernakulam, Kakkanad, Kerala 682030, India",
        start_location: {
          lat: 9.996516100000001,
          lng: 76.3596708,
        },
        steps: [
          {
            distance: {
              text: "1.3 km",
              value: 1251,
            },
            duration: {
              text: "18 mins",
              value: 1106,
            },
            end_location: {
              lat: 9.9955303,
              lng: 76.35155089999999,
            },
            html_instructions: "Walk to Chittethukara",
            polyline: {
              points:
                "gm_|@}~`qMF?HAz@OTC|AQFADCLGBAD?BAT?X@LBHDXf@Rr@\\fAN`@n@`BDNBHBH@L@H@LHlC?N@d@@jBA\\AZC\\Ef@Qt@CXG^?DAFADCHITo@jBIb@OTCFA?ABEHAL?BALG\\Iz@ABCNEDEDCBUHIDKFKHMNIH?@ONMJQJg@T[RCBEHEh@z@DHTFLDFFJ@DPV@Bd@x@]B",
            },
            start_location: {
              lat: 9.996516100000001,
              lng: 76.3596708,
            },
            steps: [
              {
                distance: {
                  text: "0.8 km",
                  value: 795,
                },
                duration: {
                  text: "11 mins",
                  value: 636,
                },
                end_location: {
                  lat: 9.994659499999999,
                  lng: 76.354533,
                },
                html_instructions:
                  "Head <b>south</b> on <b>Rajagiri Valley Rd</b> toward <b>CS Jerald Rd</b>",
                polyline: {
                  points:
                    "gm_|@}~`qMF?HAz@OTC|AQFADCLGBAD?BAT?X@LBHDXf@Rr@\\fAN`@n@`BDNBHBH@L@H@LHlC?N@d@@jBA\\AZC\\Ef@Qt@CXG^?DAFADCHITo@jB",
                },
                start_location: {
                  lat: 9.996516100000001,
                  lng: 76.3596708,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.3 km",
                  value: 310,
                },
                duration: {
                  text: "5 mins",
                  value: 320,
                },
                end_location: {
                  lat: 9.9961392,
                  lng: 76.35234380000001,
                },
                html_instructions: "Continue onto <b>Pappakudath Rd</b>",
                polyline: {
                  points:
                    "sa_|@y~_qMIb@OTCFA?ABEHAL?BALG\\Iz@ABCNEDEDCBUHIDKFKHMNIH?@ONMJQJg@T[RCBEHEh@",
                },
                start_location: {
                  lat: 9.994659499999999,
                  lng: 76.354533,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "34 m",
                  value: 34,
                },
                duration: {
                  text: "1 min",
                  value: 33,
                },
                end_location: {
                  lat: 9.995839,
                  lng: 76.3523076,
                },
                html_instructions:
                  "Turn <b>left</b> toward <b>Seaport - Airport Rd</b>",
                maneuver: "turn-left",
                polyline: {
                  points: "{j_|@cq_qMz@D",
                },
                start_location: {
                  lat: 9.9961392,
                  lng: 76.35234380000001,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.1 km",
                  value: 95,
                },
                duration: {
                  text: "2 mins",
                  value: 101,
                },
                end_location: {
                  lat: 9.995382399999999,
                  lng: 76.3515726,
                },
                html_instructions:
                  "Turn <b>right</b> toward <b>Seaport - Airport Rd</b>",
                maneuver: "turn-right",
                polyline: {
                  points: "_i_|@}p_qMHTFLDFFJ@DPV@Bd@x@",
                },
                start_location: {
                  lat: 9.995839,
                  lng: 76.3523076,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "17 m",
                  value: 17,
                },
                duration: {
                  text: "1 min",
                  value: 16,
                },
                end_location: {
                  lat: 9.9955303,
                  lng: 76.35155089999999,
                },
                html_instructions:
                  'Turn <b>right</b> after Home of Faith (on the right)<div style="font-size:0.9em">Destination will be on the right</div>',
                maneuver: "turn-right",
                polyline: {
                  points: "cf_|@il_qM]B",
                },
                start_location: {
                  lat: 9.995382399999999,
                  lng: 76.3515726,
                },
                travel_mode: "WALKING",
              },
            ],
            travel_mode: "WALKING",
          },
          {
            distance: {
              text: "12.7 km",
              value: 12673,
            },
            duration: {
              text: "39 mins",
              value: 2329,
            },
            end_location: {
              lat: 9.963156000000001,
              lng: 76.31824399999999,
            },
            html_instructions: "Bus towards Chittoor Bus & Ferry Stand",
            polyline: {
              points:
                "cg_|@ul_qM@N\\CdBI|BOVAZAv@EtAIvAGvAIj@CPANAb@CfBKf@Et@INC\\K`@IRETE\\Ej@Ir@GlACr@?N?L@T@RBH?`@DF@F@z@PxA\\VFZFH@N@RBH@N?F@D?V?V?`@AfAEJAL?xAGbAERAPAb@Cn@Eh@G`@GhBYdAOfAMf@G\\C`@EHA^Cn@G`BMf@GRAn@GrAMXEt@GLAh@Gt@GVE@?h@Et@IDAl@Gd@GTEZIz@UfBi@RGx@WPGBAXIFCl@SFA\\KZIz@UPE\\Qh@WFAFAn@[RG^IXKlC_AnAg@ZMBAnAe@FC`Be@ZMHCXIVGZGPCRE`@E`@CTCNA\\C^G`@Eb@EbBQf@GHBRF|@Qx@Kv@G~AWxAWRE`AUbAWn@QZODCHCZIJANCNA^?b@Cn@Cl@CXCN?d@AH?PAXAt@E@?TCb@ClAIJ?hAKdBMd@GnCa@fEWn@A^A@?VCN?LAl@CLAVAJAHAJAlBOVCPAfAGr@UZ@PENARA^CTELCXAdCEnBAR?vC?`@?|BAhCAL?vCChB?P?r@DhA?B?Z@~ADDVJv@NfBDxBB\\?@FVFPDJDFFHXZx@r@LNBBj@h@\\\\TVHHDDFDFBFBFBLBT?L?`@E\\CF?\\EPAXCVA@AlAKn@CFAD?F@J@HDFBBFBDBBBDDHFL\\hAN\\HTJf@Nx@BPNdA@L?L?d@?@BZHv@?DHb@Hb@^tBBJ@@HVN\\JT^r@d@|@HLFHFDTNJBDBD@FFDFDHDHFLN`@Z~@JV@F@D@BHj@Fb@Lx@FVb@Oh@W`@UFCVMd@Qj@Q~@]jA_@x@WLGD^Bb@BbABxCAb@AJADADGFONJfH{@Da@Bi@Dk@ByF\\?TAjAEdEQxDApEG?I@S@O?U@Y@g@BQDG@K?W@m@?O?OAY@[@e@?U@M?c@BWD_@F]HaARWJMDm@V_@JE@g@Tg@Te@Vm@V[LUJA@YHqAd@[NqBr@}BhAg@TIBUHu@VgC|@Nl@t@xDJf@FRZrAXpADNBJFNJb@ZlAdAxEPn@Jf@BNJXV~@d@bB^tAn@dBPn@d@bBf@dBFNFN@@N^Cp@GRMNIFWLyBfASJcAj@SLa@Tu@b@}@b@KDgBr@QHA?OJ[PQJSLKHEBC@KHGDGFIFGDEFA?CFEFGNELCJCREVOb@KZIRGLIJGHIJEFIFMHUPSJQHa@TQHUHWJa@RSHWJSJSHSHWJUHSHE@GBC@UHQHMDEBKDGBE@s@XuAr@IFs@^UNMPOJGFIFSLs@d@[RKFWNKHWTOLCDCDKJABCBEFKP]j@[l@e@~@S^g@hAGHIRsB~DYl@KRQf@IFIXO\\?@GNGJEFEHuBpCa@f@o@x@e@l@[\\_@\\IH[VONKHOHXnBBRpAAnAAzCA`GCnC@@VmAAeA@BP?@Q?mB?S?{@?gA@u@@s@?yA@g@?eABW@?H",
            },
            start_location: {
              lat: 9.995543999999999,
              lng: 76.35163399999999,
            },
            transit_details: {
              arrival_stop: {
                location: {
                  lat: 9.963156000000001,
                  lng: 76.31824399999999,
                },
                name: "Power House",
              },
              arrival_time: {
                text: "3:59 PM",
                time_zone: "Asia/Calcutta",
                value: 1713868193,
              },
              departure_stop: {
                location: {
                  lat: 9.995543999999999,
                  lng: 76.35163399999999,
                },
                name: "Chittethukara",
              },
              departure_time: {
                text: "3:21 PM",
                time_zone: "Asia/Calcutta",
                value: 1713865864,
              },
              headsign: "Chittoor Bus & Ferry Stand",
              line: {
                agencies: [
                  {
                    name: "KSRTC",
                    url: "https://www.keralartc.com/main.html",
                  },
                ],
                name: "Chittoor Bus & Ferry Stand - Kinfra",
                vehicle: {
                  icon: "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                  name: "Bus",
                  type: "BUS",
                },
              },
              num_stops: 29,
            },
            travel_mode: "TRANSIT",
          },
          {
            distance: {
              text: "0.8 km",
              value: 773,
            },
            duration: {
              text: "11 mins",
              value: 638,
            },
            end_location: {
              lat: 9.9625988,
              lng: 76.31327659999999,
            },
            html_instructions:
              "Walk to X867+X3G, Toc-H Rd, Toc-H Nagar, Vyttila, Ernakulam, Kochi, Kerala 682019, India",
            polyline: {
              points:
                "w|x{@i|xpMVADVDN?@BL@NBP?H@N?N@X@b@B`@Fj@Rf@DJTlAcATu@PQBRv@Np@R^^xBYFk@Ls@NOBXnBDPHZ@BJVHPFVFVFRFLzA]",
            },
            start_location: {
              lat: 9.963158199999999,
              lng: 76.31829449999999,
            },
            steps: [
              {
                distance: {
                  text: "14 m",
                  value: 14,
                },
                duration: {
                  text: "1 min",
                  value: 11,
                },
                end_location: {
                  lat: 9.963036499999999,
                  lng: 76.3182999,
                },
                html_instructions:
                  "Head <b>south</b> on <b>Service Rd</b> toward <b>Sahakarana Rd</b>",
                polyline: {
                  points: "w|x{@i|xpMVA",
                },
                start_location: {
                  lat: 9.963158199999999,
                  lng: 76.31829449999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.2 km",
                  value: 227,
                },
                duration: {
                  text: "3 mins",
                  value: 191,
                },
                end_location: {
                  lat: 9.962604799999999,
                  lng: 76.3162925,
                },
                html_instructions:
                  'Turn <b>right</b> at FOREVER LIVING KERALA DEALER onto <b>Sahakarana Rd</b><div style="font-size:0.9em">Pass by GS Trading (on the right in 40m)</div>',
                maneuver: "turn-right",
                polyline: {
                  points: "_|x{@k|xpMDVDN?@BL@NBP?H@N?N@X@b@B`@Fj@Rf@DJTlA",
                },
                start_location: {
                  lat: 9.963036499999999,
                  lng: 76.3182999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "81 m",
                  value: 81,
                },
                duration: {
                  text: "1 min",
                  value: 67,
                },
                end_location: {
                  lat: 9.963297899999999,
                  lng: 76.31606529999999,
                },
                html_instructions:
                  'Turn <b>right</b> at Kurikayil Bldg onto <b>Major Rd</b><div style="font-size:0.9em">Pass by CURRAC Capital Partners (on the left in 39m)</div>',
                maneuver: "turn-right",
                polyline: {
                  points: "gyx{@yoxpMcATu@PQB",
                },
                start_location: {
                  lat: 9.962604799999999,
                  lng: 76.3162925,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "82 m",
                  value: 82,
                },
                duration: {
                  text: "1 min",
                  value: 70,
                },
                end_location: {
                  lat: 9.9630174,
                  lng: 76.31537829999999,
                },
                html_instructions:
                  "Turn <b>left</b> at Chennai Biriyani Centre toward <b>St Joseph Chappel Ln</b>",
                maneuver: "turn-left",
                polyline: {
                  points: "s}x{@mnxpMRv@Np@R^",
                },
                start_location: {
                  lat: 9.963297899999999,
                  lng: 76.31606529999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "69 m",
                  value: 69,
                },
                duration: {
                  text: "1 min",
                  value: 52,
                },
                end_location: {
                  lat: 9.962858299999999,
                  lng: 76.3147663,
                },
                html_instructions:
                  'Continue onto <b>St Joseph Chappel Ln</b><div style="font-size:0.9em">Pass by Anna\'s Play School &amp; Day Care - Playschool in Vyttila, Day Care in Vyttila (on the right in 49m)</div>',
                polyline: {
                  points: "{{x{@cjxpM^xB",
                },
                start_location: {
                  lat: 9.9630174,
                  lng: 76.31537829999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "81 m",
                  value: 81,
                },
                duration: {
                  text: "1 min",
                  value: 70,
                },
                end_location: {
                  lat: 9.963553599999999,
                  lng: 76.31455649999999,
                },
                html_instructions:
                  'Turn <b>right</b> at Su-Kam Service Center onto <b>Janatha Rd</b>/<wbr/><b>Jr Janatha Rd</b><div style="font-size:0.9em">Pass by D BIOSCIENCE HEALTHCARE PVT LTD. (on the right)</div>',
                maneuver: "turn-right",
                polyline: {
                  points: "{zx{@ifxpMYFk@Ls@NOB",
                },
                start_location: {
                  lat: 9.962858299999999,
                  lng: 76.3147663,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.2 km",
                  value: 166,
                },
                duration: {
                  text: "2 mins",
                  value: 134,
                },
                end_location: {
                  lat: 9.9630572,
                  lng: 76.3131341,
                },
                html_instructions:
                  'Turn <b>left</b> at <b>Toch Cross Rd</b> onto <b>Toc H Cross Rd</b><div style="font-size:0.9em">Pass by Black Ice Studio (on the left in 68m)</div>',
                maneuver: "turn-left",
                polyline: {
                  points: "e_y{@_expMXnBDPHZ@BJVHPFVFVFRFL",
                },
                start_location: {
                  lat: 9.963553599999999,
                  lng: 76.31455649999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "53 m",
                  value: 53,
                },
                duration: {
                  text: "1 min",
                  value: 43,
                },
                end_location: {
                  lat: 9.9625988,
                  lng: 76.31327659999999,
                },
                html_instructions:
                  'Turn <b>left</b> at Jit &amp; Jit Products<div style="font-size:0.9em">Pass by Toc H Indoor Stadium (on the left in 29m)</div><div style="font-size:0.9em">Destination will be on the right</div>',
                maneuver: "turn-left",
                polyline: {
                  points: "c|x{@a|wpMzA]",
                },
                start_location: {
                  lat: 9.9630572,
                  lng: 76.3131341,
                },
                travel_mode: "WALKING",
              },
            ],
            travel_mode: "WALKING",
          },
        ],
        traffic_speed_entry: [],
        via_waypoint: [],
      },
    ],
    overview_polyline: {
      points:
        "gm_|@}~`qMPApASdBSRKb@Cf@DHDXf@p@zB~@bCNp@LtDBpCCx@IdAUnAKr@M^o@jBIb@S\\CBGVAPWlBKJYLULYXg@f@y@`@_@VKr@z@DHTLTHPRZd@x@]BAO@NxG_@`GYdDQjCO|AObB_@r@K~AQ`CC\\@tAJdDr@lARt@FvAAhI]xAMjCa@rEi@hIs@jHs@rCYz@MvA_@fEqArAc@|Bm@`Bq@v@]r@QfDkAjBu@rAg@hBi@vAc@bBWdBMhEe@f@GHBRF|@QpBSxDo@tA[rBi@`@Sd@MZEn@AzCOpACnHe@jCUnCa@fEWnACXCxAGx@G~E]r@UZ@`@GvAO~CGbCA`MC`HC|CF~ADDVZ~CHvCFXRd@`@d@fAbAbBbB^XNFb@BlAIpAKvCSLARBPHFLT`@l@fBT|@d@~CBpAH|@RfAb@`CJX`BdDPV\\T^PXh@x@`CTxATpAlAg@h@Y|@_@pFgBLGD^FfB@|DCPILONJfH}AHuAHyF\\?TGpGQxDApEQ@sADg@BQDS@eA@_@A{ABc@@{@H}@PaARWJ{@\\e@LcDzAq@X[JmBt@qBr@}BhAq@XkA`@gC|@Nl@`A`FbAhEr@lCvAhGNv@hBrG`AtClAhE`@`ACp@GRWViFlCu@b@u@b@}@b@sBx@SHqAv@a@Xa@ZQVU|@Uz@Un@QXQTs@j@yAt@cBr@{ClA{Al@y@Z_Bz@iAn@]\\yAbAkAt@o@n@WZkBjDmAfCmClF]z@IFIXO^[l@mF`HaB|A[XOHXnBBRpAAjFCpKA@VmAAeA@BPQ@eG@kFB}AD?H?IVADVDPHx@Bx@DdAFj@Rf@ZxAyBf@QBRv@Np@R^^xBYF_B\\OBXnBNl@LZPh@Nj@FLzA]",
    },
    summary: "",
    warnings: [
      "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths.",
    ],
    waypoint_order: [],
  });

  const [location, setLocation] = useState();
  const [address, setAddress] = useState();
  const [markers, setMarkers] = useState([]);

  const [polylineCoordinates, setPolylineCoordinates] = useState([]);

  const mapRef = useRef();
  const originRef = useRef();
  const destinationRef = useRef();

  useEffect(() => {
    console.log("Start : ", route.legs[0].start_location);
    console.log("End : ", route.legs[0].end_location);
    originRef.current.setAddressText(route.legs[0].start_address);
    destinationRef.current.setAddressText(route.legs[0].end_address);
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location : ");
      console.log(currentLocation);

      mapRef.current?.animateToRegion({
        latitude: currentLocation?.coords.latitude,
        longitude: currentLocation?.coords.longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      });

      setPolylineCoordinates(
        polyline.decode(route.overview_polyline.points).map((coord) => {
          return { latitude: coord[0], longitude: coord[1] };
        })
      );
    };

    getPermissions();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            {/* <View style={styles.menuButtonContainer}>
              <MaterialIcons name="menu" size={20} color="#000"/>
            </View> */}
            <ProfileIcon
              onPress={() => navigation.toggleDrawer()} // Example onPress function
              imageSource={require("../assets/img/profile.png")} // Example image source
            />
            <GooglePlacesAutocomplete
              placeholder="Enter Origin"
              ref={originRef}
              styles={{ textInput: styles.locationInput }}
              onPress={(data, details = null) => {
                setOrigin(data.description);
              }}
              query={{
                key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
                language: "en",
              }}
            />
            <GooglePlacesAutocomplete
              ref={destinationRef}
              styles={{
                textInput: styles.locationInput,
                listView: { position: "absolute", top: 50, zIndex: 2 },
              }}
              placeholder="Enter Destination"
              onPress={(data, details = null) => {
                console.log("Destination : ", data, details);
                setDestination(data.description);
              }}
              query={{
                key: "AIzaSyDxcgmpNTtROwth6FMxilVQCUZ-D8U8384",
                language: "en",
              }}
            />
            <Button title="Start Journey" />
          </View>

          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            showsUserLocation
            showsMyLocationButton
          >
            {markers.map((marker, index) => (
              <Marker key={index} coordinate={marker} />
            ))}
            {route && (
              <Polyline
                coordinates={polyline
                  .decode(route.overview_polyline.points)
                  .map((coord) => {
                    return { latitude: coord[0], longitude: coord[1] };
                  })}
                strokeColor={
                  "#" +
                  "000000".substring(0, 6 - Math.round(0xffffff * Math.random()).toString(16).length) +
                  Math.round(0xffffff * Math.random()).toString(16)
                } // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={7}
              />
            )}
          </MapView>
          <BottomModalContainer>
            <RouteModal route={route} />
          </BottomModalContainer>
        </View>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const CONTAINER_PADDING = 10;
const BUTTON_WIDTH = "80%";
const INPUT_WIDTH = 500;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100vw",
    justifyContent: "space-between",
    alignItems: "center",
    padding: CONTAINER_PADDING,
  },
  inputContainer: {
    minHeight: 170,
    width: "100%",
    justifyContent: "space-around",
    alignContent: "center",
    padding: CONTAINER_PADDING,
    marginTop: 20,
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // width: "100%",
    height: "100vh",
    marginBottom: 0,
    zIndex: -1,
  },
  goButtonContainer: {
    position: "absolute",
    bottom: CONTAINER_PADDING,
    alignSelf: "center",
    elevation: 1,
  },
  goButton: {
    backgroundColor: "#FFC75B",
    borderRadius: 20,
    paddingHorizontal: "20%",
    paddingVertical: "5%",
    alignItems: "center",
    width: BUTTON_WIDTH,
  },
  goButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationInput: {
    color: "black",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: "100%",
    padding: CONTAINER_PADDING,
    marginBottom: CONTAINER_PADDING,
    borderWidth: 1,
    borderColor: "#2675EC",
    fontWeight: "600",
  },
  textInput: {
    color: "black",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    width: INPUT_WIDTH,
    padding: CONTAINER_PADDING,
    marginBottom: CONTAINER_PADDING,
    borderWidth: 1,
    borderColor: "#2675EC",
    fontWeight: "600",
  },
  firstTextInput: {
    marginTop: CONTAINER_PADDING,
  },
  menuButtonContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    padding: CONTAINER_PADDING,
  },
  menuButton: {
    width: "200%",
    height: "100%",
    alignItems: "center",
    borderRadius: 25,
    backgroundColor: "black",
  },
  buttonText: {
    fontSize: 24,
    color: "#FFFFFF",
  },
});
export default Home;
