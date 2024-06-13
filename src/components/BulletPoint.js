"use client"

const BulletPoint = ({ head, point, extraClasses }) => {
    return (
        <div className={`w-full flex flex-col ${extraClasses}`}>
          <h4 className="font-[500] text-md">{head}</h4>
          <p className="text-sm">{point}</p>
        </div>
    )
}

export default BulletPoint
