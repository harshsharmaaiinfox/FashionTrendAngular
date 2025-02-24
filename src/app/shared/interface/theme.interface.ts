import * as e from "express";
import { PaginateModel } from "./core.interface";
import { Product } from "./product.interface";

export interface ThemesModel extends PaginateModel {
   data: Themes[];
 }

export interface Themes {
  id: number
  name: string
  slug: string
  image: string
  status:  number | boolean
  created_at?: string
  updated_at?: string
}

export interface Paris {
  id: number;
  content: Content;
  slug: string;
}

export interface Content {
  home_banner : HomeBanner;
  featured_banners: FeaturedBanners;
  main_content: MainContent;
  news_letter: NewsLetter;
  brands: Brands;
  products_ids: number[];
}

export interface HomeBanner {
  status: boolean;
  main_banner: Link;
  sub_banner_1: Link;
  sub_banner_2: Link;
}

export interface Brands {
  status: boolean;
  brand_ids: number[];
}

export interface Link {
  redirect_link: RedirectLink;
  image_url: string;
}

export interface RedirectLink {
  link_type: string;
  link: string | number;
}

export interface FeaturedBanners {
  title?: string
  status: boolean;
  banners: Banners[];
}

export interface Banners {
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean;
}

export interface MainContent {
  status: boolean;
  sidebar : Sidebar;
  section1_products: ProductSection;
  section2_categories_list: CategoriesSection;
  section3_two_column_banners: TwoBanners;
  section4_products: ProductSection;
  section5_coupons: FullWidthBanner;
  section6_two_column_banners: TwoBanners;
  section7_products: ProductSection;
  section8_full_width_banner: FullWidthBanner;
  section9_featured_blogs: BlogSection;
  seller: Seller;
}

export interface Seller {
  status: boolean;
  title: string;
  description?: string;
  store_ids: number[];
}

export interface Sidebar {
  status: boolean;
  categories_icon_list: CategoriesIconList;
  left_side_banners: TwoBanners;
  sidebar_products: SidebarProducts;
}

export interface CategoriesIconList {
  title: string;
  description?: string;
  category_ids: number[];
  status: boolean;
}

export interface TwoBanners {
  status: boolean;
  banner_1: Link;
  banner_2: Link;
}

export interface SidebarProducts {
  title: string;
  product_ids: number[];
  status: boolean;
}

export interface ProductSection {
  title: string;
  description?: string;
  product_ids: number[];
  status: boolean;
}

export interface CategoriesSection {
  title: string;
  description: string;
  image_url: string;
  category_ids: number[];
  status: boolean;
}

export interface FullWidthBanner {
  redirect_link: RedirectLink;
  image_url: string;
  status: boolean;
}

export interface BlogSection {
  title: string;
  description?: string;
  status: boolean;
  blog_ids: number[];
}

export interface NewsLetter {
  title?: string;
  sub_title?: string;
  image_url?: string;
  status?: boolean;
}

//  Tokyo Interface
export interface Tokyo {
  id: number;
  content: ContentTokyo;
  slug: string;
}

export interface ContentTokyo {
  home_banner: HomeBanner;
  categories_icon_list: CategoriesIconListTokyo;
  coupons: FullWidthBanner;
  featured_banners: FeaturedBanners;
  main_content: MainContentTokyo;
  full_width_banner: FullWidthBanner;
  slider_products: SliderProductsTokyo;
  news_letter: NewsLetter;
  brands: Brands;
  products_ids: number[];
}

export interface CategoriesIconListTokyo {
  title: string;
  status: boolean;
  image_url: string;
  category_ids: number[];
}

export interface MainContentTokyo {
  sidebar: SidebarTokyo;
  section1_products: ProductSection;
  section2_slider_products: ProductSection;
  section3_products: ProductSection;
  section4_products: ProductSection;
  seller: Seller;
}

export interface SidebarTokyo {
  status: boolean;
  right_side_banners: TwoBanners;
}

export interface SliderProductsTokyo {
  status: boolean;
  product_slider_1?: ProductSection;
  product_slider_2?: ProductSection;
  product_slider_3?: ProductSection;
  product_slider_4?: ProductSection;
}

//  Osaka Interface
export interface Osaka {
  id: number;
  content: ContentOsaka;
  slug: string;
}

export interface ContentOsaka {
  home_banner: HomeBannerOsaka;
  categories_icon_list: CategoriesSection;
  coupons: FullWidthBanner;
  products_list_1: ProductSection;
  offer_banner: FullWidthBanner;
  products_list_2: ProductSection;
  product_bundles: ProductBundles;
  slider_products: SliderProductsTokyo;
  featured_blogs: BlogSection;
  news_letter: NewsLetter;
  brands: Brands;
  seller: Seller;
  products_ids: number[];
}

export interface HomeBannerOsaka {
  status: boolean;
  main_banner: Link;
  sub_banner_1: Link;
}

export interface ProductBundles {
  status: boolean;
  bundles: Bundles[];
}

