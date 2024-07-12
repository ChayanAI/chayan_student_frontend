import React from 'react';
import { User, GraduationCap, Goal, Dumbbell, BriefcaseBusiness, Handshake, FolderGit2, Pickaxe, FileBadge, Trophy, Medal } from "lucide-react";

const navigation = [
  { name: 'Personal Information', icon: User, step: 0 },
  { name: 'Academics', icon: GraduationCap, step: 1 },
  { name: 'Internships', icon: BriefcaseBusiness, step: 2 },
  { name: 'Projects', icon: FolderGit2, step: 3 },
  { name: 'Volunteer Experience', icon: Handshake, step: 4 },
  { name: 'Extra-Curricular Activities', icon: Pickaxe, step: 5 },
  { name: 'Certificates', icon: FileBadge, step: 6 },
  { name: 'Awards & Recognitions', icon: Trophy, step: 7 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function EditProfileNav({ classname, currentStep, setCurrentStep }) {
  return (
    <nav className="flex flex-1 flex-col" aria-label="Navigation">
      <ul role="list" className={`flex flex-wrap gap-x-2 gap-y-2 ${classname}`}>
        {navigation.map((item) => (
          <li className="" key={item.name}>
            <button
              type="button"
              onClick={() => setCurrentStep(item.step)}
              className={classNames(
                currentStep === item.step
                  ? 'text-gray-100 bg-gray-700 border-2 border-gray-700'
                  : 'text-gray-500 bg-gray-50 hover:bg-gray-200 border-2 border-gray-300',
                'group flex gap-x-3 rounded-xl px-4 py-1 text-xs font-semibold leading-6',
              )}
            >
              {/* <item.icon
                className={classNames(
                  currentStep === item.step ? 'text-indigo-600 dark:text-[#4373dc]' : 'text-gray-400 group-hover:text-indigo-600 group-hover:dark:text-[#c2c2c2]',
                  'h-6 w-6 shrink-0',
                )}
                aria-hidden="true"
              /> */}
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
