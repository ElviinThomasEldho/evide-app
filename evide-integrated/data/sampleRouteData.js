// Sample route data - extracted from hardcoded values
// In a real application, this would come from an API
export const SAMPLE_ROUTE_DATA = {
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
        text: "12:19 PM",
        time_zone: "Asia/Calcutta",
        value: 1714027750,
      },
      departure_time: {
        text: "11:02 AM",
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
      end_address: "X867+X3G, Toc-H Rd, Toc-H Nagar, Vyttila, Ernakulam, Kochi, Kerala 682019, India",
      end_location: {
        lat: 9.9625988,
        lng: 76.31327659999999,
      },
      start_address: "6/473 F, Kollamkudimugal Rd, Thrikkakara, Kakkanad, Kerala 682021, India",
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
            points: "w_f|@}`~pMW`@QN[LKBC@A@CBEFILu@vA_@v@e@C}AHK?M@UAk@EQEk@Ku@Kw@I{@MKAcA[g@MIAWEWCQAS@kAGcAK{AUM?Q@KD_Bj@",
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
              html_instructions: 'Head <b>northwest</b> on <b>Kollamkudimugal Rd</b> toward <b>Cristal Garden Rd</b><div style="font-size:0.9em">Pass by Quarter Deck- Apartment Bldg (on the left in 40m)</div>',
              polyline: {
                points: "w_f|@}`~pMW`@QN[LKBC@A@CBEFILu@vA_@v@",
              },
              start_location: {
                lat: 10.0302034,
                lng: 76.34463219999999,
              },
              travel_mode: "WALKING",
            },
            // Additional steps would continue here...
          ],
          travel_mode: "WALKING",
        },
        // Additional route steps would continue here...
      ],
    },
  ],
  // Additional route properties...
};

export default SAMPLE_ROUTE_DATA; 