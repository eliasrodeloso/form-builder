export const viewTypes = ["input", "label", "select", "button"] as const;

// prettier-ignore
export type ViewType = typeof viewTypes[number];

export type ViewElement = {
  id: number;
  viewType: ViewType;
  component: React.ReactNode;
};

export type ApplicationState = ViewElement[];
