export type FormData = {
    activationType: string;
    name: string;
    status: string;
    description: string;
    priceRange: string;
    variants: {
        metadata: {
            field0: string;
            field1: string;
            productId: string;
            operatorId: string;
        };
        price: number;
        currency: string;
        name: string;
        description?: string;
        order: number;
        startDate?: Date;
        endDate?: Date;
    }[];
};
