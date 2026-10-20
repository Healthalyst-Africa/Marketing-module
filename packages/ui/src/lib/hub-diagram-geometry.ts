/**
 * Geometry of the hub diagram's wide-screen canvas (1200 × 560), shared by the
 * server-rendered diagram and its client motion layer.
 */

/** Width and height of the wide-screen canvas, in its own units. */
export const HUB_CANVAS_VIEW_BOX = "0 0 1200 560";

/**
 * Connectors from the hub to each node, in node order: three on the left
 * from top to bottom, then three on the right.
 */
export const HUB_CONNECTOR_PATHS = [
  "M490,230H410Q395,230,395,215V125Q395,110,380,110H300",
  "M490,280H300",
  "M490,330H410Q395,330,395,345V435Q395,450,380,450H300",
  "M710,230H790Q805,230,805,215V125Q805,110,820,110H900",
  "M710,280H900",
  "M710,330H790Q805,330,805,345V435Q805,450,820,450H900",
] as const;

/** Where each connector meets its node. */
export const HUB_CONNECTOR_ENDS = [
  [300, 110],
  [300, 280],
  [300, 450],
  [900, 110],
  [900, 280],
  [900, 450],
] as const;

/** The number of nodes the wide-screen layout places, three a side. */
export const HUB_NODE_COUNT = HUB_CONNECTOR_PATHS.length;

/** The hub's box on the wide-screen canvas, as Tailwind position classes. */
export const HUB_BOX_CLASSES =
  "lg:absolute lg:left-[40.83%] lg:top-[30.36%] lg:size-auto lg:h-[39.29%] lg:w-[18.33%]";
