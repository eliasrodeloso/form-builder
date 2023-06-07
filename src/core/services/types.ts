export const viewTypes = ["input", "label", "select", "button"] as const;

// prettier-ignore
export type ViewType = typeof viewTypes[number];

export type ViewElement = {
  id: number;
  viewType: ViewType;
  type?: "password" | "text" | "submit" | "date";
  value?: string;
  name?: string;
};

export type ApplicationState = ViewElement[];
