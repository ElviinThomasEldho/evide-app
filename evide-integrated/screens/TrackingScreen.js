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
import TrackingModal from "../components/TrackingModal";

const TrackingScreen = ({ navigation }) => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [directions, setDirections] = useState();
  const [route, setRoute] = useState({
    bounds: {
      northeast: {
        lat: 10.0302034,
        lng: 76.34463219999999,
      },
      southwest: {
        lat: 9.9625988,
        lng: 76.28196989999999,
      },
    },
    copyrights: "Map data ©2024",
    fare: {
      currency: "INR",
      text: "₹45.00",
      value: 45,
    },
    legs: [
      {
        arrival_time: {
          text: "11:59 AM",
          time_zone: "Asia/Calcutta",
          value: 1714026547,
        },
        departure_time: {
          text: "10:46 AM",
          time_zone: "Asia/Calcutta",
          value: 1714022182,
        },
        distance: {
          text: "15.4 km",
          value: 15401,
        },
        duration: {
          text: "1 hour 13 mins",
          value: 4365,
        },
        end_address:
          "X867+X3G, Toc-H Rd, Toc-H Nagar, Vyttila, Ernakulam, Kochi, Kerala 682019, India",
        end_location: {
          lat: 9.9625988,
          lng: 76.31327659999999,
        },
        start_address:
          "6/473 F, Kollamkudimugal Rd, Thrikkakara, Kakkanad, Kerala 682021, India",
        start_location: {
          lat: 10.0302034,
          lng: 76.34463219999999,
        },
        steps: [
          {
            distance: {
              text: "1.2 km",
              value: 1214,
            },
            duration: {
              text: "18 mins",
              value: 1053,
            },
            end_location: {
              lat: 10.0231124,
              lng: 76.3408238,
            },
            html_instructions: "Walk to Mavelipuram Junction",
            polyline: {
              points:
                "w_f|@}`~pMpB@H?F?@?@?B?FD@FDXFj@BXBFJVFPLVLP^t@EDIJCFCHCFAJCf@AFEbA@XBDFFBB@@@?TJD@LDb@JH@D?B?DADADAN?b@Hp@HdALFk@fBN`@@VAPAH?n@?|@BXAP?F?f@FB?PB|@NLBfAVfA@h@Dn@FnAn@~A~@UZQ^EL@`@Bb@Lg@DQHQ",
            },
            start_location: {
              lat: 10.0302034,
              lng: 76.34463219999999,
            },
            steps: [
              {
                distance: {
                  text: "85 m",
                  value: 85,
                },
                duration: {
                  text: "1 min",
                  value: 62,
                },
                end_location: {
                  lat: 10.0294553,
                  lng: 76.3445883,
                },
                html_instructions: "Head <b>south</b>",
                polyline: {
                  points: "w_f|@}`~pMpB@H?F?@?@?B?FD",
                },
                start_location: {
                  lat: 10.0302034,
                  lng: 76.34463219999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.2 km",
                  value: 150,
                },
                duration: {
                  text: "2 mins",
                  value: 115,
                },
                end_location: {
                  lat: 10.0289365,
                  lng: 76.34334369999999,
                },
                html_instructions: "Turn <b>right</b>",
                maneuver: "turn-right",
                polyline: {
                  points: "c{e|@u`~pM@FDXFj@BXBFJVFPLVLP^t@",
                },
                start_location: {
                  lat: 10.0294553,
                  lng: 76.3445883,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.3 km",
                  value: 296,
                },
                duration: {
                  text: "4 mins",
                  value: 264,
                },
                end_location: {
                  lat: 10.0276022,
                  lng: 76.3419392,
                },
                html_instructions:
                  "Turn <b>right</b> at <b>Chakkalapadam Rd</b>",
                maneuver: "turn-right",
                polyline: {
                  points:
                    "{we|@{x}pMEDIJCFCHCFAJCf@AFEbA@XBDFFBB@@@?TJD@LDb@JH@D?B?DADADAN?b@Hp@HdAL",
                },
                start_location: {
                  lat: 10.0289365,
                  lng: 76.34334369999999,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "25 m",
                  value: 25,
                },
                duration: {
                  text: "1 min",
                  value: 23,
                },
                end_location: {
                  lat: 10.0275649,
                  lng: 76.3421599,
                },
                html_instructions: "Turn <b>left</b>",
                maneuver: "turn-left",
                polyline: {
                  points: "ooe|@cp}pMFk@",
                },
                start_location: {
                  lat: 10.0276022,
                  lng: 76.3419392,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.5 km",
                  value: 525,
                },
                duration: {
                  text: "8 mins",
                  value: 480,
                },
                end_location: {
                  lat: 10.0230571,
                  lng: 76.3411598,
                },
                html_instructions: "Turn <b>right</b>",
                maneuver: "turn-right",
                polyline: {
                  points:
                    "goe|@oq}pMfBN`@@VAPAH?n@?|@BXAP?F?f@FB?PB|@NLBfAVfA@h@Dn@FnAn@~A~@",
                },
                start_location: {
                  lat: 10.0275649,
                  lng: 76.3421599,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "87 m",
                  value: 87,
                },
                duration: {
                  text: "1 min",
                  value: 64,
                },
                end_location: {
                  lat: 10.0232622,
                  lng: 76.3404377,
                },
                html_instructions:
                  'Turn <b>right</b> onto <b>Kakkanad - NGO Quarters Rd</b>/<wbr/><b>NGO Quarters - Mavelipuram Rd</b><div style="font-size:0.9em">Pass by Susruta Eye Hospital (on the right in 25m)</div>',
                maneuver: "turn-right",
                polyline: {
                  points: "csd|@gk}pMUZQ^EL@`@Bb@",
                },
                start_location: {
                  lat: 10.0230571,
                  lng: 76.3411598,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "46 m",
                  value: 46,
                },
                duration: {
                  text: "1 min",
                  value: 45,
                },
                end_location: {
                  lat: 10.0231124,
                  lng: 76.3408238,
                },
                html_instructions:
                  'Sharp <b>left</b> at <b>Mavelipuram Signal Jct</b> onto <b>Kakkanad Jct Rd</b>/<wbr/><b>Seaport - Airport Rd</b><div style="font-size:0.9em">Pass by Muhyidheen Juma Masjid (on the right)</div><div style="font-size:0.9em">Destination will be on the right</div>',
                maneuver: "turn-sharp-left",
                polyline: {
                  points: "ktd|@wf}pMLg@DQHQ",
                },
                start_location: {
                  lat: 10.0232622,
                  lng: 76.3404377,
                },
                travel_mode: "WALKING",
              },
            ],
            travel_mode: "WALKING",
          },
          {
            distance: {
              text: "7.1 km",
              value: 7118,
            },
            duration: {
              text: "24 mins",
              value: 1437,
            },
            end_location: {
              lat: 9.994368999999999,
              lng: 76.291668,
            },
            html_instructions: "Bus towards Fort Kochi Bus Stand",
            polyline: {
              points:
                "esd|@_i}pMGCIPEPMf@`@Zl@j@VX@@LVJXL\\J^FPPx@FRFPJVLVNX\\p@JNBD`@t@HLNRJNFJLX?@DNFTBT@H@JB`@Dl@Dp@HjA@FLxABV@T@@@d@DT@NDX@?@?@@@?B@@@@?@@@@@BZC@A@@@?JBxAUd@Mj@Q`@Qb@STMlCsAd@UpAk@XKXITGZGTCPCRAT?p@Cl@AbAAF?H?J@H?H@F@JBXLNBNHJFHHNNLNJJFHb@~@HLRf@HPx@zBBJFNFRDLJb@Tx@L`ALf@DNFTFNTr@Hb@T|@H`@DPJ`@?BXd@H`@Nz@Dv@@TBf@@FHz@N`Ax@vDJp@Lj@DVAR@NFp@@PB^D`@?B@PFr@Fp@LfADRLp@DZLbALbADXFd@Dp@BTALDZ@L@R@NB^B\\BXBL@H@DDT@FL`A^n@Lb@L`@Rl@J^Nd@LVHXJVDL@BHTFFBDHZDT^rAZxALj@X|A@D?T?J@LLj@Lh@Ph@BJVv@DPJp@@HBF@DFJBDr@r@FHT\\R`@NTFHHNLLRRPLRLv@d@RFLDB@vA`@tBl@B@b@BV@D?H?R?n@@v@HF@F?H@DBD@F@DBLFLVHVFXJ\\Lf@?BNd@BHBRL\\Pp@Hd@HJ@DDLE?Ll@v@lFJ`ANnBp@hDC@?@d@`A|@zC@@AX@D@DNv@`@bBBDFVFNHRDJBJVh@R\\@DNTPVHLLXn@xAHL\\n@@?@??A@?@?@?@?@?@??@@?@??@@?@@@@@@?@?@@@?@?@?@?@A@Jd@DRHv@RnA@HNhANdALfBBRDb@@JAB?B?@A@?@A?PZHVHXFRH`@Jd@P`AFr@TzBDh@Fb@JjABN@RFLDNL\\DHLZ\\r@JTFJLVDHHPDNFNd@x@X`@l@p@Xh@V^\\h@T^j@t@h@n@nArAHHz@fAzApBJLd@l@Zl@bBzB`@x@^j@nCdEhBbCt@bAXXZTF@XGXA@?@?R?B@LFDD@B@B@@?Z?@GPi@U",
            },
            start_location: {
              lat: 10.023069,
              lng: 76.3408,
            },
            transit_details: {
              arrival_stop: {
                location: {
                  lat: 9.994368999999999,
                  lng: 76.291668,
                },
                name: "Kaloor Bus Stand",
              },
              arrival_time: {
                text: "11:27 AM",
                time_zone: "Asia/Calcutta",
                value: 1714024672,
              },
              departure_stop: {
                location: {
                  lat: 10.023069,
                  lng: 76.3408,
                },
                name: "Mavelipuram Junction",
              },
              departure_time: {
                text: "11:03 AM",
                time_zone: "Asia/Calcutta",
                value: 1714023235,
              },
              headsign: "Fort Kochi Bus Stand",
              line: {
                agencies: [
                  {
                    name: "KSRTC",
                    url: "https://www.keralartc.com/main.html",
                  },
                ],
                name: "Fort Kochi Bus Stand - Thuthiyoor Bus Stand",
                vehicle: {
                  icon: "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                  name: "Bus",
                  type: "BUS",
                },
              },
              num_stops: 19,
            },
            travel_mode: "TRANSIT",
          },
          {
            distance: {
              text: "40 m",
              value: 40,
            },
            duration: {
              text: "1 min",
              value: 41,
            },
            end_location: {
              lat: 9.994299999999999,
              lng: 76.2914,
            },
            html_instructions: "Walk to Kaloor",
            polyline: {
              points: "{__|@yuspMPEAv@",
            },
            start_location: {
              lat: 9.9943837,
              lng: 76.2916525,
            },
            steps: [
              {
                distance: {
                  text: "10 m",
                  value: 10,
                },
                duration: {
                  text: "1 min",
                  value: 10,
                },
                end_location: {
                  lat: 9.994289999999999,
                  lng: 76.29168199999999,
                },
                polyline: {
                  points: "{__|@yuspMPE",
                },
                start_location: {
                  lat: 9.9943837,
                  lng: 76.2916525,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "30 m",
                  value: 30,
                },
                duration: {
                  text: "1 min",
                  value: 31,
                },
                end_location: {
                  lat: 9.994299999999999,
                  lng: 76.2914,
                },
                html_instructions:
                  'Take entrance <span class="location">Lift A</span>',
                polyline: {
                  points: "i__|@_vspMAv@",
                },
                start_location: {
                  lat: 9.994289999999999,
                  lng: 76.29168199999999,
                },
                travel_mode: "WALKING",
              },
            ],
            travel_mode: "WALKING",
          },
          {
            distance: {
              text: "6.0 km",
              value: 6042,
            },
            duration: {
              text: "12 mins",
              value: 742,
            },
            end_location: {
              lat: 9.9671,
              lng: 76.3082,
            },
            html_instructions: "Metro rail towards തൈക്കൂടം",
            polyline: {
              points:
                "k__|@gtspMbIpHfDrDvApBjBlC\\`@jFhDtFlCzAjAjAbAr@z@dBrClAtD^rAf@fAv@p@r@^~@TtABt@InDq@RElIyBdLiAfDe@tJcC`I{A~KoACQ@?pHu@hBO`AGz@MtAWjBa@^IZINIXKTOPOJMJOFMFMDKDOBS@O@Q@SA_@Cw@?_@@]@Y@WDe@D_@Bc@A[Cw@GcAKaBCe@?Q?S@O@MBMBODMDKFMJQJOLOLKLIPKVIx@YjGaBn@UXOVSRSHMHMJSJYFYDW@W?]C[WsBKu@?IAICQEy@Eg@Ig@M{@WmB[}B_@kCMy@Ik@Mi@S{@a@}AyA}Ea@yA[kAKi@Ge@AOAOASAQIoC[kKC{A?o@?a@@]B_@DYF_@J_@Pm@~A}EDSDOBO@S@O?O?SCYKs@Ks@@?",
            },
            start_location: {
              lat: 9.994299999999999,
              lng: 76.2914,
            },
            transit_details: {
              arrival_stop: {
                location: {
                  lat: 9.9671,
                  lng: 76.3082,
                },
                name: "Elamkulam",
              },
              arrival_time: {
                text: "11:45 AM",
                time_zone: "Asia/Calcutta",
                value: 1714025728,
              },
              departure_stop: {
                location: {
                  lat: 9.994299999999999,
                  lng: 76.2914,
                },
                name: "Kaloor",
              },
              departure_time: {
                text: "11:33 AM",
                time_zone: "Asia/Calcutta",
                value: 1714024986,
              },
              headsign: "തൈക്കൂടം",
              line: {
                agencies: [
                  {
                    name: "കൊച്ചി മെട്രോ",
                    phone: "011 91 1800 425 0355",
                    url: "http://www.kochimetro.org/",
                  },
                ],
                color: "#14b1b2",
                name: "Route 1",
                short_name: "R1",
                text_color: "#000000",
                vehicle: {
                  icon: "//maps.gstatic.com/mapfiles/transit/iw2/6/metro.png",
                  name: "Metro rail",
                  type: "SUBWAY",
                },
              },
              num_stops: 6,
              trip_short_name: "11:05 Thaikoodam",
            },
            travel_mode: "TRANSIT",
          },
          {
            distance: {
              text: "1.0 km",
              value: 987,
            },
            duration: {
              text: "14 mins",
              value: 822,
            },
            end_location: {
              lat: 9.9625988,
              lng: 76.31327659999999,
            },
            html_instructions:
              "Walk to X867+X3G, Toc-H Rd, Toc-H Nagar, Vyttila, Ernakulam, Kochi, Kerala 682019, India",
            polyline: {
              points:
                "kuy{@g}vpM?y@G@Mg@Gc@CMEa@CWACGm@?ICg@Eo@YwEAGMuAE]`@GDCBABABAHI@C@?BABAD?D?B?HA\\@D@F?DAFAXKFC|Ac@bBg@HCRITKh@Yn@UDCLE|@M^EHAJCB?DAd@CJ?b@?d@EZAP?HA@?@A@A@A@A?ABCDCl@SzA]",
            },
            start_location: {
              lat: 9.9671,
              lng: 76.3082,
            },
            steps: [
              {
                distance: {
                  text: "32 m",
                  value: 32,
                },
                duration: {
                  text: "1 min",
                  value: 33,
                },
                end_location: {
                  lat: 9.9671,
                  lng: 76.308493,
                },
                html_instructions:
                  'Take exit <span class="location">Entrance B</span>',
                polyline: {
                  points: "kuy{@g}vpM?y@",
                },
                start_location: {
                  lat: 9.9671,
                  lng: 76.3082,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.4 km",
                  value: 354,
                },
                duration: {
                  text: "5 mins",
                  value: 284,
                },
                end_location: {
                  lat: 9.9676642,
                  lng: 76.3116599,
                },
                html_instructions:
                  'Head <b>east</b> on <b>Sahodaran Ayyappan Rd</b> toward <b>Toc-H Rd</b><div style="font-size:0.9em">Pass by Elamkulam Metro Station (on the left)</div>',
                polyline: {
                  points: "suy{@__wpMMg@Gc@CMEa@CWACGm@?ICg@Eo@YwEAGMuAE]",
                },
                start_location: {
                  lat: 9.967139899999999,
                  lng: 76.3084796,
                },
                travel_mode: "WALKING",
              },
              {
                distance: {
                  text: "0.6 km",
                  value: 601,
                },
                duration: {
                  text: "8 mins",
                  value: 505,
                },
                end_location: {
                  lat: 9.9625988,
                  lng: 76.31327659999999,
                },
                html_instructions:
                  'Turn <b>right</b> at Emmanuel Caterers onto <b>Toc-H Rd</b><div style="font-size:0.9em">Pass by OkYo.in (on the left in 39m)</div><div style="font-size:0.9em">Destination will be on the right</div>',
                maneuver: "turn-right",
                polyline: {
                  points:
                    "{xy{@{rwpM`@GDCBABABAHI@C@?BABAD?D?B?HA\\@D@F?DAFAXKFC|Ac@bBg@HCRITKh@Yn@UDCLE|@M^EHAJCB?DAd@CJ?b@?d@EZAP?HA@?@A@A@A@A?ABCDCl@SzA]",
                },
                start_location: {
                  lat: 9.9676642,
                  lng: 76.3116599,
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
        "w_f|@}`~pMdC@D?FD@FLdAF`@n@rA^t@EDMRGPEr@GjAD^NLlA^X?JCr@HvBVFk@fBNx@?ZAlBBj@AdAJjARfAVfA@xALnDnBUZQ^EL@`@Bb@Lg@Nc@FBGCOb@Mf@`@ZdAdAh@pAl@~BRh@\\p@nA|Bl@|@LZLd@JlAl@|HFz@Fh@F@HDBD\\EB@JBxAUpA_@dAe@bDaBvBaAr@Up@Oz@IxDGf@@PBd@P^LTPp@t@l@lA\\x@lAjDPp@Tx@L`ARv@Nd@^vA^~APr@Xh@X|AFlADn@X|BxAlH?b@HbAJvANdBRzAn@tEL~@HfAFjALfBLr@NhA^n@Lb@`@nAZdAh@vAJXJLNp@z@lDf@hC@Z@XZtAr@~BLz@DLJPz@|@`A~AV\\d@`@jAr@`@LtErAjADbA@~@J\\FLDLFLVPp@XdAVfA^nAHd@HJFRE?Ll@bAnHNnBp@hDCBd@`A|@zC?ZBJp@zCJ\\Zz@j@fAPZZd@|@rBh@|@BAD?F@FJ@DHj@d@dD^nCPzBDv@CDZr@Pl@TfAXtBn@tGDb@L\\~@vBf@bAN`@l@hAfArAp@hAr@hAtAdBxA|AvCxDp@z@Zl@bBzB`AdBnCdE~CfEt@n@F@XGZAT?PHJN?\\GPi@UABPEAv@bIpHfDrDbE~F\\`@jFhDtFlCzAjAjAbAr@z@dBrClAtD^rAf@fAv@p@r@^~@TtABt@InDq@`J_CdLiAfDe@tJcC`I{A~KoACQrHu@jDWpCe@jCk@j@Sn@[\\]R]LYHc@Ba@?s@CwABw@PaCEsASeDCw@@c@Ny@d@{@Z[^UpAc@jGaBn@Up@c@\\a@Ta@Rs@Fo@Cy@e@}DIkAOoAaBsLWeBa@eBa@}AyA}E}@eDSoAC_@i@aQCkC@_AHy@R_ApBkGJc@FcACm@WgB@y@G@Mg@Kq@Iy@McB_@gGO}AE]`@GHERQNCp@?ZAbF{A\\M~@e@t@YjASx@KzAE|AIFEJKl@SzA]",
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
    console.log("Steps: ", route.legs[0].steps);
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
            {/* <Button title="Start Journey" /> */}
          </View>

          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            showsUserLocation
            showsMyLocationButton
          >
            {route.legs[0].steps.map((parentStep, index) => {
              console.log(parentStep.steps);
              return (
                <>
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parentStep.start_location.lat,
                      longitude: parentStep.start_location.lng,
                    }}
                  />
                  <Marker
                    key={index}
                    coordinate={{
                      latitude: parentStep.end_location.lat,
                      longitude: parentStep.end_location.lng,
                    }}
                  />
                  {parentStep.steps?.map((step) => (
                    <>
                      <Marker
                        key={index}
                        coordinate={{
                          latitude: step.start_location.lat,
                          longitude: step.start_location.lng,
                        }}
                      />
                      <Marker
                        key={index}
                        coordinate={{
                          latitude: step.end_location.lat,
                          longitude: step.end_location.lng,
                        }}
                      />
                    </>
                  ))}
                </>
              );
            })}
            {route && (
              <Polyline
                coordinates={polyline
                  .decode(route.overview_polyline.points)
                  .map((coord) => {
                    return { latitude: coord[0], longitude: coord[1] };
                  })}
                strokeColor={
                  "#" +
                  "000000".substring(
                    0,
                    6 - Math.round(0xffffff * Math.random()).toString(16).length
                  ) +
                  Math.round(0xffffff * Math.random()).toString(16)
                } // fallback for when `strokeColors` is not supported by the map-provider
                strokeWidth={6}
              />
            )}
          </MapView>
          <BottomModalContainer buttonTitle="View Route">
            <TrackingModal route={route} />
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
export default TrackingScreen;
