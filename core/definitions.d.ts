// core
declare namespace Core {
  export interface ApiMessage {
    id: number;
    payload: any;
    type: string;
  }
  export interface ApiEvent extends ApiMessage {}
  export interface ApiCommand extends ApiMessage {
    auth: any;
  }
}
