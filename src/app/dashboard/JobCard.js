import React, { useState } from 'react';
import { FaHeart } from 'react-icons/fa';

const JobCard = ({ job }) => {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(20); // Initialize with default likes count

    const handleLike = () => {
        e.stopPropagation();
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);

        // You can implement logic to update likes on the server here
    };

    return (
        <div className="p-4 mb-4 bg-white rounded-lg shadow-md cursor-pointer transition-all border-2 border-transparent hover:shadow-lg">
            <div className="flex items-center mb-2">
                <img src={job.companyLogo || '/media/images/300-1.jpg'} alt={job.companyName} className="h-12 w-12 mr-4 rounded-full" />
                <h3 className="text-lg font-semibold">{job.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-1">Location: {job.location}</p>
            <p className="text-sm text-gray-600 mb-1">Salary: {job.salary}</p>
            <p className="text-sm text-gray-600 mb-1">Apply by: {new Date(job.last_date).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 mb-1">Branch Required: {job.branch_required}</p>
            <p className="text-sm text-gray-600 mb-1">CGPA Required: {job.cgpa_required}</p>
            <div className="flex items-center mt-2">
                <button className={`flex items-center bg-transparent outline-none border-0 text-gray-600 ${liked ? 'text-red-600' : 'hover:text-red-600'}`} onClick={handleLike}>
                    <FaHeart className={`mr-1 text-xl ${liked ? 'text-red-600' : ''}`} />
                    <span>{likes} Likes</span>
                </button>
            </div>
        </div>
    );
};

export default JobCard;
