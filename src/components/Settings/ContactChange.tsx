import React from 'react';

const ContactChange : React.FC = () => {
    return (
        <div className="mt-3">
            <p className="text-left text-2xl font-semibold text-gray-700 mb-4">Contact information</p>
            <form className='border-l-2'>
                <div className="max-w-lg p-6">
                    <p className="block text-gray-700 font-bold mb-2">Address</p>
                    <input className={'w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4'} name={'address'}/>
                    <p className="block text-gray-700 font-bold mb-2">Support phone number</p>
                    <input className={'w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4'} name={'phone'}/>
                    <p className="block text-gray-700 font-bold mb-2">Contact Email</p>
                    <input className={'w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-4'} name={'email'}/>
                </div>
                <div className="flex justify-end w-4/5">
                    <button type="submit" className="w-auto p-2 mt-4 text-white bg-blue-600 rounded hover:bg-blue-500 transition duration-300">
                        Save changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ContactChange;