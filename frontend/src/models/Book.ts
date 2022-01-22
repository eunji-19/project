export interface Book {
  statusMessage: BookStatusMessage;
}

export interface BookStatusMessage {
  category: string;
  domestic: BookDomestic;
  foreign: BookDomestic;
}

export interface BookDomestic {
  title: string;
  link: string;
  language: string;
  copyright: string;
  pubDate: string;
  imageUrl: string;
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  maxResults: number;
  queryType: string;
  searchCategoryId: string;
  searchCategoryName: BookCategoryName;
  returnCode: string;
  returnMessage: string;
  item: BookItem[];
}

export interface BookItem {
  itemId: number;
  title: string;
  description: string;
  pubDate: string;
  priceStandard: number;
  priceSales: number;
  discountRate: string;
  saleStatus: string;
  mileage: string;
  mileageRate: string;
  coverSmallUrl: string;
  coverLargeUrl: string;
  categoryId?: string;
  categoryName: string;
  publisher: string;
  customerReviewRank: number;
  author: string;
  translator: string;
  isbn: string;
  link: string;
  mobileLink: string;
  additionalLink: string;
  reviewCount: number;
  rank?: number;
}

export enum BookCategoryName {
  Empty = "",
  국내도서 = "국내도서",
  외국도서 = "외국도서",
}

export enum BookSaleStatus {
  예약판매 = "예약판매",
  판매중 = "판매중",
}

/**
 * 좋아하는 책 
 * email: string, title: string, author: string, smallImageUrl: string
 */
export interface LikeBook {
  email: string;
  title: string;
  author: string;
  smallImageUrl: string;
}