import React from 'react';

import { Text, View } from 'react-native';

import { TEAM_MEMBERS } from '../../../constants/teamIntroTexts';

import { insetShadow } from '@/shared/styles/shadows';

const pinkCardStyle = { boxShadow: insetShadow.dateFilter };

const TeamMemberGrid = () => {
  return (
    <>
      {TEAM_MEMBERS.map((row, rowIndex) => (
        <View key={rowIndex} className="flex w-full flex-row space-x-2">
          {row.map(member => (
            <View
              key={member.name}
              className="flex-1 rounded-xl bg-primary-pink py-5 pl-3 pr-2"
              style={pinkCardStyle}>
              <Text className="text-pink-100 body-rg-01">{member.role}</Text>
              <Text className="text-white headline-03">{member.name}</Text>
            </View>
          ))}
        </View>
      ))}
    </>
  );
};

export default TeamMemberGrid;
