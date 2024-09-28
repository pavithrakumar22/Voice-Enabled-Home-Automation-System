import React, { useState } from 'react';
import { Menu, X, ChevronRight, Home, Zap, Settings } from 'lucide-react';

const devices = [
  { id: 1, name: 'Living Room Lights', type: 'Light', energy: 50 },
  { id: 2, name: 'Kitchen AC', type: 'AC', energy: 200 },
  { id: 3, name: 'Bedroom TV', type: 'TV', energy: 100 },
  { id: 4, name: 'Washing Machine', type: 'Appliance', energy: 150 },
];

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDevices, setActiveDevices] = useState([]);

  const toggleDevice = (id) => {
    setActiveDevices(prev => 
      prev.includes(id) ? prev.filter(deviceId => deviceId !== id) : [...prev, id]
    );
  };

  const totalEnergy = activeDevices.reduce((sum, id) => {
    const device = devices.find(d => d.id === id);
    return sum + (device ? device.energy : 0);
  }, 0);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out`}>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden absolute right-2 top-2 text-white">
          <X size={24} />
        </button>
        <nav>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Home size={20} className="inline-block mr-2" /> Home
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Zap size={20} className="inline-block mr-2" /> Devices
          </a>
          <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white">
            <Settings size={20} className="inline-block mr-2" /> Settings
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden mb-4">
          <Menu size={24} />
        </button>
        <h1 className="text-2xl font-semibold mb-4">Smart Home Dashboard</h1>
        <div className="mb-4">
          <p className="text-lg">Total Energy Consumption: <span className="font-bold">{totalEnergy} W</span></p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {devices.map((device) => (
            <div key={device.id} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">{device.name}</h2>
              <p className="text-gray-600 mb-4">Type: {device.type}</p>
              <p className="text-gray-600 mb-4">Energy: {device.energy} W</p>
              <button
                onClick={() => toggleDevice(device.id)}
                className={`px-4 py-2 rounded ${
                  activeDevices.includes(device.id)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {activeDevices.includes(device.id) ? 'On' : 'Off'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
