export class ListModel {
  public id: number;

  constructor(
    public name: string,
    public note: number,
    public image: string,
    public adresse: string,
    public createdAt: Date
  ) {
  }
}
