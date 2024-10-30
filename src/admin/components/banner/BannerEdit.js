import React, { useEffect, useState } from 'react'
import { ImageApi } from '../../../services/ApiImage';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BannerService from '../../../services/BannerService';
function BannerEdit({ isBannerEdit, setBannerEdit }) {
    const [name, setName] = useState(isBannerEdit?.name || '');
    const [image, setImage] = useState(isBannerEdit?.image || null);
    const [position, setPosition] = useState(isBannerEdit?.position || '');

    useEffect(() => {
        if (isBannerEdit) {
            setName(isBannerEdit.name || '');
            setImage(isBannerEdit.image || null);
            setPosition(isBannerEdit.position || '');
        }
    }, [isBannerEdit]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setImage(null);
    };

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('image', image);
            formData.append('position', position);

            const result = await BannerService.updateById(isBannerEdit.id, formData);
            if (result.banner) {
                toast.success(result.data.message);
            } else {
                toast.error(result.data.message);
            }
        } catch (error) {
            toast.error('Đã xảy ra lỗi!');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className={`fixed inset-0 bg-gray-900 opacity-80 ${isBannerEdit ? 'block' : 'hidden'} transition-opacity`} aria-hidden="true"></div>
            <div className={`fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${isBannerEdit ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-gray-800`} tabIndex={-1} aria-labelledby="drawer-label">
                <h5 className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">Update Banner</h5>
                <button onClick={() => { setBannerEdit(false) }} type="button" data-drawer-dismiss="drawer-update-product-default" aria-controls="drawer-update-product-default" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="space-y-4">
                    {name && (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tên thương hiệu</label>
                            <input onChange={(e) => setName(e.target.value)} type="text" name="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500" defaultValue={name} required />
                        </div>
                    )}

                    {image && (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chọn ảnh</label>
                            <input type="file" onChange={handleImageChange} className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border cursor-pointer p-2.5 dark:bg-gray-700 dark:border-gray-600" />
                            <div className="relative mt-4">
                                <img src={`${ImageApi}/images/banner/${image}`} alt={image} className="rounded-lg" />
                                <button onClick={removeImage} type="button" className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )}
                    {position && (
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Vị trí</label>
                            <select
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5"
                            >
                                <option value="" >{position}</option>
                                <option value="ads">ads</option>
                            </select>
                        </div>
                    )}

                </div>
                <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-4 space-x-4 sm:absolute sm:px-4 sm:mt-0">
                    <button type="submit" onClick={handleUpdate} className="w-full justify-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                        Update
                    </button>
                    <button type="button" className="w-full justify-center text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
                        <svg aria-hidden="true" className="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" /></svg>
                        Delete
                    </button>
                </div>
            </div> </>
    )
}

export default BannerEdit
