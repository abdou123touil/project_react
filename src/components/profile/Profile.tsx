import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { updateUser } from '../../services/authService'; 
import { getUserDetails } from '../../services/authService';

interface User {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    profileImage?: string;
  }
  
  const Profile = () => {
    const { user } = useAuth(); 
    const [userData, setUserData] = useState<User | null>(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
  
    useEffect(() => {
        if (user?._id) {
          getUserDetails(user._id)
            .then((response) => {
              setUserData(response);
              setFirstName(response.firstName);
              setLastName(response.lastName);
              setEmail(response.email);
            })
            .catch((error) => {
              console.error('Error fetching user data:', error);
              alert('Failed to load user details. Please try again later.');
            });
        }
      }, [user]);
      
      
  
    const mutation = useMutation({
      mutationFn: (updatedData: { firstName: string; lastName: string; email: string }) =>
        updateUser(user?._id!, updatedData),
      onSuccess: (data) => {
      
        setUserData(data); 
      },
      onError: (error) => {
        console.error("Error updating user data", error);
      },
    });
  
    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate({ firstName, lastName, email }); 
      };
  
    if (!userData) return <div>Loading...</div>;
  
    return (
      <div className="p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold">Profile</h2>
        <form onSubmit={handleUpdate}>
          <div className="mt-4">
            <label className="block">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mt-4">
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="mt-4 p-2 bg-blue-500 text-white rounded"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
        {mutation.isError && (
          <div className="mt-4 text-red-500">
            Error updating profile. Please try again later.
          </div>
        )}
        {mutation.isSuccess && (
          <div className="mt-4 text-green-500">
            Profile updated successfully!
          </div>
        )}
      </div>
    );
  };
  
  export default Profile;