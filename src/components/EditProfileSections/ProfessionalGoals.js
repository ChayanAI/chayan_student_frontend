import React from 'react';
import {Text, Select, Block, ComboBox} from '../Input';
import {ToggleButton, ButtonRow, ClickyButton} from '../ToggleButton';
import SkillRating from '../SkillRating';

const ProfessionalGoals = ({ profileData, setProfileData, setRatingData }) => {
    return (
        <div
        className="rounded-lg p-10 mb-6 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:w-[75%] lg:min-w-[580px]">
        <ButtonRow type='multi' value={profileData.career_path} disp='career_path'
                   setValue={setProfileData} label={'Career Objectives'}
                   col={' col-span-full'} buttonsPerRow={4}
                   buttonNames={['Software Developer', 'Data Scientist', 'Product Manager', "DevOps Engineer", "Cybersecurity Analyst", "AI/ML Engineer", "Consultant"]}/>
        <SkillRating fetchdata={setRatingData} careers={profileData.career_path}
                     label='Rate Yourself in each skill for your desired objective:'/>
    </div>
    );
  };

export default ProfessionalGoals;
