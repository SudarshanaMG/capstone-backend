const MATERIAL_UNIT_PRICES = {
  Excavation: 50,                        // ₹/cubic ft
  Sand: 60,                              // ₹/cubic ft
  Aggregates: 55,                        // ₹/cubic ft
  Cement: 400,                           // ₹/bag (50kg)
  Shuttering: 40,                        // ₹/sq.ft
  Steel: 70,                             // ₹/kg
  ShutteringMaterials: 35,              // ₹/sq.ft (additional)
  BindingWireCoverBlocksAdmixture: 8,   // ₹/kg (combined avg)
  Bricks: 10,                            // ₹/brick
  BondingAgent: 180,                    // ₹/kg
  Scaffolding: 10,                      // ₹/sq.ft

  CPVCPipes: 90,                        // ₹/meter
  UPVCPipes: 60,                        // ₹/meter
  PVCPipe: 50,                          // ₹/meter
  Pipefittings: 30,                     // ₹/fitting avg
  Adhesive_solvent_clamps: 25,         // ₹/joint avg
  Valves_unions_couplers: 120,         // ₹/piece
  Wastecoupling_bottletrap: 250,       // ₹/set
  Watermeter: 650,                     // ₹/piece
  Overheadtank: 4000,                  // ₹/unit (1000L)
  Undergroundsump: 12,                 // ₹/litre (construction)
  WesternWC: 6000,                     // ₹/unit
  WashBasin: 2500,                     // ₹/unit
  KitchenSink: 3500,                   // ₹/unit
  Shower: 1800,                        // ₹/unit
  FloorTraps: 300,                     // ₹/unit
  GullyTrap: 500,                      // ₹/unit
  Cisterns: 1800,                      // ₹/unit
  Plumbingwallboxes: 400,             // ₹/unit
  BathAccessories: 1500,              // ₹/bathroom set
  WaterHeaterConnections: 600,        // ₹/unit
  SepticTankConstruction: 15,         // ₹/litre
  BasinMixers: 3500,                  // ₹/unit
  ShowerMixers: 4000,                 // ₹/unit
  HealthFaucets: 1000,                // ₹/unit
  AngleValves: 300,                   // ₹/unit
  PillarCocks: 1200,                  // ₹/unit
  WallMixers: 3000,                   // ₹/unit
  BibCocks: 500,                      // ₹/unit
  OverheadTankBallValve: 200,         // ₹/unit
  MiscellaneousFittings: 1500,        // Lump sum estimate

  PVCConduitPipes: 30,                // ₹/meter
  ModularElectricalWiring: 35,        // ₹/meter
  FlexibleWires: 25,                  // ₹/meter
  SwitchBoxesAccessories: 70,         // ₹/unit
  CableClips_Saddle_Fixing: 5,        // ₹/clip
  PVCBends_Couplers: 12,              // ₹/unit
  PVCTape_Screws_Fasteners: 100,      // ₹/roll/set
  DistributionCables: 60,             // ₹/meter
  ModularSwitches: 100,               // ₹/switch
  ModularSockets: 150,                // ₹/socket
  PowerOutlets: 200,                  // ₹/unit
  FanRegulators: 200,                 // ₹/unit
  PhaseMCBDistributionBox: 2000,      // ₹/unit
  MCBs: 400,                          // ₹/unit
  ELCBRCCB: 1800,                     // ₹/unit
  ModularPlates_Boards: 120,          // ₹/set
  DBWiringMounting: 1000,             // ₹/unit
  EarthingKit: 1800,                  // ₹/set
  MiscAccessories: 1200,              // Lump sum
  LEDCeilingLights: 700,              // ₹/unit
  TubeLights: 600,                    // ₹/unit
  CeilingFans: 2000,                  // ₹/unit
  ExhaustFans: 1200,                  // ₹/unit
  OutdoorLights: 1000,                // ₹/unit
  DecorativeLights: 2500,             // ₹/unit
  KitchenMirrorLights: 800,           // ₹/unit
  DoorBellChime: 600,                 // ₹/unit
  LightHoldersPendant: 200,           // ₹/unit

  MainDoor: 20000,                    // ₹/unit
  InternalRoomDoors: 7000,           // ₹/unit
  BathroomPVCDoors: 4000,            // ₹/unit
  Frames: 1500,                      // ₹/door frame
  Hinges_Locks_TowerBolts: 400,      // ₹/set
  DoorStoppers_Peephole: 250,        // ₹/door set
  UPVCWindows: 550,                  // ₹/sq.ft
  GrillsforWindows: 300,             // ₹/sq.ft
  Ventilators: 2500,                 // ₹/unit
  Latch_Locks_Handles: 300,          // ₹/window
  WindowFramePolish: 25,             // ₹/sq.ft
  CurtainRodsBrackets: 500,          // ₹/window
  InstallationCharges: 1500,         // ₹/door or window
  BedroomWardrobes: 1500,            // ₹/sq.ft
  KitchenCabinets: 1700,             // ₹/sq.ft
  LoftStorage: 1100,                 // ₹/sq.ft
  Plywood: 90,                       // ₹/sq.ft
  Hardware: 50,                      // ₹/sq.ft
  Laborforcarpentry: 250,            // ₹/sq.ft

  VitrifiedTiles: 90,                // ₹/sq.ft
  AntiskidFloorTilesToilets: 100,    // ₹/sq.ft
  WallTilesToilets: 120,             // ₹/sq.ft
  KitchenWallTiles: 110,             // ₹/sq.ft
  TileGrout_AdhesiveEdgeTrim: 20,    // ₹/sq.ft
  SkirtingTilesSteps_Laying: 25,     // ₹/sq.ft
  InteriorWallsCeilings: 20,         // ₹/sq.ft (paint)
  ExteriorWalls: 15,                 // ₹/sq.ft (paint)
  Primer_PuttyTouchup: 5,            // ₹/sq.ft
  PaintBrushes_Rollers_Masking: 500, // ₹/room (tools)
  ScaffoldingLabor: 5,               // ₹/sq.ft
  WashBasins: 2500,                  // ₹/unit
  EWC: 6000,                         // ₹/unit
  HealthFaucetAngleValves: 1500,     // ₹/set
  OverheadShowers: 2000,             // ₹/unit
  WallMixers: 3000,                  // ₹/unit
  KitchenSink: 3500,                 // ₹/unit
  SinkMixerTap: 4000,                // ₹/unit
  BathroomMirrors: 1500,             // ₹/unit
  TowelRods_SoapDishes_Hooks: 800,   // ₹/set
  OtherAccessoriesSealants: 1000,    // Lump sum
  InstallationLabor: 1800,           // ₹/bathroom set

  LegalApproval: 10000
};

