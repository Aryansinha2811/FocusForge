import { useState } from 'react';
import { Camera, Edit2, Mail, Calendar, Award, CheckCircle, Clock, FileText, Flame } from 'lucide-react';

const Profile = () => {
    // Mock data - replace with Firebase data later
    const [userData, setUserData] = useState({
        displayName: 'Alex Johnson',
        email: 'alex.johnson@university.edu',
        university: 'Stanford University',
        major: 'Computer Science',
        graduationYear: '2026',
        memberSince: 'January 2024',
        accountStatus: 'Active Student',
        stats: {
            tasksCompleted: 247,
            studyHours: 156,
            currentStreak: 12,
            notesCreated: 89,
        },
    });

    const [isEditingName, setIsEditingName] = useState(false);
    const [avatarUrl] = useState('https://api.dicebear.com/7.x/avataaars/svg?seed=Alex');

    const handleSavePersonalInfo = () => {
        // TODO: Save to Firebase
        console.log('Saving personal info:', userData);
        alert('Personal information saved! (Connect to Firebase)');
    };

    const handleAvatarClick = () => {
        // TODO: Implement file upload logic
        console.log('Avatar upload clicked - implement file input logic');
        alert('Avatar upload coming soon! Use hidden input type="file" + Firebase Storage');
    };

    return (
        <div className="min-h-screen bg-transparent p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-6">

                {/* Page Title */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-6xl font-hero text-gray-900 tracking-tight">
                        PROFILE
                    </h1>
                    <p className="text-lg text-gray-700 mt-2 font-paragraph">Manage your account & track your progress</p>
                </div>

                {/* Profile Header Section */}
                <div className="bg-white/80 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">

                        {/* Avatar Section */}
                        <div className="relative group">
                            <div className="w-20 h-20 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-gray-100">
                                <img
                                    src={avatarUrl}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button
                                onClick={handleAvatarClick}
                                className="absolute -bottom-2 -right-2 bg-blue-400 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                            >
                                <Camera className="w-3 h-3" />
                            </button>
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                {isEditingName ? (
                                    <input
                                        type="text"
                                        value={userData.displayName}
                                        onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                                        onBlur={() => setIsEditingName(false)}
                                        className="text-3xl md:text-4xl font-black text-gray-900 border-4 border-black px-3 py-1 focus:outline-none focus:ring-4 focus:ring-yellow-400"
                                        autoFocus
                                    />
                                ) : (
                                    <h2 className="text-xl md:text-4xl font-hero text-gray-900 tracking-tight">
                                        {userData.displayName}
                                    </h2>
                                )}
                                <button
                                    onClick={() => setIsEditingName(!isEditingName)}
                                    className="bg-yellow-300 border-3 border-black p-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none transition-all"
                                >
                                    <Edit2 className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-5 h-5" />
                                    <span className="font-medium">{userData.email}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-700">
                                    <Calendar className="w-5 h-5" />
                                    <span className="font-medium">Member since {userData.memberSince}</span>
                                </div>
                            </div>

                            <div className="mt-4">
                                <span className="inline-block bg-green-400 border-3 border-black px-4 py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                                    <Award className="w-4 h-4 inline mr-2" />
                                    {userData.accountStatus}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Personal Information Card */}
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
                    <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                        PERSONAL INFORMATION
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Display Name */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                                Display Name
                            </label>
                            <input
                                type="text"
                                value={userData.displayName}
                                onChange={(e) => setUserData({ ...userData, displayName: e.target.value })}
                                className="w-full border-4 border-black px-4 py-3 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                placeholder="Your name"
                            />
                        </div>

                        {/* University */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                                University/School
                            </label>
                            <input
                                type="text"
                                value={userData.university}
                                onChange={(e) => setUserData({ ...userData, university: e.target.value })}
                                className="w-full border-4 border-black px-4 py-3 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                placeholder="Your university"
                            />
                        </div>

                        {/* Major */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                                Major/Field of Study
                            </label>
                            <input
                                type="text"
                                value={userData.major}
                                onChange={(e) => setUserData({ ...userData, major: e.target.value })}
                                className="w-full border-4 border-black px-4 py-3 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                placeholder="Your major"
                            />
                        </div>

                        {/* Graduation Year */}
                        <div>
                            <label className="block text-sm font-black text-gray-900 mb-2 uppercase tracking-wide">
                                Graduation Year
                            </label>
                            <input
                                type="text"
                                value={userData.graduationYear}
                                onChange={(e) => setUserData({ ...userData, graduationYear: e.target.value })}
                                className="w-full border-4 border-black px-4 py-3 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                                placeholder="2026"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleSavePersonalInfo}
                        className="mt-6 bg-blue-500 text-white border-4 border-black px-8 py-3 font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[6px] hover:translate-y-[6px] hover:shadow-none transition-all uppercase tracking-wide"
                    >
                        Save Changes
                    </button>
                </div>

                {/* Productivity Stats Card */}
                <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 md:p-8">
                    <h3 className="text-3xl font-black text-gray-900 mb-6 tracking-tight">
                        PRODUCTIVITY STATS
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Tasks Completed */}
                        <div className="bg-purple-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between mb-2">
                                <CheckCircle className="w-8 h-8" />
                                <span className="text-4xl font-black">{userData.stats.tasksCompleted}</span>
                            </div>
                            <p className="font-black text-sm uppercase tracking-wide">Tasks Completed</p>
                        </div>

                        {/* Study Hours */}
                        <div className="bg-cyan-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="w-8 h-8" />
                                <span className="text-4xl font-black">{userData.stats.studyHours}</span>
                            </div>
                            <p className="font-black text-sm uppercase tracking-wide">Study Hours</p>
                        </div>

                        {/* Current Streak */}
                        <div className="bg-orange-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between mb-2">
                                <Flame className="w-8 h-8" />
                                <span className="text-4xl font-black">{userData.stats.currentStreak}</span>
                            </div>
                            <p className="font-black text-sm uppercase tracking-wide">Day Streak</p>
                        </div>

                        {/* Notes Created */}
                        <div className="bg-lime-400 border-4 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="flex items-center justify-between mb-2">
                                <FileText className="w-8 h-8" />
                                <span className="text-4xl font-black">{userData.stats.notesCreated}</span>
                            </div>
                            <p className="font-black text-sm uppercase tracking-wide">Notes Created</p>
                        </div>
                    </div>

                    <div className="mt-6 bg-yellow-100 border-4 border-black p-4">
                        <p className="font-bold text-sm text-gray-800">
                            💪 <strong className="font-black">Keep it up!</strong> You're on a {userData.stats.currentStreak}-day streak.
                            Don't break the chain!
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Profile;