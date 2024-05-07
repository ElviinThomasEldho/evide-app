import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./screens/Home.js";
import LanguageScreen from "./screens/LanguageScreen.js";
import RouteDetailScreen from "./screens/RouteDetailScreen.js";
import TrackingScreen from "./screens/TrackingScreen.js";
import { LanguageProvider } from "./context/LanguageContext";
import { useTranslation } from "react-i18next";

import { RouteContext } from "./store/routeContext.jsx";
import { useState } from "react";

const Drawer = createDrawerNavigator();

export default function App() {
  const { t } = useTranslation();
  const [selectedRoute, setSelectedRoute] = useState()

  return (
    <LanguageProvider>
      <NavigationContainer>
        <RouteContext.Provider
          value={{
            route: {
              bounds: {
                northeast: {
                  lat: 10.0374496,
                  lng: 76.34463219999999,
                },
                southwest: {
                  lat: 9.9625988,
                  lng: 76.2815777,
                },
              },
              copyrights: "Map data ©2024",
              fare: {
                currency: "INR",
                text: "₹24.00",
                value: 24,
              },
              legs: [
                {
                  arrival_time: {
                    text: "12:19 PM",
                    time_zone: "Asia/Calcutta",
                    value: 1714027750,
                  },
                  departure_time: {
                    text: "11:02 AM",
                    time_zone: "Asia/Calcutta",
                    value: 1714023142,
                  },
                  distance: {
                    text: "18.7 km",
                    value: 18659,
                  },
                  duration: {
                    text: "1 hour 17 mins",
                    value: 4608,
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
                        text: "0.8 km",
                        value: 774,
                      },
                      duration: {
                        text: "10 mins",
                        value: 598,
                      },
                      end_location: {
                        lat: 10.036408,
                        lng: 76.3439175,
                      },
                      html_instructions: "Walk to Mundampalam",
                      polyline: {
                        points:
                          "w_f|@}`~pMW`@QN[LKBC@A@CBEFILu@vA_@v@e@C}AHK?M@UAk@EQEk@Ku@Kw@I{@MKAcA[g@MIAWEWCQAS@kAGcAK{AUM?Q@KD_Bj@",
                      },
                      start_location: {
                        lat: 10.0302034,
                        lng: 76.34463219999999,
                      },
                      steps: [
                        {
                          distance: {
                            text: "0.2 km",
                            value: 174,
                          },
                          duration: {
                            text: "2 mins",
                            value: 135,
                          },
                          end_location: {
                            lat: 10.0311702,
                            lng: 76.34342319999999,
                          },
                          html_instructions:
                            'Head <b>northwest</b> on <b>Kollamkudimugal Rd</b> toward <b>Cristal Garden Rd</b><div style="font-size:0.9em">Pass by Quarter Deck- Apartment Bldg (on the left in 40m)</div>',
                          polyline: {
                            points: "w_f|@}`~pMW`@QN[LKBC@A@CBEFILu@vA_@v@",
                          },
                          start_location: {
                            lat: 10.0302034,
                            lng: 76.34463219999999,
                          },
                          travel_mode: "WALKING",
                        },
                        {
                          distance: {
                            text: "0.6 km",
                            value: 600,
                          },
                          duration: {
                            text: "8 mins",
                            value: 463,
                          },
                          end_location: {
                            lat: 10.036408,
                            lng: 76.3439175,
                          },
                          html_instructions:
                            'Turn <b>right</b> at തൻവീർ &amp; തൗഫീക്ക് onto <b>Athani Mundapalam Rd</b><div style="font-size:0.9em">Pass by A-Salmaiah Hair Style (on the right)</div><div style="font-size:0.9em">Destination will be on the left</div>',
                          maneuver: "turn-right",
                          polyline: {
                            points:
                              "yef|@ky}pMe@C}AHK?M@UAk@EQEk@Ku@Kw@I{@MKAcA[g@MIAWEWCQAS@kAGcAK{AUM?Q@KD_Bj@",
                          },
                          start_location: {
                            lat: 10.0311702,
                            lng: 76.34342319999999,
                          },
                          travel_mode: "WALKING",
                        },
                      ],
                      travel_mode: "WALKING",
                    },
                    {
                      distance: {
                        text: "17.0 km",
                        value: 16992,
                      },
                      duration: {
                        text: "54 mins",
                        value: 3250,
                      },
                      end_location: {
                        lat: 9.968157,
                        lng: 76.31291299999999,
                      },
                      html_instructions: "Bus towards Eramalloor Junction",
                      polyline: {
                        points:
                          "ofg|@k|}pMMBLl@Fr@BZ?L?FADADCFCHIJy@v@gAr@OHULIHGHA?CFCFAF?FAL?LFx@?NDZFj@FZ@HFf@Bh@@h@BX?FJZLZDFZr@HXn@~B@RF^NPDH@B@B?B?BADDBPN^h@FJHLPZPZFLt@tBBDJZOBY|AE\\Qv@ALGn@?L?LDp@Hp@?@Ll@HRDJR\\DHJHDFVNJJ^T@@PJhAt@dAx@DDDBBDBB@BBF@D@D?D@PAX?PEfAI~@MtAKhBAP?JIdAIpACTAh@Ab@@@?\\?DAj@Bh@DXBTH`@Rh@JTHRFJFPFHHLNVFHDHFHBHDHDNDPBJBJBPBVBJDd@BX@L@TBZ@N?NBd@@R@`@@HBf@@F?D@F@FBH@HBJBJ@DBHDHFJJLLLVTNNNPLPJPHPDFDJTf@`@z@`@zA@T?F@N?NBh@Dz@@F@JBR@FDLFNDFJPHLJHBBDFFFRPd@b@h@h@FD@BNTFFTVJLHLBDNRJPJRVj@LXBDNZT`@FNBDBHBDBH@H@N@NBT?T?`@?N?DAH?LAJAN?P?J?J@H?FBNDP?DBNFPJRd@p@RRt@p@BBFD`@Nd@Th@R^RXVJHHFLPLNHJR^DF@FBDRl@DF@DJLDHDFNPV\\FHBFNTBDJPBDTl@HN@DTh@BFJZL\\BHNh@Pt@Pr@BLJb@BHDHBFHRJRBF@F@D?DCNETIRMVKNKPKJSR_@Xa@VSLe@TQJm@X_@LYHQBQDa@DSDQD_@JQHKFKJ@N@VxDnBpFlCxAp@hG~CDBbAd@VLdAf@RJRJpB~@tB`A`B~@bAh@f@RnCpAZPLF\\RB@VL\\R\\PJDPH\\NXLBB\\Pb@T\\X^XZXXXVXTTBDr@v@RPh@f@x@n@HHTPVPRLPLx@h@@?RLRLLFPHTHNDRBTBL?V@b@BF?^?`@@N@\\?L@f@@`@?L?D@ZDD?F?JAH?NClAQbASlDo@fCg@hASTGbDo@`@Kp@OFCx@U\\KNGNE~Bs@dDw@FC\\I`Ce@fCi@HCpAWh@KNC^I\\Eb@G~@IPEF?FAj@KFAjBORCVCRCLCPELCj@OVKNG\\SHIHIBEBCLODERUA??AAA?A?AA??A?A?A?A?A?A@??A?A@A@A?A@?@A@?@??A@?@?@?@?@?@??@@?@??@@?@@@@@@?@?@@@?@?@?@?@A@Jd@DRHv@RnA@HNhANdALfBBRDb@@JAB?B?@A@?@A?PZHVHXFRH`@Jd@P`AFr@TzBDh@Fb@JjABN@RFLDNL\\DHLZ\\r@JTFJLVDHHPDNFNd@x@X`@l@p@Xh@V^\\h@T^j@t@h@n@nArAHHz@fAzApBJLd@l@Zl@bBzB`@x@^j@n@dAvArBFJfAzAJNJNHFh@r@JNNNHHZTJPf@d@xAvAh@f@LNFH^\\LL`BvAXVHHj@l@f@p@`@`@hAnAV\\JJJNJJHN`@n@d@l@b@b@\\d@NPTP`@Z@@p@b@f@Z@@PJJFv@b@BBHDHF@?TJXN\\NPHTJXJPHVPTNTPjB|Az@r@d@f@LRT\\l@x@Vd@LXJTHTHTHTHZVnALp@Jr@BNr@jEVErA]bAUdBa@dBc@D?d@Mb@Kd@Kd@KFAVG@A\\I^I^I^I^It@SPEl@K|BQHAtBOt@Kz@IHA\\G\\EjB_@fB_@~@Wd@M`@KTGb@Oj@OVG`Ba@ZGDA|Cc@~AStAUlB]p@If@En@K^EvAQPCZEjAONAj@E\\Ax@GRAhBKb@GzAQhASbBg@h@OZGbAW\\KtCa@h@EnBUpBO|CMNAJAFCNGLGNId@UXSHEtA}@c@sCa@cCAKAECSCYOsBBSAK?E?KGcAGeACg@ACC_@GcAAA?AGu@AO?AK_A?GAEEe@E[Iw@QwAMgASaBE[WWQ}AAOMq@GWW{AA[UmBQyAMgAIe@Q}@AEMe@Mc@[qACIG]yAA}@Fu@F{ARC@UBQBYDG@MBIDK@KDKDi@PKBcBf@e@_BIYACMc@GQ\\OZK`@O@?^O^OLG`Ai@TOHENIRKPCXEfAMZGl@IHCRETEQ}@CEGWCQEQCYKy@Am@GyBAwBEoAAaAGqAAe@Cm@EcAAY?u@?]?Y?A?G@I@I@SNg@Ri@DKl@mBn@yBLg@?C@E@G?E?I?]CWAYO{@UeA?AKq@M{@E_@CK?GIgAE_@Cg@IkAGgAIgAO{AGa@SeBQaAMgACOMB",
                      },
                      start_location: {
                        lat: 10.0364,
                        lng: 76.3439,
                      },
                      transit_details: {
                        arrival_stop: {
                          location: {
                            lat: 9.968157,
                            lng: 76.31291299999999,
                          },
                          name: "Janatha Bus Stop",
                        },
                        arrival_time: {
                          text: "12:06 PM",
                          time_zone: "Asia/Calcutta",
                          value: 1714027004,
                        },
                        departure_stop: {
                          location: {
                            lat: 10.0364,
                            lng: 76.3439,
                          },
                          name: "Mundampalam",
                        },
                        departure_time: {
                          text: "11:12 AM",
                          time_zone: "Asia/Calcutta",
                          value: 1714023754,
                        },
                        headsign: "Eramalloor Junction",
                        line: {
                          agencies: [
                            {
                              name: "KSRTC",
                              url: "https://www.keralartc.com/main.html",
                            },
                          ],
                          name: "Eramalloor - Pookkattupady",
                          vehicle: {
                            icon: "//maps.gstatic.com/mapfiles/transit/iw2/6/bus2.png",
                            name: "Bus",
                            type: "BUS",
                          },
                        },
                        num_stops: 37,
                      },
                      travel_mode: "TRANSIT",
                    },
                    {
                      distance: {
                        text: "0.9 km",
                        value: 893,
                      },
                      duration: {
                        text: "12 mins",
                        value: 746,
                      },
                      end_location: {
                        lat: 9.9625988,
                        lng: 76.31327659999999,
                      },
                      html_instructions:
                        "Walk to X867+X3G, Toc-H Rd, Toc-H Nagar, Vyttila, Ernakulam, Kochi, Kerala 682019, India",
                      polyline: {
                        points:
                          "q{y{@yzwpMAKAEASOoAVEVjBDVXtBF`@R|A`@GDCBABABAHI@C@?BABAD?D?B?HA\\@D@F?DAFAXKFC|Ac@bBg@HCRITKh@Yn@UDCLE|@M^EHAJCB?DAd@CJ?b@?d@EZAP?HA@?@A@A@A@A?ABCDCl@SzA]",
                      },
                      start_location: {
                        lat: 9.9680901,
                        lng: 76.31292839999999,
                      },
                      steps: [
                        {
                          distance: {
                            text: "66 m",
                            value: 66,
                          },
                          duration: {
                            text: "1 min",
                            value: 54,
                          },
                          end_location: {
                            lat: 9.9682025,
                            lng: 76.3135162,
                          },
                          html_instructions:
                            "Head <b>east</b> on <b>Sahodaran Ayyappan Rd</b>",
                          polyline: {
                            points: "q{y{@yzwpMAKAEASOoA",
                          },
                          start_location: {
                            lat: 9.9680901,
                            lng: 76.31292839999999,
                          },
                          travel_mode: "WALKING",
                        },
                        {
                          distance: {
                            text: "0.2 km",
                            value: 226,
                          },
                          duration: {
                            text: "3 mins",
                            value: 187,
                          },
                          end_location: {
                            lat: 9.9676642,
                            lng: 76.3116599,
                          },
                          html_instructions: "Cross the road",
                          polyline: {
                            points: "g|y{@o~wpMVEVjBDVXtBF`@R|A",
                          },
                          start_location: {
                            lat: 9.9682025,
                            lng: 76.3135162,
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
                            'Turn <b>left</b> onto <b>Toc-H Rd</b><div style="font-size:0.9em">Destination will be on the right</div>',
                          maneuver: "turn-left",
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
                  "w_f|@}`~pMW`@QNg@PON_AdB_@v@e@CiBHc@?}@KaBWsBWoA]q@Oo@Ie@?oCS{AUM?]F_Bj@@BMBLl@JnA?TK\\cAbAwA|@_@VIHGNANAZFhAVlBJpADbAJb@Rb@d@lAn@~B@RF^NPFL?PVRf@t@t@rAx@zBJZOB_@zBSdAG|@D~@Hr@V`AXh@PRhAx@RLhAt@dAx@JHFHHV?bAOfCY~DUtDE~@?d@@xBHn@\\jAd@fAh@x@Vf@Nl@N`ALbBH`BHfBD\\Lj@Rd@`A`Ah@t@j@lA`@z@`@zA@\\JdCHn@L\\PX^b@jBfB`@f@n@x@f@x@~AhDJh@Dz@A`ACz@@h@Lv@Rd@x@dAx@t@h@TnAh@x@j@p@r@d@z@^`AzAvBh@jAd@fAl@lBr@zCVn@Rh@CTOh@q@dAs@l@u@d@w@`@mAf@_BXe@Jq@TWRBf@jL|FxAp@hG~ChAh@|At@nGxCdDhBvDdBfAl@rCtA~Ax@|@r@t@r@dBlB|@x@bAx@rA~@bBdA^Pd@NnAHpEJn@?`@Fb@A|AUpFcAjKsBtCu@|DmAlD{@~Co@lGqApB[pAONAr@M~BSjAQx@Sf@Sf@]LOj@o@AACG?EDKLEJBFL?DHf@d@dD^nCPzBDv@CDZr@Pl@TfAXtBn@tGDb@L\\~@vBf@bAN`@l@hAfArAp@hAr@hAtAdBxA|AvCxDp@z@Zl@bBzB`AdBn@dArDjFjAzAXXZTJP`C|Bv@v@vClCb@`@rA~AnCzCbAzAvBhCv@l@r@d@fAp@nAt@nAj@rAj@l@`@`CnB`BzAb@p@dA~AXn@f@|At@dEr@jEVEvCs@vFsAnEcAtCq@~@QfCStBOt@KdAKnGmA|Cy@hEiA`@I|Fw@bEs@xAOxDg@fBUz@GtEW~BYhASbBg@dAW`Bc@~Dg@`Fe@lDORErAo@b@YtA}@c@sCc@oCEYSmC@_@O{C[iEe@yEy@}GWWQ}AOaA_@sBWiC_@aD[cBy@aDKg@yAA}@FqCZYDaANgEpA_AaDGQ\\O|@[nAg@pBiAd@O`BSfB[TEQ}@K]YwBIgDGgEOgFG}A?sA@m@B]b@qAr@yB|@aDBWEyAq@uDWoB]{EQoCW}Be@gDMgACOMBLCAKCYOoAVE\\bC`@vCR|A`@GHERQNCp@?ZAbF{A\\M~@e@t@YjASx@KzAE|AIFEJKl@SzA]",
              },
              summary: "",
              warnings: [
                "Walking directions are in beta. Use caution – This route may be missing sidewalks or pedestrian paths.",
              ],
              waypoint_order: [],
            },
          }}
        >
          <Drawer.Navigator
            drawerStyle={{ backgroundColor: "#FFC75B" }} // Set background color for the drawer
            screenOptions={{
              headerShown: false, // Hide the drawer header text
            }}
          >
            <Drawer.Screen name={t("home")} component={Home} />
            <Drawer.Screen name="TrackingScreen" component={TrackingScreen} />
            <Drawer.Screen
              name="RouteDetailScreen"
              component={RouteDetailScreen}
            />
            <Drawer.Screen name="Change Language" component={LanguageScreen} />
          </Drawer.Navigator>
        </RouteContext.Provider>
      </NavigationContainer>
    </LanguageProvider>
  );
}
