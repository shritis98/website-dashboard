'use strict';
import {
  getMembers,
  getDiscordGroups,
  addGroupRoleToMember,
  createDiscordGroupRole,
} from './utils.js';
const tabs = document.querySelectorAll('.groups-tab div');
const sections = document.querySelectorAll('.manage-groups, .create-group');

const membersIdNameObject = {};
const membersData = await getMembers();
membersData.forEach((member) => {
  if (member.username) membersIdNameObject[member.id] = member.username;
});

const groupsData = await getDiscordGroups();
const itemList = document.querySelector('.groups-list');
groupsData.forEach((item) => {
  const group = document.createElement('li');
  const groupname = document.createElement('p');
  groupname.classList.add('group-name');
  const createdBy = document.createElement('span');
  createdBy.classList.add('create-by');
  groupname.textContent = item.rolename;
  createdBy.textContent = 'created by ' + membersIdNameObject[item.createdBy];
  group.appendChild(groupname);
  group.appendChild(createdBy);
  itemList.appendChild(group);
});

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    tab.classList.add('active-tab');

    sections.forEach((section) => {
      section.classList.add('hidden-tab');
    });

    sections[index].classList.remove('hidden-tab');
  });
});
