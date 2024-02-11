export class Alert {
  public type: AlertType;
  public message: string;

  constructor(type: AlertType, message: string) {
    this.type = type;
    this.message = message;
  }
}

export enum AlertType {
  SUCCESS,
  ERROR,
  INFO,
  WARNING,
}