// const PLUMBINGSANITARY_UNIT_PRICES = {
//   CPVCPipes: 90,                        // ₹/meter
//   UPVCPipes: 60,                        // ₹/meter
//   PVCPipe: 50,                          // ₹/meter
//   Pipefittings: 30,                     // ₹/fitting avg
//   Adhesive_solvent_clamps: 25,         // ₹/joint avg
//   Valves_unions_couplers: 120,         // ₹/piece
//   Wastecoupling_bottletrap: 250,       // ₹/set
//   Watermeter: 650,                     // ₹/piece
//   Overheadtank: 4000,                  // ₹/unit (1000L)
//   Undergroundsump: 12,                 // ₹/litre (construction)
//   WesternWC: 6000,                     // ₹/unit
//   WashBasin: 2500,                     // ₹/unit
//   KitchenSink: 3500,                   // ₹/unit
//   Shower: 1800,                        // ₹/unit
//   FloorTraps: 300,                     // ₹/unit
//   GullyTrap: 500,                      // ₹/unit
//   Cisterns: 1800,                      // ₹/unit
//   Plumbingwallboxes: 400,             // ₹/unit
//   BathAccessories: 1500,              // ₹/bathroom set
//   WaterHeaterConnections: 600,        // ₹/unit
//   SepticTankConstruction: 15,         // ₹/litre
//   BasinMixers: 3500,                  // ₹/unit
//   ShowerMixers: 4000,                 // ₹/unit
//   HealthFaucets: 1000,                // ₹/unit
//   AngleValves: 300,                   // ₹/unit
//   PillarCocks: 1200,                  // ₹/unit
//   WallMixers: 3000,                   // ₹/unit
//   BibCocks: 500,                      // ₹/unit
//   OverheadTankBallValve: 200,         // ₹/unit
//   MiscellaneousFittings: 1500,        // Lump sum estimate

// }