export interface Bundles {
  title: string;
  sub_title: string;
  button_text: string;
  image_url: string;
  status: boolean
}

//  Rome Interface
export interface Rome {
  id: number;
  content: ContentRome;
  slug: string
}

export interface ContentRome {
  home_banner: homeBannerRome;
  categories_image_list: CategoriesIconListTokyo;
  value_banners: FeaturedBanners;
  categories_products: CategoriesIconList;
  two_column_banners: TwoBanners;
  slider_products: SliderProductsTokyo;
  full_width_banner: FullWidthBanner;
  products_list_1: ProductSection;
  featured_blogs: BlogSection
  news_letter: NewsLetter;
  seller: Seller;
  brands: Brands;
  products_ids: number[];
}

export interface homeBannerRome {
  status: boolean;
  bg_image_url: string;
  main_banner: Link;
  sub_banner_1: Link;
  sub_banner_2: Link;
  sub_banner_3: Link;
}

//  Madrid Interface
export interface Madrid {
  id: number;
  content: MadridContent;
  slug: string;
}

export interface MadridContent {
  home_banner: HomeBannerMadrid;
  featured_banners: FeaturedBanners;
  categories_image_list: CategoriesIconListTokyo;
  products_list_1: ProductSection;
  bank_wallet_offers: BankWalletOffers;
  product_with_deals: ProductWithDeals;
  full_width_banner: FullWidthBanner;
  products_list_2: ProductSection;
  products_list_3: ProductSection;
  two_column_banners: TwoBanners;
  products_list_4: ProductSection;
  products_list_5: ProductSection;
  delivery_banners: TwoBanners
  products_list_6: ProductSection;
  products_list_7: ProductSection;
  featured_blogs: BlogSection;
  brands: Brands;
  seller: Seller;
  products_ids: number[];
}

export interface HomeBannerMadrid {
  status: boolean;
  main_banner: Link;
}

export interface BankWalletOffers {
  title: string;
  status: boolean;
  offers : Offer[];
}

export interface Offer {
  coupon_code: string;
  image_url: string;
  status: boolean;
}

export interface ProductWithDeals {
  title: string;
  status: boolean;
  products_list: ProductSection;
  deal_of_days: DealOfDays;
}

export interface DealOfDays {
  title: string;
  status: boolean;
  image_url: string;
  label: string;
  deals?: Deal[];
}

export interface Deal {
  offer_title: string
  product_id: number
  status: boolean;
  end_date: string;
  remainingTime?: RemainingTime;
  product: Product
}

export interface RemainingTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface ServicesBanner {
  status: boolean;
  services : Services[];
}

export interface Services {
  title: string;
  sub_title: string;
  status: boolean;
  image_url: string;
}

//  Berlin Interface
export interface Berlin {
  id: number;
  content: BerlinContent;
  slug: string;
}

export interface BerlinContent {
  home_banner: HomeBannerOsaka;
  services_banner?: ServicesBanner;
  main_content: MainContentBerlin;
  full_width_banner: FullWidthBanner;
  product_list_1: ProductSection;
  news_letter: NewsLetter;
  brands: Brands;
  products_ids: number[];
}

export interface MainContentBerlin {
  status: boolean
  sidebar: SidebarBerlin;
  section1_products: ProductSection;
  section2_categories_icon_list: CategoriesIconList;
  section3_two_column_banners: TwoBanners;
  section4_products: ProductSection;
  seller: Seller;
}

export interface SidebarBerlin {
  status: boolean;
  categories_icon_list: CategoriesIconList;
  right_side_banners : RightSideBanners;
  sidebar_products: ProductSection;
}

export interface RightSideBanners {
  status: boolean;
  banner_1: Link;
}

//  Denver Interface
export interface Denver {
  id: number;
  content: DenverContent;
  slug: string;
}

export interface DenverContent {
  home_banner: HomeBannerMadrid;
  categories_icon_list: CategoriesSection;
  products_list_1: ProductSection;
  two_column_banners: TwoBanners;
  slider_product_with_banner: SliderProductWithBanner;
  coupon_banner: FullWidthBanner;
  products_list_2: ProductSection;
  products_list_3: ProductSection;
  news_letter: NewsLetter;
  brands: Brands;
  seller: Seller;
  products_ids: number[];
}

export interface SliderProductWithBanner {
  slider_products: SliderProductsTokyo;
  left_side_banners: RightSideBanners;
}

export interface HeaderFooter {
  header_logo?: string;
  footer?: Footer;
}

export interface Footer {
  footer_logo?: string;
 }

//  Moscow Interface
export interface Moscow {
  id: number;
  content: MoscowContent;
  slug: string;
}

export interface MoscowContent {
  home_banner: HomeBannerMadrid;
  categories_icon_list: CategoriesIconList;
  products_list_1: ProductSection;
  coupons: FullWidthBanner;
  slider_product_with_banner: SliderProductWithBanner;
  products_list_2: ProductSection;
  news_letter: NewsLetter;
  brands: Brands;
  products_ids: number[];
}