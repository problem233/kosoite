export enum Action { change, rerender, remove }

export enum Resource { page, dict, index, asset, template }

export interface Event {
  action: Action
  resource: Resource
  path: string
  content: Buffer
}
