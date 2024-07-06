import StarRating from "./StarRating"
import {useEffect, useState} from "react";
import axios from "axios";

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
const SkillRating = ({fetchdata, careers, label = 'NOLABEL'}) => {
    const [rating, setRating] = useState(0);
    const [loader, setLoader] = useState(false)
    const [userId, setUserId] = useState()
    const [ratingData, setRatingData] = useState({})
    useEffect(() => {
        (async () => {
            await axios.get(`${process.env.NEXT_PUBLIC_APP_API_IP}/auth/verify`).then(async (res) => {
                setUserId(res.data.id)
                await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getrating`, {user_id: res.data.id}).then((res) => {
                    // console.log(res.data)
                    res.data.map(async (item) => {
                        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getskillname`, {skill_id: item.skill_id}).then((res) => {
                            // console.log(res.data)
                            setRatingData((prev) => {
                                return ({...prev, [res.data.name]: item.rating})
                            })
                        })
                    })
                })
            })
            setLoader(true)
        })()
    }, [])
    const handleRatingChange = async (name, roundedrating) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/rate`, {
                user_id: userId,
                ratings: {[name]: roundedrating}
            })
        } catch (err) {
            alert(err.response.data)
        }
        console.log(ratingData)
        console.log('Selected rating:', name, roundedrating);
        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getrating`, {user_id: userId}).then((res) => {
                    // console.log(res.data)
                    res.data.map(async (item) => {
                        await axios.post(`${process.env.NEXT_PUBLIC_APP_API_IP}/studentprofile/getskillname`, {skill_id: item.skill_id}).then((res) => {
                            // console.log(res.data)
                            setRatingData((prev) => {
                                fetchdata({...prev, [res.data.name]: item.rating})
                                return ({...prev, [res.data.name]: item.rating})
                            })
                        })
                    })
                })

        // Here you can send the rating to your backend
    };

    if (!loader) {
        return (<></>)
    } else {
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
                                {CareerJobs[career].map((item, index) => {
                                    return (<div
                                        className="flex sm:flex-col justify-between md:justify-stretch text-center">
                                        <p className="bg-slate-50 rounded-md text-center px-4 sm:px-auto py-1">{CareerJobs[career][index]}</p>
                                        <StarRating name={CareerJobs[career][index]} rating={ratingData[CareerJobs[career][index]]} setRating={setRating}
                                                    onRatingChange={handleRatingChange}/>
                                    </div>)
                                })}

                            </div>
                        </div>)
                })}


            </div>
        )
    }

}

export default SkillRating