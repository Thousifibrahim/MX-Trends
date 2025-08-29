import { useState } from "react";
import { User, Mail, Phone, MapPin, Save, X } from "lucide-react";

export function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "Dayan",
    email: "testing@example.com",
    phone: "+91 781-123-4567",
    address: "123 Main St, City, London",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to a backend
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      fullName: "dayan",
      email: "testing@example.com",
      phone: "+91 781-123-4567",
      address: "123 Main St, City, State 12345",
    });
  };

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-3xl font-bold" data-testid="text-profile-title">Profile Settings</h1>
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="btn-glass px-4 py-2 rounded-lg"
                data-testid="button-edit-profile"
              >
                Edit Profile
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleSave}
                  className="bg-accent hover:bg-purple-600 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                  data-testid="button-save-profile"
                >
                  <Save className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="btn-glass px-4 py-2 rounded-lg flex items-center space-x-2"
                  data-testid="button-cancel-edit"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            )}
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Profile Picture */}
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="text-4xl text-white" />
              </div>
              <button
                className="btn-glass px-4 py-2 rounded-lg"
                disabled={!isEditing}
                data-testid="button-change-photo"
              >
                Change Photo
              </button>
            </div>

            {/* Profile Information */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <label className="flex text-sm font-medium mb-2 items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name</span>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full glass-card rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-primary bg-white bg-opacity-5 text-white"
                    data-testid="input-full-name"
                  />
                ) : (
                  <div className="glass-card rounded-lg px-4 py-3 text-gray-300" data-testid="text-full-name">
                    {formData.fullName}
                  </div>
                )}
              </div>
              
              <div>
                <label className="flex text-sm font-medium mb-2 items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email</span>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full glass-card rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-primary bg-white bg-opacity-5 text-white"
                    data-testid="input-email"
                  />
                ) : (
                  <div className="glass-card rounded-lg px-4 py-3 text-gray-300" data-testid="text-email">
                    {formData.email}
                  </div>
                )}
              </div>
              
              <div>
                <label className="flex text-sm font-medium mb-2 items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone</span>
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full glass-card rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-primary bg-white bg-opacity-5 text-white"
                    data-testid="input-phone"
                  />
                ) : (
                  <div className="glass-card rounded-lg px-4 py-3 text-gray-300" data-testid="text-phone">
                    {formData.phone}
                  </div>
                )}
              </div>

              <div>
                <label className="flex text-sm font-medium mb-2 items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Address</span>
                </label>
                {isEditing ? (
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full glass-card rounded-lg px-4 py-3 border-0 focus:ring-2 focus:ring-primary bg-white bg-opacity-5 h-24 text-white resize-none"
                    data-testid="input-address"
                  />
                ) : (
                  <div className="glass-card rounded-lg px-4 py-3 text-gray-300" data-testid="text-address">
                    {formData.address}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Settings */}
          <div className="mt-12 pt-8 border-t border-gray-700">
            <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-medium mb-2">Notifications</h3>
                <p className="text-gray-400 text-sm mb-4">Manage your notification preferences</p>
                <button className="btn-glass px-4 py-2 rounded-lg text-sm" data-testid="button-manage-notifications">
                  Manage
                </button>
              </div>
              <div className="glass-card rounded-xl p-4">
                <h3 className="font-medium mb-2">Security</h3>
                <p className="text-gray-400 text-sm mb-4">Update password and security settings</p>
                <button className="btn-glass px-4 py-2 rounded-lg text-sm" data-testid="button-security-settings">
                  Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
