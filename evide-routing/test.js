const waterMetroConnectedness = [
    { station1: "Kakkanad", station2: "Vytilla" },{station1: "Vytilla", station2: "Kakkanad"},{station1: "High Court", station2: "Vypeen"},{station1: "Vypeen", station2: "High Court"}
  ];
  const ifConnected = (
    nearestWaterMetroToOrigin,
    nearestWaterMetroToDestination
  ) => {
    for (let i = 0; i < waterMetroConnectedness.length; i++)
      {
        if(waterMetroConnectedness[i].station1 === nearestWaterMetroToOrigin && waterMetroConnectedness[i].station2===nearestWaterMetroToDestination)
        {
            return i;
            break
        }
      }
      for (let i = 0; i < waterMetroConnectedness.length; i++){
         if (waterMetroConnectedness[i].station1 === nearestWaterMetroToOrigin) 
        {
        const waterMetroStationOrigin1 = waterMetroConnectedness[i].station1;
        const waterMetroStationDestination1 = waterMetroConnectedness[i].station2;
        for (let j = 0; j < waterMetroConnectedness.length; j++) {
          if (
            waterMetroConnectedness[j].station2 == nearestWaterMetroToDestination
          ) {
            const waterMetroStationOrigin2 = waterMetroConnectedness[j].station1;
            const waterMetroStationDestination2 =
              waterMetroConnectedness[j].station2;
            const notConnectedWaterMetroOrder = [
              waterMetroStationOrigin1,
              waterMetroStationDestination1,
              waterMetroStationOrigin2,
              waterMetroStationDestination2,
            ];
            return notConnectedWaterMetroOrder;
          }
        }
      }
    }
    return null;
  };
  console.log(ifConnected("Kakkanad","High Court"))
