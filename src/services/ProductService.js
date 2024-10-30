import httpAxios from "./httpAxios"

const ProductService = {
    getList: async () => {
        return await httpAxios.get(`product`);
    },
    trash: async () => {
        return await httpAxios.get(`product/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`product/show/${id}`);
    },
    store: async (data) => {
        return await httpAxios.post(`product/store`, data);
    },
    update: async (id, data) => {
        return await httpAxios.post(`product/update/${id}`, data);
    },
    delete: async (id) => {
        return await httpAxios.get(`product/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`product/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`product/destroy/${id}`);
    },

    // Người dùng
    product_new: async (limit) => {
        return await httpAxios.get(`product_new/${limit}`);
    },

    product_sale: async (limit) => {
        return await httpAxios.get(`product_sale/${limit}`);
    },
    product_bestseller: async (limit) => {
        return await httpAxios.get(`product_bestseller/${limit}`);
    },

    product_category: async (categoryid, limit) => {
        return await httpAxios.get(`product_category/${categoryid}/${limit}`);
    },
    products: async (limit) => {
        return await httpAxios.get(`products/${limit}`);
    },

    product_all: async (category_id, brand_id, price_min, price_max) => {
        return await httpAxios.get(`products_all/${category_id}/${brand_id}/${price_min}/${price_max}`);
    },

    product_related: async (id) => {
        return await httpAxios.get(`product/related/${id}`);
    },
}

export default ProductService


