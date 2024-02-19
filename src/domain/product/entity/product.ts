import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";


export class Product extends Entity {
  private context = "product";
  private _name: string;
  private _price: number;

  constructor(id: string, name: string, price: number) {
    super();

    this._id = id;
    this._name = name;
    this._price = price;
    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
     if(this.id.length === 0) {
       this.notification.addError({
         context: this.context,
         message: "Id is required",
       });
     }
     if(this.name.length === 0) {
       this.notification.addError({
         context: this.context,
         message: "Name is required",
       });
     }
     if(this.price.toString().length === 0) {
       this.notification.addError({
         context: this.context,
         message: "Price is required",
       });
     }
     if(this.price <= 0) {
       this.notification.addError({
         context: this.context,
         message: "Price must be greater than zero",
       });
     }

  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get price() {
    return this._price;
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._price = price;
    this.validate();
  }

  applyDiscount(discountPercentage: number) {
    const discount = this._price * discountPercentage / 100;
    this._price = this._price - discount;
    this.validate();
  }

  toJSON() {
    return {
      id: this._id,
      name: this._name,
      price: this._price,
    };
  }
}