import { OfferPreview } from './offer-preview';
import { User } from './user';

export type Image = string;

export type Offer = OfferPreview & {
  bedrooms: number;
  description: string;
  host: User;
  images: Image[];
  maxAdults: number;
  goods: string[];
};