// const ELECTRICAL_UNIT_PRICES = {
//   PVCConduitPipes: 30,                // ₹/meter
//   ModularElectricalWiring: 35,        // ₹/meter
//   FlexibleWires: 25,                  // ₹/meter
//   SwitchBoxesAccessories: 70,         // ₹/unit
//   CableClips_Saddle_Fixing: 5,        // ₹/clip
//   PVCBends_Couplers: 12,              // ₹/unit
//   PVCTape_Screws_Fasteners: 100,      // ₹/roll/set
//   DistributionCables: 60,             // ₹/meter
//   ModularSwitches: 100,               // ₹/switch
//   ModularSockets: 150,                // ₹/socket
//   PowerOutlets: 200,                  // ₹/unit
//   FanRegulators: 200,                 // ₹/unit
//   PhaseMCBDistributionBox: 2000,      // ₹/unit
//   MCBs: 400,                          // ₹/unit
//   ELCBRCCB: 1800,                     // ₹/unit
//   ModularPlates_Boards: 120,          // ₹/set
//   DBWiringMounting: 1000,             // ₹/unit
//   EarthingKit: 1800,                  // ₹/set
//   MiscAccessories: 1200,              // Lump sum
//   LEDCeilingLights: 700,              // ₹/unit
//   TubeLights: 600,                    // ₹/unit
//   CeilingFans: 2000,                  // ₹/unit
//   ExhaustFans: 1200,                  // ₹/unit
//   OutdoorLights: 1000,                // ₹/unit
//   DecorativeLights: 2500,             // ₹/unit
//   KitchenMirrorLights: 800,           // ₹/unit
//   DoorBellChime: 600,                 // ₹/unit
//   LightHoldersPendant: 200,           // ₹/unit

// }

// const DOOR_WINDOWS_UNIT_PRICES = {
//   MainDoor: 20000,                    // ₹/unit
//   InternalRoomDoors: 7000,           // ₹/unit
//   BathroomPVCDoors: 4000,            // ₹/unit
//   Frames: 1500,                      // ₹/door frame
//   Hinges_Locks_TowerBolts: 400,      // ₹/set
//   DoorStoppers_Peephole: 250,        // ₹/door set
//   UPVCWindows: 550,                  // ₹/sq.ft
//   GrillsforWindows: 300,             // ₹/sq.ft
//   Ventilators: 2500,                 // ₹/unit
//   Latch_Locks_Handles: 300,          // ₹/window
//   WindowFramePolish: 25,             // ₹/sq.ft
//   CurtainRodsBrackets: 500,          // ₹/window
//   InstallationCharges: 1500,         // ₹/door or window
//   BedroomWardrobes: 1500,            // ₹/sq.ft
//   KitchenCabinets: 1700,             // ₹/sq.ft
//   LoftStorage: 1100,                 // ₹/sq.ft
//   Plywood: 90,                       // ₹/sq.ft
//   Hardware: 50,                      // ₹/sq.ft
//   Laborforcarpentry: 250,            // ₹/sq.ft

// }

// const PAINT_TAILS_UNIT_PRICES = {
//   VitrifiedTiles: 90,                // ₹/sq.ft
//   AntiskidFloorTilesToilets: 100,    // ₹/sq.ft
//   WallTilesToilets: 120,             // ₹/sq.ft
//   KitchenWallTiles: 110,             // ₹/sq.ft
//   TileGrout_AdhesiveEdgeTrim: 20,    // ₹/sq.ft
//   SkirtingTilesSteps_Laying: 25,     // ₹/sq.ft
//   InteriorWallsCeilings: 20,         // ₹/sq.ft (paint)
//   ExteriorWalls: 15,                 // ₹/sq.ft (paint)
//   Primer_PuttyTouchup: 5,            // ₹/sq.ft
//   PaintBrushes_Rollers_Masking: 500, // ₹/room (tools)
//   ScaffoldingLabor: 5,               // ₹/sq.ft
//   WashBasins: 2500,                  // ₹/unit
//   EWC: 6000,                         // ₹/unit
//   HealthFaucetAngleValves: 1500,     // ₹/set
//   OverheadShowers: 2000,             // ₹/unit
//   WallMixers: 3000,                  // ₹/unit
//   KitchenSink: 3500,                 // ₹/unit
//   SinkMixerTap: 4000,                // ₹/unit
//   BathroomMirrors: 1500,             // ₹/unit
//   TowelRods_SoapDishes_Hooks: 800,   // ₹/set
//   OtherAccessoriesSealants: 1000,    // Lump sum
//   InstallationLabor: 1800,           // ₹/bathroom set

// }

// const DOCUMENT ={
//   LegalApproval: 10000,              // Lump sum
// };

module.exports = MATERIAL_UNIT_PRICES;