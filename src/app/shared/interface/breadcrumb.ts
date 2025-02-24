export interface Breadcrumb {
    title: string;
    items: Item[];
}

export interface Item {
    label: string;
    url?: string;
    active?: boolean;
}