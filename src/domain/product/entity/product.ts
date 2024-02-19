import Entity from "../../@shared/entity/entity.abstract";
import { ProductValidatorFactory } from "../factory/product.validator.factory";
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
    const productValidator = ProductValidatorFactory.create();
    productValidator.validate(this);
    this.notification.throwErrorIfHasErrors();
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