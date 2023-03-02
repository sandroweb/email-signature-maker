export interface IField {
  label: string;
  findableTerm: string;
  multiple: boolean;
}

export interface ITerm extends IField {
  replaceTerm: string;
}

export interface IAppData {
  html: string;
  fields: IField[];
  viewerMode: boolean;
}

export default interface IAppContext {
  data: IAppData;
  setData: (data: IAppData) => void;
  generateLink: (viewerMode: boolean) => string;
}
