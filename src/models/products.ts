// External dependencies
import { ObjectId } from 'mongodb';

// Class Implementation
export default class Product {
  constructor(
    public _id: ObjectId,
    public id: number,
    public title: string,
    public handle: string,
    public body_html: string,
    public published_at: string,
    public created_at: string,
    public updated_at: string,
    public vendor: string,
    public product_type: string,
    public tags: string[],
    public variants: Variant[],
    public images: Image[],
    public options: Option[],
    public random_sort: string,
    public url: string,
  ) {}
}

class Variant {
  constructor(
    public id: number,
    public title: string,
    public option1: string,
    public option2: string | null,
    public option3: string | null,
    public sku: string,
    public requires_shipping: boolean,
    public taxable: boolean,
    public featured_image: string | null,
    public available: boolean,
    public price: string,
    public grams: number,
    public compare_at_price: string | null,
    public position: number,
    public product_id: number,
    public created_at: string,
    public updated_at: string,
  ) {}
}

class Image {
  constructor(
    public id: number,
    public created_at: string,
    public position: number,
    public updated_at: string,
    public product_id: number,
    public variant_ids: number[],
    public src: string,
    public width: number,
    public height: number,
  ) {}
}

class Option {
  constructor(
    public name: string,
    public position: number,
    public values: string[],
  ) {}
}
