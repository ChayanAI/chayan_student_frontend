import React from 'react';
import { User, GraduationCap, Goal, Dumbbell, BriefcaseBusiness, Handshake, FolderGit2, Pickaxe, FileBadge, Trophy, Medal } from "lucide-react";

const navigation = [
  { name: 'Personal Information', icon: User, step: 0 },
  { name: 'Academics', icon: GraduationCap, step: 1 },
  { name: 'Professional Goals', icon: Goal, step: 2 },
  { name: 'Skill Assessment', icon: Dumbbell, step: 3 },
  { name: 'Internships', icon: BriefcaseBusiness, step: 4 },
  { name: 'Projects', icon: FolderGit2, step: 5 },
  { name: 'Volunteer Experience', icon: Handshake, step: 6 },
  { name: 'Extra-Curricular Activities', icon: Pickaxe, step: 7 },
  { name: 'Certificates', icon: FileBadge, step: 8 },
  { name: 'Awards & Recognitions', icon: Trophy, step: 9 },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function VerticalNav({ currentStep, setCurrentStep }) {
  return (
    <nav className="flex flex-1 flex-col" aria-label="Sidebar">
      <ul role="list" className="flex flex-1 flex-col gap-y-2">
        {navigation.map((item) => (
          <li className="" key={item.name}>
            <button
              type="button"
              onClick={() => setCurrentStep(item.step)}
              className={classNames(
                currentStep === item.step
                  ? 'text-indigo-600 bg-slate-300 dark:bg-[#3b3b3d] dark:text-[#4373dc]'
                  : 'text-gray-700 dark:text-[#cdcdcf] hover:bg-slate-200 hover:dark:bg-[#4b4b4d] hover:text-indigo-600 hover:dark:text-[#e2e2e3]',
                'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 w-full',
              )}
            >
              <item.icon
                className={classNames(
                  currentStep === item.step ? 'text-indigo-600 dark:text-[#4373dc]' : 'text-gray-400 group-hover:text-indigo-600 group-hover:dark:text-[#c2c2c2]',
                  'h-6 w-6 shrink-0',
                )}
                aria-hidden="true"
              />
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
