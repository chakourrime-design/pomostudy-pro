import { create } from 'zustand';
import { persist } from 'zustand/middleware';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateId = () => typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `id-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
export const useGroupStore = create()(persist((set) => ({
    groups: [],
    addGroup: (name) => set((s) => ({
        groups: [...s.groups, {
                id: uuidv4(), name,
                members: [], createdAt: new Date().toISOString()
            }]
    })),
    addMember: (groupId, member) => set((s) => ({
        groups: s.groups.map((g) => g.id === groupId && !g.members.includes(member)
            ? { ...g, members: [...g.members, member] } : g)
    })),
    removeMember: (groupId, member) => set((s) => ({
        groups: s.groups.map((g) => g.id === groupId
            ? { ...g, members: g.members.filter((m) => m !== member) } : g)
    })),
    removeGroup: (groupId) => set((s) => ({
        groups: s.groups.filter((g) => g.id !== groupId)
    })),
}), { name: 'group-store' }));
function uuidv4() {
    throw new Error('Function not implemented.');
}
