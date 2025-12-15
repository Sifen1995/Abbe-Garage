import React, { useState } from 'react';
import instance from '../../Api/axios';
// Import the types you defined (OrderTrack and ServiceDetail)
// Import the types you defined (OrderTrack and ServiceDetail)
import type { OrderTrack } from '../../types/orderTrack'; 

const TrackOrderComponent = () => {
    const [orderId, setOrderId] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState<OrderTrack | null>(null); 
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = async (e: React.FormEvent) => {
        e.preventDefault(); 
        
        if (!orderId || !email) {
            setError("Please enter both Order ID and Email.");
            setOrder(null);
            return;
        } 

        setError(null);
        setOrder(null);

        try {
            const response = await instance.get('/public/track-order', {
                params: { 
                    orderId: orderId,
                    email: email 
                }
            });

            setOrder(response.data);
            
        } catch (err) {
            console.error('Tracking Error:', err);
            
            // Standard Axios error handling checks
            const errorMessage = (err as any)?.response?.data?.msg || 'Failed to track order. Check ID/Email.';
            setError(errorMessage);
        }
    };

    // Helper function to render status with conditional Tailwind classes
    const renderServiceStatus = (isCompleted: boolean) => (
        <span 
            className={`font-semibold text-sm px-2 py-1 rounded-full 
                        ${isCompleted ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}
        >
            {isCompleted ? 'Complete' : 'Pending'}
        </span>
    );

    return (
        // Container: Centered, max width, shadow, rounded corners
        <div className="max-w-md mx-auto my-10 p-6 bg-white shadow-xl rounded-lg">
            
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Track Your Order Status</h2>
            
            {/* Form */}
            <form onSubmit={handleTrackOrder} className="flex flex-col space-y-4">
                <input
                    type="text"
                    placeholder="Order ID"
                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    required
                />
                <input
                    type="email"
                    placeholder="Customer Email"
                    className="p-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button 
                    type="submit" 
                    className="py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-150 ease-in-out"
                >
                    Track Order
                </button>
            </form>

            {/* Error Message */}
            {error && (
                <p className="mt-4 p-3 bg-red-100 text-red-700 border border-red-400 rounded-md text-center">
                    {error}
                </p>
            )}
            
            {/* Order Details Display */}
            {order && (
                <div className="mt-6 border-t pt-6 border-gray-200">
                    <p className="text-sm italic text-gray-500 mb-4">{order.message}</p>
                    
                    {/* Status Summary */}
                    <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-100">
                        <p className="text-base font-medium text-gray-700">Order ID: <strong className="text-gray-900">{order.orderId}</strong></p>
                        <p className="text-lg font-bold">Status: 
                            <span className={`ml-2 ${order.status === 'Pending' ? 'text-yellow-600' : 'text-green-600'}`}>
                                {order.status}
                            </span>
                        </p>
                    </div>

                    {/* Services Section */}
                    <h4 className="text-lg font-semibold text-gray-800 mt-4 mb-3">Services Requested:</h4>
                    <ul className="divide-y divide-gray-100">
                        {order.servicesList.map((service, index) => (
                            <li key={index} className="flex justify-between items-center py-3">
                                <span className="text-gray-700 font-medium">{service.serviceName}</span>
                                {renderServiceStatus(service.serviceCompleted)}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
        </div>
    );
};

export default TrackOrderComponent;