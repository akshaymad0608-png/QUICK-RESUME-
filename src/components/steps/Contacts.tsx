import { FC, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Contacts: FC = () => {
  const { data, updateSection } = useResume();
  const info = data.personalInfo;
  const [showAdditional, setShowAdditional] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSection('personalInfo', { ...info, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Personal Details</h2>
        <p className="text-gray-600">Get started with the basic information.</p>
      </div>

      <div className="mb-6 flex items-center justify-center">
        <div className="relative group w-32 h-32 rounded-full border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center hover:border-primary/50 transition-colors bg-white">
          {info.photoUrl ? (
            <img src={info.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <div className="text-slate-500 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-xs font-medium">Photo</span>
            </div>
          )}
          <input 
            type="file" 
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  const img = new Image();
                  img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) return;
                    
                    const MAX_WIDTH = 200;
                    const MAX_HEIGHT = 200;
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                      if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                      }
                    } else {
                      if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                      }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
                    updateSection('personalInfo', { ...info, photoUrl: dataUrl });
                  };
                  img.src = reader.result as string;
                };
                reader.readAsDataURL(file);
              }
            }}
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">First Name</label>
          <input 
            type="text" name="firstName" value={info.firstName} onChange={handleChange} 
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Last Name</label>
          <input 
            type="text" name="lastName" value={info.lastName} onChange={handleChange} 
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-bold text-gray-600 mb-1">Desired Job Title</label>
          <input 
            type="text" name="jobTitle" value={info.jobTitle} onChange={handleChange} 
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
            placeholder="e.g. Senior Software Engineer"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Email</label>
          <input 
            type="email" name="email" value={info.email} onChange={handleChange} 
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Phone</label>
          <div className="flex gap-2">
            <input 
              type="text" name="phoneCode" value={info.phoneCode} onChange={handleChange} 
              className="w-20 bg-white text-gray-900 border border-gray-200 rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors text-center placeholder:text-gray-400"
              placeholder="+1"
            />
            <input 
              type="tel" name="phone" value={info.phone} onChange={handleChange} 
              className="flex-1 bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">City</label>
          <input 
            type="text" name="city" value={info.city} onChange={handleChange} 
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-600 mb-1">Country</label>
          <input 
            type="text" name="country" value={info.country} onChange={handleChange} 
            className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
          />
        </div>
      </div>

      <button 
        onClick={() => setShowAdditional(!showAdditional)}
        className="flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors mt-4"
      >
        {showAdditional ? <ChevronUp size={18} /> : <ChevronDown size={18} />} 
        Additional Information
      </button>

      {showAdditional && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 animate-in slide-in-from-top-2 opacity-0 fade-in duration-200 fill-mode-forwards">
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">LinkedIn URL</label>
            <input 
              type="url" name="linkedin" value={info.linkedin} onChange={handleChange} 
              className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
              placeholder="linkedin.com/in/..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-600 mb-1">Website / Portfolio</label>
            <input 
              type="url" name="website" value={info.website} onChange={handleChange} 
              className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors placeholder:text-gray-400"
              placeholder="https://..."
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-bold text-gray-600 mb-1">Address</label>
            <input 
              type="text" name="address" value={info.address} onChange={handleChange} 
              className="w-full bg-white text-gray-900 border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Contacts;
