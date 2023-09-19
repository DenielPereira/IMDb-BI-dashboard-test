import API from "@/api/webApi";

export const currencies = async () => {
    const { data } = await API.get('finance');
    return data;
};