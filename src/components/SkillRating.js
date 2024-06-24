import StarRating from "./StarRating"

const CareerJobs = {
    ["Software Developer"]: [
        "Data Structure",
        "C++",
        "JavaScript",
        "Analytical Thinking"
    ],
    ["Data Scientist"]: [
        "Statistics",
        "Machine Learning",
        "Visualization",
        "Python"
    ],
    ["Product Manager"]: [
        "Project management",
        "Market Research",
        "User Experience",
        "Business Strategy"
    ],
    ["DevOps Engineer"]: [
        "CI/CD",
        "Cloud Platforms",
        "Scripts",
        "Infrastructure"
    ],
    ["Cybersecurity Analyst"]: [
        "Network Security",
        "Ethical Hacking",
        "Cryptography",
        "Risk Assessment"
    ],
    ["AI/ML Engineer"]: [
        "Machine Learning",
        "Neural Networks",
        "Deep Learning",
        "Python"
    ],
    ["Consultant"]: [
        "Analytical Skills",
        "Problem Solving",
        "Project Management",
        "Communication"
    ]
}
const SkillRating = ({careers, label = 'NOLABEL'}) => {
    const handleRatingChange = (rating) => {
        console.log('Selected rating:', rating);
        // Here you can send the rating to your backend
    };

    return (
        <div className={`col-span-full flex flex-col gap-y-8`}>
            {label !== 'NOLABEL' && (
                <label className="block text-sm font-medium leading-6 text-gray-900 tracking-tight">
                    {label}
                </label>
            )}


            {careers.map((career, index) => {
                return (
                    <div key={index} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div
                            className="sm:col-span-1 bg-slate-500 h-fit rounded-md py-2 text-white text-center">{career}
                        </div>
                        <div className="col-span-2 lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="flex sm:flex-col justify-between md:justify-stretch text-center">
                                <p className="bg-slate-50 rounded-md text-center px-4 sm:px-auto py-1">{CareerJobs[career][0]}</p>
                                <StarRating onRatingChange={handleRatingChange}/>
                            </div>
                            <div className="flex sm:flex-col justify-between md:justify-stretch text-center">
                                <p className="bg-slate-50 rounded-md text-center px-4 sm:px-auto py-1">{CareerJobs[career][1]}</p>
                                <StarRating onRatingChange={handleRatingChange}/>
                            </div>
                            <div className="flex sm:flex-col justify-between md:justify-stretch text-center">
                                <p className="bg-slate-50 rounded-md text-center px-4 sm:px-auto py-1">{CareerJobs[career][2]}</p>
                                <StarRating onRatingChange={handleRatingChange}/>
                            </div>
                            <div className="flex sm:flex-col justify-between md:justify-stretch text-center">
                                <p className="bg-slate-50 rounded-md text-center px-4 sm:px-auto py-1">{CareerJobs[career][3]}</p>
                                <StarRating onRatingChange={handleRatingChange}/>
                            </div>

                        </div>
                    </div>)
            })}


        </div>
    )
}

export default SkillRating