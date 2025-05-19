const projectMaterialMap = {
    NewConstruction: {
      useAllFromCategory: true  // use all materials from `categorizedMaterials`
    },
  
    Renovation: {
      Civil: ['Demolition', 'CivilWorks'],
      Electrical: ['ModularElectricalWiring', 'FlexibleWires', 'ModularSwitches'],
      Plumbing: ['CPVCPipes', 'WesternWC', 'WashBasin'],
      Woodwork: ['InternalRoomDoors', 'KitchenCabinets'],
      Finishing: ['VitrifiedTiles', 'InteriorWallsCeilings'],
      Contractor: ['Laborforcarpentry'],
      Misc: []
    },
  
    InteriorDesign: {
      FalseCeiling: ['FalseCeiling'],
      Lighting: ['LEDCeilingLights', 'DecorativeLights'],
      Electrical: ['FlexibleWires', 'ModularSockets'],
      Woodwork: ['BedroomWardrobes', 'Plywood'],
      Finishing: ['Finishing'],
      Furniture: ['LoftStorage'],
      Misc: ['CurtainRodsBrackets']
    }
  };
  
  module.exports = projectMaterialMap;
  