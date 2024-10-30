import httpAxios from "./httpAxios"

const BannerService = {
    getList: async () => {
        return await httpAxios.get(`banner`);
    },
    updateById: async (id, data) => {
        return await httpAxios.post(`banner/${id}`, data);
    },
    trash: async () => {
        return await httpAxios.get(`banner/trash`);
    },
    show: async (id) => {
        return await httpAxios.get(`banner/show/${id}`);
    },
    store: async (data) => {
        return await httpAxios.post(`banner/store`, data);
    },
    update: async (data, id) => {
        return await httpAxios.post(`banner/update/${id}`, data);
    },
    delete: async (id) => {
        return await httpAxios.get(`banner/delete/${id}`);
    },
    restore: async (id) => {
        return await httpAxios.get(`banner/restore/${id}`);
    },
    destroy: async (id) => {
        return await httpAxios.delete(`banner/destroy/${id}`);
    },
}

export default BannerService


